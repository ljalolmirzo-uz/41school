/* ============================================================
   41-MAKTAB 2.0 BETA — ASOSIY SAHIFA LOGIKASI (beta.js)
   - Jonli "Bugungi darslar" paneli (soatga mos)
   - Dars jadvali (vaqtlar, bugungi kun, hozirgi dars)
   - Menyu, tungi rejim, scroll effektlar
   ============================================================ */

// ===== MA'LUMOTLAR =====
var schedules =
{
  5: [
    { day: "Dushanba", lessons: ["Kelajak soati", "Adabiyot", "Jismoniy tarbiya", "Ona tili", "Matematika"] },
    { day: "Seshanba", lessons: ["Tabiiy fan", "Tarixdan hikoyalar", "Informatika", "Tasviriy san'at", "Matematika", "Ingliz tili", "Fransuz tili"] },
    { day: "Chorshanba", lessons: ["Musiqa", "Matematika", "Ona tili", "Fransuz tili", "Ingliz tili"] },
    { day: "Payshanba", lessons: ["Tarixdan hikoyalar", "Ona tili", "Adabiyot", "Texnologiya", "Texnologiya", "Fransuz tili", "Ingliz tili"] },
    { day: "Juma", lessons: ["Jismoniy tarbiya", "Ona tili", "Tabiiy fan", "Rus tili", "Matematika"] },
    { day: "Shanba", lessons: ["Rus tili", "Fransuz tili", "Ingliz tili", "Matematika", "Tarbiya"] }
  ],
  '6a': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Fransuz tili", "Matematika", "Tabiiy fan", "Ona tili", "Fransuz tili"] },
    { day: "Seshanba", lessons: ["Fransuz tili", "Musiqa", "Matematika", "Tabiiy fan", "Tasviriy san'at", "Tarix"] },
    { day: "Chorshanba", lessons: ["Ona tili", "Rus tili", "Adabiyot", "Matematika"] },
    { day: "Payshanba", lessons: ["Fransuz tili", "Texnologiya", "Texnologiya", "Rus tili", "Jismoniy tarbiya"] },
    { day: "Juma", lessons: ["Adabiyot", "Jismoniy tarbiya", "Ona tili", "Matematika", "Tabiiy fan"] },
    { day: "Shanba", lessons: ["Tarix", "Informatika", "Ona tili", "Matematika", "Tarbiya"] }
  ],
  '6b': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Jismoniy tarbiya", "Ona tili", "Matematika", "Texnologiya", "Texnologiya"] },
    { day: "Seshanba", lessons: ["Tasviriy san'at", "Tarbiya", "Tabiiy fan", "Matematika", "Fransuz tili"] },
    { day: "Chorshanba", lessons: ["Fransuz tili", "Musiqa", "Rus tili", "Ona tili", "Matematika", "Adabiyot"] },
    { day: "Payshanba", lessons: ["Adabiyot", "Jismoniy tarbiya", "Fransuz tili", "Ona tili", "Tabiiy fan"] },
    { day: "Juma", lessons: ["Tabiiy fan", "Tarix", "Matematika", "Ona tili"] },
    { day: "Shanba", lessons: ["Fransuz tili", "Matematika", "Informatika", "Tarix", "Rus tili"] }
  ],
  '7a': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Geografiya", "Jismoniy tarbiya", "Fransuz tili", "Matematika", "Fizika"] },
    { day: "Seshanba", lessons: ["Matematika", "Fizika", "Tasviriy san'at", "Kimyo", "Fransuz tili", "Matematika"] },
    { day: "Chorshanba", lessons: ["Matematika", "Informatika", "Musiqa", "Fransuz tili", "O'zbekiston tarixi", "Jismoniy tarbiya"] },
    { day: "Payshanba", lessons: ["Ona tili", "Biologiya", "Fransuz tili", "Adabiyot", "Kimyo", "Geografiya"] },
    { day: "Juma", lessons: ["O'zbekiston tarixi", "Rus tili", "Matematika", "Ona tili", "Texnologiya", "Texnologiya"] },
    { day: "Shanba", lessons: ["Adabiyot", "Tarbiya", "Jahon tarixi", "Ona tili", "Rus tili", "Biologiya"] }
  ],
  '7b': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Informatika", "Fransuz tili", "Fizika", "Geografiya", "Matematika"] },
    { day: "Seshanba", lessons: ["Fransuz tili", "Tasviriy san'at", "O'zbekiston tarixi", "Texnologiya", "Texnologiya", "Matematika"] },
    { day: "Chorshanba", lessons: ["Matematika", "Jismoniy tarbiya", "Tarbiya", "O'zbekiston tarixi", "Musiqa", "Fransuz tili"] },
    { day: "Payshanba", lessons: ["Fransuz tili", "Kimyo", "Adabiyot", "Geografiya", "Ona tili", "Jismoniy tarbiya"] },
    { day: "Juma", lessons: ["Matematika", "Ona tili", "Rus tili", "Fizika", "Biologiya", "Jahon tarixi"] },
    { day: "Shanba", lessons: ["Matematika", "Adabiyot", "Biologiya", "Rus tili", "Ona tili", "Kimyo"] }
  ],
  '8a': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Adabiyot", "Geografiya", "Jismoniy tarbiya", "Chizmachilik", "Ona tili"] },
    { day: "Seshanba", lessons: ["Texnologiya", "Jismoniy tarbiya", "O'zbekiston tarixi", "Fizika", "Biologiya", "Fransuz tili"] },
    { day: "Chorshanba", lessons: ["Fransuz tili", "Rus tili", "Huquq", "Algebra", "Ona tili", "Geometriya"] },
    { day: "Payshanba", lessons: ["Ona tili", "O'zbekiston tarixi", "Rus tili", "Kimyo", "Fransuz tili", "Jahon tarixi"] },
    { day: "Juma", lessons: ["Adabiyot", "Iqtisodiyot", "Biologiya", "Algebra", "Geometriya"] },
    { day: "Shanba", lessons: ["Tarbiya", "Kimyo", "Fizika", "Informatika", "Algebra"] }
  ],
  '8b': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Chizmachilik", "Ona tili", "Algebra", "Jismoniy tarbiya", "Adabiyot"] },
    { day: "Seshanba", lessons: ["Algebra", "Informatika", "Biologiya", "Fransuz tili", "Fizika"] },
    { day: "Chorshanba", lessons: ["Tarbiya", "Jahon tarixi", "Rus tili", "Ona tili", "Fransuz tili", "Algebra"] },
    { day: "Payshanba", lessons: ["Geografiya", "Fransuz tili", "Rus tili", "Jismoniy tarbiya", "Ona tili", "Kimyo"] },
    { day: "Juma", lessons: ["Texnologiya", "Geografiya", "O'zbekiston tarixi", "Geometriya", "Adabiyot", "Fizika"] },
    { day: "Shanba", lessons: ["Geometriya", "Huquq", "Kimyo", "Biologiya", "O'zbekiston tarixi"] }
  ],
  '9a': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Adabiyot", "Fransuz tili", "Chizmachilik", "Ona tili", "Informatika"] },
    { day: "Seshanba", lessons: ["O'zbekiston tarixi", "Geografiya", "Fizika", "Algebra", "Geometriya", "Jismoniy tarbiya"] },
    { day: "Chorshanba", lessons: ["Jismoniy tarbiya", "Geometriya", "Algebra", "Informatika", "Fransuz tili", "Tarbiya"] },
    { day: "Payshanba", lessons: ["Texnologiya", "Ona tili", "Kimyo", "Fransuz tili", "Jahon tarixi", "Adabiyot"] },
    { day: "Juma", lessons: ["Biologiya", "Fizika", "Ona tili", "Rus tili", "O'zbekiston tarixi", "Geografiya"] },
    { day: "Shanba", lessons: ["Biologiya", "Rus tili", "Huquq", "Algebra", "Kimyo"] }
  ],
  '9b': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Algebra", "Chizmachilik", "Ona tili", "Adabiyot", "Kimyo"] },
    { day: "Seshanba", lessons: ["Fizika", "Geometriya", "Algebra", "Jismoniy tarbiya", "O'zbekiston tarixi", "Fransuz tili"] },
    { day: "Chorshanba", lessons: ["Informatika", "Adabiyot", "Fransuz tili", "Jismoniy tarbiya", "Geometriya", "Huquq"] },
    { day: "Payshanba", lessons: ["Kimyo", "Fransuz tili", "Geografiya", "Jahon tarixi", "Biologiya", "Rus tili"] },
    { day: "Juma", lessons: ["Ona tili", "Texnologiya", "Informatika", "O'zbekiston tarixi", "Tarbiya", "Iqtisodiyot"] },
    { day: "Shanba", lessons: ["Fizika", "Algebra", "Ona tili", "Rus tili", "Biologiya"] }
  ],
  '10a': [
    { day: "Dushanba", lessons: ["Kelajak soati", "Fizika", "Algebra", "Geometriya", "Informatika"] },
    { day: "Seshanba", lessons: ["Biologiya", "Fransuz tili", "Kimyo", "Huquq", "Geografiya"] },
    { day: "Chorshanba", lessons: ["Rus tili", "Fransuz tili", "ChYoT", "Jismoniy tarbiya", "Tarbiya", "Ona tili"] },
    { day: "Payshanba", lessons: ["Biologiya", "Geografiya", "O'zbekiston tarixi", "Adabiyot", "ChYoT"] },
    { day: "Juma", lessons: ["Ona tili", "Algebra", "Jahon tarixi", "Jismoniy tarbiya", "Adabiyot", "Rus tili"] }
  ]
};

