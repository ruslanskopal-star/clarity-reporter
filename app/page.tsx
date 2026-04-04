'use client'
import { useState } from 'react'

export default function Home() {
  const [client, setClient] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit() {
    if (!client.trim()) return
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName: client })
      })
      const data = await res.json()
      setStatus(data.success ? '✅ Odeslano na email!' : '❌ ' + data.error)
    } catch {
      setStatus('❌ Chyba')
    }
    setLoading(false)
  }

  return (
    <main style={{ maxWidth: 500, margin: '100px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>🔍 Clarity Reporter</h1>
      <p>Zadej jmeno klienta a spusti se analyza</p>
      <input
        value={client}
        onChange=setClient(e.target.value)}
        placeholder="napr. Profi-DJ"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        style={{ width: '100%', padding: 12, fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: '100%', padding: 14, fontSize: 16, background: loading ? '#999' : '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Analyzuji...' : 'Spustit analyzu'}
      </button>
      {status && <p style={{ marginTop: 20, padding: 16, background: '#f0f9ff' }}>{status}</p>}
    </main>
  )
}
