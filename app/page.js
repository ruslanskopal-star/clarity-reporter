'use client'
// page_v13.js - kompletni prepis, sanitizace pomlcek pri ukladani (ne v renderu)

import { useState, useEffect, useRef } from 'react'

const LOADING_PHASES = [
  'Analyzuji URL a kategorii e-shopu...',
  'Hodnotim prvni dojem a homepage...',
  'Prochazim produktove stranky...',
  'Kontroluji fotografie a vizualy...',
  'Vyhodnocuji navigaci a kategorie...',
  'Testuju interni vyhledavani...',
  'Analyzuji kosik a checkout...',
  'Kontroluji platebni metody...',
  'Hledam problemy s trust signaly...',
  'Kontroluji mobilni verzi...',
  'Hodnotim rychlost nacitani...',
  'Analyzuji cenotvorbu a psychologii cen...',
  'Hodnotim copywriting a mikrotexty...',
  'Kontroluji vizualni hierarchii...',
  'Hledam konverzni bariery...',
  'Prohledavam znalostni bazi KRIS...',
  'Aplikuji metodologii ESHOP BOOSTER...',
  'Vypocitavam dopad doporuceni...',
  'Prioritizuji akcni kroky...',
  'Generuji CRO akcni plan...',
  'Sestavuji Quick Wins seznam...',
  'Overuji kompletnost analyzy...',
  'Finalizuji doporuceni...',
  'Posledni optimalizace...',
  'Pripravuji report pro klienta...',
]

const HISTORY_KEY = 'kris_analyzy_v1'
const MAX_HISTORY = 5

function makeGroupSlots(prefix, label, count) {
  var out = []
  for (var i = 1; i <= count; i++) out.push({ id: prefix + i, label: label + ' (' + i + ')' })
  return out
}

const SCREENSHOT_SLOTS = [].concat(
  makeGroupSlots('homepage', 'Homepage', 6),
  makeGroupSlots('kategorie', 'Kategorie', 6),
  makeGroupSlots('produkt', 'Produkt', 6),
  makeGroupSlots('predkosik', 'Predkosik', 6),
  makeGroupSlots('kosik', 'Kosik', 6),
  [
    { id: 'thankyou', label: 'Dekovaci stranka' },
    { id: 'kontakt', label: 'Kontakt' },
    { id: 'doprava', label: 'Doprava a Platba' },
    { id: 'reklamace', label: 'Reklamace' },
    { id: 'onas', label: 'O nas' },
    { id: 'blog', label: 'Blog clanek' },
    { id: 'naseptavac', label: 'Vyhledavani (naseptavac)' },
    { id: 'vysledky', label: 'Vyhledavani (vysledky)' },
  ]
)

var SLOT_GROUPS = {}
;['homepage','kategorie','produkt','predkosik','kosik'].forEach(function(k) {
  SLOT_GROUPS[k] = [1,2,3,4,5,6].map(function(i) { return k + i })
})

function findSlotGroup(slotId) {
  for (var k in SLOT_GROUPS) {
    if (SLOT_GROUPS[k].indexOf(slotId) !== -1) return SLOT_GROUPS[k]
  }
  return null
}

