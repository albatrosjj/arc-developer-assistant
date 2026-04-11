"use client";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

interface Tx { hash: string; method: string; status: string; time: string; }

export default function Activity() {
  const account = useActiveAccount();
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchActivity() {
    if (!account) return;
    setLoading(true);
    try {
      const res = await fetch(`https://testnet.arcscan.app/api/v2/addresses/${account.address}/transactions?limit=10`);
      const data = await res.json();
      const items = (data.items || []).map((tx: any) => ({
        hash: tx.hash,
        method: tx.method || "transfer",
        status: tx.status === "ok" ? "Success" : "Failed",
        time: new Date(tx.timestamp).toLocaleString(),
      }));
      setTxs(items);
    } catch {
      setTxs([]);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchActivity(); }, [account]);

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>Activity</h2>
        <button onClick={fetchActivity} style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}>
          Refresh
        </button>
      </div>
      {!account && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Connect wallet to see activity.</p>}
      {loading && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Loading...</p>}
      {!loading && txs.length === 0 && account && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>No transactions found.</p>}
      {txs.map((tx, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#AFA9EC" }}>{tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{tx.time}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: "4px" }}>{tx.method}</span>
            <span style={{ fontSize: "12px", color: tx.status === "Success" ? "#5DCAA5" : "#F09595" }}>{tx.status}</span>
            <a href={`https://testnet.arcscan.app/tx/${tx.hash}`} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#7F77DD" }}>View</a>
          </div>
        </div>
      ))}
    </div>
  );
}