var classLabels = {
  '5': '5-sinf', '6a': '6-A sinf', '6b': '6-B sinf',
  '7a': '7-A sinf', '7b': '7-B sinf', '8a': '8-A sinf',
  '8b': '8-B sinf', '9a': '9-A sinf', '9b': '9-B sinf', '10a': '10-A sinf'
};

var DAYS_UZ = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']; // Du-Sh
var MONTHS_UZ = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
                 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

// Vaqt tizimi: 08:00 boshlanish, 45 daqiqa dars, 5 daqiqa tanaffus,
// 4-darsdan keyin (11:15) 20 daqiqalik katta tanaffus
var DAY_START = 8 * 60;      // 480
var LESSON_LEN = 45;
var SMALL_BREAK = 5;
var BIG_BREAK = 20;

// Test/preview uchun vaqt muhitdan boshqarilishi mumkin
function nowDate() {
  return window.__betaNow || new Date();
}

function lessonStart(n) {
  // 1–4 dars: 08:00 dan har 50 daqiqada (45 dars + 5 tanaffus)
  // 4-dars 11:15 da tugaydi, katta tanaffus 11:15–11:35,
  // shuning uchun 5-dars 11:35 da boshlanadi (+15 siljish, +20 emas)
  return DAY_START + (n - 1) * (LESSON_LEN + SMALL_BREAK) + (n >= 5 ? BIG_BREAK - SMALL_BREAK : 0);
}
function lessonEnd(n) {
  return lessonStart(n) + LESSON_LEN;
}
function fmtTime(min) {
  var h = Math.floor(min / 60), m = min % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
}

