"use client";
import { useState } from "react";

export default function Home() {
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function run() {
    if (!client) return;
    setLoading(true);
    setStatus("");
    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: client }),
      });
      const d = await r.json();
      setStatus(d.success ? "Odeslano na email!" : "Chyba: " + d.error);
    } catch {
      setStatus("Chyba spojeni");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "80px auto", padding: "20px", fontFamily: "Arial" }}>
      <h1>Clarity Reporter</h1>
      <p>Zadej jmeno klienta:</p>
      <input
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="napr. Profi-DJ"
        style={{ width: "100%", padding: "10px", fontSize: "16px", marginBottom: "10px" }}
      />
      <button
        onClick={run}
        disabled={loading}
        style={{ width: "100%", padding: "12px", fontSize: "16px", background: "#0070f3", color: "white", border: "none", cursor: "pointer" }}
      >
        {loading ? "Analyzuji..." : "Spustit analyzu"}
      </button>
      {status && <p style={{ marginTop: "20px", padding: "15px", background: "#f0f9ff" }}>{status}</p>}
    </div>
  );
}
