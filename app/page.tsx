"use client";
import Header from "./components/Header";
import Faucet from "./components/Faucet";
import Deployer from "./components/Deployer";
import Swap from "./components/Swap";
import Activity from "./components/Activity";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
      <Header />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>Arc Developer Assistant</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>Deploy, swap, and track activity on Arc Testnet — powered by Circle</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <Faucet />
          <Swap />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <Deployer />
        </div>
        <div>
          <Activity />
        </div>
      </main> <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
        <a href="https://twitter.com/albatros_0x" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none" }}>𝕏 @albatros_0x</a>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Discord hakan35._</span>
      </footer>
    </div>
  );
}
