"use client";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

const SWAP_CONTRACT = "0xE4B95E78C128f45D5493fC053EA33397f8A57aD6";
const USDC_ADDRESS = "0x3600000000000000000000000000000000000000";
const EURC_ADDRESS = "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a";

const SWAP_ABI = [
  "function swapUSDCtoEURC(uint256 amountIn) external",
  "function swapEURCtoUSDC(uint256 amountIn) external",
  "function getAmountOut(uint256 amountIn, bool usdcToEurc) external view returns (uint256)",
  "function getReserves() external view returns (uint256, uint256)",
];
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
];

export default function Swap() {
  const account = useActiveAccount();
  const [fromAmount, setFromAmount] = useState("");
  const [direction, setDirection] = useState<"usdc2eurc" | "eurc2usdc">("usdc2eurc");
  const [loading, setLoading] = useState(false);

  const toAmount = fromAmount ? (parseFloat(fromAmount) * (direction === "usdc2eurc" ? 0.998 : 1.002)).toFixed(4) : "0.00";

  async function handleSwap() {
    if (!account) return toast.error("Connect wallet first");
    if (!fromAmount || parseFloat(fromAmount) <= 0) return toast.error("Enter a valid amount");
    try {
      setLoading(true);
      const toastId = toast.loading("Approving...");
      const { ethers } = await import("ethers");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const amountIn = ethers.parseUnits(fromAmount, 6);
      const tokenIn = direction === "usdc2eurc" ? USDC_ADDRESS : EURC_ADDRESS;
      const erc20 = new ethers.Contract(tokenIn, ERC20_ABI, signer);
      const approveTx = await erc20.approve(SWAP_CONTRACT, amountIn);
      await approveTx.wait();
      toast.dismiss(toastId);
      const swapToastId = toast.loading("Swapping...");
      const swapContract = new ethers.Contract(SWAP_CONTRACT, SWAP_ABI, signer);
      const swapTx = direction === "usdc2eurc"
        ? await swapContract.swapUSDCtoEURC(amountIn)
        : await swapContract.swapEURCtoUSDC(amountIn);
      await swapTx.wait();
      toast.dismiss(swapToastId);
      toast.success("Swap completed!");
      setFromAmount("");
    } catch (e: any) {
      toast.dismiss();
      toast.error(e.message?.slice(0, 80) || "Swap failed");
    } finally { setLoading(false); }
  }

  function toggleDirection() {
    setDirection(d => d === "usdc2eurc" ? "eurc2usdc" : "usdc2eurc");
    setFromAmount("");
  }

  const fromToken = direction === "usdc2eurc" ? "USDC" : "EURC";
  const toToken = direction === "usdc2eurc" ? "EURC" : "USDC";

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
      <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Swap</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "16px" }}>Swap stablecoins on Arc Testnet.</p>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px", marginBottom: "8px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>FROM</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input value={fromAmount} onChange={e => setFromAmount(e.target.value)} placeholder="0.00" style={{ flex: 1, background: "transparent", border: "none", fontSize: "20px", color: "#fff", outline: "none" }} />
          <div style={{ background: "#1D1035", border: "0.5px solid #534AB7", color: "#AFA9EC", fontSize: "13px", padding: "4px 12px", borderRadius: "20px" }}>{fromToken}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
        <button onClick={toggleDirection} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(83,74,183,0.2)", border: "0.5px solid #534AB7", color: "#7F77DD", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⇅</button>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>TO</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, fontSize: "20px", color: "rgba(255,255,255,0.6)" }}>{toAmount}</div>
          <div style={{ background: "#1D1035", border: "0.5px solid #534AB7", color: "#AFA9EC", fontSize: "13px", padding: "4px 12px", borderRadius: "20px" }}>{toToken}</div>
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "16px", padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
        Rate: 1 {fromToken} ≈ {direction === "usdc2eurc" ? "0.998" : "1.002"} {toToken} · Contract: {SWAP_CONTRACT.slice(0,8)}...
      </div>
      <button onClick={handleSwap} disabled={loading || !fromAmount || !account} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 500, cursor: "pointer", opacity: (loading || !account) ? 0.6 : 1 }}>
        {loading ? "Processing..." : `Swap ${fromToken} → ${toToken}`}
      </button>
    </div>
  );
}
