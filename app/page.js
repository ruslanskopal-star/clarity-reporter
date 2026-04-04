"use client";
import { useState } from "react";

export default function Home() {
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [came, setClientName] = useState("");

  async function run() {
    if (!client) return;
    setLoading(true);
    setError("");
    setAnalysis("");
    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: client }),
      });
      const d = await r.json();
      if (d.success) {
        setClientName(client);
        setAnalysis(d.analysis);
        setClient("");
      } else {
        setError("Chyba: " + d.error);
      }
    } catch {
      setError("Chyba spojeni");
    }
    setLoading(false);
  }

  function formatAnalysis(text) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("🔴")) return <div key={i} style={{ color: "#ff4444", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #ff4444", paddingLeft: "12px" }}>{line}</div>;
      if (line.startsWith("🟠")) return <div key={i} style={{ color: "#FF6B00", fontWeight: "700", fize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #FF6B00", paddingLeft: "12px" }}>{line}</div>;
      if (line.startsWith("🟡")) return <div key={i} style={{ color: "#ffcc00", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #ffcc00", paddingLeft: "12px" }}>{line}</div>;
      if (line.startsWith("⚡")) return <div key={i} style={{ color: "#00ccff", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #00ccff", paddingLeft: "12px" }}>{line}</div>;
      if (line.match(/^\d+\./)) return <div key={i} style={{ color: "#ddd", marginTop: "12px", paddingLeft: "8px" }}>{line}</div>;
      if (line.startsWith("- ")) return <div key={i} style={{ color: "#aaa", paddingLeft: "20px", marginTo4px", fontSize: "14px" }}>{line}</div>;
      if (line.trim() === "") return <div key={i} style={{ height: "4px" }} />;
      return <div key={i} style={{ color: "#ccc", marginTop: "6px", fontSize: "15px" }}>{line}</div>;
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "'Arial Black', Arial, sans-serif", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "40px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", background: "white", padding: "10px 22px", borderRadius: "8px", marginBottom: "20px" }}>
            <span style={{ fontSize: "20px", fontWeight: "900", color: "#111" }}>ESHOP</span>
            <span style={{ fontSize: "20px", fontWeight: "900", color: "#FF6B00" }}>BOOSTER</span>
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", color: "white", margin: "0 0 6px 0", textTransform: "uppercase" }}>CRO Analyza</h1>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#FF6B00", margin: "0", textTransform: "uppercase", letterSpacing: "3px" }}>Clarity Reporter</h2>
        </div>

        {/* Input card */}
        <div style={{ background: "#1a1a1a", border: "2px solid #FF6B00", borderRadius: "16px", padding: "32px", marginBottom: "32px" }}>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "0", marginBottom: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            Zadej jmeno klienta — AI vygeneruje CRO analyzu podle metodologie EshopBooster
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="napr. Profi-DJ, Fanda-NHL.cz..."
              onKeyDown={(e) => e.key === "Enter" && run()}
              style={{ flex: 1, padding: "14px 18px", fontSize: "16px", background: "#111", border: "2px solid #333", borrRadius: "8px", color: "white", fontFamily: "Arial, sans-serif", outline: "none" }}
              onFocus={(e) => e.target.style.borderColor = "#FF6B00"}
              onBlur={(e) => e.target.style.borderColor = "#333"}
            />
            <button
              onClick={run}
              disabled={loading || !client}
              style={{ padding: "14px 28px", fontSize: "15px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", background: loading || !client ? "#333" : "#FF6B00", color: loading || !client ? "#666" : "white", border: "none", borderRadius: "8px", cursor: loading || !client ? "not-allowed" : "pointer", whiteSpace: "nowrap", fontFamily: "'Arial Black', Arial, sans-serif" }}
            >
              {loading ? "Analyzuji..." : "Spustit"}
            </button>
          </div>
          {error && <div style={{ marginTop: "16px", padding: "14px", background: "#2a0a0a", border: "2px solid #aa0000", borderRadius: "8px", color: "#ff4444", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>❌ {error}</div>}
          {loading && (
            <div style={{ textAlign: "center", marginTop: "20px", color: "#666", fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
              <div style={{ display: "inline-block", width: "60px", height: "3px", background: "#FF6B00", borderRadius: "2px", animation: "grow 1.5s infinite" }} />
              <p style={{ marginTop: "10px" }}>AI generuje analyzu, cca 30 sekund...</p>
            </div>
          )}
        </div>

        {/* Results */}
        {analysis && (
          <div style={{ background: "#1a1a1a", border: "2px solid #333", borderRadius: "16px", padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #333" }}>
              <div>
                <div style={{ color: "#FF6B00", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>CROnalyza</div>
                <div style={{ color: "white", fontSize: "22px", fontWeight: "900" }}>{clientName}</div>
              </div>
              <div style={{ background: "#FF6B00", borderRadius: "8px", padding: "8px 16px", fontSize: "12px", fontWeight: "700", color: "white", textTransform: "uppercase", letterSpacing: "1px" }}>
                EshopBooster
              </div>
            </div>
            <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.7" }}>
              {formatAnalysis(analysis)}
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#333", fontSize: "12px", marginTop: "24px", fontFamily: "Arial, sans-serif" }}>
          EshopBooster &copy; 2026 • Ruslan Skopal
        </p>
      </div>
      <style>{`
        @keyframes grow { 0%, 100% { width: 40px; opacity: 1; } 50% { width: 100px; opacity: 0.5; } }
        input::placeholder { color: #444; }
      `}</style>
    </div>
  );
}
