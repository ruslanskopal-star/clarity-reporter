'use client'
import { useState, useEffect, useRef } from 'react'

const LOADING_PHASES = [
  '🔍 Analyzuji URL a kategorii e-shopu...',
  '🏠 Hodnotim prvni dojem a homepage...',
  '🛍️ Procházím produktové stránky...',
  '📸 Kontroluji fotografie a vizualy...',
  '🧭 Vyhodnocuji navigaci a kategorie...',
  '🔎 Testuju interni vyhledavani...',
  '🛒 Analyzuji kosik a checkout...',
  '💳 Kontroluji platebni metody...',
  '⭐ Hledám problémy s trust signaly...',
  '📱 Kontroluji mobilni verzi...',
  '⚡ Hodnotim rychlost nacitani...',
  '💰 Analyzuji cenotvorbu a psychologii cen...',
  '✍️ Hodnotim copywriting a mikrotexty...',
  '🎨 Kontroluji vizualni hierarchii...',
  '📊 Hledám konverzni bariery...',
  '🔬 Prohledavam znalostni bazi KRIS...',
  '🧠 Aplikuji metodologii ESHOP BOOSTER...',
  '📈 Vypocitavam dopad doporuceni...',
  '🎯 Prioritizuji akcni kroky...',
  '🚀 Generuji CRO akcni plan...',
  '📋 Sestavuji Quick Wins seznam...',
  '✅ Overuji kompletnost analyzy...',
  '🏆 Finalizuji doporuceni...',
  '💡 Posledni optimalizace...',
  '📄 Pripravuji report pro klienta...',
]

