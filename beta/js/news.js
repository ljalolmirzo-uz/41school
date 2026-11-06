/* ============================================================
   41-MAKTAB 2.0 — YANGILIKLAR SAHIFASI (beta/yangiliklar.html)
   Yangiliklar ro'yxati, kategoriya filtri, modal, tungi rejim,
   mobil menyu — barchasi bu faylda (asosiy sahifa bilan bir xil
   dizayn tizimida).
   ============================================================ */

var NEWS = [
  {
    id: 'ai-update',
    cat: 'texnologiya',
    catLabel: 'Texnologiya',
    dateLabel: '2-oktabr, 2026',
    title: 'Jalolmirzo AI — yangi yangilanish',
    img: '../images/news-ai.jpg',
    excerpt: 'AI yordamchi yangilandi: javoblar tezroq qaytadi, o\'zbek tili yaxshiroq tushuniladi va PRO rejim qo\'shildi.',
    full: '<p>Jalolmirzo AI yangi yangilanish bilan ishga tushdi. Endi javoblar avvalgisiga qaraganda ancha tez qaytadi va o\'zbek tilidagi savollar yaxshiroq tushuniladi.</p>' +
          '<p>Yangi <strong>PRO rejim</strong> murakkab masalalar — kod yozish, ilmiy savollar uchun mo\'ljallangan. <strong>ODDIY rejim</strong> esa kundalik savollar va uy vazifalari uchun qoladi.</p>' +
          '<p>AI yordamchi kelgusida ham rivojlantirib boriladi. Foydalanish — 100% bepul.</p>'
  },
  {
    id: 'oquv-yili',
    cat: 'talim',
    catLabel: "Ta'lim",
    dateLabel: '1-sentabr, 2026',
    title: '2026/2027 o\'quv yili boshlandi',
    img: '../images/news-school.jpg',
    excerpt: 'Yangi o\'quv yili boshlandi. Barcha o\'quvchilar va o\'qituvchilarni samimiy tabriklaymiz!',
    full: '<p>2026/2027 o\'quv yili rasman boshlandi — birinchi zanjirdan so\'ng darslar odatiy tartibda davom etmoqda.</p>' +
          '<p>Yangi o\'quv yilida darslar <strong>08:00</strong> da boshlanadi, 4-darsdan keyin <strong>11:15–11:35</strong> oralig\'ida katta tanaffus o\'tkaziladi. Haftalik dars jadvali saytimizda e\'lon qilindi.</p>' +
          '<p>Barcha o\'quvchilarga yangi o\'quv yilida muvaffaqiyatlar tilaymiz!</p>'
  },
  {
    id: 'kutubxona-kitob',
    cat: 'talim',
    catLabel: "Ta'lim",
    dateLabel: '20-sentabr, 2026',
    title: 'Kutubxona fondiga yangi kitoblar qo\'shildi',
    img: '../images/news-library.jpg',
    excerpt: 'Maktab kutubxonasiga adabiyot, fan va ixtiyoriy o\'qish uchun yangi kitoblar keldi.',
    full: '<p>Maktab kutubxonasining fondi yangi kitoblar bilan boyidi. Asosiy e\'tibor adabiyot, tabiiy fanlar va ixtiyoriy o\'qish uchun kitoblarga qaratildi.</p>' +
          '<p>Kutubxona bo\'limida Google Books orqali millionlab kitoblarni qidirish imkoniyati ham mavjud — tez orada o\'zbek kitoblari ro\'yxati kengayadi.</p>'
  },
  {
    id: 'onlayn-test',
    cat: 'texnologiya',
    catLabel: 'Texnologiya',
    dateLabel: '15-sentabr, 2026',
    title: 'Onlayn test tizimi ishga tushdi',
    img: '../images/news-quiz.jpg',
    excerpt: 'O\'quvchilar endi fanlar bo\'yicha onlayn testlarni kompyuter yoki telefonda topshirishi mumkin.',
    full: '<p>Maktabda onlayn test tizimi ishga tushdi. O\'quvchilar matematikadan ingliz tiligacha bo\'lgan fanlar bo\'yicha testlarni qulay shaklda topshirishi mumkin.</p>' +
          '<p>Test natijalari darhol ko\'rsatiladi — bu o\'quvchiga qaysi mavzuni takrorlash kerakligini tez bilishga yordam beradi.</p>'
  },
  {
    id: 'wikipedia',
    cat: 'texnologiya',
    catLabel: 'Texnologiya',
    dateLabel: '10-sentabr, 2026',
    title: 'Ma\'lumot bo\'limi — Vikipediya qidiruvi',
    img: '../images/news-wiki.jpg',
    excerpt: 'Endi o\'zbekcha va inglizcha Vikipediyadan to\'g\'ridan-to\'g\'ri tez va aniq qidiruv o\'tkazish mumkin.',
    full: '<p>Ma\'lumot bo\'limi yangi imkoniyat bilan boyidi — endi o\'zbekcha va inglizcha Vikipediyadagi maqolalarni to\'g\'ridan-to\'g\'ri saytdan qidirish mumkin.</p>' +
          '<p>Qidiruv natijasida maqola nomi, qisqacha matn va rasm ko\'rsatiladi; to\'liq maqolaga havola orqali o\'tish mumkin.</p>'
  },
  {
    id: 'ota-ona',
    cat: 'tadbir',
    catLabel: 'Tadbirot',
    dateLabel: '25-sentabr, 2026',
    title: 'Ota-ona va o\'qituvchilar uchrashuvi',
    img: '../images/news-meeting.jpg',
    excerpt: 'Sinf o\'qituvchilari bilan uchrashuvda yangi o\'quv yili rejalari muhokama qilindi.',
    full: '<p>Maktabda ota-onalar va sinf o\'qituvchilari uchrashuvi bo\'lib o\'tdi. Uchrashuvda yangi o\'quv yili rejalari, dars tartibi va o\'quvchilarga ko\'mak ko\'rsatish masalalari muhokama qilindi.</p>' +
          '<p>Ota-onalardan kelgan takliflar e\'tibor bilan tinglandi va ko\'rib chiqish uchun olib borildi.</p>'
  }
];

