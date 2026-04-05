"use client";
import { useState } from "react";

function EshopBoosterLogo() {
  return (
    <svg width="180" height="60" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="60" rx="6" fill="white"/>
      <!-- ESHOP text -->
      <text x="10" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" fill="#111" letterSpacing="0.5">ESH</text>
      <!-- O symbol - zaobleny obdelnik s sipkou -->
      <g transform="translate(72, 4)">
        <rect x="0" y="0" width="22" height="28" rx="7" ry="7" fill="#111"/>
        <path d="M11,3 L16,10 L13.5,10 L13.5,22 Q13.5,25 11,25 Q8.5,25 8.5,22 L8.5,10 L6,10 Z" fill="white"/>
      </g>
      <text x="97" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" fill="#111" letterSpacing="0.5">P</text>
      <!-- BOOSTER text -->
      <text x="10" y="50" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="17" fill="#111" letterSpacing="3">BOOSTER</text>
    </svg>
  );
}

export default function Home() {
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [clientName, setClientName] = useState("");

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

  function getLineStyle(line) {
    if (line.indexOf("KRITICKE") !== -1 || line.indexOf("KRITICK") !== -1) {
      return { color: "#ff4444", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #ff4444", paddingLeft: "12px" };
    }
    if (line.indexOf("VYSOKA") !== -1) {
      return { color: "#FF6B00", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #FF6B00", paddingLeft: "12px" };
    }
    if (line.indexOf("STREDNI") !== -1) {
      return { color: "#ffcc00", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #ffcc00", paddingLeft: "12px" };
    }
    if (line.indexOf("QUICK") !== -1) {
      return { color: "#00ccff", fontWeight: "700", fontSize: "17px", marginTop: "24px", marginBottom: "8px", borderLeft: "4px solid #00ccff", paddingLeft: "12px" };
    }
    if (/^\d+\./.test(line)) {
      return { color: "#ddd", marginTop: "12px", paddingLeft: "8px" };
    }
    if (line.startsWith("- ")) {
      return { color: "#aaa", paddingLeft: "20px", marginTop: "4px", fontSize: "14px" };
    }
    if (line.trim() === "") {
      return { height: "4px" };
    }
    return { color: "#ccc", marginTop: "6px", fontSize: "15px" };
  }

  function formatAnalysis(text) {
    return text.split("\n").map(function(line, i) {
      return <div key={i} style={getLineStyle(line)}>{line || " "}</div>;
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "Arial Black, Arial, sans-serif", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "40px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", marginBottom: "20px" }}>
            <EshopBoosterLogo />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", color: "white", margin: "0 0 6px 0", textTransform: "uppercase" }}>CRO Analyza</h1>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#FF6B00", margin: "0", textTransform: "uppercase", letterSpacing: "3px" }}>Clarity Reporter</h2>
        </div>

        <div style={{ background: "#1a1a1a", border: "2px solid #FF6B00", borderRadius: "16px", padding: "32px", marginBottom: "32px" }}>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "0", marginBottom: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            Zadej jmeno klienta a AI vygeneruje CRO analyzu podle metodologie ESHOP BOOSTER
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              value={client}
              onChange={function(e) { setClient(e.target.value); }}
              placeholder="napr. Profi-DJ, Fanda-NHL.cz..."
              onKeyDown={function(e) { if (e.key === "Enter") run(); }}
              style={{ flex: 1, padding: "14px 18px", fontSize: "16px", background: "#111", border: "2px solid #333", borderRadius: "8px", color: "white", fontFamily: "Arial, sans-serif", outline: "none" }}
              onFocus={function(e) { e.target.style.borderColor = "#FF6B00"; }}
              onBlur={function(e) { e.target.style.borderColor = "#333"; }}
            />
            <button
              onClick={run}
              disabled={loading || !client}
              style={{ padding: "14px 28px", fontSize: "15px", fontWeight: "900", textTransform: "uppercase", background: (loading || !client) ? "#333" : "#FF6B00", color: (loading || !client) ? "#666" : "white", border: "none", borderRadius: "8px", cursor: (loading || !client) ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
            >
              {loading ? "Analyzuji..." : "Spustit"}
            </button>
          </div>
          {error && (
            <div style={{ marginTop: "16px", padding: "14px", background: "#2a0a0a", border: "2px solid #aa0000", borderRadius: "8px", color: "#ff4444", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
              {error}
            </div>
          )}
          {loading && (
            <p style={{ color: "#666", fontFamily: "Arial, sans-serif", fontSize: "14px", textAlign: "center", marginTop: "16px" }}>
              AI generuje analyzu, cca 30 sekund...
            </p>
          )}
        </div>

        {analysis && (
          <div style={{ background: "#1a1a1a", border: "2px solid #333", borderRadius: "16px", padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #333" }}>
              <div>
                <div style={{ color: "#FF6B00", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>CRO Analyza</div>
                <div style={{ color: "white", fontSize: "22px", fontWeight: "900" }}>{clientName}</div>
              </div>
              <div style={{ background: "#FF6B00", borderRadius: "8px", padding: "8px 16px", fontSize: "12px", fontWeight: "700", color: "white", textTransform: "uppercase" }}>
                ESHOP BOOSTER
              </div>
            </div>
            <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.7" }}>
              {formatAnalysis(analysis)}
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#333", fontSize: "12px", marginTop: "24px", fontFamily: "Arial, sans-serif" }}>
          ESHOP BOOSTER 2026 - Ruslan Skopal
        </p>
      </div>
    </div>
  );
}