const HISTORY_KEY = 'kris_analyzy_v1'
const MAX_HISTORY = 5

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
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.12); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @keyframes spin-arc {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fade-phase {
          0% { opacity: 0; transform: translateY(6px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }
      `}</style>
      <div style={{position:'relative',display:'inline-block',marginBottom:'20px'}}>
        <div style={{position:'absolute',top:'-10px',left:'-10px',right:'-10px',bottom:'-10px',borderRadius:'50%',background:'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0) 70%)',animation:'pulse-ring 2s ease-in-out infinite'}} />
        <svg width="90" height="90" style={{animation:'spin-arc 1.4s linear infinite',display:'block'}}>
          <circle cx="45" cy="45" r="38" fill="none" stroke="#2a2a2a" strokeWidth="4"/>
          <circle cx="45" cy="45" r="38" fill="none" stroke="#FF6B00" strokeWidth="4" strokeDasharray="60 180" strokeLinecap="round"/>
        </svg>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)',textAlign:'center',lineHeight:'1'}}>
          <div style={{fontSize:'22px',fontWeight:'900',color:'#FF6B00',fontFamily:'Arial Black, Arial'}}>{seconds}</div>
          <div style={{fontSize:'9px',color:'#666',fontFamily:'Arial, sans-serif',fontWeight:'700',letterSpacing:'1px',marginTop:'1px'}}>SEK</div>
        </div>
      </div>
      <div style={{minHeight:'24px',color:'#aaa',fontSize:'13px',fontFamily:'Arial, sans-serif',fontWeight:'600',letterSpacing:'0.3px',animation:'fade-phase 4s ease-in-out infinite'}}>
        {phase}
      </div>
      <div style={{marginTop:'10px',color:'#444',fontSize:'11px',fontFamily:'Arial, sans-serif'}}>
        Analyza trva cca 3 minuty
      </div>
    </div>
  )
}

function HistoryItem({ item, onOpen, onDelete }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background:'#111',border:'1px solid #2a2a2a',borderRadius:'8px',marginBottom:'8px'}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:'#FF6B00',fontWeight:'700',fontSize:'13px',fontFamily:'Arial, sans-serif',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.url}</div>
        <div style={{color:'#444',fontSize:'11px',fontFamily:'Arial, sans-serif',marginTop:'2px'}}>{item.date} &bull; {item.seconds}s</div>
      </div>
      <button onClick={() => onOpen(item)} style={{padding:'6px 14px',fontSize:'12px',fontWeight:'700',background:'#1a1a1a',border:'1px solid #FF6B00',color:'#FF6B00',borderRadius:'6px',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>
        Otevrit
      </button>
      <button onClick={() => onDelete(item.id)} style={{padding:'6px 10px',fontSize:'12px',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'6px',cursor:'pointer',flexShrink:0}} title="Smazat">
        x
      </button>
    </div>
  )
}

// Pomocna funkce: zpracuj inline markdown (**bold**, *italic*, `code`)
function parseInline(text) {
  const parts = []
  // Regex: **bold**, *italic*, `code`
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let last = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[2] !== undefined) parts.push(<strong key={match.index}>{match[2]}</strong>)
    else if (match[3] !== undefined) parts.push(<em key={match.index}>{match[3]}</em>)
    else if (match[4] !== undefined) parts.push(<code key={match.index} style={{background:'#2a2a2a',padding:'1px 5px',borderRadius:'3px',fontSize:'13px',fontFamily:'monospace'}}>{match[4]}</code>)
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts
}

function renderAnalysis(text) {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()

    // Preskoc prazdne oddelovace ---
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      return <div key={i} style={{height:'4px'}} />
    }

    // Prazdny radek
    if (trimmed === '') return <div key={i} style={{height:'4px'}} />

    // Sekce s barevnym zvyraznenim (KRITICKE, VYSOKA, STREDNI, QUICK, DOPORUCENA)
    if (trimmed.includes('KRITICKE') || trimmed.includes('KRITICK')) {
      return <div key={i} style={{color:'#ff4444',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #ff4444',paddingLeft:'12px',fontFamily:'Arial Black, Arial'}}>{parseInline(trimmed)}</div>
    }
    if (trimmed.includes('VYSOKA')) {
      return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #FF6B00',paddingLeft:'12px',fontFamily:'Arial Black, Arial'}}>{parseInline(trimmed)}</div>
    }
    if (trimmed.includes('STREDNI')) {
      return <div key={i} style={{color:'#ffcc00',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #ffcc00',paddingLeft:'12px',fontFamily:'Arial Black, Arial'}}>{parseInline(trimmed)}</div>
    }
    if (trimmed.includes('QUICK')) {
      return <div key={i} style={{color:'#00ccff',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #00ccff',paddingLeft:'12px',fontFamily:'Arial Black, Arial'}}>{parseInline(trimmed)}</div>
    }
    if (trimmed.includes('DOPORUCENA') || trimmed.includes('PRIORITIZACE') || trimmed.includes('AKCNI')) {
      return <div key={i} style={{color:'#aaffaa',fontWeight:'700',fontSize:'17px',marginTop:'28px',marginBottom:'10px',borderLeft:'4px solid #4CAF50',paddingLeft:'12px',fontFamily:'Arial Black, Arial'}}>{parseInline(trimmed)}</div>
    }

    // H1: # Nadpis
    if (line.startsWith('# ')) {
      return <div key={i} style={{color:'white',fontWeight:'900',fontSize:'22px',marginTop:'28px',marginBottom:'10px',fontFamily:'Arial Black, Arial'}}>{parseInline(line.slice(2))}</div>
    }

    // H2: ## Nadpis
    if (line.startsWith('## ')) {
      return <div key={i} style={{color:'#FF6B00',fontWeight:'700',fontSize:'15px',marginTop:'20px',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'1px',fontFamily:'Arial Black, Arial'}}>{parseInline(line.slice(3))}</div>
    }

    // H3: ### Nadpis
    if (line.startsWith('### ')) {
      return <div key={i} style={{color:'#ccc',fontWeight:'700',fontSize:'14px',marginTop:'16px',marginBottom:'4px',fontFamily:'Arial, sans-serif'}}>{parseInline(line.slice(4))}</div>
    }

    // Cislovany seznam: 1. text nebo **1. text**
    if (/^\*?\*?\d+\./.test(trimmed)) {
      const cleaned = trimmed.replace(/^\*\*(\d+\..+?)\*\*$/, '$1').replace(/^\*\*/, '')
      return <div key={i} style={{color:'#ddd',marginTop:'14px',paddingLeft:'8px',fontFamily:'Arial, sans-serif',fontWeight:'600'}}>{parseInline(cleaned)}</div>
    }

    // Bullet: - text nebo * text
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return <div key={i} style={{color:'#aaa',paddingLeft:'20px',marginTop:'5px',fontSize:'14px',fontFamily:'Arial, sans-serif'}}>{parseInline(trimmed.slice(2))}</div>
    }

    // Odsazeny text (Proc to boli:, Jak opravit:, Dopad: atd.)
    if (/^(Proc to boli|Jak opravit|Jak na to|Dopad|Clarity signal|Jak overit|Jak overit v Clarity):/.test(trimmed)) {
      return <div key={i} style={{color:'#888',paddingLeft:'16px',marginTop:'4px',fontSize:'14px',fontFamily:'Arial, sans-serif',fontStyle:'italic'}}>{parseInline(trimmed)}</div>
    }

    // Tyden/Mesic radky v prioritizaci
    if (/^\*\*Tyden|^\*\*Mesic|^\*\*Tden/.test(trimmed)) {
      return <div key={i} style={{color:'#ccc',marginTop:'8px',paddingLeft:'8px',fontFamily:'Arial, sans-serif'}}>{parseInline(trimmed)}</div>
    }

    // Bezny odstavec
    return <div key={i} style={{color:'#ccc',marginTop:'6px',fontSize:'15px',fontFamily:'Arial, sans-serif',lineHeight:'1.7'}}>{parseInline(line)}</div>
  })
}

export default function Home() {
  const [clientUrl, setClientUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [displayUrl, setDisplayUrl] = useState('')
  const [withClarity, setWithClarity] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [history, setHistory] = useState([])
  const [totalSeconds, setTotalSeconds] = useState(null)
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)
  const phaseRef = useRef(null)
  const analysisRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) setHistory(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (loading) {
      setSeconds(0)
      setPhaseIndex(0)
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
      const randomPhaseTime = () => Math.random() * 7000 + 8000
      const rotatePhaseFn = () => {
        setPhaseIndex(i => (i + 1) % LOADING_PHASES.length)
        phaseRef.current = setTimeout(rotatePhaseFn, randomPhaseTime())
      }
      phaseRef.current = setTimeout(rotatePhaseFn, randomPhaseTime())
    } else {
      clearInterval(timerRef.current)
      clearTimeout(phaseRef.current)
    }
    return () => {
      clearInterval(timerRef.current)
      clearTimeout(phaseRef.current)
    }
  }, [loading])

  function saveToHistory(url, analysisText, durationSeconds) {
    const newItem = {
      id: Date.now(),
      url,
      analysis: analysisText,
      date: new Date().toLocaleDateString('cs-CZ'),
      seconds: durationSeconds,
    }
    const updated = [newItem, ...history].slice(0, MAX_HISTORY)
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch {}
  }

  function deleteFromHistory(id) {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch {}
  }

  function openFromHistory(item) {
    setDisplayUrl(item.url)
    setAnalysis(item.analysis)
    setTotalSeconds(item.seconds)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleAnalyze() {
    if (!clientUrl.trim()) return
    setLoading(true)
    setError('')
    setAnalysis('')
    setTotalSeconds(null)
    const startTime = Date.now()
    const url = clientUrl.trim()

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientUrl: url, withClarity }),
      })

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({ error: 'Chyba serveru' }))
        setError('Chyba: ' + (errData.error || res.status))
        setLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            if (parsed.chunk) accumulated += parsed.chunk
            if (parsed.error) setError('Chyba streamu: ' + parsed.error)
          } catch {}
        }
      }

      const elapsed = Math.round((Date.now() - startTime) / 1000)
      setDisplayUrl(url)
      setAnalysis(accumulated)
      setTotalSeconds(elapsed)
      setClientUrl('')
      saveToHistory(url, accumulated, elapsed)
    } catch (e) {
      setError('Chyba spojeni: ' + e.message)
    }
    setLoading(false)
  }

  function handleCopy() {
    if (!analysis) return
    navigator.clipboard.writeText(analysis).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handlePrint() {
    window.print()
  }

  function handleNovaAnalyza() {
    setAnalysis('')
    setDisplayUrl('')
    setTotalSeconds(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-area {
            background: white !important;
            border: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }
          .print-area div { color: black !important; }
          .print-section-kriticke { border-left-color: #cc0000 !important; color: #cc0000 !important; }
          .print-section-vysoka { border-left-color: #cc4400 !important; color: #cc4400 !important; }
          .print-section-stredni { border-left-color: #886600 !important; color: #886600 !important; }
          .print-section-quick { border-left-color: #006688 !important; color: #006688 !important; }
          .print-section-akcni { border-left-color: #2a6b2a !important; color: #2a6b2a !important; }
          @page { margin: 18mm; }
        }
      `}</style>

      <div style={{minHeight:'100vh',background:'#111',fontFamily:'Arial Black, Arial, sans-serif',padding:'20px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',paddingTop:'40px'}}>

          {/* Header */}
          <div className="no-print" style={{textAlign:'center',marginBottom:'40px'}}>
            <Logo />
            <h1 style={{fontSize:'32px',fontWeight:'900',color:'white',margin:'0 0 6px 0',textTransform:'uppercase'}}>CRO Analyza</h1>
            <h2 style={{fontSize:'16px',fontWeight:'700',color:'#FF6B00',margin:'0',textTransform:'uppercase',letterSpacing:'3px'}}>Trzbě a marzi Zdar!</h2>
          </div>

          {/* Formular */}
          <div className="no-print" style={{background:'#1a1a1a',border:'2px solid #FF6B00',borderRadius:'16px',padding:'32px',marginBottom:'32px'}}>
            <p style={{color:'#888',fontSize:'14px',marginTop:'0',marginBottom:'20px',textAlign:'center',fontFamily:'Arial, sans-serif'}}>
              Zadej web klienta a AI agent vygeneruje CRO analyzu podle metodologie ESHOP BOOSTER
            </p>

            <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
              <input
                value={clientUrl}
                onChange={e => setClientUrl(e.target.value)}
                placeholder="www.profi-dj.cz, eshop.cz, ..."
                onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                style={{flex:1,padding:'14px 18px',fontSize:'16px',background:'#111',border:'2px solid #333',borderRadius:'8px',color:'white',fontFamily:'Arial, sans-serif',outline:'none'}}
                onFocus={e => e.target.style.borderColor='#FF6B00'}
                onBlur={e => e.target.style.borderColor='#333'}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !clientUrl.trim()}
                style={{padding:'14px 28px',fontSize:'15px',fontWeight:'900',textTransform:'uppercase',background:loading||!clientUrl.trim()?'#333':'#FF6B00',color:loading||!clientUrl.trim()?'#666':'white',border:'none',borderRadius:'8px',cursor:loading||!clientUrl.trim()?'not-allowed':'pointer',whiteSpace:'nowrap'}}
              >
                {loading ? 'Analyzuji...' : 'Spustit'}
              </button>
            </div>

            {/* Clarity checkbox */}
            <div
              onClick={() => setWithClarity(v => !v)}
              style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',userSelect:'none',padding:'10px 14px',borderRadius:'8px',background:withClarity?'#0d1f0d':'#1a1a1a',border:`1px solid ${withClarity?'#2a6b2a':'#333'}`,transition:'all 0.2s'}}
            >
              <div style={{width:'18px',height:'18px',borderRadius:'4px',border:`2px solid ${withClarity?'#4CAF50':'#555'}`,background:withClarity?'#4CAF50':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>
                {withClarity && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div>
                <div style={{color:withClarity?'#4CAF50':'#666',fontSize:'13px',fontWeight:'700',fontFamily:'Arial, sans-serif',letterSpacing:'0.5px'}}>
                  {withClarity ? 'Mam pristup do Microsoft Clarity' : 'Nemam pristup do Microsoft Clarity'}
                </div>
                <div style={{color:'#555',fontSize:'11px',fontFamily:'Arial, sans-serif',marginTop:'2px'}}>
                  {withClarity ? 'Analyza bude zahrnovat doporuceni pro heatmapy, rage clicks a session recordings' : 'Analyza bude postavena na best practices bez dat z Clarity'}
                </div>
              </div>
            </div>

            {error && (
              <div style={{marginTop:'16px',padding:'14px',background:'#2a0a0a',border:'2px solid #aa0000',borderRadius:'8px',color:'#ff4444',fontSize:'14px',fontFamily:'Arial, sans-serif'}}>
                {error}
              </div>
            )}

            {loading && <LoadingAnimation seconds={seconds} phase={LOADING_PHASES[phaseIndex]} />}
          </div>

          {/* Historie analyz */}
          {history.length > 0 && !loading && !analysis && (
            <div className="no-print" style={{background:'#1a1a1a',border:'1px solid #2a2a2a',borderRadius:'12px',padding:'20px',marginBottom:'32px'}}>
              <div style={{color:'#666',fontSize:'12px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',marginBottom:'14px',fontFamily:'Arial, sans-serif'}}>
                Posledni analyzy
              </div>
              {history.map(item => (
                <HistoryItem key={item.id} item={item} onOpen={openFromHistory} onDelete={deleteFromHistory} />
              ))}
            </div>
          )}

          {/* Vysledek analyzy */}
          {analysis && (
            <div className="print-area" style={{background:'#1a1a1a',border:'2px solid #333',borderRadius:'16px',padding:'32px'}}>

              {/* Tlacitko Nova analyza NAHORE */}
              <div className="no-print" style={{display:'flex',justifyContent:'flex-end',marginBottom:'16px'}}>
                <button
                  onClick={handleNovaAnalyza}
                  style={{padding:'8px 16px',fontSize:'12px',fontWeight:'700',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'8px',cursor:'pointer'}}
                >
                  Nova analyza
                </button>
              </div>

              {/* Report header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'16px',borderBottom:'2px solid #333'}}>
                <div>
                  <div style={{color:'#FF6B00',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',marginBottom:'4px'}}>AI CRO Analyza</div>
                  <div style={{color:'white',fontSize:'22px',fontWeight:'900'}}>{displayUrl}</div>
                  {totalSeconds && (
                    <div style={{color:'#555',fontSize:'12px',fontFamily:'Arial, sans-serif',marginTop:'4px'}}>
                      Vygenerovano za {totalSeconds}s
                    </div>
                  )}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px',alignItems:'flex-end'}}>
                  <div style={{background:'#FF6B00',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',color:'white',textTransform:'uppercase'}}>ESHOP BOOSTER</div>
                  <div className="no-print" style={{display:'flex',gap:'8px'}}>
                    <button
                      onClick={handleCopy}
                      style={{padding:'8px 14px',fontSize:'12px',fontWeight:'700',background:copied?'#1a3a1a':'#1a1a1a',border:`1px solid ${copied?'#4CAF50':'#555'}`,color:copied?'#4CAF50':'#aaa',borderRadius:'8px',cursor:'pointer',textTransform:'uppercase',letterSpacing:'1px',transition:'all 0.2s'}}
                    >
                      {copied ? 'Skopirovano!' : 'Kopirovat'}
                    </button>
                    <button
                      onClick={handlePrint}
                      style={{padding:'8px 14px',fontSize:'12px',fontWeight:'700',background:'#1a1a1a',border:'1px solid #555',color:'#aaa',borderRadius:'8px',cursor:'pointer',textTransform:'uppercase',letterSpacing:'1px'}}
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Obsah analyzy */}
              <div ref={analysisRef} style={{fontFamily:'Arial, sans-serif',lineHeight:'1.7'}}>
                {renderAnalysis(analysis)}
              </div>

              {/* Footer */}
              <div style={{marginTop:'32px',paddingTop:'16px',borderTop:'1px solid #2a2a2a',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{color:'#333',fontSize:'12px',fontFamily:'Arial, sans-serif'}}>
                  ESHOP BOOSTER 2026 &bull; Ruslan Skopal
                </div>
                <button
                  className="no-print"
                  onClick={handleNovaAnalyza}
                  style={{padding:'8px 16px',fontSize:'12px',fontWeight:'700',background:'transparent',border:'1px solid #333',color:'#555',borderRadius:'8px',cursor:'pointer'}}
                >
                  Nova analyza
                </button>
              </div>
            </div>
          )}

          <p className="no-print" style={{textAlign:'center',color:'#333',fontSize:'12px',marginTop:'24px',fontFamily:'Arial, sans-serif'}}>
            ESHOP BOOSTER 2026 &bull; KRIS v5 &bull; Ruslan Skopal
          </p>
        </div>
      </div>
    </>
  )
}