// Bugungi holatni hisoblash
function todayState(classKey, now) {
  var jsDay = now.getDay();          // 0 = Yakshanba
  var sched = schedules[classKey];
  var dayIdx = jsDay === 0 ? -1 : jsDay - 1;   // Du=0 ... Sh=5
  var day = (dayIdx >= 0 && sched) ? sched[dayIdx] : null;

  var nextDayName = function() {
    for (var d = 1; d <= 7; d++) {
      var nd = (jsDay + d) % 7;
      if (nd === 0) continue;
      if (sched && sched[nd - 1] && sched[nd - 1].lessons.length) return DAYS_UZ[nd - 1];
    }
    return 'Dushanba';
  };

  if (!day || !day.lessons.length) {
    return {
      type: jsDay === 0 ? 'rest-week' : 'rest-class',
      dayName: jsDay === 0 ? 'Yakshanba' : (dayIdx >= 0 ? DAYS_UZ[dayIdx] : ''),
      nextDay: nextDayName()
    };
  }

  var lessons = day.lessons;
  var count = lessons.length;
  var nowMin = now.getHours() * 60 + now.getMinutes();

  if (nowMin < DAY_START) {
    return { type: 'before', minutes: DAY_START - nowMin, dayName: DAYS_UZ[dayIdx] };
  }

  for (var n = 1; n <= count; n++) {
    var s = lessonStart(n), e = lessonEnd(n);
    if (nowMin >= s && nowMin < e) {
      return {
        type: 'lesson', n: n, subject: lessons[n - 1],
        endAt: fmtTime(e), minutes: e - nowMin,
        progress: Math.round(((nowMin - s) / (e - s)) * 100),
        dayName: DAYS_UZ[dayIdx]
      };
    }
    if (n < count) {
      var breakLen = (n === 4) ? BIG_BREAK : SMALL_BREAK;
      var bEnd = e + breakLen;
      if (nowMin >= e && nowMin < bEnd) {
        return {
          type: (n === 4) ? 'break-big' : 'break',
          minutes: bEnd - nowMin,
          nextN: n + 1,
          nextSubject: lessons[n],
          nextStart: (n === 4) ? fmtTime(bEnd) : fmtTime(bEnd),
          dayName: DAYS_UZ[dayIdx]
        };
      }
    }
  }

  return {
    type: 'done',
    lastN: count,
    lastSubject: lessons[count - 1],
    nextDay: nextDayName(),
    dayName: DAYS_UZ[dayIdx]
  };
}

