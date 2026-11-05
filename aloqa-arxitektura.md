# ALOQA BO'LIMI ARXITEKTURASI (M0 — kod yozmasdan oldingi loyiha)

> Sana: 2026-11-03 · Beta sayt uchun · Kod yozish shu hujjat kelishilgandan keyin

---

## 1. Hozirgi holat (aniqlangan)

| Element | Holat |
|---|---|
| `beta/index.html` modul kartochkasi "Aloqa" | `../aloqa.html` — **ESKI sayt sahifasi** (beta dizaynida emas) |
| `beta/info.html` `#aloqa` bo'limi | "Yangi dizayndagi aloqa sahifasi" deb va'da qiladi + fikr formasi bor |
| Backend | **Cloudflare Worker** `contact-form.jalolmirzo44.workers.dev` (POST) — eski aloqa.html va info.html formalar undan foydalanadi |
| Worker source kodi | **Repo'da yo'q** (faqat CF dashboard'da) — yo'qolish xavfi |
| Root `site/aloqa.html` | Telefon/email/Telegram/manzil + xarita iframe + xabar formasi (eski dizayn) |

**Xulosa:** backend allaqachon ishlaydi, lekin uni boshqarish (CORS, spam, format) uchun source'ini o'z nazoratimizga olish shart.

---

## 2. Maqsad

Beta uchun **yangi `beta/aloqa.html` sahifasi**: bir xil dizayn tili (dark/gold, card, reveal), mobil moslashgan, ishonchli xabar oqimi, bitta admin inbox.

---

## 3. UI qatlami (sahifa tuzilishi)

```
beta/aloqa.html
├── Sarlavha + qisqa intro
├── Kontakt kartochkalari (4 ta, responsive grid)
│     📞 Telefon      → tel:+998...
│     📧 Email        → mailto:info@41maktab.uz
│     💬 Telegram bot → t.me/maktabJalolmirzo_bot
│     📍 Manzil       → Bag'dod tumani, Farg'ona vil.
├── Ish vaqti bloki (Dushanba–Shanba, boshlanish, tanaffuslar — footer bilan bir xil manba)
├── Xabar formasi (asosiy)
│     Ism* · Email/Telefon* · Xabar* → "Yuborish"
│     holatlar: bosh → yuklanmoqda → muvaffaqiyat / xato
├── Xarita (OpenStreetMap iframe — Google Maps O'zbekistonda ishonchsiz)
└── Tezkor fallback: "Tez javob kerakmi? Telegram botga yozing"
```

**Qayta ishlatiladigan komponentlar** (style.css ichida):
- `.contact-card` — ikona + sarlavha + qiymat + harakat
- `.fb-form` — info.html'dagi klass bilan **BIR XIL** (mavjud CSS + Worker action)
- `.form-status` — success/xato banneri

---

## 4. Transport arxitekturasi (backend qatlam)

```
[Brauzer: forma] ── classic POST (CORS'siz) ──► [Cloudflare Worker: contact-form]
                                                        │
                        ┌───────────────────────────────┼──────────────────────┐
                        ▼                               ▼                      ▼
              [Telegram bot → admin chat]     [CF KV: oxirgi N xabar]   [email fallback?]
                 asosiy inbox (jonli)          zaxira + statistika      (ixtiyoriy)
```

**Tavsiya:** mavjud Worker'ni SAQLASH — bitta inbox, bepul, "pause" bo'lmaydi (TUZATISHLAR.md xulosasi bilan bir xil yo'nalish).

### Worker source'ini repo'ga ko'chirish (M1)
```
zaxira/workers/contact-form/
├── worker.js        ← CF panelidan nusxa
└── wrangler.toml    ← konfiguratsiya
```
Deploy: `wrangler deploy` (CF token bilan) — keyin o'zgarishlar versiya nazoratida.

### Xabar modeli (kirish)
| Maydon | Majburiy | Izoh |
|---|---|---|
| `name` | ✓ | ism |
| `contact` | ✓ | email YOKI telefon (bittasi yetarli) |
| `message` | ✓ | matn (max ~2000 belgi) |
| `source` | ✓ | formaning manbasi: `ALOQA-SAHIFA`, `BETA-FIKR`… |
| `page` | – | sahifa URL (diagnostika) |
| *(worker)* `ts`, `ip`, `ua` | – | server tomonida qo'shiladi |

### Admin ko'rinishi (Telegram formati)
```
📩 [ALOQA-SAHIFA] Aziza · +99890... · 2026-11-03 15:40
Matn: ...
```

---

## 5. Xavfsizlik va spam qarshi choralar

1. **Honeypot** — yashirin maydon (botlar to'ldiradi → Worker tashlaydi)
2. **Minimal submit vaqti** — forma ochilgandan <2s = shubha
3. **Rate-limit** — Worker + KV: bir IP'dan ≤5 xabar/soat
4. **Escape** — Worker Telegram'ga yuborishda matnni escape qiladi (HTML injection yo'q)
5. *(ixtiyoriy, M4)* **Cloudflare Turnstile** — bepul, puzzle, captcha'siz UX. Hozircha shart emas:1-3 yetarli deb hisoblaymiz

---

## 6. UX oqimi

```
foydalanuvchi yuboradi
  → client validatsiya (bo'sh maydon, uzunlik)
  → tugma "Yuborish…" (disable)
  → POST Worker
      ├─ 200 → ✅ "Xabaringiz yuborildi!" + forma tozalanadi
      └─ xato/timeout → ❌ "Yuborilmadi" + Qayta urinish + Telegram fallback havolasi
```
- Avtomatik retry **yo'q** (takroriy xabar xavfi) — qo'lda qayta urinish
- Anti-copy guard formaga **ta'sir qilmasin**: input/textarea'da nusxalash ochiq qoladi (M3 da tekshiriladi)
- Dark mode, reveal animatsiya, mobil — mavjud style.css tizimi ichida

---

## 7. Integratsiya (sayt ichidagi bog'lanishlar)

| Joy | O'zgarish |
|---|---|
| `beta/index.html` kartochka "Aloqa" | `../aloqa.html` → `beta/aloqa.html` |
| `beta/info.html` `#aloqa` bo'limi | havola → `beta/aloqa.html` (matn qoladi) |
| Header dropdown + "Bo'limlar" menyusi | Aloqa qo'shiladi — **tartibni siz tanlaysiz** (Yangiliklar2-da qoladi) |
| Footer "Kontakt" ustuni | bir xil ma'lumotlar (DRY — bir xil manbadan) |

---

## 8. Ishlab chiqish bosqichlari (keyin — kod)

| Bosqich | Ish | Natija |
|---|---|---|
| **M0** | Arxitekturani kelishish | ← shu hujjat |
| **M1** | Worker source'ini ko'chirish + CORS/rate-limit/escape | CF'da ishonchli backend |
| **M2** | `beta/aloqa.html` + CSS + `?v=` bump | sahifa ko'rinishi |
| **M3** | Form integratsiya + success/xato + fallback | to'liq oqim |
| **M4** | Xarita + menyu + tekshiruv (skrinshot + 149 test) | ishga tushirish |

---

## 9. QABUL QILINGAN QARARLAR (2026-11-03)

| # | Savol | Qarar |
|---|---|---|
| 1 | Worker xabari qayerga tushadi? | **EMAIL → `jalolmirzo44@gmail.com`** (reja: hali ulanmagan — M1 da amalga oshiramiz) |
| 2 | Sahifa turu | **Alohida sahifa** `beta/aloqa.html` ✓ |
| 3 | Xarita | **OpenStreetMap iframe** ✓ |
| 4 | Menyu tartibi | **Testlar/Reytingdan keyin** (Yangiliklar2-da qoladi) ✓ |

**Bog'liqlik:** M1 (worker + email yo'li) → M2 (sahifa) → M3 (form) → M4 (xarita+menyu+tekshiruv).

---

## 10. EMAIL YETKAZISH VARIANTLARI (M1 uchun — rejalashtirish)

> **Muhim texnik haqiqat:** Cloudflare Worker ichida to'g'ridan-to'g'ri SMTP yo'q —
> Worker Gmail'ga "o'zidan" yubora olmaydi. Orada **email yetkazuvchi xizmat** turishi shart.

| | Variant | Bepul limit | Qo'shimcha | Izoh |
|---|---|---|---|---|
| **A** ⭐ | **Worker → Resend API → Gmail** | 3 000/oy | Resend akkaunt + domain DNS (SPF/DKIM) | Eng ishonchli; spamga tushmaydi; `41maktab.uz` bo'lsa DNS yozuvlarini qo'shamiz |
| **B** | **Worker → Brevo API → Gmail** | 300/kun | Akkaunt (karta shart emas) | Yengilroq boshlash, Gmail'ga yaxshi yetadi |
| **C** ✅ | **Vaqtinchalik: FormSubmit → Gmail** (worker'siz) | ~200/oy bepul | Birinchi xabardan keyin gmail'da aktivatsiya bosish | **AMALDA TANLANDI va qurildi** (2026-11-04): `formsubmit.co/ajax/jalolmirzo44@gmail.com`, kalitsiz |

**Tavsiya (amalda bajarildi):** **C (FormSubmit) bilan ishga tushirildi** — M1 kutilmadi, Worker hozircha kerak emas.

**Keyingi qadam (M1, ixtiyoriy):** `41maktab.uz` domeni bo'lsa → Resend+DNS (A variant) ga o'tish; domen bo'lmasa FormSubmit bepul limitida davom etish.

**Variant A uchun kerak bo'ladiganlar (sizdan):**
1. `41maktab.uz` domeni bormi va boshqaruv paneliga (DNS) kirish bormi? — bo'lmasa Resend'ning test manzili bilan boshlaymiz (limitli, lekin ishlaydi)
2. Resend akkaunt (email bilan ro'yxatdan o'tish) — kalitni menga bermang, M1 da birga sozlaymiz
