'use client'
// page_v16.js
// Zmeny oproti v15:
// - cleanUrl(): odstrani https://, www., trailing slash z zobrazene URL
// - Opraveny renderer tabulek: separator radky |---|---| jsou filtrovany
// - Lepsi 3-sloupcovy renderer pro skore tabulku (Oblast | Skore | Komentar)
// - Standardizovany renderer pro CELKOVY POTENCIAL tabulku
// - Emoji v matici spravne zobrazeny (✅ ❌ ⚠️ ❓)

import { useState, useEffect, useRef } from 'react'

const LOADING_PHASES = [
  'Analyzuji URL a kategorii e-shopu...',
  'Hodnotim prvni dojem a homepage...',
  'Prochazim produktove stranky...',
  'Kontroluji fotografie a vizualy...',
  'Vyhodnocuji navigaci a kategorie...',
  'Testuju interni vyhledavani...',
  'Analyzuji objednavkovy proces...',
  'Kontroluji platebni metody a BNPL...',
  'Hledam problemy s trust signaly...',
  'Kontroluji mobilni verzi...',
  'Hodnotim rychlost nacitani...',
  'Analyzuji cenotvorbu a psychologii cen...',
  'Hodnotim copywriting a mikrotexty...',
  'Kontroluji schema.org a structured data...',
  'Hledam konverzni bariery...',
  'Identifikuji silne stranky e-shopu...',
  'Vypocitavam skore v kontextu kategorie...',
  'Prohledavam znalostni bazi KRIS v9...',
  'Aplikuji metodologii ESHOP BOOSTER...',
  'Vypocitavam dopad doporuceni...',
  'Prioritizuji akcni kroky...',
  'Generuji CRO akcni plan...',
  'Sestavuji Quick Wins...',
  'Kalibruji konverzni bariery...',
  'Pripravuji report pro klienta...',
]

const HISTORY_KEY = 'kris_analyzy_v1'
const CHECKS_KEY = 'kris_checks_v1'
const MAX_HISTORY = 5

function cleanDashes(text) {
  var result = ''
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i)
    if ((code === 8211 || code === 8212) && i > 0 && i < text.length - 1) {
      if (text[i-1] === ' ' && text[i+1] === ' ') {
        result = result.slice(0, -1) + ':'
        continue
      }
    }
    result += text[i]
  }
  return result
}

// Vycisti URL pro zobrazeni
function cleanUrl(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
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
      <div style={{marginTop:'10px',color:'#444',fontSize:'11px',fontFamily:'Arial,sans-serif'}}>Analyza trva cca 2-3 minuty</div>
    </div>
  )
}

function HistoryItem({ item, onOpen, onDelete }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background:'#111',border:'1px solid #2a2a2a',borderRadius:'8px',marginBottom:'8px'}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:'#FF6B00',fontWeight:'700',fontSize:'13px',fontFamily:'Arial,sans-serif',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{cleanUrl(item.url)}</div>
        <div style={{color:'#444',fontSize:'11px',fontFamily:'Arial,sans-serif',marginTop:'2px'}}>
          {item.date} &bull; {item.seconds}s &bull; {item.mode === 'top10' ? 'TOP 10' : 'Plna analyza'}
        </div>
      </div>
      <button onClick={() => onOpen(item)} style={{padding:'6px 14px',fontSize:'12px',fontWeight:'700',background:'#1a1a1a',border:'1px solid #FF6B00',color:'#FF6B00',borderRadius:'6px',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>Otevrit</button>
      <button onClick={() => onDelete(item.id)} style={{padding:'6px 10px',fontSize:'12px',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'6px',cursor:'pointer',flexShrink:0}}>x</button>
    </div>
  )
}

function scoreColor(score) {
  if (score >= 75) return '#4CAF50'
  if (score >= 50) return '#FF6B00'
  return '#ff4444'
}

function areaScoreColor(val) {
  if (val >= 7) return '#4CAF50'
  if (val >= 5) return '#FF6B00'
  return '#ff4444'
}

// Zpracovani tabulkovych radku
function parseTableRow(t) {
  if (!t.startsWith('|')) return null
  // Separator radek - preskoc
  if (/^\|[-:\s|]+\|$/.test(t)) return null
  var cells = t.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1)
  if (cells.length === 0) return null
  return cells
}

