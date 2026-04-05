'use client'
import { useState } from 'react'

function Logo() {
  return (
    <div style={{display:'inline-block',background:'#111',padding:'10px 22px',borderRadius:'8px',marginBottom:'20px',lineHeight:'1.2'}}>
      <div style={{display:'flex',alignItems:'center',gap:'0'}}>
        <span style={{fontSize:'22px',fontWeight:'900',color:'white',fontFamily:'Arial Black, Arial'}}>ESH</span>
        <span style={{fontSize:'22px',fontWeight:'900',color:'#FF6B00',fontFamily:'Arial Black, Arial'}}>O</span>
        <span style={{fontSize:'22px',fontWeight:'900',color:'white',fontFamily:'Arial Black, Arial'}}>P</span>
      </div>
      <div style={{fontSize:'13px',fontWeight:'900',color:'#FF6B00',letterSpacing:'3px',fontFamily:'Arial Black, Arial',marginTop:'2px'}}>BOOSTER</div>
    </div>
  )
}

export default function Home() {
  const [clientName, setClientName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [withClarity, setWithClarity] = useState(true)

  async function handleAnalyze() {
    if (!clientName) return
    setLoading(true)
    setError('')
    setAnalysis('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({clientName, withClarity})
      })
      const data = await res.json()
      if (data.success) {
        setDisplayName(clientName)
        setAnalysis(data.analysis)
        setClientName('')
      } else {
        setError('Chyba: ' + data.error)
      }
    } catch {
      setError('Chyba spojeni')
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#111',fontFamily:'Arial Black, Arial, sans-serif',padding:'20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto',paddingTop:'40px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <Logo />
          <h1 style={{fontSize:'32px',fontWeight:'900',color:'white',margin:'0 0 6px 0',textTransform:'uppercase'}}>CRO Analyza</h1>
          <h2 style={{fontSize:'16px',fontWeight:'700',color:'#FF6B00',margin:'0',textTransform:'uppercase',letterSpacing:'3px'}}>Tržbě a marži Zdar!</h2>
        </div>

        <div style={{background:'#1a1a1a',border:'2px solid #FF6B00',borderRadius:'16px',padding:'32px',marginBottom:'32px'}}>
          <p style={{color:'#888',fontSize:'14px',marginTop:'0',marginBottom:'20px',textAlign:'center',fontFamily:'Arial, sans-serif'}}>
            Zadej jmeno klienta a AI vygeneruje CRO analyzu podle metodologie ESHOP BOOSTER
          </p>

          <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
            <input
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              placeholder="napr. Profi-DJ, Fanda-NHL.cz..."
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
              style={{flex:1,padding:'14px 18px',fontSize:'16px',background:'#111',border:'2px solid #333',borderRadius:'8px',color:'white',fontFamily:'Arial, sans-serif',outline:'none'}}
              onFocus={e => e.target.style.borderColor='#FF6B00'}
              onBlur={e => e.target.style.borderColor='#333'}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !clientName}
              style={{padding:'14px 28px',fontSize:'15px',fontWeight:'900',textTransform:'uppercase',background:loading||!clientName?'#333':'#FF6B00',color:loading||!clientName?'#666':'white',border:'none',borderRadius:'8px',cursor:loading||!clientName?'not-allowed':'pointer',whiteSpace:'nowrap'}}
            >
              {loading ? 'Analyzuji...' : 'Spustit'}
            </button>
          </div>

          {/* Clarity toggle */}
          <div
            onClick={() => setWithClarity(v => !v)}
            style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',userSelect:'none',padding:'10px 14px',borderRadius:'8px',background: withClarity ? '#0d1f0d' : '#1a1a1a',border:`1px solid ${withClarity ? '#2a6b2a' : '#333'}`,transition:'all 0.2s'}}
          >
            {/* Custom checkbox */}
            <div style={{width:'18px',height:'18px',borderRadius:'4px',border:`2px solid ${withClarity ? '#4CAF50' : '#555'}`,background: withClarity ? '#4CAF50' : 'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>
              {withClarity && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div>
              <div style={{color: withClarity ? '#4CAF50' : '#666',fontSize:'13px',fontWeight:'700',fontFamily:'Arial, sans-serif',letterSpacing:'0.5px'}}>
                {withClarity ? '✓ Mám přístup do Microsoft Clarity' : 'Nemám přístup do Microsoft Clarity'}
              </div>
              <div style={{color:'#555',fontSize:'11px',fontFamily:'Arial, sans-serif',marginTop:'2px'}}>
                {withClarity ? 'Analýza bude zahrnovat heatmapy, nahrávky a chování uživatelů' : 'Analýza bude postavena na best practices bez dat z Clarity'}
              </div>
            </div>
          </div>

          {error && (
            <div style={{marginTop:'16px',padding:'14px',background:'#2a0a0a',border:'2px solid #aa0000',borderRadius:'8px',color:'#ff4444',fontSize:'14px',fontFamily:'Arial, sans-serif'}}>
              {error}
            </div>
          )}
          {loading && (
            <p style={{color:'#666',fontFamily:'Arial, sans-serif',fontSize:'14px',textAlign:'center',marginTop:'16px'}}>
              AI generuje analyzu, cca 30 sekund...
            </p>
          )}
        </div>

        {analysis && (
          <div style={{background:'#1a1a1a',border:'2px solid #333',borderRadius:'16px',padding:'32px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',paddingBottom:'16px',borderBottom:'2px solid #333'}}>
              <div>
                <div style={{color:'#FF6B00',fontSize:'12px',fontWeight:'700',letterSpacing:'3px',textTransform:'uppercase',marginBottom:'4px'}}>CRO Analyza</div>
                <div style={{color:'white',fontSize:'22px',fontWeight:'900'}}>{displayName}</div>
              </div>
              <div style={{background:'#FF6B00',borderRadius:'8px',padding:'8px 16px',fontSize:'12px',fontWeight:'700',color:'white',textTransform:'uppercase'}}>ESHOP BOOSTER</div>
            </div>
            <div style={{fontFamily:'Arial, sans-serif',lineHeight:'1.7'}}>
              {analysis.split('\n').map((line, i) => (
                <div key={i} style={
                  line.includes('KRITICKE') || line.includes('KRITICK')
                    ? {color:'#ff4444',fontWeight:'700',fontSize:'17px',marginTop:'24px',marginBottom:'8px',borderLeft:'4px solid #ff4444',paddingLeft:'12px'}
                  : line.includes('VYSOKA')
                    ? {color:'#FF6B00',fontWeight:'700',fontSize:'17px',marginTop:'24px',marginBottom:'8px',borderLeft:'4px solid #FF6B00',paddingLeft:'12px'}
                  : line.includes('STREDNI')
                    ? {color:'#ffcc00',fontWeight:'700',fontSize:'17px',marginTop:'24px',marginBottom:'8px',borderLeft:'4px solid #ffcc00',paddingLeft:'12px'}
                  : line.includes('QUICK')
                    ? {color:'#00ccff',fontWeight:'700',fontSize:'17px',marginTop:'24px',marginBottom:'8px',borderLeft:'4px solid #00ccff',paddingLeft:'12px'}
                  : /^\d+\./.test(line)
                    ? {color:'#ddd',marginTop:'12px',paddingLeft:'8px'}
                  : line.startsWith('- ')
                    ? {color:'#aaa',paddingLeft:'20px',marginTop:'4px',fontSize:'14px'}
                  : line.trim() === ''
                    ? {height:'4px'}
                  : {color:'#ccc',marginTop:'6px',fontSize:'15px'}
                }>
                  {line || ' '}
                </div>
              ))}
            </div>
          </div>
        )}

        <p style={{textAlign:'center',color:'#333',fontSize:'12px',marginTop:'24px',fontFamily:'Arial, sans-serif'}}>
          ESHOP BOOSTER 2026 - Ruslan Skopal
        </p>
      </div>
    </div>
  )
}
