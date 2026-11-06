# -*- coding: utf-8 -*-
Q = '\u2018'
s = open('ai-1ga1-nusxa.html', encoding='utf-8').read()

def rep(old, new):
    global s
    old = old.replace('\u00a7', Q)
    new = new.replace('\u00a7', Q)
    c = s.count(old)
    assert c == 1, 'anchor count=%d for: %r' % (c, old[:80])
    s = s.replace(old, new, 1)

# E1: Gemini konstantalari
rep("  const API_URL = 'https://vexnode-jalolmirzo-ai.hf.space/chat';",
    "  const API_URL = 'https://vexnode-jalolmirzo-ai.hf.space/chat';\n"
    "  // Gemini API — hozircha sahifa ichida; keyin Workers orqali ko'chiriladi\n"
    "  const GEMINI_KEY = '';\n"
    "  const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';\n"
    "  const GEMINI_MODELS = { mini: 'gemini-2.5-flash-lite', zenith: 'gemini-2.5-flash', pro: 'gemini-2.5-pro' };\n"
    "  const GEMINI_SYSTEM = 'Siz Jalolmirzo AI — 41-maktab o§quvchilari uchun do§stona, bilimli o§quv yordamchisisiz. Savollarga o§zbek tilida, aniq, tushunarli va foydali javob bering. Matematika, dasturlash va fanlarda bosqichma-bosqich, misollar bilan tushuntiring. YORDAMCHI BLOK berilgan bo§lsa, undagi faktlarni ishonchli ma§lumot sifatida o§zlashtiring va javobni shu faktlar asosida o§z tabiiy uslubingizda bering; blok, uning manbai yoki istalgan ensiklopediya nomi haqida javobda hech narsa yozmang. Savol o§quvga oid bo§lmasa ham, do§stona va qisqa javob bering.';")

# E2: WIKI_STOP (salom/rahmat + normalizatsiya xatosi)
rep("  const WIKI_STOP = new Set(['men','sen','biz','siz','ular','uning','haqida','nima','nimalar','kim','qanday','qancha','qisqacha','qisqa','tushuntir','tushuntirib','tushuntiring','bering','ber','yozing','yoz','yozib','ayting','ayt','bilmoqchiman','bilib','bilaman','bilasiz','kerak','bo\\u02bbldimi','bo\\u02bbgan','qiling','qil','gapir','gapiring']);",
    "  const WIKI_STOP = new Set(['men','sen','biz','siz','ular','uning','haqida','nima','nimalar','kim','qanday','qancha','qisqacha','qisqa','tushuntir','tushuntirib','tushuntiring','bering','ber','yozing','yoz','yozib','ayting','ayt','bilmoqchiman','bilib','bilaman','bilasiz','kerak','boldimi','bogon','qiling','qil','gapir','gapiring','salom','salomaloysiz','assalomu','alaykum','rahmat','rahmatlar','tashakkur','hayr','xush','qalay','qalaysiz','ishladi','shukr','iltimos','afyu','xavotir','yaxshi','yomon','kelibsiz']);")

# E3: callGemini funksiyasi
rep("  async function requestResponse(id, userIndex, replaceIndex) {",
    "  async function callGemini(model, message, history, signal) {\n"
    "    const gm = GEMINI_MODELS[model] || GEMINI_MODELS.zenith;\n"
    "    const contents = (history || []).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(m.content) }] }));\n"
    "    contents.push({ role: 'user', parts: [{ text: message }] });\n"
    "    const r = await fetch(GEMINI_BASE + gm + ':generateContent?key=' + GEMINI_KEY, {\n"
    "      method: 'POST',\n"
    "      headers: { 'Content-Type': 'application/json' },\n"
    "      body: JSON.stringify({ contents: contents, systemInstruction: { parts: [{ text: GEMINI_SYSTEM }] } }),\n"
    "      signal: signal\n"
    "    });\n"
    "    if (!r.ok) throw new Error('gemini ' + r.status);\n"
    "    const d = await r.json();\n"
    "    if (d.promptFeedback && d.promptFeedback.blockReason) throw new Error('gemini blocked');\n"
    "    const cand = d.candidates && d.candidates[0];\n"
    "    const text = cand && cand.content && Array.isArray(cand.content.parts) ? cand.content.parts.map(p => p.text || '').join('') : '';\n"
    "    if (!text.trim()) throw new Error('gemini bo\\u2018sh');\n"
    "    return text;\n"
    "  }\n"
    "  async function requestResponse(id, userIndex, replaceIndex) {")

# E4a: Gemini birinchi urinish
rep("    try {\n      const response = await fetch(API_URL, {",
    "    try {\n"
    "      let replyText = null;\n"
    "      try { replyText = await callGemini(model, messageText, history, controller.signal); }\n"
    "      catch (e1) { if (controller.signal.aborted) throw e1; }\n"
    "      if (replyText === null) {\n"
    "        const response = await fetch(API_URL, {")

# E4b: Space javobi replyText'ga
rep("      if (state.pending.get(id) !== request || !getChat(id)) return;\n      let replyContent = data.response;",
    "        replyText = data.response;\n"
    "      }\n"
    "      if (state.pending.get(id) !== request || !getChat(id)) return;\n"
    "      let replyContent = replyText;")

open('ai-1ga1-nusxa.html', 'w', encoding='utf-8').write(s)
print('Barcha 5 edit bajarildi')