var currentCat = 'all';

/* ---------- Render ---------- */
function catChip(n) {
  return '<span class="np-cat cat-' + n.cat + '">' + n.catLabel + '</span>';
}

function featuredCard(n) {
  return '<article class="np-featured reveal">' +
    '<div class="np-f-img">' +
      '<img src="' + n.img + '" alt="' + n.title + '">' +
      '<span class="np-f-badge">⭐ Asosiy yangilik</span>' +
    '</div>' +
    '<div class="np-f-body">' +
      '<div class="np-meta">' + catChip(n) + '<span class="np-date">📅 ' + n.dateLabel + '</span></div>' +
      '<h2>' + n.title + '</h2>' +
      '<p>' + n.excerpt + '</p>' +
      '<button class="btn btn-primary np-open" data-id="' + n.id + '">Batafsil o\'qish →</button>' +
    '</div>' +
  '</article>';
}

function gridCard(n) {
  return '<article class="np-card reveal">' +
    '<div class="np-c-img"><img src="' + n.img + '" alt="' + n.title + '" loading="lazy"></div>' +
    '<div class="np-c-body">' +
      '<div class="np-meta">' + catChip(n) + '<span class="np-date">📅 ' + n.dateLabel + '</span></div>' +
      '<h3>' + n.title + '</h3>' +
      '<p>' + n.excerpt + '</p>' +
      '<button class="np-more" data-id="' + n.id + '">Batafsil o\'qish →</button>' +
    '</div>' +
  '</article>';
}

function filteredNews() {
  return currentCat === 'all' ? NEWS : NEWS.filter(function (n) { return n.cat === currentCat; });
}

function renderNews() {
  var wrap = document.getElementById('npLayout');
  var count = document.getElementById('npCount');
  if (!wrap) return;
  var list = filteredNews();
  var h = '';
  if (list.length) {
    h += featuredCard(list[0]);
    var rest = list.slice(1);
    if (rest.length) {
      h += '<div class="np-grid">';
      rest.forEach(function (n) { h += gridCard(n); });
      h += '</div>';
    }
  } else {
    h = '<div class="np-empty">📭 Bu kategoriyada hozircha yangilik yo\'q</div>';
  }
  wrap.innerHTML = h;
  if (count) {
    count.textContent = list.length + ' ta yangilik';
  }
  bindReveal();
}

/* ---------- Modal ---------- */
function openNewsModal(id) {
  var n = null;
  for (var i = 0; i < NEWS.length; i++) { if (NEWS[i].id === id) { n = NEWS[i]; break; } }
  if (!n) return;
  var body = document.getElementById('npModalBody');
  body.innerHTML =
    '<div class="np-m-img"><img src="' + n.img + '" alt=""></div>' +
    '<div class="np-m-body">' +
      '<div class="np-meta">' + catChip(n) + '<span class="np-date">📅 ' + n.dateLabel + '</span></div>' +
      '<h2>' + n.title + '</h2>' +
      '<div class="np-m-text">' + n.full + '</div>' +
    '</div>';
  var modal = document.getElementById('npModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);
}

function closeNewsModal() {
  var modal = document.getElementById('npModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ---------- Reveal animatsiya ---------- */
var revealObserver = null;
function bindReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { revealObserver.observe(el); });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // Yangiliklarni render qilish
  renderNews();

  // Kategoriya filtri
  var chips = document.querySelectorAll('.np-chip');
  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      ch.classList.add('active');
      currentCat = ch.getAttribute('data-cat');
      renderNews();
      // Yangi kontentga silliqlik uchun ozgina pastga
      var top = document.getElementById('npToolbar');
      if (top) {
        var y = top.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // "Batafsil" tugmalari (delegatsiya)
  document.getElementById('npLayout').addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-id]') : null;
    if (btn) openNewsModal(btn.getAttribute('data-id'));
  });

  // Modal yopish
  var modal = document.getElementById('npModal');
  if (modal) {
    modal.querySelectorAll('[data-np-close]').forEach(function (el) {
      el.addEventListener('click', closeNewsModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNewsModal();
    });
  }

  // Tungi rejim (asosiy sayt bilan bir xil kalit)
  var toggle = document.getElementById('darkToggle');
  if (toggle) {
    function applyTheme() {
      var dark = localStorage.getItem('theme') === 'dark';
      document.body.classList.toggle('dark', dark);
      toggle.textContent = dark ? '☀️' : '🌙';
    }
    applyTheme();
    toggle.addEventListener('click', function () {
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
    function openNav() {
      nav.classList.add('open');
      navToggle.classList.add('active');
      if (backdrop) backdrop.classList.add('show');
      document.body.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
      if (backdrop) backdrop.classList.remove('show');
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', function () {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
    if (backdrop) backdrop.addEventListener('click', closeNav);
  }

  // Header scroll soyasi
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  bindReveal();
});
