"use client";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client, arcTestnet } from "./Header";
import toast from "react-hot-toast";

export default function Faucet() {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({ client, chain: arcTestnet, address: account?.address });
  const isLow = balance && parseFloat(balance.displayValue) < 1;

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
      <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Faucet</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "16px" }}>Get free testnet USDC to use on Arc Testnet.</p>
      {isLow && (
        <div style={{ background: "rgba(226,75,74,0.1)", border: "0.5px solid #A32D2D", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#F09595", marginBottom: "16px" }}>
          Your USDC balance is low. Get more from the faucet.
        </div>
      )}
      {!account && (
        <div style={{ background: "rgba(239,159,39,0.1)", border: "0.5px solid #854F0B", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#EF9F27", marginBottom: "16px" }}>
          Connect your wallet first.
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}>Circle Faucet</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>1 USDC / day — faucet.circle.com</div>
        </div>
        <a href="https://faucet.circle.com" target="_blank" rel="noreferrer" onClick={() => toast.success("Opening Circle Faucet...")} style={{ background: "#534AB7", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer", textDecoration: "none" }}>
          Get USDC
        </a>
      </div>
    </div>
  );
}