function renderLine(line, i, checks, onToggleCheck, checkPrefix) {
  var t = line.trim()
  if (t === '---' || t === '***' || t === '') return <div key={i} style={{height:'4px'}} />

  function parseInline(str) {
    var out = []
    var re = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g
    var last = 0, m
    while ((m = re.exec(str)) !== null) {
      if (m.index > last) out.push(str.slice(last, m.index))
      if (m[2]) out.push(<strong key={m.index}>{m[2]}</strong>)
      else if (m[3]) out.push(<em key={m.index}>{m[3]}</em>)
      last = m.index + m[0].length
    }
    if (last < str.length) out.push(str.slice(last))
    return out.length === 0 ? str : out
  }

  // Sekce headery
  if (t.includes('SKORE') && t.includes('E-SHOPU'))
    return <div key={i} style={{color:'#FFD700',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #FFD700',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>

  // Cislo 0-100 = celkove skore
  if (/^\d{1,3}$/.test(t)) {
    var score = parseInt(t, 10)
    if (score >= 0 && score <= 100) {
      var col = scoreColor(score)
      var label = score >= 75 ? 'Dobry stav' : score >= 50 ? 'Prumerny stav' : 'Potrebuje praci'
      return (
        <div key={i} style={{display:'flex',alignItems:'center',gap:'20px',margin:'16px 0',padding:'20px 24px',background:'#111',borderRadius:'12px',border:'2px solid ' + col}}>
          <div style={{textAlign:'center',flexShrink:0}}>
            <div style={{fontSize:'56px',fontWeight:'900',color:col,fontFamily:'Arial Black,Arial',lineHeight:'1'}}>{score}</div>
            <div style={{fontSize:'11px',color:col,fontWeight:'700',letterSpacing:'2px',marginTop:'4px'}}>/ 100</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:'14px',fontWeight:'700',color:col,marginBottom:'6px',fontFamily:'Arial,sans-serif'}}>{label}</div>
            <div style={{height:'10px',background:'#2a2a2a',borderRadius:'5px',overflow:'hidden'}}>
              <div style={{height:'100%',width:score+'%',background:col,borderRadius:'5px'}} />
            </div>
          </div>
        </div>
      )
    }
  }

  // Oblast: X/10 | Komentar: ... (novy format s komentarem)
  var areaWithComment = t.match(/^(.+?):\s*(\d+)\/10\s*\|?\s*(?:Komentar:\s*)?(.*)$/)
  if (areaWithComment && parseInt(areaWithComment[2]) <= 10) {
    var areaVal = parseInt(areaWithComment[2], 10)
    var aCol = areaScoreColor(areaVal)
    var comment = areaWithComment[3] ? areaWithComment[3].trim() : ''
    return (
      <div key={i} style={{display:'grid',gridTemplateColumns:'180px 60px 1fr',gap:'8px',alignItems:'center',marginTop:'6px',fontFamily:'Arial,sans-serif',padding:'4px 0'}}>
        <div style={{color:'#aaa',fontSize:'13px'}}>{areaWithComment[1].trim()}</div>
        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
          <div style={{flex:1,height:'6px',background:'#2a2a2a',borderRadius:'3px',overflow:'hidden'}}>
            <div style={{height:'100%',width:(areaVal*10)+'%',background:aCol,borderRadius:'3px'}} />
          </div>
          <div style={{color:aCol,fontSize:'12px',fontWeight:'700',whiteSpace:'nowrap'}}>{areaVal}/10</div>
        </div>
        {comment && <div style={{color:'#666',fontSize:'12px',fontStyle:'italic'}}>{comment}</div>}
      </div>
    )
  }

  // Oblast X/10 (stary format bez komentare)
  var areaMatch = t.match(/^(.+?):\s*(\d+)\/10$/)
  if (areaMatch) {
    var areaVal2 = parseInt(areaMatch[2], 10)
    var aCol2 = areaScoreColor(areaVal2)
    return (
      <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',marginTop:'8px',fontFamily:'Arial,sans-serif'}}>
        <div style={{width:'220px',flexShrink:0,color:'#aaa',fontSize:'13px'}}>{areaMatch[1].trim()}</div>
        <div style={{flex:1,height:'6px',background:'#2a2a2a',borderRadius:'3px',overflow:'hidden'}}>
          <div style={{height:'100%',width:(areaVal2*10)+'%',background:aCol2,borderRadius:'3px'}} />
        </div>
        <div style={{width:'36px',textAlign:'right',color:aCol2,fontSize:'13px',fontWeight:'700',flexShrink:0}}>{areaVal2}/10</div>
      </div>
    )
  }

  // Tabulkove radky
  if (t.startsWith('|')) {
    // Separator - preskoc
    if (/^\|[-:\s|]+\|$/.test(t)) return null
    var cells = parseTableRow(t)
    if (!cells) return null

    var isHeaderRow = cells.some(c => /^(prvek|oblast|area|priorita|dopad|aktualni stav)/i.test(c))
    var colWidths = cells.length === 2 ? ['40%', '60%'] :
                   cells.length === 3 ? ['30%', '20%', '50%'] :
                   cells.map(() => `${Math.floor(100/cells.length)}%`)

    return (
      <div key={i} style={{display:'grid',gridTemplateColumns:colWidths.join(' '),gap:'1px',marginTop:'2px',borderRadius: isHeaderRow ? '4px 4px 0 0' : '0'}}>
        {cells.map((cell, ci) => (
          <div key={ci} style={{
            padding:'8px 10px',
            background: isHeaderRow ? '#2a2a2a' : (i % 2 === 0 ? '#1e1e1e' : '#181818'),
            fontSize:'13px',
            fontFamily:'Arial,sans-serif',
            color: isHeaderRow ? '#FF6B00' : '#ccc',
            fontWeight: isHeaderRow ? '700' : '400',
            borderBottom:'1px solid #2a2a2a'
          }}>
            {cell}
          </div>
        ))}
      </div>
    )
  }

  // Sekce headery
  if (t.includes('CO DELA DOBRE') || t.includes('CO DĚLÁ DOBŘE'))
    return <div key={i} style={{color:'#4CAF50',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #4CAF50',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('KRITICKE') || t.includes('KRITICK'))
    return <div key={i} style={{color:'#ff4444',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #ff4444',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('VYSOKA'))
    return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #FF6B00',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('STREDNI'))
    return <div key={i} style={{color:'#ffcc00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #ffcc00',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('QUICK') || t.includes('WINS'))
    return <div key={i} style={{color:'#00ccff',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #00ccff',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('TOP 10') || t.includes('AKCNI'))
    return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #FF6B00',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('DUVERYHODNOSTNI') || t.includes('DŮVĚRYHODNOSTNÍ'))
    return <div key={i} style={{color:'#cc88ff',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #cc88ff',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('ROADMAP') || t.includes('IMPLEMENTACE'))
    return <div key={i} style={{color:'#aaffaa',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #4CAF50',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>
  if (t.includes('CELKOVY') || t.includes('POTENCIAL'))
    return <div key={i} style={{color:'#FFD700',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #FFD700',paddingLeft:'12px',fontFamily:'Arial Black,Arial'}}>{parseInline(t)}</div>

  if (line.startsWith('# '))
    return <div key={i} style={{color:'white',fontWeight:'900',fontSize:'22px',marginTop:'28px',marginBottom:'10px',fontFamily:'Arial Black,Arial'}}>{parseInline(line.slice(2))}</div>
  if (line.startsWith('## '))
    return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'15px',marginTop:'20px',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'1px'}}>{parseInline(line.slice(3))}</div>
  if (line.startsWith('### '))
    return <div key={i} style={{color:'#ccc',fontWeight:'700',fontSize:'14px',marginTop:'16px',marginBottom:'4px'}}>{parseInline(line.slice(4))}</div>

  // Cislovane polozky s checkboxem
  var numMatch = t.match(/^(\d+)\.\s+(.+)/)
  if (numMatch) {
    var num = numMatch[1]
    var checkKey = checkPrefix + '_' + i
    var isChecked = checks[checkKey] || false
    var cleaned = numMatch[2].replace(/^\*\*(.+)\*\*$/, '$1')
    return (
      <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px',marginTop:'14px',paddingLeft:'4px'}}>
        <div
          onClick={() => onToggleCheck(checkKey)}
          style={{
            flexShrink:0, marginTop:'3px',
            width:'18px', height:'18px', borderRadius:'4px',
            border:'2px solid ' + (isChecked ? '#4CAF50' : '#444'),
            background: isChecked ? '#4CAF50' : 'transparent',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.15s'
          }}
        >
          {isChecked && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <div style={{color: isChecked ? '#555' : '#ddd', textDecoration: isChecked ? 'line-through' : 'none', fontFamily:'Arial,sans-serif',fontWeight:'600', transition:'all 0.15s', flex:1}}>
          <span style={{color: isChecked ? '#555' : '#888', marginRight:'6px'}}>{num}.</span>
          {parseInline(cleaned)}
        </div>
      </div>
    )
  }

  if (t.startsWith('- ') || t.startsWith('* '))
    return <div key={i} style={{color:'#aaa',paddingLeft:'20px',marginTop:'5px',fontSize:'14px',fontFamily:'Arial,sans-serif'}}>{parseInline(t.slice(2))}</div>

  if (/^(Proc to boli|Jak opravit|Jak na to|Dopad|Clarity signal|Jak overit|Proc to funguje|Odhadovany dopad|Proc:|Jak:|Dopad:)/.test(t))
    return <div key={i} style={{color:'#888',paddingLeft:'16px',marginTop:'4px',fontSize:'14px',fontFamily:'Arial,sans-serif',fontStyle:'italic'}}>{parseInline(t)}</div>

  return <div key={i} style={{color:'#ccc',marginTop:'6px',fontSize:'15px',fontFamily:'Arial,sans-serif',lineHeight:'1.7'}}>{parseInline(line)}</div>
}

export default function Home() {
  var [clientUrl, setClientUrl] = useState('')
  var [loading, setLoading] = useState(false)
  var [error, setError] = useState('')
  var [analysis, setAnalysis] = useState('')
  var [displayUrl, setDisplayUrl] = useState('')
  var [withClarity, setWithClarity] = useState(true)
  var [reportMode, setReportMode] = useState('full')
  var [seconds, setSeconds] = useState(0)
  var [phaseIndex, setPhaseIndex] = useState(0)
  var [history, setHistory] = useState([])
  var [totalSeconds, setTotalSeconds] = useState(null)
  var [copied, setCopied] = useState(false)
  var [checks, setChecks] = useState({})
  var [currentAnalysisId, setCurrentAnalysisId] = useState(null)
  var [currentMode, setCurrentMode] = useState('full')
  var timerRef = useRef(null)
  var phaseRef = useRef(null)

  useEffect(function() {
    try {
      var saved = localStorage.getItem(HISTORY_KEY)
      if (saved) setHistory(JSON.parse(saved))
      var savedChecks = localStorage.getItem(CHECKS_KEY)
      if (savedChecks) setChecks(JSON.parse(savedChecks))
    } catch(e) {}
  }, [])

  useEffect(function() {
    if (loading) {
      setSeconds(0); setPhaseIndex(0)
      timerRef.current = setInterval(function() { setSeconds(function(s) { return s + 1 }) }, 1000)
      function rotate() {
        setPhaseIndex(function(i) { return (i + 1) % LOADING_PHASES.length })
        phaseRef.current = setTimeout(rotate, Math.random() * 7000 + 8000)
      }
      phaseRef.current = setTimeout(rotate, Math.random() * 7000 + 8000)
    } else {
      clearInterval(timerRef.current); clearTimeout(phaseRef.current)
    }
    return function() { clearInterval(timerRef.current); clearTimeout(phaseRef.current) }
  }, [loading])

  function saveToHistory(url, text, dur, mode) {
    var id = Date.now()
    var item = { id, url, analysis: text, date: new Date().toLocaleDateString('cs-CZ'), seconds: dur, mode }
    var updated = [item].concat(history).slice(0, MAX_HISTORY)
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch(e) {}
    return id
  }

  function deleteFromHistory(id) {
    var updated = history.filter(function(it) { return it.id !== id })
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch(e) {}
  }

  function openFromHistory(item) {
    setDisplayUrl(item.url); setAnalysis(item.analysis); setTotalSeconds(item.seconds)
    setCurrentAnalysisId(item.id); setCurrentMode(item.mode || 'full')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNovaAnalyza() {
    setAnalysis(''); setDisplayUrl(''); setTotalSeconds(null); setCurrentAnalysisId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCopy() {
    if (!analysis) return
    navigator.clipboard.writeText(analysis).then(function() {
      setCopied(true); setTimeout(function() { setCopied(false) }, 2000)
    })
  }

  function handlePrint() {
    var now = new Date()
    var hh = String(now.getHours()).padStart(2, '0')
    var mm = String(now.getMinutes()).padStart(2, '0')
    var orig = document.title
    document.title = 'CRO Report - ' + cleanUrl(displayUrl) + ' - ' + hh + ':' + mm
    window.print()
    document.title = orig
  }

  function handleToggleCheck(checkKey) {
    setChecks(function(prev) {
      var next = Object.assign({}, prev, { [checkKey]: !prev[checkKey] })
      try { localStorage.setItem(CHECKS_KEY, JSON.stringify(next)) } catch(e) {}
      return next
    })
  }

  async function handleAnalyze() {
    if (!clientUrl.trim()) return
    setLoading(true); setError(''); setAnalysis(''); setTotalSeconds(null)
    var url = clientUrl.trim()
    // Pridej https:// pokud chybi
    var fetchUrl = url.startsWith('http') ? url : 'https://' + url
    var startTime = Date.now()

    try {
      var res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientUrl: fetchUrl, withClarity, reportMode }),
      })

      if (!res.ok || !res.body) {
        var errData = await res.json().catch(function() { return { error: 'Chyba serveru' } })
        setError('Chyba: ' + (errData.error || res.status))
        setLoading(false); return
      }

      var reader = res.body.getReader()
      var decoder = new TextDecoder()
      var accumulated = '', buffer = ''

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
      setDisplayUrl(fetchUrl)
      setAnalysis(clean)
      setTotalSeconds(elapsed)
      setCurrentMode(reportMode)
      setClientUrl('')
      var newId = saveToHistory(fetchUrl, clean, elapsed, reportMode)
      setCurrentAnalysisId(newId)
    } catch(e) {
      setError('Chyba spojeni: ' + e.message)
    }
    setLoading(false)
  }

  var checkPrefix = currentAnalysisId ? String(currentAnalysisId) : 'preview'

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          html, body { background: white !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body > div { background: white !important; padding: 0 !important; }
          .print-area { background: white !important; border: none !important; padding: 0 !important; border-radius: 0 !important; }
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

          <div className="no-print" style={{background:'#1a1a1a',border:'2px solid #FF6B00',borderRadius:'16px',padding:'32px',marginBottom:'32px'}}>
            <p style={{color:'#888',fontSize:'14px',marginTop:'0',marginBottom:'20px',textAlign:'center',fontFamily:'Arial,sans-serif'}}>
              Zadej web klienta a AI agent vygeneruje CRO analyzu podle metodologie ESHOP BOOSTER
            </p>

            <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
              <input
                value={clientUrl}
                onChange={function(e) { setClientUrl(e.target.value) }}
                placeholder="www.eshop.cz"
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

            <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
              <button onClick={function() { setReportMode('top10') }} style={{flex:1,padding:'10px',fontSize:'13px',fontWeight:'700',fontFamily:'Arial,sans-serif',background:reportMode==='top10'?'#FF6B00':'#111',color:reportMode==='top10'?'white':'#666',border:'2px solid ' + (reportMode==='top10'?'#FF6B00':'#333'),borderRadius:'8px',cursor:'pointer',transition:'all 0.2s'}}>
                TOP 10
                <div style={{fontSize:'10px',fontWeight:'400',marginTop:'2px',opacity:0.8}}>Kratka verze · ~1 min</div>
              </button>
              <button onClick={function() { setReportMode('full') }} style={{flex:1,padding:'10px',fontSize:'13px',fontWeight:'700',fontFamily:'Arial,sans-serif',background:reportMode==='full'?'#FF6B00':'#111',color:reportMode==='full'?'white':'#666',border:'2px solid ' + (reportMode==='full'?'#FF6B00':'#333'),borderRadius:'8px',cursor:'pointer',transition:'all 0.2s'}}>
                PLNA ANALYZA
                <div style={{fontSize:'10px',fontWeight:'400',marginTop:'2px',opacity:0.8}}>Kompletni report · ~2-3 min</div>
              </button>
            </div>

            <div onClick={function() { setWithClarity(function(v) { return !v }) }} style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',userSelect:'none',padding:'10px 14px',borderRadius:'8px',background:withClarity?'#0d1f0d':'#1a1a1a',border:'1px solid ' + (withClarity?'#2a6b2a':'#333'),transition:'all 0.2s'}}>
              <div style={{width:'18px',height:'18px',borderRadius:'4px',border:'2px solid ' + (withClarity?'#4CAF50':'#555'),background:withClarity?'#4CAF50':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {withClarity && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div style={{color:withClarity?'#4CAF50':'#666',fontSize:'13px',fontWeight:'700',fontFamily:'Arial,sans-serif'}}>
                {withClarity ? 'Mam pristup do Microsoft Clarity' : 'Nemam pristup do Microsoft Clarity'}
              </div>
            </div>

            {error && <div style={{marginTop:'16px',padding:'14px',background:'#2a0a0a',border:'2px solid #aa0000',borderRadius:'8px',color:'#ff4444',fontSize:'14px',fontFamily:'Arial,sans-serif'}}>{error}</div>}
            {loading && <LoadingAnimation seconds={seconds} phase={LOADING_PHASES[phaseIndex]} />}
          </div>

          {history.length > 0 && !loading && !analysis && (
            <div className="no-print" style={{background:'#1a1a1a',border:'1px solid #2a2a2a',borderRadius:'12px',padding:'20px',marginBottom:'32px'}}>
              <div style={{color:'#666',fontSize:'12px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'14px',fontFamily:'Arial,sans-serif'}}>Posledni analyzy</div>
              {history.map(function(item) { return <HistoryItem key={item.id} item={item} onOpen={openFromHistory} onDelete={deleteFromHistory} /> })}
            </div>
          )}

          {analysis && (
            <div className="print-area" style={{background:'#1a1a1a',border:'2px solid #333',borderRadius:'16px',padding:'32px'}}>
              <div className="no-print" style={{display:'flex',justifyContent:'flex-end',marginBottom:'16px'}}>
                <button onClick={handleNovaAnalyza} style={{padding:'8px 16px',fontSize:'12px',fontWeight:'700',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'8px',cursor:'pointer'}}>Nova analyza</button>
              </div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'16px',borderBottom:'2px solid #333'}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                    <div style={{color:'#FF6B00',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase'}}>AI CRO Analyza</div>
                    <div style={{padding:'2px 8px',background:currentMode==='top10'?'#FF6B00':'#333',borderRadius:'4px',fontSize:'10px',fontWeight:'700',color:'white'}}>
                      {currentMode === 'top10' ? 'TOP 10' : 'FULL'}
                    </div>
                  </div>
                  <div style={{color:'white',fontSize:'22px',fontWeight:'900'}}>{cleanUrl(displayUrl)}</div>
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
                {analysis.split('\n').map(function(line, i) {
                  return renderLine(line, i, checks, handleToggleCheck, checkPrefix)
                })}
              </div>

              <div style={{marginTop:'32px',paddingTop:'16px',borderTop:'1px solid #2a2a2a',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{color:'#333',fontSize:'12px',fontFamily:'Arial,sans-serif'}}>ESHOP BOOSTER 2026 &bull; Ruslan Skopal</div>
                <button className="no-print" onClick={handleNovaAnalyza} style={{padding:'8px 16px',fontSize:'12px',fontWeight:'700',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'8px',cursor:'pointer'}}>Nova analyza</button>
              </div>
            </div>
          )}

          <p className="no-print" style={{textAlign:'center',color:'#333',fontSize:'12px',marginTop:'24px',fontFamily:'Arial,sans-serif'}}>
            ESHOP BOOSTER 2026 &bull; KRIS v9 &bull; Ruslan Skopal
          </p>
        </div>
      </div>
    </>
  )
}
