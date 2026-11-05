/* ============================================================
   41-MAKTAB 2.0 — UMUMIY PROFIL BELGISI (auth-ui.js)
   Sarlavhada (o'ng tepada) kirilgan profilning belgisini chiqaradi.
   RT dvigateli yuklanmagan sahifalarda ham ishlaydi — to'g'ridan-to'g'ri
   localStorage kalitlari bilan ishlaydi. Faqat beta/ sahifalariga ulanadi.
   ============================================================ */
(function () {
  'use strict';

  var KP = 'rt_profiles', KR = 'rt_results', KS = 'rt_session';

  function read(k) {
    try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; }
  }
  function currentProfile() {
    var id = read(KS);
    if (!id) return null;
    var profs = read(KP) || [];
    for (var i = 0; i < profs.length; i++) if (profs[i].id === id) return profs[i];
    return null;
  }
  function profileBall(pid) {
    var t = 0;
    (read(KR) || []).forEach(function (r) { if (r.pid === pid) t += (r.ball || 0); });
    return t;
  }

  function injectStyles() {
    if (document.getElementById('authUiStyles')) return;
    var css = ''
      + '.aui-badge{position:relative;flex:none;width:42px;height:42px;border-radius:13px;border:none;cursor:pointer;'
      + 'background:linear-gradient(135deg,#4f7cff,#6d5cff);color:#fff;font:800 17px Manrope,sans-serif;'
      + 'display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(79,124,255,.35);'
      + 'border:2px solid rgba(245,184,61,.75);transition:transform .2s ease,box-shadow .2s ease;padding:0;}'
      + '.aui-badge:hover{transform:translateY(-1px);box-shadow:0 9px 22px rgba(79,124,255,.5);}'
      + '.aui-badge::after{content:"";position:absolute;right:-2px;bottom:-2px;width:12px;height:12px;border-radius:50%;'
      + 'background:#34d399;border:2.5px solid var(--bg,#fff);}'
      + '.aui-menu{position:absolute;top:calc(100% + 10px);right:0;width:262px;z-index:1200;'
      + 'background:linear-gradient(165deg,#131d34,#0d1426);border:1px solid rgba(148,163,184,.22);'
      + 'border-radius:18px;padding:10px;box-shadow:0 26px 64px rgba(0,0,0,.55);'
      + 'opacity:0;visibility:hidden;transform:translateY(-6px) scale(.98);transform-origin:top right;'
      + 'transition:opacity .18s ease,transform .18s ease,visibility .18s;}'
      + '.aui-menu.open{opacity:1;visibility:visible;transform:none;}'
      + '.aui-head{display:flex;align-items:center;gap:11px;padding:10px 10px 12px;border-bottom:1px solid rgba(148,163,184,.13);margin-bottom:8px;}'
      + '.aui-av{width:46px;height:46px;border-radius:14px;flex:none;display:flex;align-items:center;justify-content:center;'
      + 'background:linear-gradient(135deg,#4f7cff,#6d5cff);color:#fff;font:800 18px Manrope,sans-serif;}'
      + '.aui-name{color:#fff;font:800 14.5px Manrope,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
      + '.aui-meta{color:#8b98b0;font:600 12px Manrope,sans-serif;margin-top:2px;}'
      + '.aui-ball{display:flex;align-items:center;gap:7px;margin:4px 10px 10px;padding:9px 12px;border-radius:12px;'
      + 'background:rgba(245,184,61,.1);border:1px solid rgba(245,184,61,.28);color:#f3cf8d;font:800 13px Manrope,sans-serif;}'
      + '.aui-link{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:transparent;border:none;cursor:pointer;'
      + 'color:#c6d0e4;font:700 13.5px Manrope,sans-serif;padding:10px 12px;border-radius:11px;transition:background .15s,color .15s;}'
      + '.aui-link:hover{background:rgba(79,124,255,.15);color:#fff;}'
      + '.aui-link svg{flex:none;color:#8b98b0;}'
      + '.aui-sep{height:1px;background:rgba(148,163,184,.13);margin:7px 4px;}'
      + '.aui-logout{color:#fca5a5!important;}'
      + '.aui-logout svg{color:#f87171!important;}'
      + '.aui-cta{flex:none;display:flex;align-items:center;gap:7px;height:40px;padding:0 15px;border-radius:12px;'
      + 'border:2px solid rgba(245,184,61,.75);cursor:pointer;background:linear-gradient(135deg,#4f7cff,#6d5cff);'
      + 'color:#fff;font:800 13px Manrope,sans-serif;box-shadow:0 6px 16px rgba(79,124,255,.3);'
      + 'transition:transform .2s ease,box-shadow .2s ease;white-space:nowrap;}'
      + '.aui-cta:hover{transform:translateY(-1px);box-shadow:0 9px 22px rgba(79,124,255,.45);}'
      + '.aui-auth-btns{display:flex;gap:8px;align-items:center;}'
      + '.aui-cta.ghost{background:rgba(15,23,42,.06);border-color:rgba(148,163,184,.5);color:var(--ink,#0f172a);box-shadow:none;}'
      + 'body.dark .aui-cta.ghost{background:rgba(255,255,255,.08);border-color:rgba(148,163,184,.4);color:#e2e8f0;}'
      + '.aui-cta.pulse{animation:auiPulse 1s ease infinite;}'
      + '@keyframes auiPulse{0%,100%{box-shadow:0 6px 16px rgba(79,124,255,.3);}50%{box-shadow:0 0 0 7px rgba(245,184,61,.35);transform:translateY(-1px);}}'
      + '@media(max-width:640px){.aui-badge{width:40px;height:40px;border-radius:12px;font-size:16px;}.aui-menu{position:fixed;top:64px;right:12px;left:12px;width:auto;}.aui-cta{height:38px;padding:0 11px;font-size:12px;}}';
    var st = document.createElement('style');
    st.id = 'authUiStyles';
    st.textContent = css;
    document.head.appendChild(st);
  }

  var ICONS = {
    trophy: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></svg>',
    test: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></svg>',
    out: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
    ball: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>'
  };

  function mount() {
    var p = currentProfile();
    var actions = document.querySelector('.header-actions');
    if (!actions) return;
    var old = document.getElementById('authUi');
    if (old) old.remove();
    injectStyles();
    var wrap = document.createElement('div');
    wrap.id = 'authUi';
    wrap.style.cssText = 'position:relative;';
    if (!p) {
      /* Kirilmagan — FAQAT testlar va reyting sahifalarida bitta "Kirish" tugmasi.
         Ichida kirish ham, ro'yxatdan o'tish ham (tablar) bor. Boshqa sahifalarda umuman yo'q. */
      var authPage = /testlar\.html$|reyting\.html$/.test(location.pathname);
      if (!authPage) { return; }
      wrap.innerHTML = '<button type="button" class="aui-cta" id="auiLoginCta">🔑 Kirish</button>';
      actions.insertBefore(wrap, actions.firstChild);
      wrap.querySelector('#auiLoginCta').addEventListener('click', function () {
        if (document.getElementById('sAuth')) {
          /* testlar sahifasida — to'g'ridan-to'g'ri auth ekrani (ichida ikkala tab) */
          document.dispatchEvent(new CustomEvent('aui:open-login'));
          var scr = document.getElementById('sAuth');
          if (scr && scr.scrollIntoView) scr.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          /* reyting sahifasida — testlar bo'limiga o'tish (kirish/ro'yxatdan o'tish u yerda) */
          location.href = 'testlar.html?login=1';
        }
      });
      return;
    }
    var ball = profileBall(p.id);
    var rankName = (function () {
      var b = ball, r = { name: 'Yangi' };
      var RANKS = [['Bronza', 50], ['Kumush', 150], ['Oltin', 400], ['Platina', 800], ['Master', 1500]];
      RANKS.forEach(function (x) { if (b >= x[1]) r = { name: x[0] }; });
      return r.name;
    })();

    wrap.innerHTML =
      '<button type="button" class="aui-badge" id="auiBtn" aria-haspopup="true" aria-expanded="false" aria-label="Profil menyusi">' +
      esc(p.name.charAt(0).toUpperCase()) + '</button>' +
      '<div class="aui-menu" id="auiMenu" role="menu">' +
        '<div class="aui-head"><div class="aui-av">' + esc(p.name.charAt(0).toUpperCase()) + '</div>' +
        '<div style="min-width:0"><div class="aui-name">' + esc(p.name + ' ' + p.surname) + '</div>' +
        '<div class="aui-meta">' + esc(p.klass) + ' sinf · ' + esc(rankName) + '</div></div></div>' +
        '<div class="aui-ball">' + ICONS.ball + '<span>' + ball + ' ball</span></div>' +
        '<a class="aui-link" href="reyting.html">' + ICONS.trophy + '<span>Reyting</span></a>' +
        '<a class="aui-link" href="testlar.html">' + ICONS.test + '<span>Testlar</span></a>' +
        '<div class="aui-sep"></div>' +
        '<button type="button" class="aui-link aui-logout" id="auiLogout">' + ICONS.out + '<span>Chiqish</span></button>' +
      '</div>';
    actions.insertBefore(wrap, actions.firstChild);

    var btn = wrap.querySelector('#auiBtn'), menu = wrap.querySelector('#auiMenu');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
    wrap.querySelector('#auiLogout').addEventListener('click', function () {
      /* Xavfsizlik: hisobdan chiqish faqat tasdiqdan so'ng */
      if (!confirm('Hisobdan chiqilsinmi? Keyin qayta kirishingiz kerak bo\'ladi.')) return;
      try { localStorage.removeItem(KS); } catch (e) { }
      location.reload();
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Sessiya o'zgarishini kuzatish: login/logout da badge darhol yangilanadi.
     lastId undefined — dastlabki tick har doim mount qilsin (kirilmagan holatda CTA chiqishi uchun) */
  var lastId;
  function tick() {
    var p = currentProfile();
    var id = p ? p.id : null;
    if (id !== lastId) { lastId = id; mount(); }
  }
  document.addEventListener('authui:refresh', tick);
  document.addEventListener('visibilitychange', tick);
  window.addEventListener('focus', tick);
  setInterval(tick, 1000);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick);
  else tick();
})();
