/* 41-Maktab 2.0 — REYTING ENGINE
   Qoidalar (2026-10-20 yakuniy):
   - 1 to'g'ri javob = savol qiymati ball (5-7 sinf=1, 8=2, 9=3, 10=4)
   - Savol balli o'quvchi uchun FAKAT BIR MARTA hisoblanadi (oldin to'g'ri yechilgan savol = 0)
   - 1 kunda har fandan 3 tagacha test
   - Darajalar: Bronza 50 / Kumush 150 / Oltin 400 / Platina 800 / Master 1500
   Hozir localStorage, keyinchalik Cloudflare Worker + D1'ga ko'chiriladi (shu funksiyalar xuddi shu mantiqda qoladi). */
(function () {
  'use strict';

  var KP = 'rt_profiles', KR = 'rt_results', KS = 'rt_session', KD = 'rt_demo', KT = 'rt_teacher_pin', KLP = 'rt_last_pid';

  function lsGet(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { } }

  function qid(fan, sinf, q) {
    var s = String(fan) + '|' + (+sinf) + '|' + String(q).trim().toLowerCase();
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return 'q' + h.toString(36);
  }

  function val(sinf) {
    sinf = +sinf;
    if (sinf >= 10) return 4;
    if (sinf === 9) return 3;
    if (sinf === 8) return 2;
    return 1;
  }

  var RANKS = [
    { name: 'Bronza', icon: '🥉', at: 50 },
    { name: 'Kumush', icon: '🥈', at: 150 },
    { name: 'Oltin', icon: '🥇', at: 400 },
    { name: 'Platina', icon: '💎', at: 800 },
    { name: 'Master', icon: '👑', at: 1500 }
  ];

  function rankOf(ball) {
    var cur = { name: 'Yangi', icon: '🌱', at: 0 };
    var next = null;
    for (var i = 0; i < RANKS.length; i++) {
      if (ball >= RANKS[i].at) cur = RANKS[i]; else { next = RANKS[i]; break; }
    }
    var prog = next ? Math.min(100, Math.round((ball - cur.at) / (next.at - cur.at) * 100)) : 100;
    return { name: cur.name, icon: cur.icon, at: cur.at, next: next, prog: prog };
  }

  /* ---------- PROFIL ---------- */
  function profiles() { return lsGet(KP, []); }

  function addProfile(p) {
    var all = profiles();
    for (var i = 0; i < all.length; i++) {
      if (all[i].name.toLowerCase() === p.name.toLowerCase() && all[i].klass === p.klass) {
        return { ok: false, err: "Bu sinfda shu ismli o'quvchi allaqachon bor" };
      }
    }
    var id = 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1000);
    p.id = id; p.created = new Date().toISOString();
    all.push(p);
    lsSet(KP, all);
    return { ok: true, id: id };
  }

  function delProfile(id) {
    var all = profiles().filter(function (p) { return p.id !== id; });
    lsSet(KP, all);
    lsDel('rt_earned_' + id);
    lsSet(KR, lsGet(KR, []).filter(function (r) { return r.pid !== id; }));
  }

  function verifyPin(id, pin) {
    var p = profiles().filter(function (x) { return x.id === id; })[0];
    return !!p && String(p.pin) === String(pin);
  }

  function findProfile(name, surname) {
    var n = (name || '').trim().toLowerCase(), s = (surname || '').trim().toLowerCase();
    if (!n) return null;
    var all = profiles();
    for (var i = 0; i < all.length; i++) if (all[i].name.toLowerCase() === n) return all[i];
    for (var j = 0; j < all.length; j++) if (all[j].name.toLowerCase() === n && all[j].surname.toLowerCase() === s) return all[j];
    return null;
  }

  function session() { return lsGet(KS, null); }
  function setSession(id) { if (id) lsSet(KS, id); else lsDel(KS); }

  function teacherPin() { return lsGet(KT, '4141'); }
  function setTeacherPin(v) { lsSet(KT, String(v)); }

  /* ---------- TESTLARGA CHEKLOV (1 kun / 1 fan = 3) ---------- */
  function dayKey(d) { var t = d || new Date(); return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate(); }

  function canTake(pid, fan, sinf, date) {
    var today = dayKey(date);
    var n = 0;
    lsGet(KR, []).forEach(function (r) { if (r.pid === pid && r.fan === fan && dayKey(new Date(r.date)) === today) n++; });
    return { ok: n < 3, left: 3 - n };
  }

  /* ---------- YAZISH (bir martalik qoida bilan) ----------
     qs: [{q: "savol matni", ok: true/false}] */
  function recordTest(o) {
    var pk = 'rt_earned_' + o.pid;
    var earned = lsGet(pk, []);
    var ev = {};
    for (var i = 0; i < earned.length; i++) ev[earned[i]] = true;
    var v = val(o.sinf), ball = 0, fresh = 0;
    (o.qs || []).forEach(function (it) {
      var id = qid(o.fan, o.sinf, it.q);
      if (it.ok && !ev[id]) { ball += v; fresh++; ev[id] = true; earned.push(id); }
    });
    lsSet(pk, earned);
    var res = lsGet(KR, []);
    res.push({
      id: 'r' + Date.now().toString(36) + Math.floor(Math.random() * 1000),
      pid: o.pid, fan: o.fan, sinf: +o.sinf,
      correct: o.correct, total: o.total, pct: o.pct,
      ball: ball, fresh: fresh, secs: o.secs || 0,
      date: o.date || new Date().toISOString()
    });
    lsSet(KR, res);
    var totalBall = 0;
    res.forEach(function (r) { if (r.pid === o.pid) totalBall += r.ball; });
    return { ball: ball, fresh: fresh, totalBall: totalBall };
  }

  /* ---------- STATISTIKA ---------- */
  function results() { return lsGet(KR, []); }

  function totalBall(pid) {
    var t = 0;
    results().forEach(function (r) { if (r.pid === pid) t += r.ball; });
    return t;
  }

  function weekRange(period) {
    var now = new Date();
    if (period === 'week') {
      var start = new Date(now.getTime() - 6 * 86400000); start.setHours(0, 0, 0, 0);
      return { from: start, to: now, prevFrom: new Date(start.getTime() - 7 * 86400000), prevTo: start };
    }
    if (period === 'month') {
      var m0 = new Date(now.getFullYear(), now.getMonth(), 1);
      var pm0 = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return { from: m0, to: now, prevFrom: pm0, prevTo: m0 };
    }
    return { from: new Date(0), to: now, prevFrom: new Date(now.getTime() - 7 * 86400000), prevTo: new Date(now.getTime() - 6 * 86400000) };
  }

  function ballInRange(pid, from, to, fan) {
    var t = 0;
    results().forEach(function (r) {
      if (r.pid !== pid) return;
      if (fan && r.fan !== fan) return;
      var d = new Date(r.date);
      if (d >= from && d <= to) t += r.ball;
    });
    return t;
  }

  function streak(pid) {
    var days = {};
    results().forEach(function (r) { if (r.pid === pid && r.ball > 0) days[dayKey(new Date(r.date))] = true; });
    var n = 0, d = new Date();
    if (!days[dayKey(d)]) d = new Date(d.getTime() - 86400000); // bugun yo'q — kecha dan sanaymiz
    while (days[dayKey(d)]) { n++; d = new Date(d.getTime() - 86400000); }
    return n;
  }

  function myStats(pid) {
    var rs = results().filter(function (r) { return r.pid === pid; });
    var total = 0, byFan = {}, tests = 0, perfect = 0, dayCnt = {};
    rs.forEach(function (r) {
      total += r.ball; tests++;
      if (r.pct === 100) perfect++;
      dayCnt[dayKey(new Date(r.date))] = (dayCnt[dayKey(new Date(r.date))] || 0) + 1;
      if (!byFan[r.fan]) byFan[r.fan] = { ball: 0, tests: 0, correct: 0, total: 0 };
      byFan[r.fan].ball += r.ball; byFan[r.fan].tests++;
      byFan[r.fan].correct += r.correct; byFan[r.fan].total += r.total;
    });
    var w = weekRange('week');
    var thisWk = 0;
    rs.forEach(function (r) { var d = new Date(r.date); if (d >= w.from && d <= w.to) thisWk += r.ball; });
    return {
      total: total, byFan: byFan, tests: tests, perfect: perfect,
      rank: rankOf(total), streak: streak(pid),
      week: thisWk,
      uniqueDays: Object.keys(dayCnt).length
    };
  }

  /* ---------- LEADERBOARD ----------
     scope: 'school' | 'class' (klass bilan) | 'fan' (fan bilan) */
  function leaderboard(scope, opts) {
    opts = opts || {};
    var period = opts.period || 'all';
    var w = weekRange(period);
    var profs = profiles();
    var rows = profs.map(function (p) {
      var bal = 0;
      results().forEach(function (r) {
        if (r.pid !== p.id) return;
        if (scope === 'class' && opts.klass && p.klass !== opts.klass) return;
        if (scope === 'fan' && opts.fan && r.fan !== opts.fan) return;
        var d = new Date(r.date);
        if (period !== 'all' && !(d >= w.from && d <= w.to)) return;
        bal += r.ball;
      });
      var cur = ballInRange(p.id, w.from, w.to, scope === 'fan' ? opts.fan : null);
      var prev = ballInRange(p.id, w.prevFrom, w.prevTo, scope === 'fan' ? opts.fan : null);
      return {
        id: p.id, name: p.name, surname: p.surname, klass: p.klass, sinf: p.sinf,
        ball: bal, delta: cur - prev, hasData: bal > 0 || period === 'all'
      };
    });
    rows = rows.filter(function (r) {
      if (scope === 'class' && opts.klass) return r.klass === opts.klass && r.ball > 0;
      if (scope === 'fan') return r.ball > 0;
      return r.ball > 0;
    });
    rows.sort(function (a, b) { return b.ball - a.ball || a.name.localeCompare(b.name); });
    rows.forEach(function (r, i) { r.rank = i + 1; });
    return rows;
  }

  /* ---------- MENING O'RNIM (Reyting tab: o'rinlar + tarix) ---------- */
  function myRanks(pid) {
    var p = profiles().filter(function (x) { return x.id === pid; })[0];
    if (!p) return null;
    var out = { school: null, class: null, fans: [] };
    var sch = leaderboard('school', { period: 'all' });
    var me = sch.filter(function (r) { return r.id === pid; })[0];
    if (me) out.school = { rank: me.rank, count: sch.length, ball: me.ball, gap: sch.length ? sch[0].ball - me.ball : 0, delta: me.delta };
    if (p.klass) {
      var cl = leaderboard('class', { klass: p.klass, period: 'all' });
      var mc = cl.filter(function (r) { return r.id === pid; })[0];
      if (mc) out.class = { rank: mc.rank, count: cl.length, ball: mc.ball };
    }
    var st = myStats(pid);
    Object.keys(st.byFan).sort().forEach(function (f) {
      var rows = leaderboard('fan', { fan: f, period: 'all' });
      var mf = rows.filter(function (r) { return r.id === pid; })[0];
      if (mf) out.fans.push({ fan: f, rank: mf.rank, count: rows.length, ball: mf.ball, delta: mf.delta });
    });
    return out;
  }

  /* So'nggi N hafta: har chekda o'z yig'indi ball + maktabdagi o'rin */
  function rankHistory(pid, weeks) {
    weeks = weeks || 5;
    var now = Date.now();
    var out = [];
    for (var w = weeks - 1; w >= 0; w--) {
      var to = now - w * 7 * 86400000;
      var totals = profiles().map(function (p) {
        var t = 0;
        results().forEach(function (r) { if (r.pid === p.id && new Date(r.date).getTime() <= to) t += r.ball; });
        return { id: p.id, t: t };
      }).filter(function (x) { return x.t > 0; })
        .sort(function (a, b) { return b.t - a.t; });
      var idx = -1;
      for (var i = 0; i < totals.length; i++) if (totals[i].id === pid) idx = i;
      out.push({
        label: w === 0 ? 'Hozir' : w + '-ha',
        rank: idx >= 0 ? idx + 1 : 0,
        total: idx >= 0 ? totals[idx].t : 0,
        count: totals.length,
        isNow: w === 0
      });
    }
    return out;
  }

  /* ---------- YUTUQLAR ---------- */
  function myClassTop3(pid) {
    var p = profiles().filter(function (x) { return x.id === pid; })[0];
    if (!p) return false;
    var rows = leaderboard('class', { klass: p.klass, period: 'all' });
    var me = rows.filter(function (r) { return r.id === pid; })[0];
    return !!me && me.rank <= 3;
  }

  function achievements(pid) {
    var s = myStats(pid);
    var fans = Object.keys(s.byFan).length;
    return [
      { id: 'first', icon: '🚀', name: 'Birinchi test', desc: 'Birinchi testni topshirdi', got: s.tests >= 1 },
      { id: 'perfect', icon: '🎯', name: 'Mukammal 10/10', desc: 'Bir testda hamma savolni to\'g\'ri yechdi', got: s.perfect >= 1 },
      { id: 'streak7', icon: '🔥', name: '7 kun seriya', desc: 'Ketma-ket 7 kun test topshirdi', got: s.streak >= 7 },
      { id: 'fan5', icon: '📚', name: '5 fan', desc: '5 xil fandan natija yig\'di', got: fans >= 5 },
      { id: 'ball500', icon: '💯', name: '500 ball', desc: 'Umumiy 500 ballga yetdi', got: s.total >= 500 },
      { id: 'classtop', icon: '🏆', name: 'Sinf top-3', desc: "O'z sinfiga umumiy reytingda kirgan", got: myClassTop3(pid) },
      { id: 'master', icon: '👑', name: 'Master', desc: '1500 ball — eng yuqori daraja', got: s.total >= 1500 }
    ];
  }

  /* ---------- DEMO MA'LUMOT ---------- */
  function isDemo() { return lsGet(KD, 0) === 1; }

  function wipe() {
    [KP, KR, KS, KD, KT].forEach(lsDel);
    profiles().forEach(function (p) { lsDel('rt_earned_' + p.id); });
  }

  function seedDemo() {
    if (profiles().length || isDemo()) return;
    var mk = function (name, surname, klass, sinf, pin) {
      var r = addProfile({ name: name, surname: surname, klass: klass, sinf: sinf, pin: pin });
      return r.id;
    };
    var demo = [
      ['Alisher', 'Karimov', '8-A', 8, '1111'],
      ['Malika', 'Rahimova', '8-A', 8, '1111'],
      ['Sardor', 'Yuldashev', '8-A', 8, '1111'],
      ['Dilnoza', 'Yusupova', '8-A', 8, '1111'],
      ['Jasur', 'Toshmatov', '8-B', 8, '1111'],
      ['Nilufar', 'Saidova', '8-B', 8, '1111'],
      ['Temur', 'Abdullayev', '8-B', 8, '1111'],
      ['Zarina', 'Ergasheva', '9-A', 9, '1111'],
      ['Bekzod', 'Nazarov', '9-A', 9, '1111'],
      ['Kamola', 'Ismoilova', '9-A', 9, '1111'],
      ['Otabek', 'Qodirov', '9-A', 9, '1111'],
      ['Sevinch', 'Mirzayeva', '5-A', 5, '1111']
    ];
    var ids = demo.map(function (d) { return mk(d[0], d[1], d[2], d[3], d[4]); });
    var subjs = { 5: [['matematika', '5'], ['ingliz-tili', '5'], ['ona-tili', '5']], 8: [['algebra', '8a'], ['geometriya', '8a'], ['ingliz-tili', '8a'], ['ona-tili', '8a']], 9: [['algebra', '9a'], ['geometriya', '9a'], ['ingliz-tili', '9a'], ['ona-tili', '9a']] };
    var now = Date.now();
    ids.forEach(function (pid, idx) {
      var p = demo[idx];
      var s5 = subjs[p[3]];
      for (var day = 40; day >= 0; day -= 2) {
        if ((day + idx) % 3 === 0) continue;
        var subj = s5[(idx + day) % s5.length];
        if (typeof TestGen === 'undefined' || !TestGen.generate) continue;
        var g;
        try { g = TestGen.generate(subj[1], subj[0]); } catch (e) { continue; }
        if (!g) continue;
        var skill = 0.45 + (idx % 5) * 0.09; // o'quvchilar kuchi
        var qs = [], correct = 0;
        g.questions.forEach(function (q) {
          var ok = Math.random() < skill;
          if (ok) correct++;
          qs.push({ q: q.question, ok: ok });
        });
        var date = new Date(now - day * 86400000 - Math.floor(Math.random() * 36000000)).toISOString();
        recordTest({ pid: pid, fan: subj[0], sinf: p[3], qs: qs, correct: correct, total: g.questions.length, pct: Math.round(correct / g.questions.length * 100), secs: 400 + Math.floor(Math.random() * 800), date: date });
      }
    });
    lsSet(KD, 1);
  }

  /* ---------- KIRISH / RO'YXATDAN O'TISH (bitta forma = ikkala vazifa) ----------
     Qoida: bitta ism+familiya+klass = bitta profil.
     Profil yo'q  -> yaratiladi (ERP tekshiruvi keyingi bosqichda qo'shiladi,
                    oquvchilar.json ro'yxati tayyor: /41school/erp/).
     Profil bor   -> faqat to'g'ri PIN bilan kirish.
     Brute-force: 5 xato PIN -> 15 daqiqalik to'siq. */
  function authKeyOf(name, surname, klass) {
    return [name, surname, klass].map(function (x) { return String(x || '').trim().toLowerCase(); }).join('|');
  }
  /* Qurilma bog'lagichi: o'qituvchi profilni qurilmaga bog'laydi (keyin D1'ga ham) */
  function saveLast(id) { lsSet(KLP, id); }
  function lastPid() {
    var v = lsGet(KLP, null);
    if (v) return v;
    // eski format (JSON bo'lmagan) bilan orqaga moslik
    try { return localStorage.getItem(KLP) || null; } catch (e) { return null; }
  }
  function unbindDevice() { lsDel(KLP); }
  function lockErr(lk) {
    if (lk && lk.until && lk.until > Date.now()) {
      return { ok: false, lock: true, err: 'Ko\u2019p xato kiritildi — ' + Math.ceil((lk.until - Date.now()) / 60000) + ' daqiqa keyin qayta urinib ko\u2019ring' };
    }
    return null;
  }
  function noteFail(key, lk) {
    var n = (lk && lk.n) || 0;
    n++;
    var until = null;
    if (n >= 5) { until = Date.now() + 15 * 60000; n = 0; }
    lsSet('rt_pl_' + key, { n: n, until: until });
    return until
      ? { ok: false, lock: true, err: 'PIN 5 marta noto\u2019g\u2019ri kiritildi — 15 daqiqaga to\u2019sildi. O\u2019qituvchiga murojaat qiling' }
      : { ok: false, err: 'PIN noto\u2019g\u2019ri. Urinish: ' + n + ' / 5' };
  }
  function findProfileExact(name, surname, klass) {
    var n = String(name || '').trim().toLowerCase(), s = String(surname || '').trim().toLowerCase(), k = String(klass || '').trim().toLowerCase();
    var all = profiles();
    for (var i = 0; i < all.length; i++) {
      if (all[i].name.trim().toLowerCase() === n && all[i].surname.trim().toLowerCase() === s && String(all[i].klass).trim().toLowerCase() === k) return all[i];
    }
    return null;
  }
  function loginOrRegister(d) {
    var name = String(d.name || '').trim(), surname = String(d.surname || '').trim();
    var sinf = String(d.sinf || '').trim(), letter = String(d.klass || '').trim().toUpperCase();
    var klass = sinf + '-' + letter;
    var pin = String(d.pin || '').replace(/\D/g, '');
    if (!name || !surname) return { ok: false, err: 'Ism va familiyani kiriting' };
    if (!/^\d{1,2}$/.test(sinf) || !/^[A-D]$/.test(letter)) return { ok: false, err: 'Sinf va klassni tanlang' };
    if (pin.length !== 4) return { ok: false, err: 'PIN aynan 4 raqamdan iborat bo\u2019lsin' };
    var key = authKeyOf(name, surname, klass);
    var lk = lsGet('rt_pl_' + key, null);
    var le = lockErr(lk);
    if (le) return le;
    var existing = findProfileExact(name, surname, klass);
    if (existing) {
      if (!verifyPin(existing.id, pin)) return noteFail(key, lk);
      lsDel('rt_pl_' + key);
      setSession(existing.id);
      saveLast(existing.id); // ID qurilmada saqlanadi
      return { ok: true, id: existing.id, isNew: false, name: existing.name, surname: existing.surname };
    }
    if (d.allowRegister === false) {
      return { ok: false, err: 'Bu qurilmada profil allaqachon ro\u2019yxatdan o\u2019tgan — yangi profil yaratib bo\u2019lmaydi. Avvalgi ism va PIN bilan kiring.' };
    }
    var r = addProfile({ name: name, surname: surname, sinf: +sinf, klass: klass, pin: pin });
    if (!r.ok) return { ok: false, err: r.err };
    lsDel('rt_pl_' + key);
    setSession(r.id);
    saveLast(r.id); // profil yaratildi → ID saqlanadi, avatar paydo bo'ladi, testlar shu profil bilan ishlaydi
    return { ok: true, id: r.id, isNew: true, name: name, surname: surname };
  }
  /* Bog'langan profilda faqat PIN bilan kirish (ism maydonlari yo'q) */
  function loginById(id, pin) {
    var p = profiles().filter(function (x) { return x.id === id; })[0];
    if (!p) return { ok: false, err: 'Profil topilmadi — o\u2019qituvchiga murojaat qiling' };
    var pinS = String(pin || '').replace(/\D/g, '');
    if (pinS.length !== 4) return { ok: false, err: 'PIN aynan 4 raqamdan iborat bo\u2019lsin' };
    var key = authKeyOf(p.name, p.surname, p.klass);
    var lk = lsGet('rt_pl_' + key, null);
    var le = lockErr(lk);
    if (le) return le;
    if (!verifyPin(id, pinS)) return noteFail(key, lk);
    lsDel('rt_pl_' + key);
    setSession(id);
    saveLast(id);
    return { ok: true, id: id, isNew: false, name: p.name, surname: p.surname };
  }
  function resetStudentPin(pid, newPin) {
    var all = profiles();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === pid) {
        all[i].pin = String(newPin);
        lsSet(KP, all);
        lsDel('rt_pl_' + authKeyOf(all[i].name, all[i].surname, all[i].klass));
        return { ok: true };
      }
    }
    return { ok: false, err: 'Profil topilmadi' };
  }

  window.RT = {
    qid: qid, val: val, RANKS: RANKS, rankOf: rankOf,
    profiles: profiles, addProfile: addProfile, delProfile: delProfile, verifyPin: verifyPin,
    findProfile: findProfile, findProfileExact: findProfileExact,
    loginOrRegister: loginOrRegister, loginById: loginById, lastPid: lastPid, unbindDevice: unbindDevice, resetStudentPin: resetStudentPin,
    session: session, setSession: setSession,
    teacherPin: teacherPin, setTeacherPin: setTeacherPin,
    canTake: canTake, recordTest: recordTest, results: results,
    totalBall: totalBall, myStats: myStats, leaderboard: leaderboard,
    myRanks: myRanks, rankHistory: rankHistory,
    achievements: achievements, isDemo: isDemo, seedDemo: seedDemo, wipe: wipe,
    dayKey: dayKey, weekRange: weekRange
  };
})();