// ===== PANEL RENDER =====
function renderPanel() {
  var el = document.getElementById('livePanel');
  if (!el) return;
  var ck = window.__betaClass || '5';
  var now = nowDate();
  var st = todayState(ck, now);
  var sched = schedules[ck];
  var dayIdx = now.getDay() === 0 ? -1 : now.getDay() - 1;
  var day = (dayIdx >= 0 && sched) ? sched[dayIdx] : null;
  var lessons = day ? day.lessons : [];

  var html = '';
  html += '<div class="lp-head">';
  html += '<div class="lp-class">📚 <b>' + classLabels[ck] + '</b></div>';
  html += '<span class="lp-day-chip">' + (dayIdx >= 0 ? DAYS_UZ[dayIdx] : 'Yakshanba') + '</span>';
  html += '</div>';

  var icon = '📅', title = '', sub = '', progress = null;
  if (st.type === 'lesson') {
    icon = '📖';
    title = 'Endi: ' + st.n + '-dars · ' + st.subject;
    sub = st.endAt + ' gacha · ' + st.minutes + ' daqiqa qoldi';
    progress = st.progress;
  } else if (st.type === 'before') {
    icon = '🔔';
    title = 'Darslar 08:00 da boshlanadi';
    sub = st.minutes + ' daqiqa qoldi';
  } else if (st.type === 'break') {
    icon = '☕';
    title = 'Tanaffus';
    sub = st.nextN + '-dars (' + st.nextSubject + ') ' + st.minutes + ' daqiqa keyin';
  } else if (st.type === 'break-big') {
    icon = '🍎';
    title = 'Katta tanaffus';
    sub = '11:35 da ' + st.nextN + '-dars boshlanadi: ' + st.nextSubject;
  } else if (st.type === 'done') {
    icon = '✅';
    title = 'Bugungi darslar tugadi';
    sub = 'Keyingi: ' + st.nextDay + ' 08:00 da';
  } else if (st.type === 'rest-week') {
    icon = '🌤️';
    title = 'Dam olish kuni';
    sub = 'Yakshanba — darslar yo\'q. Keyingi: ' + st.nextDay + ' 08:00';
  } else {
    icon = '🎉';
    title = 'Bugun darslar yo\'q';
    sub = 'Keyingi: ' + st.nextDay + ' 08:00 da';
  }

  html += '<div class="lp-status">';
  html += '<span class="lp-icon">' + icon + '</span>';
  html += '<div class="lp-status-text"><b>' + title + '</b><span>' + sub + '</span></div>';
  html += '</div>';

  if (progress !== null) {
    html += '<div class="lp-progress" aria-hidden="true"><div class="lp-fill" style="width:' + progress + '%"></div></div>';
  }

  if (lessons.length) {
    var nowMin = now.getHours() * 60 + now.getMinutes();
    html += '<div class="lp-list">';
    for (var n = 1; n <= lessons.length; n++) {
      var s = lessonStart(n), e = lessonEnd(n);
      var cls = '';
      if (st.type === 'lesson' && st.n === n) cls = 'now';
      else if (nowMin >= e && !(st.type === 'break' || st.type === 'break-big' ? (st.nextN === n && nowMin < s) : false)) cls = 'done';
      else if (st.type === 'lesson' && st.n > n) cls = 'done';
      if (st.type !== 'lesson' && nowMin >= e) cls = 'done';
      var mark = cls === 'done' ? '✓' : (cls === 'now' ? '▶' : '');
      html += '<div class="lp-row ' + cls + '">';
      html += '<span class="lp-time">' + fmtTime(s) + '</span>';
      html += '<span class="lp-name">' + n + '. ' + lessons[n - 1] + '</span>';
      html += '<span class="lp-mark">' + mark + '</span>';
      html += '</div>';
    }
    html += '</div>';
  }

  el.innerHTML = html;
}

