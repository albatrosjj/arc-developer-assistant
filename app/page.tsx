"use client";
import Header from "./components/Header";
import Faucet from "./components/Faucet";
import Deployer from "./components/Deployer";
import Swap from "./components/Swap";
import Activity from "./components/Activity";

const stats = [
  { label: "Testnet TXs Today", value: "1,240", color: "var(--arc)" },
  { label: "Contracts Deployed", value: "84", color: "var(--purple)" },
  { label: "USDC Distributed", value: "12.4k", color: "var(--gold)" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "6px" }}>
            Arc Developer <span style={{ color: "var(--arc)" }}>Assistant</span>
          </h1>
          <p style={{ fontSize: "14px", color: "var(--muted)", fontFamily: "var(--mono)" }}>
            Deploy, swap, and track activity on Arc Testnet — powered by Circle
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {stats.map(({ label, value, color }) => (
            <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "28px", fontWeight: 700, color, lineHeight: 1, marginBottom: "4px" }}>{value}</div>
              <div style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--muted)", letterSpacing: "0.5px" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ fontSize: "9px", fontFamily: "var(--mono)", letterSpacing: "2px", color: "var(--muted)", textTransform: "uppercase" as const }}>Tools</div>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <Faucet />
          <Swap />
        </div>
        <div style={{ marginBottom: "16px" }}><Deployer /></div>
        <div><Activity /></div>
      </main>
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 24px", marginTop: "40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)" }}>
            Built on <span style={{ color: "var(--arc)" }}>Arc Testnet</span> · Powered by Circle
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://twitter.com/albatros_0x" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--mono)" }}>𝕏 @albatros_0x</a>
            <span style={{ color: "var(--border2)", fontFamily: "var(--mono)", fontSize: "12px" }}>Discord: hakan35._</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
