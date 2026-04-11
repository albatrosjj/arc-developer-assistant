"use client";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

export default function Swap() {
  const account = useActiveAccount();
  const [fromAmount, setFromAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSwap() {
    if (!account) return toast.error("Connect wallet first");
    if (!fromAmount) return toast.error("Enter an amount");
    try {
      setLoading(true);
      toast.loading("Processing swap...");
      await new Promise(r => setTimeout(r, 2000));
      toast.dismiss();
      toast.success("Swap simulated successfully!");
    } catch (e: any) {
      toast.dismiss();
      toast.error(e.message?.slice(0, 60));
    } finally { setLoading(false); }
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
      <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Swap</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "16px" }}>Swap USDC on Arc Testnet.</p>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px", marginBottom: "8px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>FROM</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input value={fromAmount} onChange={e => setFromAmount(e.target.value)} placeholder="0.00" style={{ flex: 1, background: "transparent", border: "none", fontSize: "20px", color: "#fff", outline: "none" }} />
          <div style={{ background: "#1D1035", border: "0.5px solid #534AB7", color: "#AFA9EC", fontSize: "13px", padding: "4px 12px", borderRadius: "20px" }}>USDC</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(83,74,183,0.2)", border: "0.5px solid #534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#7F77DD", fontSize: "16px" }}>↓</div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>TO</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, fontSize: "20px", color: "rgba(255,255,255,0.3)" }}>{fromAmount ? (parseFloat(fromAmount) * 0.998).toFixed(4) : "0.00"}</div>
          <div style={{ background: "#1D1035", border: "0.5px solid #534AB7", color: "#AFA9EC", fontSize: "13px", padding: "4px 12px", borderRadius: "20px" }}>EURC</div>
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "16px", padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
        Rate: 1 USDC = 0.998 EURC · Fee: 0.2% · Network: Arc Testnet
      </div>
      <button onClick={handleSwap} disabled={loading || !fromAmount} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 500, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
        {loading ? "Swapping..." : "Swap"}
      </button>
    </div>
  );
}
