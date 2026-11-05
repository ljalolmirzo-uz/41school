# Savollar bazasi — hisobot

Yangilangan: 2026-10-19 · 1-bosqich (5–7 Matematika) + 2-bosqich (8–10 Algebra/Geometriya) + **Tillar (5–10)** tugadi

## Umumiy tuzilma

- **5–7 sinf:** Matematika = **100% skript** (har topshirishda yangi sonlar). 14 + 13 + 13 = 40 tur.
- **8–10 sinf:** Algebra + Geometriya = **100% skript**. 11 + 11 + 11 + 11 + 11 + 10 = 65 tur + **60 ta nazariya savoli** (har testda 2 tasi).
- Har test = 10 savol (generator 8 + nazariya 2, 8–10 da).
- **Ona tili 📖 + Ingliz tili 🌍 (5–10 sinf)** — statik bank: **607 savol** (har testda bankdan 10 tasodifiy, takrorlanmaydi).
- Katta test — eski statik baza (o'zgarishsiz).

## 5–7 sinf Matematika (1-bosqich)

| Sinf | Turlar | Variantlar soni (taxminan) |
|---|---|---|
| 5 | 14 | **~27,2 mlrd** |
| 6 | 13 | ~2 540 |
| 7 | 13 | ~4 400 |

5-sinfni `div3` turi boshqaradi: C(900,4) ≈ 27,16 mlrd.

## 8-sinf — Algebra (11 tur)

| Tur | Varianta |
|---|---|
| exp1 · exp2 (daraja xossalari) | 480 + 1 200 |
| sqrt1 · sqrt2 (kvadrat ildiz) | 81 + ~100 |
| quadRoots · quadD · vieta · quadSolve (kvadrat tenglama) | ~280 × 4 |
| fracSimpl (ifoda soddalashtirish) | 495 |
| invProp · numSeq | 28 + 56 |
| **Jami** | **~1 890** |

## 9-sinf — Algebra (11 tur)

| Tur | Varianta |
|---|---|
| arithN · arithS (arifmetik progressiya) | 594 + 594 |
| geoN · geoS (geometrik progressiya) | 165 + 165 |
| expVal · expEq (eksponensial) | 100 + 45 |
| logVal · logSum · logDiff (logarifm) | 25 + 32 + 32 |
| trigVal · trigId (trig) | 13 + 3 |
| **Jami** | **~1 665** |

## 10-sinf — Algebra (11 tur)

| Tur | Varianta |
|---|---|
| logSolve · expSolve · logMix (tenglamalar) | 3 + 4 + 4 |
| trigPeriod · trigAmp · trigRange (y = a·f(bx)) | 4 + 18 + 18 |
| trigEq · domainSqrt · rangeSq (tenglama, soha) | 1 + 1 + 1 |
| absEq (|x − a| = b) | 14 |
| fnMono (o'sish/kamayish) | 3 |
| **Jami** | **~68** |

## 8-sinf — Geometriya (11 tur)

| Tur | Varianta |
|---|---|
| trapArea · rhombusArea · parArea (yuzalar) | 2 880 + 400 + 500 |
| circleC · circleS · inscribed (aylana) | 9 + 9 + 9 |
| simSide · simPer · simArea (o'xshash uchburchaklar) | 200 + 25 + 25 |
| quadAngles · extAngle (burchaklar) | 25 + 64 |
| **Jami** | **~4 137** |

## 9-sinf — Geometriya (11 tur)

| Tur | Varianta |
|---|---|
| rtgHyp · rtgKatet · rtgAngles (Pifagor) | 30 + 30 + 30 |
| trigSin · trigTg | 30 + 30 |
| vecLen · vecAdd · vecDot (vektorlar) | 25 + 25 + 25 |
| coordDist · midpoint (koordinatalar) | 25 + 25 |
| regPer (muntazam ko'pburchak) | 4 |
| **Jami** | **~279** |

## 10-sinf — Geometriya (10 tur)

| Tur | Varianta |
|---|---|
| cubeV · cubeS · cubeDiag (kub) | 8 + 8 + 8 |
| cuboidV (to'rt qirrali prism) | 216 |
| cylV · cylSA (silindir) | 40 + 40 |
| coneV (kon) | 40 |
| sphereV (shar) | 8 |
| pyramidV (piramida) | 75 |
| spaceDist (A(3;4;12)↔B(8;11;37) kabi) | 5 |
| **Jami** | **~448** |

## Nazariya banki (8–10)

| Bank | Savollar |
|---|---|
| TH_A8, TH_G8, TH_A9, TH_G9, TH_A10, TH_G10 | 10 × 6 = **60** |

Har testda 2 tasidan tasodifiy tanlanadi → 60×59×2 talaqiy joylash.

## Yakuniy raqam (8–10 sinf)

| Fan | Turlar varianti | × C(turlar, 8) | Taxminan |
|---|---|---|---|
| Algebra 8 | ~1 890 | ×165 | **~310 000** |
| Algebra 9 | ~1 665 | ×165 | ~275 000 |
| Algebra 10 | ~68 | ×165 | ~11 000 |
| Geometriya 8 | ~4 137 | ×165 | **~680 000** |
| Geometriya 9 | ~279 | ×165 | ~46 000 |
| Geometriya 10 | ~448 | ×45 | ~20 000 |

**8–10 sinf jami ≈ 1,35 mln** alohida savollar to'plami (har biriga topshirishda boshqa sonlar + 60 nazariya kombinatsiyasi) — amaliyotda **cheksiz**.

## Tekshiruvlar (2026-10-19)

- Node: 8 000 test struktura tekshiruvi — 0 xato
- Node: 12 turi × 3 000 savol hisob tekshiruvi (kvadrat tenglama ildizlari, Viet, progressiyalar, logarifmlar, Pythagor, vektorlar, hajmlar) — 0 xato
- Brauzer E2E: 8a Algebra oqim (30:00, "➗ Algebra (8-sinf)"), 9a Geometriya, 10a Algebra, diversifikatsiya, 0 pageerror
- Nazariya: har testda aniq 2 ta (6 kombinatsiya × 100 test = 1 200/1 200)

## Rejalashtirilgan

- **Tillar banki (Ona tili + Ingliz tili) — 2026-10-19 TUGADI: 607 savol**
  - Ingliz tili (303): 5-sinf=52, 6=50, 7=50, 8=50, 9=51, 10=50 — grammatika saralangan (5: alifbo/hayvonlar, 6: present, 7: past, 8: perfect + 1-cond, 9: 3-cond + gerund, 10: mixed)
  - Ona tili (304): 5=50, 6=53, 7=51, 8=50 (o'rta asr: Navoiy, Nizomiy, Qutadg'u bilig), 9=50 (Jadidlar: Dehlaviy, Cholpon, Qodiriy, Ayniy), 10=50 (tarix + nazariya)
  - Manba: **214 generatsiya** (OmniRouter `agy/gemini-3-flash`, user Kali noutbuqi: ingliz 5–9) + **393 qo'lda yozilgan** (agent, 8 batch: manual-batch-1..8.jsonl)
  - Sifat: barcha batchlar validatsiya qilingan — 0 format xato, 0 takror, kyirillik yo'q. Filtrlash: ingliz 5–9 bankiga aralashgan 5 o'zbekcha savol olib tashlandi, 1 dubl o'chirildi
  - Fayllar: `41school/lang-gen/lang-bank-final.json` → `site/beta/js/testgen.js` (LANG_BANK, 64 KB)
  - Tasdiq: node — 3,600 generatsiya (12 kombinatsiya × 300) = 0 xato; Playwright E2E (5-sinf, 8a Ingliz to'liq oqim, 10a Ona tili, diversifikatsiya) = 0 pageerror
  - Dastur: `lang-gen/omni-lang-gen.js` (noutbukda ishlaydi, localhost:20128), sinov: `lang-gen/omni-model-test.js`
  - Zaxira dasturlari: `lang-gen/omni-lang-gen.js` (noutbukda, localhost:20128), `lang-gen/omni-model-test.js` — kerak bo'lsa qo'shimcha savol uchun
- Nazariya bankini kengaytirish (60 → 30–40 savol/sinf)
- Reyting sahifasi (localStorage schema tayyor)

---

## 4-bosqich: REYTING (2026-10-20 — UI tayyor, server ulash keyin)

- **Sahifa:** `site/beta/reyting.html` · **Muhar:** `site/beta/js/reyting.js` (window.RT — keyin Worker + D1'ga o'tkaziladigan xuddi shu kod)
- **Profil:** ism + familiya + sinf + A/B + 4 xonali PIN (bir martalik); testlarda ism bo'yicha avtomatik topiladi
- **Ball tizimi (yakuniy):** 1 to'g'ri javob = savol qiymati (5–7=1, 8=2, 9=3, 10=4); **savol balli o'quvchi uchun faqat BIR MARTA hisoblanadi** (oldin yechilgan = 0); 1 kun / 1 fan = 3 test
- **Darajalar:** 🥉 50 · 🥈 150 · 🥇 400 · 💎 800 · 👑 1500
- **Reyting qatlamlari:** maktab / sinf / fan + davr (hafta/oy/umumiy) + o'sish strelkalari (▲/▼) + podium top-3
- **Yutuqlar:** 7 ta (birinchi test, 10/10, 7-kun streak, 5 fan, 500 ball, sinf top-3, Master)
- **O'qituvchi rejimi** (PIN 4141): o'quvchilar boshqaruvi, JSON eksport/import (zaxira), tozalash
- **Demo ma'lumot:** 12 o'quvchi × 40 kun (PIN 1111) — "O'chirish" tugmasi bilan
- **UI (2026-10-20 qayta dizayn):** premium dark leaderboard — quyruq fon + radial glow, SVG ikonkalar (emoji yo'q), gradient hero (katta ball + count-up animatsiya), daraja/streak/hafta chiplari, progress bar, segment-tab'lar, podium (tillo/kumush/bronz nuqul), delta-chip'lar (▲/▼), yutuqlar grid (olingan = tillo, yopiq = xira), qorong'u o'qituvchi modal + qorong'u mobil menyu. Eski versiya (tekis emoji-li) tashlandi
- **Bonus bug-fix (butun sayt):** mobil menyu `right:-100%` da turib, hamma saytni 780px'ga kengaytirib (gorizontal scroll) qo'yardi → `style.css`'da transform-offcanvas'ga o'tkazildi; reyting.html'da esa header'dagi `backdrop-filter` fixed menyni buzgan — olib tashlandi. Endi barcha sahifalar: scrollWidth=390
- **Tasdiq:** Playwright E2E 8/8 — profil/PIN/kirim, 3 scope × 3 davr, podium, delta-chip'lar, yutuqlar 7ta, o'qituvchi paneli, yangi profil yaratish, jadval 390px'ga mos (300/300), test→reyting yozilishi, 3-test limit, "bir martalik" qoida — 0 pageerror
- **Keyingi:** Cloudflare Worker + D1 (akkount bor, tunnel emas) — bu UI aynan shu mantiqda ulanadi

## REYTING v3 — KIRISH OQIMI (2026-10-20, user talabi)

User: chiroy (v2 premium) o'zgarmas, ammos oqim: har kim **o'z profilida avtomatik** yuradi.
Kirishda profil kartochkalari va PIN **yo'q**; birinchi ekran = o'z balli + **butun maktab reytingi** (tab'lardan oldin); 3 tab (Men/Reyting/Yutuqlar) pastda.

### Qilingan o'zgarishlar
- `reyting.html` to'liq qayta yozildi:
  - PIN ekrani (`rPin`) butunlay olib tashlandi — chip bosildi = darhol home
  - Avtomatik sessiya: `RT.session()` bor → to'g'ridan home; yo'q → faqat grid (birinchi marta / Chiqish'dan keyin)
  - **MAKTAB REYTINGI panel tab'lardan oldinga** ko'chirildi: dinamik sarlavha/izoh (Maktab/Sinf/Fan), filtrlar, podium, butun jadval, "Bu siz" highlight, jadvalda yo'q bo'lsa oltin eslatma
  - "Reyting" tab endi = **Mening reytingim** (shaxsiy): maktabda/sinfda o'rin kartalari, so'nggi 5 haftalik o'sish grafigi (CSS barlar), "Keyingi bosqich" (1-o'ringacha qolgan ball), fanlar bo'yicha o'rinlarim — tepadagi umumiy jadval bilan dublirlanmaydi
  - Yangi profil: PIN faqat **bir martalik** (ro'yxatdan o'tishda), keyin hech qachon so'ralmaydi
- `js/reyting.js`'ga 2 funksiya: `myRanks(pid)` (maktab/sinf/fan o'rinlari) + `rankHistory(pid, weeks)` (haftalik kumulyativ o'rinlar)
- Default period = **Umumiy** (user: "umumiy balli")

### E2E (25/25 OK)
PIN DOM'da yo'q; grid 12; bir bosishda home; board hero<board<tabs; 12 qator + "Bu siz" + podium 3; sinf filtri 4; Men tab fanlar; Reyting tab: maktab #1, sinf #1, 5 bar, fan o'rinlari, gap matni; yutuqlar 7; Chiqish→grid; o'qituvchi 4141→12; yangi profil→auto home + "jadvaldasiz" note + Reyting'da "—"; reload→sessiya saqlanadi; 0 pageerror.

### Ekranshotlar
`v3-1-tepa.png`, `v3-2-jadval.png`, `v3-3-men.png`, `v3-4-menging-reyting.png` (390x844, DSF2).

## REYTING v3.1 — MOCKUP'GA KO'CHIRISH + FILTR YAXSHILASH (2026-10-20)

User: "shu filedagi (mockup) ko'rinishga olib kel, reyting bo'limini va filtrlarni ham yaxshila".

### Qilinganlar (reyting.html)
- **Filtrlar segmentli pill'larga qayta qurildi:**
  - scope: Maktab | Sinfim | Fan (gradient active)
  - Fan bosilganda → o'quvchi sinfiga mos **fan chiplari** qatori (icon bilan, TestGen.subjectsFor; 8-9-10: 4 fan, 5-7: 3 fan)
  - period: Umumiy | Haftalik | Oylik (default Umumiy)
- **Jadval mockup'ga yetkazildi:** SINF ustuni olib tashlandi (sinf ism ostidagi subtitle'da — mockup'dagidek; avval 390px'da bo'sh "SINF" header ko'rinib turgan bug tuzatildi), thead 4 ustun
- **Trophy belgi** sarlavhada (mockup'dagidek) + dinamik sarlavha (Maktab/Sinf/Fan reytingi)
- **Yangi: "Siz: #N" badge** — panel boshida, 1-o'rin bo'lsa oltin rang
- **Qatorlarga stagger animatsiya** (har qator 22ms kechikish)
- Fan ro'yxati ob'ekt qaytaradigan `subjectsFor` API ga moslashdi (id larestirish) — bug topildi+tizildi

### E2E: 35/35 OK
Avvalgi 25 chek + 10 yangi: 4 ustun, trophy, Siz badge (maktab/sinf/fan), fan chiplari (9-sinf=4, 8-sinf=4), Geometriya reytingi, Haftalik period, badge yashirilishi (ball yo'qda).

### Rasmlar
`v3b-1-filterlar.png`, `v3b-2-jadval.png`, `v3b-3-fan.png`

## REYTING v3.2 — MOCKUP 1:1 KO'RINISH (2026-10-20)
User: "reyting htmlni o'chirvor va uni o'rniga mockupni qo'sh" — reyting.html to'liq qayta yozildi: ko'rinish mockup-reyting.html bilan piksel-identik, ichida ishlaydigan kod saqlanadi (user oldin static mockup'ni sinab "bossam ishlamayapti" deb norozi bo'lgan).

### O'zgarishlar (v3.1 → v3.2)
- **Olib tashlandi (user istagiga ko'ra):** pill segment filtrlar (`.ld-filters2`, `#scopeSeg`, `#fanRow`, `#periodSeg`) va "Siz: #N" badge (`.board-head`, `#boardMeChip`).
- **Qaytarildi (mockup'dagidek):** 3 ta select filtrlar — `#ldScope` (Maktab reytingi | Mening sinf reytingim | Fan bo'yicha, full-width), `#ldPeriod` (Umumiy | Haftalik | Oylik), `#ldFan` (scope≠fan da disabled, opacity .45, "Fan bo'yicha" placeholder).
- **Sarlavha:** `#boardTitle` = h4.gold, `ico('trophy',14) + titles[scope]` (Maktab/Sinf/Fan reytingi) — mockup'dagidek trophy bilan.
- **Saqlandi:** hero, 4 ustunli jadval (sinf subtitlda), podium (2-1-3 tartib), 3 tab (Men/Reyting/Yutuqlar), teacher overlay, session avto-kirish, "Bu siz" qator, stagger animatsiya, boardNote (ball yo'q bo'lsa).
- **JS yangiliklari:** `curFan`/`lastFilterPid` state, `ensureFilters()` (profil almashganda faqat bir marta tiklash), `syncFanSelect()` (fan-ro'yxati + disabled sync), `fanListFor(sinf)` (subjectsFor → id map).
- **mockup-reyting.html O'ZGARISHSIZ** — referens sifatida saqlanadi (o'chirilmaydi).

### E2E: 33/33 OK
PIN ekrani yo'q, demo grid 12, bir bosishda home, hero<board<tabs tartibi (173<438<1784), 4 ustun, trophy, 3 select, fan select disabled/enable, sinf=4 o'quvchi, 9-sinf 4 fan, Geometriya reytingi (5 ta), Haftalik period, tab'lar (Men/Reyting/Yutuqlar 7), o'qituvchi (12), yangi profil (8-sinf 4 fan, boardNote), sessiya saqlanadi, 0 pageerror.

### Rasmlar (390x844 DSF2)
`rejting-v32-1.png` (hero + select + podium), `rejting-v32-2.png` (jadval), `rejting-v32-3.png` (Reyting tab). Mockup bilan solishtirildi — 1:1.

## REYTING v3.3 — PROFIL EKRANI: KARTOCHKA GRID → DAVOM ETISH + YON SAT (2026-10-20)
User: "reyting bo'limiga kirilganda unaqa kartochkalar chiqmasin, boshqacha yo'l tutish kerak, to'rtburchak kartochkalar o'rniga — o'zing kallangini ishlatib ko'r".

### Eski → yangi
- **Eski:** 2/3 ustunli grid, 12 ta to'rtburchak kartochka (border + gradient + 46px rounded-square avatar, top-right crown badge).
- **Yangi (3 qism):**
  1. **"Davam etish" paneli** (faqat so'nggi profil bo'lsa): katta aylanma avatar (oltin halqa), "DAVAM ETISH" kicker, ism + sinf·daraja, o'ngda ball + #o'rin chip, oltin strelka. Bir bosish = bevosita home.
  2. **Sinf filtri chiplari** (gorizontal scroll): "Barchasi · 12", "5-A · 1", "8-A · 4"… avto-generatsiya, faol chip gradient.
  3. **Yon sath** (kartochka emas): 40px aylanma avatar (6 rang gradient, ism-hash bo'yicha), ism + "sinf · daraja", o'ngda #o'rin chip (r1 oltin/r2 kumush/r3 bronza) + ball. Qatorlar divider bilan, ball bo'yicha kamayish tartibida, stagger animatsiya. So'nggi profil qatorida "· so'nggi" oltin belgisi.
  4. **"Yangi profil" = kesma-kesma (dashed) "qo'shish" qatori** list ostida; "O'qituvchi" pastda ghost.

### Qo'shimcha bug fix
- `npSave`: yangi profil klassi eskida `klass + '-' + sinf` ("B-8") bo'lgan — demo formati `sinf + '-' + klass` ("8-B"). Sinf reytingi/filterlari yangi profilga to'g'ri ishlamay qolgan edi. Endi `sinf + '-' + klass`.

### E2E: 42/42 OK
Avvalgi 33 + yangi: yon sath 12 qator (chip yo'q), davom etish yo'q (birinchi marta), sinf chiplari 5 ta, #1 oltin chip, 9-A filtri 4 qator, chiqishda davom etish = Kamola (ball + #1 + "so'nggi" belgisi), davom etish → bevosita home, yangi profil → davom etish = Test, 0 pageerror.

### Rasmlar (390x844 DSF2)
`rejting-v33-profil-1.png` (birinchi marta: chiplar + sath), `rejting-v33-profil-2.png` (chiqishdan keyin: davom etish paneli).

## REYTING v3.4 — TOZA KIRISH: BANNER O'CHDI, FILTR SELECT, TUGMALAR YASHIRINDI (2026-10-20)
User: "DEMO banner + yangi profil + o'qituvchi rejimni olib tashla/yashir, tepadagi sinf chiplarini (Barchasi 12, 5-A 1...) chiroyli filtrga almashtir, qolganiga verguliga ham tegma".

### O'zgarishlar (faqat profil ekrani)
- **DEMO banner O'CHIRILDI** (HTML+CSS+JS listener). Demo ma'lumotlar endi sessiz seed'lanadi (RT.seedDemo o'zgarishsiz).
- **Sinf chiplari → SELECT filtri** (`.pf-filter`): sahifa select'lari bilan bitta uslubda (14px radius, chevron, user icon chapda), optionlar: "Barcha sinflar · 12", "9-A sinf · 4 o'quvchi"... `#pfClassSel` change → renderProfiles.
- **"+ Yangi profil" asosiy ekrandan OLIB TASHLANDI** — endi faqat o'qituvchi panelida: `#tAddBtn` ("O'quvchi qo'shish", primary) + forma o'qituvchi paneliga ko'chdi (`#newProfCard`, sarlavha "Yangi o'quvchi"). O'qituvchi kontekst: saqlashda avto-kirish YO'Q, yashil OK xabar: "✔ Test Oquvchi qo'shildi — PIN: 9999 (o'quvchiga bering)", forma ochiq qoladi (PIN o'qish uchun).
- **"O'qituvchi rejimi" YASHIRILDI** — asosiy ekranda past o'ngda 34px aylanma ghost icon (faqat kalochka, opacity .55, hover'da ochiladi, title tooltip). Id o'zgarmas (#teacherBtn).
- Qolgan hamma narsa (hero, board, tab'lar, davom etish, sessiya) O'ZGARISHSIZ.

### E2E: 51/51 OK
51 chek: banner/tugmalar yo'qligi, select filtri (5 option, 9-A→4 qator), yashirin o'qituvchi (text yo'q, svg bor), o'qituvchida qo'shish (forma panelda, OK xabar + PIN, 13 o'quvchi, 8-B format), qolgan barcha eski cheklar, 0 pageerror.

### Rasmlar (390x844 DSF2)
`rejting-v34-1.png` (toza kirish: select + sath), `rejting-v34-2.png` (o'qituvchi paneli + yangi o'quvchi formasi).

## REYTING v3.5 — PROFIL EKRANI: SINFLAR+FANLAR FILTRI, O'ZI KARTOCHKASI TEPA (2026-10-20)
User: "unga sinf va fanlar filtrini ham qo'sh, chiroyliroq qilib, ulardan oldin tepada o'zi kartochkasi alohida tursin".

### O'zgarishlar (faqat profil ekrani)
- **O'zi kartochkasi alohida, tepada** — so'nggi profil kartochkasi (`.pf-cont`) kuchlandi: 56px avatar (oltin halqa), "DAVAM ETISH" kicker, ism + "9-A sinf · Kumush", o'ngda ball + #o'rin, oltin strelka, shadow bilan alohida kartochka. Filtrlardan OLDIN (geometrik chek: 245 < 361).
- **Ikkala filtr bitta panelda** (`.pf-fbar`): grid 1fr|1px|1fr — [👤 sinf select | divider | 📖 fan select], 16px radius, chevronlar. Compact option matnlar: "Barchasi · 12", "9-A · 4".
- **Fan filtri mantiqi:** `fanOptsFor(cls)` — sinf 'all' bo'lsa 5–10 sinflar union (Matematika, Ona tili, Ingliz tili, Algebra, Geometriya), aniq sinf bo'lsa shu sinf fanlari (8–10: 4 fan). Fan tanlansa: ro'yxat faqat shu fanda balli o'quvchilar, fan balli bo'yicha saralash, #o'rin = fan bo'yicha, qator o'ng pastida fan nomi (masalan "Geometriya"). Sinf almashganda mos fan yo'q bo'lsa 'all'ga reset.
- **Empty state:** fan rejimida natija yo'q bo'lsa "Bu bo'limda hali natija yo'q".
- Qolgan hamma narsa o'zgarmas (o'qituvchi, davom etish, sessiya, board).

### E2E: 59/59 OK
59 chek: ikkala select (5 sinf option, 6 fan option), 9-A→4 fan option, 9-A+Geometriya (2 qator, kamayish tartibi, label), maktab+Algebra (6), kartochka filtrlardan oldin, qolgan barcha eski cheklar, 0 pageerror.

### Rasmlar (390x844 DSF2)
`rejting-v35-1.png` (toza: filtr+sath), `rejting-v35-2.png` (kartochka tepada), `rejting-v35-3.png` (9-A+Geometriya faol).

## REYTING v3.5b — SINFLAR FILTRIDAN RAQAMLARNI OLIB TASHLASH (2026-10-20)
User: "o'quvchi filtridagi 'Barchasi · 12' dagi raqam (o'quvchilar soni) kerak emas, ortiqcha".
- Sinf select optionlari: "Barchasi · 12", "9-A · 4" → **"Barchasi"**, "9-A" (son olib tashlandi). Fan select o'zgarmas (unda raqam yo'q edi).
- E2E: 59/59 OK. Rasm: `rejting-v35b-1.png`.

## LOGIN / RO'YXATDAN O'TISH — BIRTA FORMA, O'Z 4-RAQAMLI PIN (2026-10-21)
User: "endi kodni yozchi va ogohlantirish ber pin kodni esdan chiqarishmasin" (+ oldingi qarorlar: email/telefon YO'Q, otachasi ismi YO'Q, ERP tekshiruvi HOZIRCHA YO'Q — ochiq ro'yxatdan o'tish, brute force ALBATTAA, bitta ism+familiya+klass = bitta profil, profilsiz test ishlamaydi).

### Mantiq (js/reyting.js — `RT.loginOrRegister`)
- **Bitta forma = kirish + ro'yxatdan o'tish.** Ism + familiya + sinf + klass + o'zi tanlagan 4 xonali PIN.
  - Nom band + PIN to'g'ri → **kirish** (sessiya qo'yiladi).
  - Nom band + PIN xato → xato xabari ("PIN noto'g'ri. Urinish: N/5").
  - Nom bo'sh → **profil yaratiladi** → PIN ekrani (ogohlantirish bilan) → to'liq ishlaydi.
- **Unikalik:** ism + familiya + klass (masalan "9-B"). Bitta sinfda bir xil ism+familiya ikkilamchi bo'lsa ham klass farqi bilan ajraladi.
- **Brute force:** 5 xato PIN → **15 daqiqalik to'siq** (localStorage `rt_pl_<kalit>`). To'siq paytida to'g'ri PIN ham qabul qilinmaydi.
- **PIN ogohlantirishi (mabbus):** (1) forma ostida doimiy hint "PIN kodingizni saqlab qo'ying — keyingi marta aynan shu kod bilan kirasiz. Unutsangiz, o'qituvchiga murojaat qiling"; (2) yangi profil yaratilgach PIN **bir marta** katta ko'rsatiladi + "Bu kodingizni yozib oling va saqlab qo'ying!" ogohlantirishi.
- **O'qituvchi:** har o'quvchi qatorida **PIN tugmasi** — PIN ni qayta belgilaydi (unutgan o'quvchi uchun) + to'siqni ham o'chiradi.
- `RT.resetStudentPin(pid, pin)`, `RT.findProfileExact(name, surname, klass)` qo'shildi.

### Reyting ekrani (reyting.html)
- Profil ekraniga **login kartochkasi** qo'shildi: "DAVAM ETISH" kartochkasi ostida, filtrlardan oldin.
- "Davam etish" profili yo'q bo'lsa forma **ochiq**, bo'lsa **yopiq** (sarlavha bosiladi).
- Muvaffaqiyatli yangi ro'yxatdan o'tish → kartochka ichida PIN paneli → "▶ Boshlash" → home.

### Testlar ekrani (testlar.html)
- Fan tanlangach forma: ism + familiya + **sinf/klass select'lar** (tanlangan sinfdan avto to'ldiriladi, masalan 9a → 9-sinf/A) + PIN + ogohlantirish.
- **Profilsiz test boshlanmaydi.** Birinchi kirish = ro'yxatdan o'tish (PIN ekrani → "🚀 Testni boshlash").
- Sessiya bo'lsa: maydonlar profildan to'ldiriladi, **PIN qatori yashirin**, bitta bosishda test (titl "Reyting profili: …").
- Kombinatsion test endi aniq xabar: "Kombinatsion test reytingga kiritilmaydi (mashq rejimi)".
- Eski "ism bo'yicha avto-izlash" o'rniga **sessiya/PIN asosida** ishlash.

### ERP
- Haqiqiy ro'yxat saqlandi: `/home/user/41school/erp/oquvchilar.json` (195 o'quvchi, 5a–9b; ayni sinfda aynan bir xil ism+familiya = YO'Q) — keyingi bosqichda (Cloudflare/D1) import/tekshiruv uchun.

### E2E: 52/52 OK, 0 pageerror
A. Reyting: toza holat → forma ochiq; ro'yxatdan o'tish → PIN 2468 bir marta + ogohlantirish → home; sessiya eslab turadi; "Davam etish" + yopiq login; xato PIN → kirmaydi; to'g'ri PIN → kiradi; 5 xato → 15 daq to'siq (to'g'ri PIN ham tushmaydi); o'qituvchi (4141) → PIN reset 9999 (+to'siq o'chadi) → yangi PIN bilan kiradi.
B. Testlar: toza → forma (9/A avto, PIN qatori + hint); ro'yxatdan o'tish (1357) → PIN ekrani → test; 10 savol → reyting balli (ball = yangi to'g'ri × 3 tekshirildi); sessiya → PIN yashirin, bitta bosish; sessiyasiz xato PIN → test boshlanmaydi, to'g'ri PIN → boshlanadi; kombinatsion test reytingga kiritilmaydi.

### Rasmlar (390x844 DSF2)
`rejting-login-1.png` (PIN ekrani + ogohlantirish), `rejting-login-2.png` (davom etish + ochiq login formasi), `testlar-login-1.png` (testlar formasi), `testlar-login-2.png` (testlar PIN ekrani).

### LOGIN v2 — QURILMA PROFILI MODELI (2026-10-21, user tuzatishi bilan)
User: "profil yaratilsa uning ID saqlanadi va bazada saqlanadi, avatar yaratiladi, testlar shu profil bilan ishlaydi; yana profil bo'la turib yana profil yaratish bo'lmadi; oxirgi kirilgan odam ma'lumotlari yozilib qolmasin".

**Model:** bitta qurilma = bitta profil.
- **Profil yaratilgach** (bir martalik ro'yxatdan o'tish): ID qurilmada saqlanadi (`rt_last_pid`, keyin D1'da), avatar paydo bo'ladi, testlar ANIQ shu profil bilan ishlaydi.
- **Reyting ekrani:** qurilmada profil BOR bo'lsa — login kartochkasi "Kirish — Aziza Karimova" rejimida: **avatar + ism + faqat PIN** (ism/familiya/sinf maydonlari umuman yo'q → boshqa profil yaratib bo'lmaydi, xato ism yozib bo'lmaydi). Profilsiz qurilma → to'liq ro'yxatdan o'tish formasi.
- **Testlar ekrani — 3 rejim:**
  1. **Faol profil** (sessiya): avatar + ism kartasi, "✅ Testlar shu profilga yoziladi", hech qanday maydon yo'q, bitta bosishda test.
  2. **Bog'langan profil** (sessiya yo'q): avatar + ism + **faqat PIN** → kirish.
  3. **Birinchi marta**: to'liq ro'yxatdan o'tish (ism/familiya/sinf/klass/PIN + ogohlantirish) → PIN ekrani (avatar+ism+PIN) → test.
- **Avatar butun joylarda:** PIN ekrani (reyting + testlar), forma profili kartasi, **test header'ida chip** (avatar + ism — test kimning nomida o'ryotganini ko'rsatadi).
- **Xavfsizlik o'zgarishsiz:** 5 xato PIN → 15 daq to'siq; o'qituvchi PIN reset (to'siqni ham ochadi).
- `RT.loginById(id, pin)` + `RT.lastPid()` qo'shildi; `loginOrRegister` endi `rt_last_pid` saqlaydi.

**E2E: 55/55 OK + regressiya 59/59 OK, 0 pageerror.** Rasmlar: `rejting-login-1.png` (PIN ekran: avatar+ism+PIN), `rejting-login-2.png` (bound: "Kirish — Aziza Karimova"), `testlar-login-1.png` (register), `testlar-login-2b.png` (PIN ekran), `testlar-login-3.png` (test header'da profil chip), `testlar-login-4.png` (session rejim).

### LOGIN v3 — STANDART WEB LOGIN (2026-10-21, user'ning ikkinchi tuzatishi)
User: "tepada o'ng burchakda avatar profil bo'ladi, shu profilda yuradi; butun dunyodagi saytlardagidek ro'yxatdan o'tish; har kirilganda profil tanlash kerak emas" → V2'nin profil-tanlash UI'si (davom kartasi, o'quvchilar ro'yxati, per-test forma, topbar) **olindi**.

**Endi qanday ishlaydi:**
- **Avatar sayt header'ining o'ng burchagida.** Kirilmagan = "Kirish" tugmasi (pill); kirilgan = avatar + ism → bosilsa dropdown: ism, sinf, jami ball, **Chiqish**. Butun ilova (reyting + testlar) shu profilda yuradi.
- **Reyting:** sessiya yo'q → kirish ekrani (bitta karta: birinchi marta = ism/familiya/sinf/klass/PIN + "PIN saqlab qo'ying" ogohlantirishi; qurilma bog'langach = avatar + **faqat PIN**). Eski topbar hamda ro'yxat/filtr ekrani yo'q — har doim hero (o'z balli) + BUTUN MAKTAB reytingi.
- **Testlar:** sessiya yo'q → kirish ekrani (fanlar ro'yxati yashirin = test qulf); ro'yxatdan o'tish → PIN ekrani → **fan tanlangan bo'lsa shu test bevosita boshlanadi, yo'q bo'lsa fanlar ro'yxati**. Kirilgan holda fan bosilsa — hech qanday forma so'ralmaydi, test DARHOL. 3/kun limit → select ekranida toast xabar. Eski sForm va test header'dagi profil chip o'ldi (header avatar yetarli).
- **Model o'zgarishsiz:** bitta qurilma = bitta profil (`rt_last_pid`), 2-chi profil yaratib bo'lmaydi, PIN bir martalik, 5 xato → 15 daq to'siq, o'qituvchi 4141 (PIN reset to'siqni ochadi), ERP hozircha yo'q.

**E2E: V3 login 53/53 OK + regressiya 49/49 OK, 0 pageerror.** Rasmlar (390×844 DSF2): `rejting-login-1.png` (kirish ekrani + header "Kirish"), `rejting-login-2.png` (home: header avatar + maktab reytingi), `testlar-v3-1-kirish.png` (testlar kirish), `testlar-v3-2-pin.png` (PIN ekrani), `testlar-v3-3-select.png` (fanlar), `testlar-v3-4-test.png` (test darhol), `testlar-v3-6-bound.png` (bound: faqat PIN).

### LOGIN v3.1 — RO'YXATDAN O'TISH BUTUNLAY OLIB TASHLANDI (2026-10-21)
User: "ro'yxatdan o'tishni butunla olib tashla".
- O'quvchi endi **faqat PIN bilan kiradi**. O'quvchilarni o'qituvchi yaratadi (panel) yoki keyin ERP import qiladi.
- Olib tashlandi: ism/familiya/sinf/klass maydonlari, "PIN saqlab qo'ying" hint'i, PIN ekrani (reyting authOk + testlar sPin), ro'yxatdan o'tish submit tarsi.
- Bog'lanmagan qurilma: PIN bosilsa — "Bu qurilma hali o'quvchi bilan bog'lanmagan. O'qituvchiga murojaat qiling." (mavjud xabar qatorida, yangi UI yo'q).
- Bug-fix: `rt_last_pid` formati bitta joyda (JSON) — reyting.html'dagi lokal lastPid/saveLastPid endi RT bilan bir formatda.
- Screenshotlar hammasi o'chirildi (227 ta; site/images asset'lari saqlandi).
- **E2E: 42/42 + regressiya 49/49, 0 pageerror.**

### LOGIN v3.2 — HEADER AVATARI OLIB TASHLANDI (2026-10-21)
User: "avatar profil qismi o'ng tomonda tepasida qolib ketibdi — reytingda ham testlarda ham o'chir".
- `.header-actions`dagi `hdrProf` (Kirish pill / avatar + dropdown menyu + Chiqish) reyting.html va testlar.html'dan olib tashlandi; style.css'dagi `.hdr-*`/`.hm-*` bloki o'chdi.
- Header'da endi faqat: logo + menyu (hamburger) + tungi rejim.
- Kirish ekrani o'zgarmas: qurilma bog'langan = avatar + faqat PIN (login kartasida); bog'lanmagan = PIN + ogohlantirish.
- **E2E: 38/38 + regressiya 46/46, 0 pageerror.**

### REYTING QAYTARILDI — bo'lim har doim OCHIQ (2026-10-21)
User: "reyting bo'limi ichini yo'q qilib qo'yibsan — reyting bo'limini qaytar" (login devori butun reytingni to'sib qo'ygandi).
- Endi reyting.html'ga kirganda **reyting darhol ochiq**: kirilmagan = tepada kichik "Kirish" (PIN) kartasi + pastda MAKTAB REYTINGI (podium, filtr, jadval).
- Kirilgach: karta yashiriladi, o'rnida hero (o'z balli) + "Bu siz" qatori; kirilmagan holatda hero yashirin, "Men/Yutuqlar" tablarida "PIN kiring" izohi.
- `rProfile` alohida ekrani o'chdi; o'qituvchi tugmasi (pf-foot) endi reyting oxirida.
- **E2E: 43/43 + regressiya 51/51, 0 pageerror.**
### REYTING — ESKI OQIM (KIRISH QISMIDAN OLDINGI) QAYTARILDI (2026-10-21)
User: "yo'q, oldin-da qo'shma bo'lmabdi — huddi oldingiday qil, kirish qismini qilishimizdan oldingini" (PIN kartasi = qo'shma; eski holat kerak).
- **V6'dagi PIN kartasi (authCard) reytingdan BUTUNLAY olib tashlandi** — reytingda endi hech qanday PIN/kirish yo'q (testlardagi PIN oqimi o'zgarmas qoldi).
- **Profil ekrani (rProfile) qayta qurildi — v3.5b holatida, PIN YO'Q:**
  - rt-head (kicker "41-Maktab · Reyting" + trophy, "Xush kelibsiz!", izoh);
  - **Davam etish** kartochkasi (so'nggi profil: avatar + ism + "9-A sinf · Kumush" + ball + #o'rin chip) — bitta bosish = bevosita home;
  - **Sinf + Fan filtrlari** (bitta panel: `#pfClassSel` "Barchasi/9-A/8-A/8-B/5-A" + `#pfFanSel` "Barcha fanlar/..." — sinfga mos fanlar);
  - **Yon sath** (12 qator: avatar, ism, "sinf · daraja", ball, #o'rin chip r1/r2/r3, so'nggi profil qatorida oltin "· so'nggi");
  - O'qituvchi = past o'ngda 34px ghost icon (4141) — endi profil ekranida (home'da emas).
- **Home (rHome) = mockup 1:1:** tepada **rt-topbar** (avatar + ism + "9-A · 9-sinf" + **Chiqish** tugmasi, `#btnLogout`) → hero (o'z balli) → MAKTAB REYTINGI → 3 tab. Chiqish = sessiya tozalanadi → profil ekraniga qaytadi.
- Oqim: sessiya bor → to'g'ridan home; yo'q → profil ekrani; ro'yxat qatoriga/davom etish bosish = kirish (PIN so'ralmaydi); sessiya eslab turiladi (reload → home).
- Import/wipe'dan keyin → profil ekrani (ma'lumot almashtirilgach qayta tanlash).
- Qolgan hamma narsa (ball, darajalar, limit, o'qituvchi paneli, testlar PIN oqimi, demo seed) O'ZGARISIZ.
- **E2E: 47/47 + regressiya 36/36, 0 pageerror.** Vizual: `/tmp/v7-1-profil.png`, `/tmp/v7-2-davom.png`, `/tmp/v7-3-home.png` (mockup bilan 1:1 tekshirildi).
