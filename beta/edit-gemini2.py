# -*- coding: utf-8 -*-
s = open('ai-1ga1-nusxa.html', encoding='utf-8').read()

def rep(old, new):
    global s
    c = s.count(old)
    assert c == 1, 'anchor count=%d for: %r' % (c, old[:80])
    s = s.replace(old, new, 1)

# 1) GEMINI_MODELS -> GEMINI_CHAINS
rep("  const GEMINI_MODELS = { mini: 'gemini-2.5-flash-lite', zenith: 'gemini-2.5-flash', pro: 'gemini-2.5-pro' };",
    "  const GEMINI_CHAINS = {\n"
    "    mini: ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.5-flash'],\n"
    "    zenith: ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash'],\n"
    "    pro: ['gemini-3.1-pro-preview', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash']\n"
    "  };")

# 2) callGemini: zanjir bilan
old_fn = """  async function callGemini(model, message, history, signal) {
    const gm = GEMINI_MODELS[model] || GEMINI_MODELS.zenith;
    const contents = (history || []).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(m.content) }] }));
    contents.push({ role: 'user', parts: [{ text: message }] });
    const r = await fetch(GEMINI_BASE + gm + ':generateContent?key=' + GEMINI_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: contents, systemInstruction: { parts: [{ text: GEMINI_SYSTEM }] } }),
      signal: signal
    });
    if (!r.ok) throw new Error('gemini ' + r.status);
    const d = await r.json();
    if (d.promptFeedback && d.promptFeedback.blockReason) throw new Error('gemini blocked');
    const cand = d.candidates && d.candidates[0];
    const text = cand && cand.content && Array.isArray(cand.content.parts) ? cand.content.parts.map(p => p.text || '').join('') : '';
    if (!text.trim()) throw new Error('gemini bo\\u2018sh');
    return text;
  }"""
new_fn = """  async function callGeminiOne(gm, message, history, signal) {
    const contents = (history || []).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(m.content) }] }));
    contents.push({ role: 'user', parts: [{ text: message }] });
    const r = await fetch(GEMINI_BASE + gm + ':generateContent?key=' + GEMINI_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: contents, systemInstruction: { parts: [{ text: GEMINI_SYSTEM }] } }),
      signal: signal
    });
    if (r.ok) {
      const d = await r.json();
      if (d.promptFeedback && d.promptFeedback.blockReason) throw new Error('gemini blocked');
      const cand = d.candidates && d.candidates[0];
      const text = cand && cand.content && Array.isArray(cand.content.parts) ? cand.content.parts.map(p => p.text || '').join('') : '';
      if (text.trim()) return text;
      throw new Error('gemini bo\\u2018sh');
    }
    if (r.status === 401 || r.status === 403) throw new Error('gemini key ' + r.status);
    throw new Error('gemini ' + r.status);
  }
  async function callGemini(model, message, history, signal) {
    const chain = GEMINI_CHAINS[model] || GEMINI_CHAINS.zenith;
    let lastErr = null;
    for (const gm of chain) {
      if (signal.aborted) throw new Error('abort');
      try { return await callGeminiOne(gm, message, history, signal); }
      catch (e) {
        lastErr = e;
        const m = String(e.message || '');
        if (m === 'abort' || m === 'gemini blocked' || m.indexOf('gemini key') === 0) throw e;
      }
    }
    throw lastErr || new Error('gemini xato');
  }"""
rep(old_fn, new_fn)

open('ai-1ga1-nusxa.html', 'w', encoding='utf-8').write(s)
print("zanjir OK")