// ===== JADVAL RENDER =====
function renderSchedule() {
  var wrap = document.getElementById('schedTable');
  if (!wrap) return;
  var ck = window.__betaClass || '5';
  var sched = schedules[ck];
  var maxLessons = 0;
  sched.forEach(function(d) { if (d.lessons.length > maxLessons) maxLessons = d.lessons.length; });
  var hasBreak = maxLessons >= 5;

  var now = nowDate();
  var dayIdx = now.getDay() === 0 ? -1 : now.getDay() - 1;
  var st = todayState(ck, now);
  var nowLesson = (st.type === 'lesson' && dayIdx >= 0) ? st.n : -1;

  var h = '<table class="sched-table"><thead><tr><th>Kun</th>';
  for (var n = 1; n <= maxLessons; n++) {
    h += '<th>' + n + '-dars<small>' + fmtTime(lessonStart(n)) + '</small></th>';
    if (hasBreak && n === 4) h += '<th class="col-break">☕ Katta<small>11:15–11:35</small></th>';
  }
  h += '</tr></thead><tbody>';

  sched.forEach(function(d) {
    var isToday = (DAYS_UZ.indexOf(d.day) === dayIdx);
    h += '<tr' + (isToday ? ' class="row-today"' : '') + '><td class="day-cell">' + d.day + (isToday ? '<span class="today-chip">Bugun</span>' : '') + '</td>';
    for (var n = 1; n <= maxLessons; n++) {
      var lesson = d.lessons[n - 1] || '—';
      var isNow = (isToday && n === nowLesson);
      h += '<td' + (isNow ? ' class="cell-now"' : '') + '>' + (isNow ? '<span class="now-dot"></span>' : '') + lesson + '</td>';
      if (hasBreak && n === 4) h += '<td class="col-break-cell">20 daq</td>';
    }
    h += '</tr>';
  });
  h += '</tbody></table>';
  wrap.innerHTML = h;
}

// ===== MOBIL "BUGUN" KO'RINISHI =====
function renderTodayView() {
  var el = document.getElementById('todayView');
  if (!el) return;
  var ck = window.__betaClass || '5';
  var now = nowDate();
  var st = todayState(ck, now);
  var dayIdx = now.getDay() === 0 ? -1 : now.getDay() - 1;
  var sched = schedules[ck];
  var day = (dayIdx >= 0 && sched) ? sched[dayIdx] : null;
  var lessons = day ? day.lessons : [];

  var h = '<div class="tv-head"><b>' + (dayIdx >= 0 ? DAYS_UZ[dayIdx] : 'Yakshanba') + '</b><span>' + classLabels[ck] + ' · ' + lessons.length + ' ta dars</span></div>';
  if (lessons.length) {
    var nowMin = now.getHours() * 60 + now.getMinutes();
    h += '<div class="tv-list">';
    for (var n = 1; n <= lessons.length; n++) {
      var s = lessonStart(n), e = lessonEnd(n);
      var cls = '';
      if (st.type === 'lesson' && st.n === n) cls = 'now';
      else if (st.type === 'lesson' && st.n > n) cls = 'done';
      else if (st.type !== 'lesson' && nowMin >= e) cls = 'done';
      h += '<div class="tv-row ' + cls + '"><span class="tv-time">' + fmtTime(s) + '–' + fmtTime(e) + '</span><span class="tv-name">' + n + '-dars · ' + lessons[n - 1] + '</span></div>';
      if (n === 4 && n < lessons.length) h += '<div class="tv-break">☕ Katta tanaffus · 11:15–11:35</div>';
    }
    h += '</div>';
  } else {
    h += '<div class="tv-empty">🎉 Bugun darslar yo\'q</div>';
  }
  el.innerHTML = h;
}

