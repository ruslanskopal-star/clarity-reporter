"use client";
import { useState } from "react";

export default function Home() {
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function run() {
    if (!client) return;
    setLoading(true);
    setStatus("");
    setIsSuccess(false);
    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: client }),
      });
      const d = await r.json();
      if (d.success) {
        setIsSuccess(true);
        setStatus("Analyza odeslana na ruslan.skopal@eshopbooster.cz");
        setClient("");
      } else {
        setStatus("Chyba: " + d.error);
      }
    } catch {
      setStatus("Chyba spojeni");
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Arial Black', Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-block", background: "white", padding: "12px 24px", borderRadius: "8px", marginBottom: "24px" }}>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#111", letterSpacing: "1px" }}>ESHOP</span>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#FF6B00", letterSpacing: "1px" }}>BOOSTER</span>
          </div>
          <div>
            <h1 style={{
              fontSize: "36px",
              fontWeight: "900",
              color: "white",
              margin: "0 0 8px 0",
              lineHeight: "1.1",
              textTransform: "uppercase"
            }}>
              CRO ANALYZA
            </h1>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#FF6B00",
              margin: "0",
              textTransform: "uppercase",
              letterSpacing: "2px"
            }}>
              CLARITY REPORTER
            </h2>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "#1a1a1a",
          border: "2px solid #FF6B00",
          borderRadius: "16px",
          padding: "40px",
        }}>
          <p style={{
            color: "#999",
            fontSize: "15px",
            marginTop: "0",
            marginBottom: "28px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontWeight: "400"
          }}>
            Zadej jmeno klienta a AI vygeneruje kompletni CRO analyzu podle metodologie EshopBooster
          </p>

          <label style={{ display: "block", color: "#FF6B00", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
            Jmeno klienta
          </label>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="napr. Profi-DJ, Fanda-NHL.cz..."
            onKeyDown={(e) => e.key === "Enter" && run()}
            style={{
              width: "100%",
              padding: "16px 20px",
              fontSize: "16px",
              background: "#111",
              border: "2px solid #333",
              borderRadius: "8px",
              marginBottom: "20px",
              boxSizing: "border-box",
              color: "white",
              fontFamily: "Arial, sans-serif",
              outline: "none",
              transition: "border-color 0.2s"
            }}
                                                             6B00"}
            onBlur={(e) => e.target.style.borderColor = "#333"}
          />

          <button
            onClick={run}
            disabled={loading || !client}
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "16px",
              fontWeight: "900",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: loading || !client ? "#333" : "#FF6B00",
              color: loading || !client ? "#666" : "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading || !client ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              fontFamily: "'Arial Black', Arial, sans-serif"
            }}
          >
            {loading ? "Generuji analyzu..." : "Spustit analyzu"}
          </button>

          {loading && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div style={{ textAlign: "center", marginTop:ine-block",
                width: "40px",
                height: "4px",
                background: "#FF6B00",
                borderRadius: "2px",
                animation: "pulse 1s infinite"
              }} />
              <p style={{ color: "#666", fontSize: "13px", fontFamily: "Arial, sans-serif", marginTop: "              <p style={{ color:lyzuje e-shop a pripravuje doporuceni...
              </p>
            </div>
          )}

          {status && (
            <div style={{
              marginTop: "20px",
              padding: "16px 20px",
              background: isSuccess ? "#0a2a0a" : "#2a0a0a",
              border: `2px solid ${isSuccess ? "#00aa44" : "#aa0000"}`,
              borderRadius: "8px",
              color: isSuccess ? "#00dd55" : "#ff4444",
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              fontWeight: "600"
            }}>
              {isSuccess ? "✅ " : "❌ "}tus}
            </div>
          )}
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          color: "#444",
          fontSize: "12px",
          marginTop: "24px",
          fontFamily: "Arial, sans-serif"
        }}>
          EshopBooster &copy; 2026 • Ruslan Skopal
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; width: 40px; }
          50% { opacity: 0.5; width: 80px; }
        }
        iut::placeholder { color: #444; }
        button:hover:not(:disabled) { background: #ff8c00 !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
