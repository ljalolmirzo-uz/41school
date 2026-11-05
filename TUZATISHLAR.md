# 41school.github.io — Tekshiruv hisoboti (1-oktabr, 2026)

## 🔴 KRITIK — AI bot botirayotgan xato

**Muammo:** Barcha AI suhbatlari "❌ Hozircha javob bera olmadim. Qayta urinib ko'ring." deb chiqmoqda.

**Sabab:** Backend — Hugging Face Space (`https://vexnode-jalolmirzo-ai.hf.space`) — **PAUSED** holatda.
Tekshiruv natijasi:
```
HTTP 503
"The space is paused, ask a maintainer to restart it"
```
HF Free Space'lari 48 soat faol bo'lmasa avtomatik to'xtaydi.

**Tuzatish (ixtiyoriy variantlar):**
1. HF dashboard → Space → **Restart** tugmasini bosish (vaqtincha).
2. Space sozlamalaridan **auto-restart** yo'q, shuning uchun yaxshirogi: Space ga muntazam so'rov yuboradigan cron qo'yish (masalan, har 20 daqiqada bir ping) yoki Space ni "Always on" ga o'tkazish (payli).
3. Eng bardoshli yechim: Node ilovani **Cloudflare Worker** ga ko'chirish — sizda allaqachon `contact-form.jalolmirzo44.workers.dev` bor, xuddi shu usulda `ai.jalolmirzo44.workers.dev` ochiladi va `ai.html` undan murojaat qiladi. Worker hech qachon "pause" bo'lmaydi.

**Muhim:** Yangiliklar sahifasida AI haqida katta maqola e'lon qilingan, lekin u ishlamayapti — o'quvchilar har safar xato ko'rishadi.

---

## 🟡 BUG — Test sarlavhasida ikki karra emoji

**Joy:** `js/test.js`, 860-qator
**Hozirgi kod:**
```js
document.getElementById('test-title').innerHTML = `${test.icon} ${test.title}`;
```
**Natija:** "🔢 🔢 Matematika (5-sinf)" (chunki `title` ichida allaqachon emoji bor: `'🔢 Matematika (5-sinf)'`)

**Tuzatilgan kod:**
```js
document.getElementById('test-title').textContent = test.title;
```

---

## 🟡 MA'LUMOT — 10-A sinf jadvalida "Shanba" yo'q

**Joy:** `js/main.js`, `schedules['10a']`
Barcha sinflarda 6 kunlik jadval bor, faqat **10-A** da 5 kun (Dushanba–Juma).
Agar 10-A da shanba darslari bo'lmasa — hech narsa qilish shart emas. Agar bo'lsa — `10a` massiviga Shanba qatorini qo'shish kerak.

---

## 🟠 KIÇIK MASALALAR

### 1. PWA manifest noto'g'ri ikonka o'lchamlarini aytyapti
`manifest.json` da logo.png uchun `192x192` va `512x512` deb yozilgan, lekin haqiqiy fayl **1024×1024, 711 KB**.
**Yechim:** alohida `images/icon-192.png` va `images/icon-512.png` fayllarini yasab qo'yish:
```json
"icons": [
  { "src": "images/icon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "images/icon-512.png", "sizes": "512x512", "type": "image/png" }
]
```
Aks holda "Ilokada saqlash" (Add to Home Screen) funktsiyasi ba'zi telefonlarda ishlamaydi.

### 2. 711 KB logotip har sahifada yuklanmoqda
`images/logo.png` (711 KB) favicon va header rasmi sifatida **har bir sahifada** yuklanadi.
**Yechim:** favicon uchun kichik `favicon-32.png` (32×32) yasash va `<link rel="icon" href="favicon-32.png">` qilish. Logo 711 KB → ~100 KB gacha siqilishi mumkin (vaqt o'tib, tashqaridagi xizmatda).

### 3. Meta description va Open Graph teglari yo'q
Hozir sayt havolasi Telegram/WhatsApp'da paydalanganda rasm va tavsif ko'rinmaydi (faqat havola). Loyihada Telegram kanali orqali tanitilgani uchun bu muhim.
Har bir sahifa `<head>` ini boshiga qo'shish:
```html
<meta name="description" content="41-Maktab — Farg'ona viloyati, Bag'dod tumani. Yangiliklar, dars jadvali, testlar va Jalolmirzo AI.">
<meta property="og:title" content="41-Maktab — Bilim kelajak kaliti">
<meta property="og:description" content="Zamonaviy ta'lim, innovatsion yondashuv va yorqin kelajak sari!">
<meta property="og:image" content="https://41school.github.io/images/logo.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://41school.github.io/">
```

### 4. `aloqa.html` da ish jarayonidagi izohlar qolgan
Masalan:
- `<!-- 'action' atributini serverdagi formani qabul qiluvchi URL bilan almashtiring -->`
- `<!-- autocomplete qo'shildi -->`, `<!-- tel: sxemasi qo'shildi -->`, `<!-- rel qo'shildi -->`

Bu funksiyaga zarar bermaydi, lekin kod ichida ishonchsiz ko'rinadi — o'chirib tashlash kerak.

### 5. `yangiliklar.html` da dark mode tugmasida `aria-label` yo'q
Boshqa barcha sahifalarda `aria-label="Qorong'u rejim"` bor, faqat bu yerda yo'q. Qo'shish:
```html
<button id="dark-mode-toggle" class="dark-btn" aria-label="Qorong'u rejim">🌙</button>
```

### 6. `ai.html` CDN'ga bog'liq
`ai.html` highlight.js kutubxonasini `cdnjs.cloudflare.com` dan yuklaydi. Agar maktab tarmog'ida CDN bloklangan bo'lsa, kod rang berilmaydi (chat o'zi ishlayveradi, lekin kod namunalarini o'qish qiyin bo'ladi). Ishonch uchun highlight.js fayllarini saytga joylab (`js/vendor/`), shu yo'l bilan yuklash mumkin.

### 7. O'z 404 sahifasi yo'q
Yozuv xatosi bilan ochilgan sahifa GitHub Pages'nin standart (inglizcha) 404'ini ko'rsatadi. `404.html` fayli qo'shish kifoya.

---

## ✅ ISHLAYAPTI (tekshirilgan)

| Bo'lim | Holat |
|---|---|
| 7 ta sahifaning barchasi (200 OK) | ✅ |
| Konsolda JS xatolar (page load) | ✅ yo'q |
| Dars jadvali — sinf almashtirish (5 → 10a, 9b) | ✅ ishlaydi |
| Test tizimi — fan tanlash → ism formasi → test → taymer | ✅ ishlaydi |
| Dark mode (qorong'u rejim) | ✅ ishlaydi, eslab qoladi |
| Mobil menyu (390px ekranda) | ✅ ishlaydi |
| Aloqa formasi — test xabari yuborildi: "Xabaringiz muvaffaqiyatli yuborildi!" | ✅ ishlaydi |
| Telegram bot havolasi (@maktabJalolmirzo_bot) | ✅ ochiladi |
| Google Maps xaritasi | ✅ joylashadi |
| Rasmlar (logo, yangiliklar, loyihalar) | ✅ barchasi joyida |