function renderAll() {
  renderPanel();
  renderSchedule();
  renderTodayView();
  var lc = document.getElementById('lpClassLabel');
}

// ===== SINF ALMASHTIRISH =====
function selectClass(ck) {
  window.__betaClass = ck;
  document.querySelectorAll('.class-pill').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-class') === ck);
  });
  renderAll();
}

// ===== BOSHQARUV =====
document.addEventListener('DOMContentLoaded', function() {
  // Sana va salomlashuv
  var now = nowDate();
  var h = now.getHours();
  var greet = h < 5 ? 'Xayrli tun' : (h < 12 ? 'Xayrli tong' : (h < 17 ? 'Xayrli kun' : 'Xayrli oqshom'));
  var g = document.getElementById('greet');
  if (g) g.textContent = greet + '!';
  var dl = document.getElementById('dateLine');
  if (dl) {
    var dayName = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'][now.getDay()];
    dl.textContent = '📅 ' + dayName + ', ' + now.getDate() + '-' + MONTHS_UZ[now.getMonth()] + ' ' + now.getFullYear();
  }

  // Sinf tugmalari
  document.querySelectorAll('.class-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      selectClass(btn.getAttribute('data-class'));
      // Mobil: tanlangan sinf markazga aylantirilsin (swipe qatori)
      if (window.innerWidth <= 768) {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  });

  // Mobil ko'rinish tugmalari
  var tabs = document.querySelectorAll('.view-tab');
  tabs.forEach(function(t) {
    t.addEventListener('click', function() {
      tabs.forEach(function(x) { x.classList.remove('active'); });
      t.classList.add('active');
      var mode = t.getAttribute('data-view');
      document.getElementById('todayView').style.display = (mode === 'today') ? 'block' : 'none';
      document.getElementById('tableWrap').style.display = (mode === 'table') ? 'block' : 'none';
    });
  });

  // Tungi rejim (asosiy sayt bilan bir xil kalit)
  var toggle = document.getElementById('darkToggle');
  if (toggle) {
    function applyTheme() {
      var dark = localStorage.getItem('theme') === 'dark';
      document.body.classList.toggle('dark', dark);
      toggle.textContent = dark ? '☀️' : '🌙';
    }
    applyTheme();
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      var dark = document.body.classList.contains('dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      toggle.textContent = dark ? '☀️' : '🌙';
    });
  }

  // Mobil menyu
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  var backdrop = document.getElementById('navBackdrop');
  if (navToggle && nav) {
    function openNav() { nav.classList.add('open'); navToggle.classList.add('active'); if (backdrop) backdrop.classList.add('show'); document.body.classList.add('nav-open'); document.body.style.overflow = 'hidden'; }
    function closeNav() { nav.classList.remove('open'); navToggle.classList.remove('active'); if (backdrop) backdrop.classList.remove('show'); document.body.classList.remove('nav-open'); document.body.style.overflow = ''; }
    navToggle.addEventListener('click', function() { nav.classList.contains('open') ? closeNav() : openNav(); });
    if (backdrop) backdrop.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', closeNav); });
  }

  // Header soyasi
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function() { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal animatsiya
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function(el) { io.observe(el); });
  } else {
    els.forEach(function(el) { el.classList.add('in'); });
  }

  // Birinchi render + har 30 soniyada yangilash
  selectClass('5');
  window.__betaRefresh = renderAll;
  setInterval(renderAll, 30000);
});
