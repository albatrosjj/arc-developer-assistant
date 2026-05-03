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

  const rate = direction === "usdc2eurc" ? 0.998 : 1.002;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * rate).toFixed(4) : "0.00";
  const fromToken = direction === "usdc2eurc" ? "USDC" : "EURC";
  const toToken = direction === "usdc2eurc" ? "EURC" : "USDC";

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

  const tokenBadge = (symbol: string) => (
    <div style={{
      display: "flex", alignItems: "center", gap: "7px",
      background: "rgba(255,255,255,0.06)", border: "1px solid var(--border2)",
      borderRadius: "8px", padding: "7px 12px",
      fontFamily: "var(--mono)", fontSize: "13px", fontWeight: 700, flexShrink: 0,
    }}>
      <div style={{
        width: "20px", height: "20px", borderRadius: "50%",
        background: symbol === "USDC" ? "#2775CA" : "#003399",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: 700, color: "#fff",
      }}>{symbol === "USDC" ? "$" : "€"}</div>
      {symbol}
    </div>
  );

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--arc-border)",
      borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, var(--arc), transparent)",
      }} />
      <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "2px", color: "var(--muted)", marginBottom: "16px" }}>02 — SWAP</div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px" }}>Swap Stablecoins</h2>

      <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px", marginBottom: "6px" }}>
        <div style={{ fontSize: "9px", fontFamily: "var(--mono)", letterSpacing: "1.5px", color: "var(--muted)", marginBottom: "8px" }}>FROM</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            value={fromAmount} onChange={e => setFromAmount(e.target.value)}
            placeholder="0.00" type="number"
            style={{
              flex: 1, background: "transparent", border: "none",
              fontSize: "24px", fontFamily: "var(--mono)", fontWeight: 700,
              color: "var(--text)", minWidth: 0,
            }}
          />
          {tokenBadge(fromToken)}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}>
        <button
          onClick={() => { setDirection(d => d === "usdc2eurc" ? "eurc2usdc" : "usdc2eurc"); setFromAmount(""); }}
          style={{
            width: "34px", height: "34px", background: "var(--surface2)",
            border: "1px solid var(--border)", borderRadius: "8px",
            color: "var(--muted)", fontSize: "16px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >⇅</button>
      </div>

      <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px", marginBottom: "12px" }}>
        <div style={{ fontSize: "9px", fontFamily: "var(--mono)", letterSpacing: "1.5px", color: "var(--muted)", marginBottom: "8px" }}>TO (ESTIMATED)</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, fontSize: "24px", fontFamily: "var(--mono)", fontWeight: 700, color: "var(--arc)" }}>{toAmount}</div>
          {tokenBadge(toToken)}
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)",
        marginBottom: "16px", padding: "10px 12px",
        background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--border)",
      }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--arc)", flexShrink: 0 }} />
        1 {fromToken} ≈ {rate} {toToken} · Contract: {SWAP_CONTRACT.slice(0, 10)}...
      </div>

      <button
        onClick={handleSwap}
        disabled={loading || !fromAmount || !account}
        style={{
          width: "100%", background: "var(--arc)", color: "#080B14",
          border: "none", borderRadius: "10px", padding: "13px",
          fontSize: "13px", fontWeight: 700, fontFamily: "var(--mono)",
          cursor: loading || !fromAmount || !account ? "not-allowed" : "pointer",
          opacity: loading || !account ? 0.5 : 1, letterSpacing: "0.3px",
        }}
      >{loading ? "Processing..." : `Swap ${fromToken} → ${toToken}`}</button>
    </div>
  );
}
