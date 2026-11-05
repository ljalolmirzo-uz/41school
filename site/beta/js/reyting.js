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

  /* ================= VALIDATSIYA YORDAMCHILARI ================= */
  function validUsername(u) { return /^[a-z0-9][a-z0-9._]{1,18}[a-z0-9]$/i.test(String(u || '')); }
  function validName(s) { return /^[a-z‘'`\- ]{2,24}$/i.test(String(s || '').trim()); }
  function validPin(p) { return /^\d{4,8}$/.test(String(p || '')); }
  /* Profil sinfi -> test generator kaliti: 5-sinf = '5', qolganlari = '8a' ko'rinishida */
  function classKeyOf(p) {
    var g = +p.sinf;
    if (g === 5) return '5';
    /* klass profil'da '8-B' ko'rinishida saqlanadi — oxirgi harfni olamiz */
    var letter = String(p.klass || 'A').trim().slice(-1).toLowerCase();
    return g + letter;
  }
  function sameNameExists(name, surname, klass, exceptId) {
    var n = String(name || '').trim().toLowerCase(), s = String(surname || '').trim().toLowerCase();
    return profiles().some(function (p) {
      return p.id !== exceptId && p.klass === klass &&
        p.name.trim().toLowerCase() === n && p.surname.trim().toLowerCase() === s;
    });
  }

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
    var profs = profiles();
    profs.forEach(function (p) { lsDel('rt_earned_' + p.id); });
    [KP, KR, KS, KD, KT, KLP].forEach(lsDel);
    try {
      Object.keys(localStorage).filter(function (k) { return k.indexOf('rt_pl_') === 0; })
        .forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) { }
  }

  function seedDemo() {
    if (profiles().length || isDemo()) return;
    var mk = function (name, surname, klass, sinf, i) {
      var r = addProfile({
        name: name, surname: surname, klass: klass, sinf: sinf,
        pin: '1111', username: 'demo' + (i + 1), demo: 1
      });
      return r.id;
    };
    var demo = [
      ['Alisher', 'Karimov', '8-A', 8],
      ['Malika', 'Rahimova', '8-A', 8],
      ['Sardor', 'Yuldashev', '8-A', 8],
      ['Dilnoza', 'Yusupova', '8-A', 8],
      ['Jasur', 'Toshmatov', '8-B', 8],
      ['Nilufar', 'Saidova', '8-B', 8],
      ['Temur', 'Abdullayev', '8-B', 8],
      ['Zarina', 'Ergasheva', '9-A', 9],
      ['Bekzod', 'Nazarov', '9-A', 9],
      ['Kamola', 'Ismoilova', '9-A', 9],
      ['Otabek', 'Qodirov', '9-A', 9],
      ['Sevinch', 'Mirzayeva', '5-A', 5]
    ];
    var ids = demo.map(function (d, i) { return mk(d[0], d[1], d[2], d[3], i); });
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

  /* ---------- AUTENTIFIKATSIYA: username + PIN (qo'lda ro'yxatdan o'tish, ERP'siz) ----------
     Qoidalar:
     - Ro'yxatdan o'tish: ism, familiya, sinf (5-9), klass (A/B), username, PIN (4-8 raqam)
     - Username unikal; bir sinfda bir xil ism-familiya takrorlanmaydi
     - Reytingda username emas, ism-familiya chiqadi
     - Brute-force: 5 xato urinish -> 15 daqiqalik to'siq (username kalitida) */
  function authKeyOf(name, surname, klass) {
    return [name, surname, klass].map(function (x) { return String(x || '').trim().toLowerCase(); }).join('|');
  }
  /* Qurilma bog'lagichi: oxirgi profil shu qurilmada eslab qolinadi */
  function saveLast(id) { lsSet(KLP, id); }
  function lastPid() {
    var v = lsGet(KLP, null);
    if (v) return v;
    try { return localStorage.getItem(KLP) || null; } catch (e) { return null; }
  }
  function unbindDevice() { lsDel(KLP); }
  function lockErr(lk) {
    if (lk && lk.until && lk.until > Date.now()) {
      return { ok: false, lock: true, err: 'Ko‘p xato urinish — ' + Math.ceil((lk.until - Date.now()) / 60000) + ' daqiqa keyin qayta urinib ko‘ring' };
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
      ? { ok: false, lock: true, err: 'PIN 5 marta noto‘g‘ri kiritildi — 15 daqiqaga to‘sildi' }
      : { ok: false, err: 'PIN noto‘g‘ri. Urinish: ' + n + ' / 5' };
  }
  function findProfileExact(name, surname, klass) {
    var n = String(name || '').trim().toLowerCase(), s = String(surname || '').trim().toLowerCase(), k = String(klass || '').trim().toLowerCase();
    var all = profiles();
    for (var i = 0; i < all.length; i++) {
      if (all[i].name.trim().toLowerCase() === n && all[i].surname.trim().toLowerCase() === s && String(all[i].klass).trim().toLowerCase() === k) return all[i];
    }
    return null;
  }
  function byUsername(username) {
    var u = String(username || '').trim().toLowerCase();
    return profiles().filter(function (p) { return (p.username || '').toLowerCase() === u; })[0] || null;
  }
  function passwordMatches(p, pw) {
    if (!p) return false;
    if (p.pin) return String(pw) === String(p.pin);
    if (p.password) return String(pw) === String(p.password); // eski format bilan orqaga moslik
    return false;
  }

  /* Yangi profil — 3 bosqichli wizard ma'lumotlari bilan */
  function register(d) {
    var name = String(d.name || '').trim();
    var surname = String(d.surname || '').trim();
    var sinf = parseInt(d.sinf, 10);
    var klass = String(d.klass || '').trim().toUpperCase();
    var username = String(d.username || '').trim().toLowerCase();
    var pin = String(d.pin || '');
    var pin2 = String(d.pin2 || '');

    if (!validName(name)) return { ok: false, err: 'Ismni to‘g‘ri kiriting (2–24 harf)' };
    if (!validName(surname)) return { ok: false, err: 'Familiyani to‘g‘ri kiriting (2–24 harf)' };
    if (!(sinf >= 5 && sinf <= 9)) return { ok: false, err: 'Sinf 5 dan 9 gacha tanlansin' };
    if (!/^[AB]$/.test(klass)) return { ok: false, err: 'Klass faqat A yoki B bo‘ladi' };
    if (!validUsername(username)) return { ok: false, err: 'Username 3–20 belgidan: lotin harfi yoki raqam bilan boshlanib, harf, raqam, nuqta yoki pastki chiziqdan iborat bo‘lsin' };
    if (!validPin(pin)) return { ok: false, err: 'PIN 4 dan 8 gacha raqamdan iborat bo‘lsin' };
    if (pin !== pin2) return { ok: false, err: 'PIN tasdig‘i bir-biriga mos kelmadi' };

    var fullKlass = sinf + '-' + klass;
    var all = profiles();
    if (all.some(function (p) { return (p.username || '').toLowerCase() === username; })) {
      return { ok: false, err: 'Bu username band — boshqasini tanlang' };
    }
    if (sameNameExists(name, surname, fullKlass)) {
      return { ok: false, err: fullKlass + ' sinfda bu ism-familiya allaqachon ro‘yxatdan o‘tgan' };
    }
    var id = 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1000);
    var p = {
      id: id, name: name, surname: surname, sinf: sinf, klass: fullKlass,
      username: username, pin: pin,
      created: new Date().toISOString()
    };
    all.push(p);
    lsSet(KP, all);
    lsDel('rt_pl_' + username);
    setSession(id);
    saveLast(id);
    return { ok: true, id: id, isNew: true, profile: p };
  }

  function login(username, pin) {
    var u = String(username || '').trim().toLowerCase();
    var pw = String(pin || '');
    if (!u || !pw) return { ok: false, err: 'Username va PIN ni kiriting' };
    var lk = lsGet('rt_pl_' + u, null);
    var le = lockErr(lk);
    if (le) return le;
    var p = byUsername(u);
    if (!p || !passwordMatches(p, pw)) return noteFail(u, lk);
    lsDel('rt_pl_' + u);
    setSession(p.id);
    saveLast(p.id);
    return { ok: true, id: p.id, isNew: false, name: p.name, surname: p.surname };
  }

  /* Bog'langan profilda PIN bilan kirish (qurilmada eslab qolingan bo'lsa) */
  function loginById(id, pin) {
    var p = profiles().filter(function (x) { return x.id === id; })[0];
    if (!p) return { ok: false, err: 'Profil topilmadi' };
    var pw = String(pin || '');
    if (!validPin(pw) && !p.password) return { ok: false, err: 'PIN 4 dan 8 gacha raqamdan iborat bo‘lsin' };
    var key = p.username || authKeyOf(p.name, p.surname, p.klass);
    var lk = lsGet('rt_pl_' + key, null);
    var le = lockErr(lk);
    if (le) return le;
    if (!passwordMatches(p, pw)) return noteFail(key, lk);
    lsDel('rt_pl_' + key);
    setSession(id);
    saveLast(id);
    return { ok: true, id: id, isNew: false, name: p.name, surname: p.surname };
  }
  function resetStudentPin(pid, newPin) {
    if (!validPin(newPin)) return { ok: false, err: 'PIN 4 dan 8 gacha raqamdan iborat bo‘lsin' };
    var all = profiles();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === pid) {
        all[i].pin = String(newPin);
        delete all[i].password;
        lsSet(KP, all);
        var key = all[i].username || authKeyOf(all[i].name, all[i].surname, all[i].klass);
        lsDel('rt_pl_' + key);
        return { ok: true };
      }
    }
    return { ok: false, err: 'Profil topilmadi' };
  }

  window.RT = {
    qid: qid, val: val, RANKS: RANKS, rankOf: rankOf,
    profiles: profiles, addProfile: addProfile, delProfile: delProfile, verifyPin: verifyPin,
    findProfile: findProfile, findProfileExact: findProfileExact,
    register: register, login: login, loginById: loginById, byUsername: byUsername,
    resetStudentPin: resetStudentPin, classKeyOf: classKeyOf,
    validUsername: validUsername, validName: validName, validPin: validPin,
    sameNameExists: sameNameExists,
    lastPid: lastPid, unbindDevice: unbindDevice,
    session: session, setSession: setSession,
    teacherPin: teacherPin, setTeacherPin: setTeacherPin,
    canTake: canTake, recordTest: recordTest, results: results,
    totalBall: totalBall, myStats: myStats, leaderboard: leaderboard,
    myRanks: myRanks, rankHistory: rankHistory,
    achievements: achievements, isDemo: isDemo, seedDemo: seedDemo, wipe: wipe,
    dayKey: dayKey, weekRange: weekRange
  };
})();