// Pro group sloty: resize na 1200 sirku + rozseka na kusy po 1500px vysky
function resizeAndSplit(file) {
  return new Promise(function(resolve) {
    var reader = new FileReader()
    reader.onload = function(e) {
      var img = new Image()
      img.onload = function() {
        var maxWidth = 1200
        var chunkHeight = 1500
        var origW = img.width
        var origH = img.height
        var w = origW > maxWidth ? maxWidth : origW
        var scale = w / origW
        var h = Math.round(origH * scale)
        var chunks = []
        var y = 0
        while (y < h) {
          var ch = Math.min(chunkHeight, h - y)
          var canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = ch
          var ctx = canvas.getContext('2d')
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, w, ch)
          var sy = Math.round(y / scale)
          var sh = Math.round(ch / scale)
          ctx.drawImage(img, 0, sy, origW, sh, 0, 0, w, ch)
          chunks.push(canvas.toDataURL('image/jpeg', 0.75).split(',')[1])
          y += ch
        }
        resolve(chunks)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

// Pro single sloty (kontakt, onas, ...): cap sirky na 1200 + celkove vysky na 7500
function resizeSingle(file) {
  return new Promise(function(resolve) {
    var reader = new FileReader()
    reader.onload = function(e) {
      var img = new Image()
      img.onload = function() {
        var maxWidth = 1200
        var w = img.width
        var h = img.height
        if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth }
        var maxHeight = 7500
        if (h > maxHeight) { w = Math.round(w * maxHeight / h); h = maxHeight }
        var canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, w, h)
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.75).split(',')[1])
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

// Sanitizace pomlcek - volana pri ulozeni textu
function cleanDashes(text) {
  var result = ''
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i)
    // en dash (8211) nebo em dash (8212) obklopen mezerami -> nahrad dvojteckou
    if ((code === 8211 || code === 8212) && i > 0 && i < text.length - 1) {
      var prev = text[i-1]
      var next = text[i+1]
      if (prev === ' ' && next === ' ') {
        result = result.slice(0, -1) + ':'
        continue
      }
    }
    result += text[i]
  }
  return result
}

function Logo() {
  return (
    <div style={{display:'inline-block',background:'#111',padding:'10px 22px',borderRadius:'8px',marginBottom:'20px',lineHeight:'1.2'}}>
      <div style={{display:'flex',alignItems:'center'}}>
        <span style={{fontSize:'22px',fontWeight:'900',color:'white',fontFamily:'Arial Black, Arial'}}>ESH</span>
        <span style={{fontSize:'22px',fontWeight:'900',color:'#FF6B00',fontFamily:'Arial Black, Arial'}}>O</span>
        <span style={{fontSize:'22px',fontWeight:'900',color:'white',fontFamily:'Arial Black, Arial'}}>P</span>
      </div>
      <div style={{fontSize:'13px',fontWeight:'900',color:'#FF6B00',letterSpacing:'3px',fontFamily:'Arial Black, Arial',marginTop:'2px'}}>BOOSTER</div>
    </div>
  )
}

function LoadingAnimation({ seconds, phase }) {
  return (
    <div style={{textAlign:'center',padding:'28px 0 8px 0'}}>
      <style>{`
        @keyframes spin-arc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-ring { 0%,100% { transform:scale(1);opacity:.8; } 50% { transform:scale(1.12);opacity:.4; } }
      `}</style>
      <div style={{position:'relative',display:'inline-block',marginBottom:'20px'}}>
        <div style={{position:'absolute',top:'-10px',left:'-10px',right:'-10px',bottom:'-10px',borderRadius:'50%',background:'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0) 70%)',animation:'pulse-ring 2s ease-in-out infinite'}} />
        <svg width="90" height="90" style={{animation:'spin-arc 1.4s linear infinite',display:'block'}}>
          <circle cx="45" cy="45" r="38" fill="none" stroke="#2a2a2a" strokeWidth="4"/>
          <circle cx="45" cy="45" r="38" fill="none" stroke="#FF6B00" strokeWidth="4" strokeDasharray="60 180" strokeLinecap="round"/>
        </svg>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',lineHeight:'1'}}>
          <div style={{fontSize:'22px',fontWeight:'900',color:'#FF6B00',fontFamily:'Arial Black, Arial'}}>{seconds}</div>
          <div style={{fontSize:'9px',color:'#666',fontFamily:'Arial,sans-serif',fontWeight:'700',letterSpacing:'1px',marginTop:'1px'}}>SEK</div>
        </div>
      </div>
      <div style={{color:'#aaa',fontSize:'13px',fontFamily:'Arial,sans-serif',fontWeight:'600'}}>{phase}</div>
      <div style={{marginTop:'10px',color:'#444',fontSize:'11px',fontFamily:'Arial,sans-serif'}}>Analyza trva cca 3 minuty</div>
    </div>
  )
}

function HistoryItem({ item, onOpen, onDelete }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background:'#111',border:'1px solid #2a2a2a',borderRadius:'8px',marginBottom:'8px'}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:'#FF6B00',fontWeight:'700',fontSize:'13px',fontFamily:'Arial,sans-serif',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.url}</div>
        <div style={{color:'#444',fontSize:'11px',fontFamily:'Arial,sans-serif',marginTop:'2px'}}>{item.date} &bull; {item.seconds}s</div>
      </div>
      <button onClick={() => onOpen(item)} style={{padding:'6px 14px',fontSize:'12px',fontWeight:'700',background:'#1a1a1a',border:'1px solid #FF6B00',color:'#FF6B00',borderRadius:'6px',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>Otevrit</button>
      <button onClick={() => onDelete(item.id)} style={{padding:'6px 10px',fontSize:'12px',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'6px',cursor:'pointer',flexShrink:0}}>x</button>
    </div>
  )
}

function renderLine(line, i) {
  var t = line.trim()

  // Preskoc oddelovace
  if (t === '---' || t === '***' || t === '') return <div key={i} style={{height:'4px'}} />

  // Inline markdown: **bold** a *italic*
  function parseInline(str) {
    var out = []
    var re = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g
    var last = 0
    var m
    while ((m = re.exec(str)) !== null) {
      if (m.index > last) out.push(str.slice(last, m.index))
      if (m[2]) out.push(<strong key={m.index}>{m[2]}</strong>)
      else if (m[3]) out.push(<em key={m.index}>{m[3]}</em>)
      last = m.index + m[0].length
    }
    if (last < str.length) out.push(str.slice(last))
    return out.length === 0 ? str : out
  }

  // Sekce
  if (t.includes('KRITICKE') || t.includes('KRITICK'))
    return <div key={i} style={{color:'#ff4444',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #ff4444',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('VYSOKA'))
    return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #FF6B00',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('STREDNI'))
    return <div key={i} style={{color:'#ffcc00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #ffcc00',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('QUICK'))
    return <div key={i} style={{color:'#00ccff',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #00ccff',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('DOPORUCENA') || t.includes('PRIORITIZACE') || t.includes('AKCNI'))
    return <div key={i} style={{color:'#aaffaa',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #4CAF50',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>

  if (line.startsWith('# '))
    return <div key={i} style={{color:'white',fontWeight:'900',fontSize:'22px',marginTop:'28px',marginBottom:'10px',fontFamily:'Arial Black,Arial'}}>{parseInline(line.slice(2))}</div>
  if (line.startsWith('## '))
    return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'15px',marginTop:'20px',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'1px'}}>{parseInline(line.slice(3))}</div>
  if (line.startsWith('### '))
    return <div key={i} style={{color:'#ccc',fontWeight:'700',fontSize:'14px',marginTop:'16px',marginBottom:'4px'}}>{parseInline(line.slice(4))}</div>

  if (/^\*?\*?\d+\./.test(t)) {
    var cleaned = t.replace(/^\*\*(\d+\..+?)\*\*$/, '$1').replace(/^\*\*/, '')
    return <div key={i} style={{color:'#ddd',marginTop:'14px',paddingLeft:'8px',fontFamily:'Arial,sans-serif',fontWeight:'600'}}>{parseInline(cleaned)}</div>
  }
  if (t.startsWith('- ') || t.startsWith('* '))
    return <div key={i} style={{color:'#aaa',paddingLeft:'20px',marginTop:'5px',fontSize:'14px',fontFamily:'Arial,sans-serif'}}>{parseInline(t.slice(2))}</div>
  if (/^(Proc to boli|Jak opravit|Jak na to|Dopad|Clarity signal|Jak overit):/.test(t))
    return <div key={i} style={{color:'#888',paddingLeft:'16px',marginTop:'4px',fontSize:'14px',fontFamily:'Arial,sans-serif',fontStyle:'italic'}}>{parseInline(t)}</div>

  return <div key={i} style={{color:'#ccc',marginTop:'6px',fontSize:'15px',fontFamily:'Arial,sans-serif',lineHeight:'1.7'}}>{parseInline(line)}</div>
}

const AUTH_KEY = 'kris_auth_token'

export default function Home() {
  var [clientUrl, setClientUrl] = useState('')
  var [loading, setLoading] = useState(false)
  var [error, setError] = useState('')
  var [analysis, setAnalysis] = useState('')
  var [displayUrl, setDisplayUrl] = useState('')
  var [withClarity, setWithClarity] = useState(true)
  var [seconds, setSeconds] = useState(0)
  var [phaseIndex, setPhaseIndex] = useState(0)
  var [history, setHistory] = useState([])
  var [totalSeconds, setTotalSeconds] = useState(null)
  var [copied, setCopied] = useState(false)
  var [authToken, setAuthToken] = useState(null)
  var [authCode, setAuthCode] = useState('')
  var [authError, setAuthError] = useState('')
  var [authLoading, setAuthLoading] = useState(false)
  var [shopSegment, setShopSegment] = useState('')
  var [shopObrat, setShopObrat] = useState('')
  var [shopProblem, setShopProblem] = useState('')
  var [preflightDone, setPreflightDone] = useState(false)
  var [preflightLoading, setPreflightLoading] = useState(false)
  var [detectedCategory, setDetectedCategory] = useState('')
  var [screenshots, setScreenshots] = useState({}) // { slotId: { thumb: base64, status: 'uploading'|'ok'|'error' } }
  var [sessionId, setSessionId] = useState('')
  var [viewingGallery, setViewingGallery] = useState(null) // {sessionId, slots}
  var timerRef = useRef(null)
  var phaseRef = useRef(null)
  var preflightRef = useRef(null)
  var lastPreflightUrl = useRef('')

  useEffect(function() {
    try {
      var saved = localStorage.getItem(HISTORY_KEY)
      if (saved) setHistory(JSON.parse(saved))
      var token = localStorage.getItem(AUTH_KEY)
      if (token) {
        // Overeni veku tokenu (format: timestamp.signature)
        var parts = token.split('.')
        if (parts.length === 2) {
          var ts = parseInt(parts[0])
          var age = Date.now() - ts
          if (isNaN(age) || age > 24 * 60 * 60 * 1000 || age < 0) {
            localStorage.removeItem(AUTH_KEY)
            return
          }
        } else {
          localStorage.removeItem(AUTH_KEY)
          return
        }
        setAuthToken(token)
      }
    } catch(e) {}
  }, [])

  async function handleAuth() {
    if (!authCode.trim() || authCode.length !== 6) return
    setAuthLoading(true)
    setAuthError('')
    try {
      var res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: authCode.trim() }),
      })
      var data = await res.json()
      if (data.ok) {
        setAuthToken(data.token)
        localStorage.setItem(AUTH_KEY, data.token)
        setAuthCode('')
      } else {
        setAuthError(data.error || 'Neplatny kod')
      }
    } catch(e) {
      setAuthError('Chyba spojeni')
    }
    setAuthLoading(false)
  }

  useEffect(function() {
    if (loading) {
      setSeconds(0)
      setPhaseIndex(0)
      timerRef.current = setInterval(function() { setSeconds(function(s) { return s + 1 }) }, 1000)
      function rotate() {
        setPhaseIndex(function(i) { return (i + 1) % LOADING_PHASES.length })
        phaseRef.current = setTimeout(rotate, Math.random() * 7000 + 8000)
      }
      phaseRef.current = setTimeout(rotate, Math.random() * 7000 + 8000)
    } else {
      clearInterval(timerRef.current)
      clearTimeout(phaseRef.current)
    }
    return function() {
      clearInterval(timerRef.current)
      clearTimeout(phaseRef.current)
    }
  }, [loading])

  // Preflight: po zadani URL s debounce 800ms
  useEffect(function() {
    clearTimeout(preflightRef.current)
    var url = clientUrl.trim()
    if (!url || url.length < 4 || loading) return
    var normalized = url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
    if (normalized === lastPreflightUrl.current) return

    preflightRef.current = setTimeout(function() {
      var fetchUrl = url.startsWith('http') ? url : 'https://' + url
      setPreflightLoading(true)
      setPreflightDone(false)
      setDetectedCategory('')
      fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientUrl: fetchUrl, action: 'preflight', authToken: authToken }),
      })
        .then(function(res) {
          if (res.status === 401) {
            setAuthToken(null)
            localStorage.removeItem(AUTH_KEY)
            setError('Token vyprsel, prihlas se znovu')
            setPreflightLoading(false)
            return null
          }
          return res.json()
        })
        .then(function(data) {
          if (!data) return
          lastPreflightUrl.current = normalized
          setPreflightDone(true)
          setPreflightLoading(false)
          if (data.detectedCategory) setDetectedCategory(data.detectedCategory)
          if (data.questions) {
            var segQ = data.questions.find(function(q) { return q.id === 'segment' })
            if (segQ && segQ.detected && !shopSegment) setShopSegment(segQ.detected)
          }
        })
        .catch(function() { setPreflightLoading(false) })
    }, 800)
    return function() { clearTimeout(preflightRef.current) }
  }, [clientUrl])

  function saveToHistory(url, text, dur, sid, uploadedSlots) {
    var item = {
      id: Date.now(),
      url: url,
      analysis: text,
      date: new Date().toLocaleDateString('cs-CZ'),
      seconds: dur,
      sessionId: sid || null,
      uploadedSlots: uploadedSlots || [],
    }
    var updated = [item].concat(history).slice(0, MAX_HISTORY)
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch(e) {}
  }

  function deleteFromHistory(id) {
    var updated = history.filter(function(it) { return it.id !== id })
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch(e) {}
  }

  function openFromHistory(item) {
    setDisplayUrl(item.url)
    setAnalysis(item.analysis)
    setTotalSeconds(item.seconds)
    if (item.sessionId && item.uploadedSlots && item.uploadedSlots.length > 0) {
      setViewingGallery({ sessionId: item.sessionId, slots: item.uploadedSlots })
    } else {
      setViewingGallery(null)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function ensureSessionId() {
    if (sessionId) return sessionId
    var id = (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '') : (Date.now().toString(36) + Math.random().toString(36).slice(2))).slice(0, 32)
    setSessionId(id)
    return id
  }

  async function uploadChunk(sid, targetSlot, base64) {
    setScreenshots(function(prev) {
      var next = Object.assign({}, prev)
      next[targetSlot] = { thumb: base64, status: 'uploading' }
      return next
    })
    try {
      var res = await fetch('/api/upload-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authToken: authToken, sessionId: sid, slotId: targetSlot, base64: base64 }),
      })
      if (res.status === 401) {
        setAuthToken(null)
        localStorage.removeItem(AUTH_KEY)
        setError('Token vyprsel, prihlas se znovu')
        setScreenshots({})
        setSessionId('')
        return
      }
      var data = await res.json()
      if (!data.ok && data.error) {
        setError('Upload chyba: ' + data.error)
      }
      setScreenshots(function(prev) {
        var next = Object.assign({}, prev)
        next[targetSlot] = { thumb: base64, status: data.ok ? 'ok' : 'error' }
        return next
      })
    } catch (e) {
      setError('Upload chyba: ' + e.message)
      setScreenshots(function(prev) {
        var next = Object.assign({}, prev)
        next[targetSlot] = { thumb: base64, status: 'error' }
        return next
      })
    }
  }

  async function handleScreenshot(slotId, file) {
    if (!file) return
    var sid = ensureSessionId()
    var group = findSlotGroup(slotId)
    if (group) {
      var chunks = await resizeAndSplit(file)
      var startIdx = group.indexOf(slotId)
      var targetSlots = []
      for (var i = 0; i < chunks.length && startIdx + i < group.length; i++) {
        targetSlots.push(group[startIdx + i])
      }
      await Promise.all(targetSlots.map(function(s, i) { return uploadChunk(sid, s, chunks[i]) }))
    } else {
      var base64 = await resizeSingle(file)
      await uploadChunk(sid, slotId, base64)
    }
  }

  async function removeScreenshot(slotId) {
    setScreenshots(function(prev) {
      var next = Object.assign({}, prev)
      delete next[slotId]
      return next
    })
    if (sessionId) {
      try {
        await fetch('/api/upload-screenshot?sessionId=' + sessionId + '&slotId=' + slotId + '&token=' + encodeURIComponent(authToken), { method: 'DELETE' })
      } catch (e) {}
    }
  }

  function handleNovaAnalyza() {
    setAnalysis('')
    setDisplayUrl('')
    setTotalSeconds(null)
    setPreflightDone(false)
    setPreflightLoading(false)
    setDetectedCategory('')
    setShopSegment('')
    setShopObrat('')
    setShopProblem('')
    setScreenshots({})
    setSessionId('')
    setViewingGallery(null)
    lastPreflightUrl.current = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCopy() {
    if (!analysis) return
    navigator.clipboard.writeText(analysis).then(function() {
      setCopied(true)
      setTimeout(function() { setCopied(false) }, 2000)
    })
  }

  function handlePrint() {
    var now = new Date()
    var hh = String(now.getHours()).padStart(2, '0')
    var mm = String(now.getMinutes()).padStart(2, '0')
    var orig = document.title
    document.title = 'CRO Report - ' + displayUrl + ' - ' + hh + ':' + mm
    window.print()
    document.title = orig
  }

  async function handleAnalyze() {
    if (!clientUrl.trim()) return
    setLoading(true)
    setError('')
    setAnalysis('')
    setTotalSeconds(null)
    var url = clientUrl.trim()
    var startTime = Date.now()

    try {
      var res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientUrl: url, withClarity: withClarity, authToken: authToken, shopContext: { segment: shopSegment, obrat: shopObrat, problem: shopProblem }, sessionId: sessionId }),
      })

      if (!res.ok || !res.body) {
        var errData = await res.json().catch(function() { return { error: 'Chyba serveru' } })
        if (res.status === 401) {
          setAuthToken(null)
          localStorage.removeItem(AUTH_KEY)
        }
        setError('Chyba: ' + (errData.error || res.status))
        setLoading(false)
        return
      }

      var reader = res.body.getReader()
      var decoder = new TextDecoder()
      var accumulated = ''
      var buffer = ''

      while (true) {
        var result = await reader.read()
        if (result.done) break
        buffer += decoder.decode(result.value, { stream: true })
        var lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (var li = 0; li < lines.length; li++) {
          var line = lines[li]
          if (!line.startsWith('data: ')) continue
          var data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            var parsed = JSON.parse(data)
            if (parsed.chunk) accumulated += parsed.chunk
            if (parsed.error) setError('Chyba: ' + parsed.error)
          } catch(e) {}
        }
      }

      var elapsed = Math.round((Date.now() - startTime) / 1000)
      var clean = cleanDashes(accumulated)
      setDisplayUrl(url)
      setAnalysis(clean)
      setTotalSeconds(elapsed)
      setClientUrl('')
      var uploadedSlots = Object.keys(screenshots).filter(function(k) { return screenshots[k].status === 'ok' })
      if (sessionId && uploadedSlots.length > 0) {
        setViewingGallery({ sessionId: sessionId, slots: uploadedSlots })
      }
      saveToHistory(url, clean, elapsed, sessionId, uploadedSlots)
      // Report se uklada server-side v route.js po dokonceni streamu
    } catch(e) {
      setError('Chyba spojeni: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          html, body { background: white !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body > div { background: white !important; padding: 0 !important; }
          .print-area { background: white !important; border: none !important; padding: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
          .print-area div { color: black !important; }
          @page { margin: 15mm; size: A4; }
        }
      `}</style>

      <div style={{minHeight:'100vh',background:'#111',fontFamily:'Arial Black,Arial,sans-serif',padding:'20px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',paddingTop:'40px'}}>

          <div className="no-print" style={{textAlign:'center',marginBottom:'40px'}}>
            <Logo />
            <h1 style={{fontSize:'32px',fontWeight:'900',color:'white',margin:'0 0 6px 0',textTransform:'uppercase'}}>CRO Analyza</h1>
            <h2 style={{fontSize:'16px',fontWeight:'700',color:'#FF6B00',margin:'0',textTransform:'uppercase',letterSpacing:'3px'}}>Trzbě a marzi Zdar!</h2>
          </div>

          {!authToken && (
            <div className="no-print" style={{background:'#1a1a1a',border:'2px solid #FF6B00',borderRadius:'16px',padding:'32px',marginBottom:'32px',textAlign:'center'}}>
              <div style={{fontSize:'15px',fontWeight:'700',color:'white',marginBottom:'8px'}}>Pristup chraneny</div>
              <p style={{color:'#888',fontSize:'13px',fontFamily:'Arial,sans-serif',marginTop:'0',marginBottom:'20px'}}>Zadej 6-mistny kod z Authenticator aplikace</p>
              <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'12px'}}>
                <input
                  value={authCode}
                  onChange={function(e) { setAuthCode(e.target.value.replace(/\D/g, '').slice(0, 6)) }}
                  placeholder="000000"
                  onKeyDown={function(e) { if (e.key === 'Enter') handleAuth() }}
                  style={{width:'160px',padding:'14px 18px',fontSize:'22px',fontWeight:'900',textAlign:'center',letterSpacing:'8px',background:'#111',border:'2px solid #333',borderRadius:'8px',color:'white',fontFamily:'monospace',outline:'none'}}
                  onFocus={function(e) { e.target.style.borderColor='#FF6B00' }}
                  onBlur={function(e) { e.target.style.borderColor='#333' }}
                  autoFocus
                />
                <button
                  onClick={handleAuth}
                  disabled={authLoading || authCode.length !== 6}
                  style={{padding:'14px 28px',fontSize:'15px',fontWeight:'900',textTransform:'uppercase',background:authLoading||authCode.length!==6?'#333':'#FF6B00',color:authLoading||authCode.length!==6?'#666':'white',border:'none',borderRadius:'8px',cursor:authLoading||authCode.length!==6?'not-allowed':'pointer'}}
                >
                  {authLoading ? '...' : 'Overit'}
                </button>
              </div>
              {authError && <div style={{color:'#ff4444',fontSize:'13px',fontFamily:'Arial,sans-serif'}}>{authError}</div>}
            </div>
          )}

          {authToken && <div className="no-print" style={{background:'#1a1a1a',border:'2px solid #FF6B00',borderRadius:'16px',padding:'32px',marginBottom:'32px'}}>
            <p style={{color:'#888',fontSize:'14px',marginTop:'0',marginBottom:'20px',textAlign:'center',fontFamily:'Arial,sans-serif'}}>
              Zadej web klienta a AI agent vygeneruje CRO analyzu podle metodologie ESHOP BOOSTER
            </p>
            <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
              <input
                value={clientUrl}
                onChange={function(e) { setClientUrl(e.target.value) }}
                placeholder="www.profi-dj.cz, eshop.cz, ..."
                onKeyDown={function(e) { if (e.key === 'Enter') handleAnalyze() }}
                style={{flex:1,padding:'14px 18px',fontSize:'16px',background:'#111',border:'2px solid #333',borderRadius:'8px',color:'white',fontFamily:'Arial,sans-serif',outline:'none'}}
                onFocus={function(e) { e.target.style.borderColor='#FF6B00' }}
                onBlur={function(e) { e.target.style.borderColor='#333' }}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !clientUrl.trim()}
                style={{padding:'14px 28px',fontSize:'15px',fontWeight:'900',textTransform:'uppercase',background:loading||!clientUrl.trim()?'#333':'#FF6B00',color:loading||!clientUrl.trim()?'#666':'white',border:'none',borderRadius:'8px',cursor:loading||!clientUrl.trim()?'not-allowed':'pointer',whiteSpace:'nowrap'}}
              >
                {loading ? 'Analyzuji...' : 'Spustit'}
              </button>
            </div>

            <div onClick={function() { setWithClarity(function(v) { return !v }) }} style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',userSelect:'none',padding:'10px 14px',borderRadius:'8px',background:withClarity?'#0d1f0d':'#1a1a1a',border:'1px solid ' + (withClarity?'#2a6b2a':'#333'),transition:'all 0.2s'}}>
              <div style={{width:'18px',height:'18px',borderRadius:'4px',border:'2px solid ' + (withClarity?'#4CAF50':'#555'),background:withClarity?'#4CAF50':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {withClarity && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div>
                <div style={{color:withClarity?'#4CAF50':'#666',fontSize:'13px',fontWeight:'700',fontFamily:'Arial,sans-serif'}}>
                  {withClarity ? 'Klient ma Clarity nainstalovanou' : 'Klient nema Clarity'}
                </div>
                <div style={{color:'#555',fontSize:'11px',fontFamily:'Arial,sans-serif',marginTop:'2px'}}>
                  {withClarity ? 'U doporuceni budu davat konkretni navod jak to overit v Clarity UI' : 'Quick Win #1 = instalovat Clarity pres GTM'}
                </div>
              </div>
            </div>

            {(preflightLoading || preflightDone) && (
              <div style={{marginTop:'16px',paddingTop:'16px',borderTop:'1px solid #222'}}>
                {preflightLoading && (
                  <div style={{color:'#FF6B00',fontSize:'12px',fontFamily:'Arial,sans-serif',fontWeight:'600',display:'flex',alignItems:'center',gap:'8px'}}>
                    <svg width="14" height="14" style={{animation:'spin-arc 1s linear infinite'}}><circle cx="7" cy="7" r="5" fill="none" stroke="#FF6B00" strokeWidth="2" strokeDasharray="12 20" strokeLinecap="round"/></svg>
                    Analyzuji web...
                  </div>
                )}
                {preflightDone && (
                  <>
                    {detectedCategory && (
                      <div style={{color:'#4CAF50',fontSize:'12px',fontFamily:'Arial,sans-serif',fontWeight:'600',marginBottom:'10px'}}>
                        Detekovana kategorie: {detectedCategory}
                      </div>
                    )}
                    <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'10px',fontFamily:'Arial,sans-serif'}}>Upresnete kontext pro presnejsi analyzu</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
                      {[
                        { val: shopSegment, set: setShopSegment, placeholder: 'Segment', opts: [['elektro','Elektro'],['pc-gaming-mobily','PC / Gaming / Mobily'],['moda-obleceni','Moda / Obleceni'],['obuv','Obuv'],['sperky-doplnky','Sperky / Doplnky'],['kosmetika-parfemy','Kosmetika / Parfemy'],['zdravi-lekarna','Zdravi / Lekarna'],['detske-zbozi','Detske zbozi'],['sport-fitness','Sport / Fitness'],['nabytek-bydleni','Nabytek / Bydleni'],['zahrada-dilna','Zahrada / Dilna'],['auto-moto','Auto / Moto'],['jidlo-napoje','Jidlo / Napoje'],['knihy-media','Knihy / Media'],['chovatelske-potreby','Chovatelske potreby'],['darky-zabava','Darky / Zabava'],['jine','Jine']] },
                        { val: shopObrat, set: setShopObrat, placeholder: 'Rocni obrat', opts: [['do1m','Do 1M Kc'],['1-10m','1-10M Kc'],['10-50m','10-50M Kc'],['50m+','50M+ Kc']] },
                        { val: shopProblem, set: setShopProblem, placeholder: 'Hlavni problem', opts: [['nizka-konverze','Nizka konverze'],['opusteny-kosik','Opusteny kosik'],['nizky-aov','Nizky prumer objednavky'],['bounce','Vysoky bounce rate'],['mobilni','Problemy na mobilu'],['jine','Jine']] },
                      ].map(function(sel, si) {
                        return (
                          <select key={si} value={sel.val} onChange={function(e) { sel.set(e.target.value) }}
                            style={{padding:'9px 10px',fontSize:'12px',background:'#111',border:'1px solid ' + (sel.val ? '#FF6B00' : '#333'),borderRadius:'6px',color:sel.val ? '#FF6B00' : '#555',fontFamily:'Arial,sans-serif',outline:'none',cursor:'pointer'}}>
                            <option value="">{sel.placeholder}</option>
                            {sel.opts.map(function(o) { return <option key={o[0]} value={o[0]}>{o[1]}</option> })}
                          </select>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {preflightDone && (
              <div style={{marginTop:'16px',paddingTop:'16px',borderTop:'1px solid #222'}}>
                <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'10px',fontFamily:'Arial,sans-serif'}}>Screenshoty stranek (volitelne)</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                  {SCREENSHOT_SLOTS.map(function(slot) {
                    var sc = screenshots[slot.id]
                    var hasImg = !!sc
                    var borderColor = '#333'
                    if (hasImg) {
                      if (sc.status === 'ok') borderColor = '#FF6B00'
                      else if (sc.status === 'uploading') borderColor = '#ffcc00'
                      else if (sc.status === 'error') borderColor = '#ff4444'
                    }
                    return (
                      <div key={slot.id} style={{position:'relative',border:'1px solid ' + borderColor,borderRadius:'6px',overflow:'hidden',background:'#111'}}>
                        {hasImg ? (
                          <div style={{position:'relative'}}>
                            <img src={'data:image/jpeg;base64,' + sc.thumb} alt={slot.label} style={{width:'100%',maxHeight:'80px',objectFit:'cover',display:'block'}} />
                            <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'2px'}}>
                              <span style={{color:borderColor,fontSize:'11px',fontWeight:'700',fontFamily:'Arial,sans-serif'}}>{slot.label}</span>
                              {sc.status === 'uploading' && <span style={{color:'#ffcc00',fontSize:'9px',fontFamily:'Arial,sans-serif'}}>Nahravam...</span>}
                              {sc.status === 'error' && <span style={{color:'#ff4444',fontSize:'9px',fontFamily:'Arial,sans-serif'}}>Chyba</span>}
                            </div>
                            <button onClick={function() { removeScreenshot(slot.id) }} style={{position:'absolute',top:'4px',right:'4px',width:'18px',height:'18px',borderRadius:'50%',border:'none',background:'#ff4444',color:'white',fontSize:'11px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',padding:0,lineHeight:1}}>x</button>
                          </div>
                        ) : (
                          <label style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 8px',cursor:'pointer',gap:'6px'}}>
                            <span style={{color:'#555',fontSize:'11px',fontFamily:'Arial,sans-serif'}}>{slot.label}</span>
                            <input type="file" accept="image/png,image/jpeg,image/webp" style={{display:'none'}} onChange={function(e) { if (e.target.files[0]) handleScreenshot(slot.id, e.target.files[0]) }} />
                          </label>
                        )}
                      </div>
                    )
                  })}
                </div>
                {Object.keys(screenshots).length > 0 && (() => {
                  var vals = Object.values(screenshots)
                  var ok = vals.filter(function(s) { return s.status === 'ok' }).length
                  var uploading = vals.filter(function(s) { return s.status === 'uploading' }).length
                  var err = vals.filter(function(s) { return s.status === 'error' }).length
                  return (
                    <div style={{color:'#4CAF50',fontSize:'11px',fontFamily:'Arial,sans-serif',marginTop:'8px'}}>
                      {ok} nahrano{uploading > 0 ? ', ' + uploading + ' se nahrava' : ''}{err > 0 ? ', ' + err + ' chyba' : ''}
                    </div>
                  )
                })()}
              </div>
            )}

            {error && <div style={{marginTop:'16px',padding:'14px',background:'#2a0a0a',border:'2px solid #aa0000',borderRadius:'8px',color:'#ff4444',fontSize:'14px',fontFamily:'Arial,sans-serif'}}>{error}</div>}
            {loading && <LoadingAnimation seconds={seconds} phase={LOADING_PHASES[phaseIndex]} />}
          </div>}

          {authToken && history.length > 0 && !loading && !analysis && (
            <div className="no-print" style={{background:'#1a1a1a',border:'1px solid #2a2a2a',borderRadius:'12px',padding:'20px',marginBottom:'32px'}}>
              <div style={{color:'#666',fontSize:'12px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'14px',fontFamily:'Arial,sans-serif'}}>Posledni analyzy</div>
              {history.map(function(item) { return <HistoryItem key={item.id} item={item} onOpen={openFromHistory} onDelete={deleteFromHistory} /> })}
            </div>
          )}

          {authToken && analysis && (
            <div className="print-area" style={{background:'#1a1a1a',border:'2px solid #333',borderRadius:'16px',padding:'32px'}}>
              <div className="no-print" style={{display:'flex',justifyContent:'flex-end',marginBottom:'16px'}}>
                <button onClick={handleNovaAnalyza} style={{padding:'8px 16px',fontSize:'12px',fontWeight:'700',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'8px',cursor:'pointer'}}>Nova analyza</button>
              </div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'16px',borderBottom:'2px solid #333'}}>
                <div>
                  <div style={{color:'#FF6B00',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',marginBottom:'4px'}}>AI CRO Analyza</div>
                  <div style={{color:'white',fontSize:'22px',fontWeight:'900'}}>{displayUrl}</div>
                  {totalSeconds && <div style={{color:'#555',fontSize:'12px',fontFamily:'Arial,sans-serif',marginTop:'4px'}}>Vygenerovano za {totalSeconds}s</div>}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px',alignItems:'flex-end'}}>
                  <div style={{background:'#FF6B00',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',color:'white',textTransform:'uppercase'}}>ESHOP BOOSTER</div>
                  <div className="no-print" style={{display:'flex',gap:'8px'}}>
                    <button onClick={handleCopy} style={{padding:'8px 14px',fontSize:'12px',fontWeight:'700',background:copied?'#1a3a1a':'#1a1a1a',border:'1px solid ' + (copied?'#4CAF50':'#555'),color:copied?'#4CAF50':'#aaa',borderRadius:'8px',cursor:'pointer',textTransform:'uppercase'}}>
                      {copied ? 'Skopirovano!' : 'Kopirovat'}
                    </button>
                    <button onClick={handlePrint} style={{padding:'8px 14px',fontSize:'12px',fontWeight:'700',background:'#1a1a1a',border:'1px solid #555',color:'#aaa',borderRadius:'8px',cursor:'pointer',textTransform:'uppercase'}}>PDF</button>
                  </div>
                </div>
              </div>

              <div style={{fontFamily:'Arial,sans-serif',lineHeight:'1.7'}}>
                {analysis.split('\n').map(function(line, i) { return renderLine(line, i) })}
              </div>

              {viewingGallery && viewingGallery.slots.length > 0 && (
                <div className="no-print" style={{marginTop:'32px',paddingTop:'24px',borderTop:'2px solid #333'}}>
                  <div style={{color:'#FF6B00',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',marginBottom:'16px'}}>
                    Screenshoty z teto analyzy ({viewingGallery.slots.length})
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
                    {viewingGallery.slots.map(function(slot) {
                      var slotDef = SCREENSHOT_SLOTS.find(function(s) { return s.id === slot })
                      var label = slotDef ? slotDef.label : slot
                      var src = '/api/screenshot?sessionId=' + encodeURIComponent(viewingGallery.sessionId) + '&slot=' + encodeURIComponent(slot) + '&token=' + encodeURIComponent(authToken || '')
                      return (
                        <a key={slot} href={src} target="_blank" rel="noreferrer" style={{border:'1px solid #333',borderRadius:'6px',overflow:'hidden',textDecoration:'none',background:'#111'}}>
                          <img src={src} alt={label} style={{width:'100%',display:'block'}} loading="lazy" />
                          <div style={{padding:'6px 10px',color:'#888',fontSize:'11px',fontFamily:'Arial,sans-serif',borderTop:'1px solid #2a2a2a'}}>{label}</div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              <div style={{marginTop:'32px',paddingTop:'16px',borderTop:'1px solid #2a2a2a',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{color:'#333',fontSize:'12px',fontFamily:'Arial,sans-serif'}}>ESHOP BOOSTER 2026 &bull; Ruslan Skopal</div>
                <button className="no-print" onClick={handleNovaAnalyza} style={{padding:'8px 16px',fontSize:'12px',fontWeight:'700',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'8px',cursor:'pointer'}}>Nova analyza</button>
              </div>
            </div>
          )}

          {authToken && (
            <p className="no-print" style={{textAlign:'center',color:'#333',fontSize:'12px',marginTop:'24px',fontFamily:'Arial,sans-serif'}}>
              ESHOP BOOSTER 2026 &bull; KRIS v6 &bull; Ruslan Skopal
            </p>
          )}
        </div>
      </div>
    </>
  )
}
