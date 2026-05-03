"use client";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client, arcTestnet } from "./Header";
import toast from "react-hot-toast";

export default function Faucet() {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({
    client, chain: arcTestnet, address: account?.address,
  });
  const isLow = balance && parseFloat(balance.displayValue) &lt; 1;

  const btnStyle = {
    display: "block",
    width: "100%",
    background: "var(--arc)",
    color: "#080B14",
    borderRadius: "10px",
    padding: "13px",
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "var(--mono)",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center" as const,
    letterSpacing: "0.5px",
    marginBottom: "12px",
  };

  return (
    &lt;div style={{ background: "var(--surface)", border: "1px solid var(--arc-border)", borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden" }}&gt;
      &lt;div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--arc), transparent)" }} /&gt;
      &lt;div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "2px", color: "var(--muted)", marginBottom: "16px" }}&gt;01 — FAUCET&lt;/div&gt;
      &lt;div style={{ width: "44px", height: "44px", background: "var(--arc-dim)", border: "1px solid var(--arc-border)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "14px" }}&gt;💧&lt;/div&gt;
      &lt;h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px" }}&gt;Get Test USDC&lt;/h2&gt;
      &lt;p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", lineHeight: 1.6 }}&gt;Free testnet USDC powered by Circle. Connect your wallet to claim.&lt;/p&gt;
      {!account &amp;&amp; (
        &lt;div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "10px", padding: "10px 14px", fontSize: "12px", color: "var(--gold)", marginBottom: "16px", fontFamily: "var(--mono)" }}&gt;
          ⚠ Connect your wallet first
        &lt;/div&gt;
      )}
      {isLow &amp;&amp; (
        &lt;div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", padding: "10px 14px", fontSize: "12px", color: "#FCA5A5", marginBottom: "16px", fontFamily: "var(--mono)" }}&gt;
          ↓ USDC balance low
        &lt;/div&gt;
      )}
      &lt;a href="https://faucet.circle.com" target="_blank" rel="noreferrer" onClick={() =&gt; toast.success("Opening Circle Faucet...")} style={btnStyle}&gt;
        Get 1 USDC Free
      &lt;/a&gt;
      &lt;div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)" }}&gt;
        &lt;div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--arc)" }} /&gt;
        1 USDC / day · faucet.circle.com
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
