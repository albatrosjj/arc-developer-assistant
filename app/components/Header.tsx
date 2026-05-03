"use client";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { useEffect, useState } from "react";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const arcTestnet = defineChain({
  id: 185,
  name: "Arc Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpc: "https://rpc.arc.fun",
  blockExplorers: [{ name: "ArcScan", url: "https://testnet.arcscan.app" }],
  testnet: true,
});

export default function Header() {
  const [block, setBlock] = useState<string>("...");
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const base = 8241000 + Math.floor(Math.random() * 1000);
    setBlock(base.toLocaleString());
    const iv = setInterval(() => {
      setBlock(b => (parseInt(b.replace(/,/g, "")) + 1).toLocaleString());
      setPulse(p => !p);
    }, 12000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        background: "rgba(8,11,20,0.95)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: "64px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "var(--arc-dim)",
              border: "1px solid var(--arc-border)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700,
              color: "var(--arc)", letterSpacing: "-1px",
            }}>ARC</div>
            <div style={{ fontWeight: 800, fontSize: "16px", letterSpacing: "-0.3px" }}>
              <span style={{ color: "var(--arc)" }}>Arc</span> Developer
            </div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: "9px",
              background: "rgba(245,158,11,0.12)", color: "var(--gold)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "4px", padding: "2px 7px", letterSpacing: "1.5px",
            }}>TESTNET</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "var(--arc)",
                opacity: pulse ? 1 : 0.3,
                transition: "opacity 0.5s",
              }} />
              Block <span style={{ color: "var(--arc)" }}>#{block}</span>
            </div>
            <ConnectButton
              client={client}
              chain={arcTestnet}
              connectButton={{
                label: "⬡ Connect Wallet",
                style: {
                  background: "var(--arc-dim)",
                  border: "1px solid var(--arc-border)",
                  color: "var(--arc)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                },
              }}
            />
          </div>
        </div>
      </header>
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
          height: "36px", display: "flex", alignItems: "center", gap: "32px",
        }}>
          {[
            { label: "Network", value: "Arc Testnet" },
            { label: "Gas", value: "0.001 GWEI" },
            { label: "USDC", value: "Circle Supported" },
            { label: "Explorer", value: "testnet.arcscan.app" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontFamily: "var(--mono)", fontSize: "10px",
              color: "var(--muted)", letterSpacing: "0.5px",
            }}>
              {label}: <span style={{ color: "var(--arc)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
