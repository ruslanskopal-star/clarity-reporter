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
    <div style={{ maxWidth: "500px", margin: "80px auto", padding: "20px" }}>
      <h1>Clarity Reporter</h1>
      <input
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Profi-DJ"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={run} disabled={loading} style={{ width: "100%", padding: "12px" }}>
        {loading ? "Analyzuji..." : "Spustit analyzu"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
