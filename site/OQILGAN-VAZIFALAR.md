# 41-Maktab — tuzatilgan sayt (1-oktabr, 2026)

Bu papkadagi fayllar GitHub repodagi fayllar bilan almashtirilishi mumkin.

## Qanday o'rnatish
1. Repodagi quyidagi fayllarni shu papkadagilar bilan almashtiring:
   - css/style.css
   - js/test.js
   - js/vendor/ (yangi papka — qo'shiladi)
   - images/favicon-32.png, images/favicon-16.png, images/icon-192.png, images/icon-512.png (yangi fayllar)
   - manifest.json
   - 404.html (yangi fayl)
   - index.html, yangiliklar.html, aloqa.html, loyihalar.html, testlar.html, kutubxona.html, ai.html
2. GitHub'ga push qiling — GitHub Pages avtomatik yangilanadi.

## Nima tuzatildi

### 1. Desktop'da mobil menyu chiqadigan xato (jiddiy)
css/style.css — "Mobil UX yaxshilanishlari" blokidan ".mobile-menu-btn," qatori o'chirildi.
Avval: hamburger tugma desktop'da ham ko'rinib, bosilganda butun sahifa blurlanib qolayotgan edi.
Endi: faqat 768px gacha ekranda ko'rinadi.

### 2. Test sarlavhasidagi ikki karra emoji
js/test.js (860-qator): "test.icon + test.title" -> faqat "test.title" (sarlavhada emoji allaqachon bor).
Avval: "🔢 🔢 Matematika (5-sinf)" -> Endi: "🔢 Matematika (5-sinf)"

### 3. AI sahifasida HTML kod rang berilmaydi + konsol xatosi
ai.html — cdnjs'dan "languages/html.min.js" yuklab olinayotgan edi, lekin shu fayl CDN'da mavjud emas (404!). Konsolda "Unexpected token '<'" xatosi chiqayotgan.
Tuzatish: "js/vendor/xml.min.js" (html aliasi shu modilda) yuklab, barcha highlight.js fayllarini saytning o'ziga (js/vendor/) o'tkazdim — endi CDN bloklangan tarmoqlarda ham AI sahifasi to'liq ishlaydi.

### 4. PWA ikonkalari
- Yangi fayllar: images/icon-192.png, images/icon-512.png, images/favicon-32.png, images/favicon-16.png
- manifest.json endi haqiqiy o'lchamdagi ikonkalarni ko'rsatadi
- Barcha sahifalarda favicon endi kichik (1 KB) — avval har sahifada 711 KB logo yuklanayotgan

### 5. Meta description + Open Graph
Har 7 sahifaga qo'shildi. Endi sayt havolasi Telegram/WhatsApp'da rasm va tavsif bilan chiqadi.

### 6. Aloqa sahifasidagi ish izohlari o'chirildi
("action atributini almashtiring", "autocomplete qo'shildi" va h.k.)

### 7. Yangiliklar sahifasidagi dark mode tugmasiga aria-label qo'shildi

### 8. 404 sahifasi yaratildi
Endi mavjud bo'lmagan havola ochilsa, sayt uslubidagi "Sahifa topilmadi" sahifasi chiqadi (GitHub Pages 404.html ni avtomatik ishlatadi).


### 9. BETA VERSIYA — YANGI AVLOD DIZAYN (asosiy sayt bilan umuman boshqacha)
Beta bo'limi endi mustaqil professional dizayn tizimiga ega (asosiy saytdagi binafsha uslubdan farqli, logo rangiga mos ko'k-paletta, Manrope shrifti):

- beta/style.css — yangi dizayn tizimi (mustaqil, asosiy saytga bog'liq emas)
- beta/index.html — butunlay yangi bosh sahifa:
  - Top bar (o'quv yili + manzil)
  - Yangi professional menyu (sticky, shisha effekt, BETA 2.0 belgisi, "AI Yordamchi" CTA tugmasi, mobil drawer)
  - Hero: katta sarlavha + logo paneli + suzuvchi kartachalar + statistika (sinf/fan/bo'lim/24/7 AI)
  - "Biz haqimizda": misyon, checklist, rahbariyat (Direktor + Admin), 4 qiymat kartasi
  - "Bo'limlar": 6 ta zamonaviy karta (Yangiliklar, Jadval, Testlar, Kutubxona, AI, Aloqa)
  - "So'nggi yangiliklar": 3 ta kartacha (asosiy sayt rasmlari bilan)
  - "Roadmap": 6 ta loyiha (statuslari bilan)
  - "Aloqa": fikr formasi + kontakt tugmalari (Cloudflare Worker orqali, "BETA-VERSIYA FIKRI" belgisi)
  - Boy footer: 4 ustun (brand, tezkor havolalar, kontakt, o'quv yili) + pastki qator
- Beta'dagi "AI" havolalari to'g'ridan-to'g'ri tayyor ../ai.html ga olib boradi (ya'ni AI bo'limi qayta yozilmagan — tayyor)
- Menyu: Bosh sahifa / Biz haqimizda / Bo'limlar / Yangiliklar / Roadmap + AI CTA — keyin har bir bo'lim alohida beta sahifasiga aylantiriladi (../yangiliklar.html va h.k. o'rniga beta/yangiliklar.html bo'ladi)

## MUTLAKO QO\'LINGIZDAN CHIQUVCHI NARSA

**Jalolmirzo AI ishga tushirilmagan.** Hugging Face Space (vexnode-jalolmirzo-ai) PAUSED holatda (503).
Buni sizning HF hisobingizda qilishingiz kerak:
1. Space sahifasi -> Restart tugmasi
2. Doimiy yechim: space 48 soat faol bo'lmasa qayta to'xtaydi.
   - Variant A: Cloudflare Worker'da Cron Trigger o'rnatish — har 30 daqiqada space'ga ping yuboradi (bepul, sizda allaqachon worker bor)
   - Variant B: Node ilovani to'liq Cloudflare Worker'ga ko'chirish
   - Variant C: HF Pro tarifga o'tish

## TEKSHIRILGAN (brauzerda)

| Test | Natija |
|---|---|
| 7 sahifa + 404 — konsol xatolari | Yo'q |
| Desktop 1280px — hamburger yashirin | OK |
| Desktop — sahifa blurlanmaydi | OK |
| Mobil 390px — menyu ochiladi/yopiladi | OK |
| Test sarlavhasi — bitta emoji | OK |
| AI sahifasi — highlight.js local, html tilini tanib oladi | OK |
| Favicon va PWA ikonkalar | OK |
