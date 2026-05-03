"use client";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

interface Tx { hash: string; method: string; status: string; time: string; }

const METHOD_ICON: Record<string, string> = {
  swap: "⇄", deploy: "⬡", transfer: "↑", mint: "✦", approve: "✓",
};
const METHOD_COLOR: Record<string, string> = {
  swap: "var(--arc)", deploy: "var(--purple)", transfer: "#60A5FA",
  mint: "var(--gold)", approve: "var(--muted)",
};

export default function Activity() {
  const account = useActiveAccount();
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchActivity() {
    if (!account) return;
    setLoading(true);
    try {
      const res = await fetch(`https://testnet.arcscan.app/api/v2/addresses/${account.address}/transactions`);
      const data = await res.json();
      const items = (data.items || []).map((tx: any) => ({
        hash: tx.hash,
        method: tx.method || "transfer",
        status: tx.status === "ok" ? "Success" : "Failed",
        time: new Date(tx.timestamp).toLocaleString(),
      }));
      setTxs(items);
    } catch { setTxs([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchActivity(); }, [account]);

  const getIcon = (m: string) => METHOD_ICON[m.toLowerCase()] || "·";
  const getColor = (m: string) => METHOD_COLOR[m.toLowerCase()] || "var(--muted)";

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "2px", color: "var(--muted)", marginBottom: "16px" }}>04 — ACTIVITY</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800 }}>Transactions</h2>
        <button onClick={fetchActivity} style={{
          background: "transparent", border: "1px solid var(--border)",
          borderRadius: "6px", padding: "5px 12px", fontFamily: "var(--mono)",
          fontSize: "10px", color: "var(--muted)", cursor: "pointer", letterSpacing: "1px",
        }}>↻ REFRESH</button>
      </div>

      {!account && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--muted)", padding: "20px 0" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gold)" }} />
          Connect wallet to see your activity
        </div>
      )}
      {loading && <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--muted)", padding: "20px 0" }}>Loading...</div>}
      {!loading && txs.length === 0 && account && (
        <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--muted)", padding: "20px 0" }}>No transactions found.</div>
      )}

      {txs.map((tx, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: "14px",
          padding: "12px 0",
          borderBottom: i < txs.length - 1 ? "1px solid var(--border)" : "none",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "8px", flexShrink: 0,
            background: `${getColor(tx.method)}18`,
            border: `1px solid ${getColor(tx.method)}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", color: getColor(tx.method),
          }}>{getIcon(tx.method)}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: 600, textTransform: "capitalize" as const, marginBottom: "2px" }}>{tx.method}</div>
            <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--muted)" }}>
              {tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}
            </div>
          </div>

          <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--mono)", fontWeight: 700, color: tx.status === "Success" ? "var(--green)" : "var(--red)", marginBottom: "3px" }}>
              {tx.status === "Success" ? "✓" : "✗"} {tx.status}
            </div>
            <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--muted)" }}>{tx.time}</div>
          </div>

          <a href={`https://testnet.arcscan.app/tx/${tx.hash}`} target="_blank" rel="noreferrer"
            style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--arc)", textDecoration: "none", flexShrink: 0 }}>↗</a>
        </div>
      ))}
    </div>
  );
}
