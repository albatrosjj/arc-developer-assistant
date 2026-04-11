"use client";
import { useActiveAccount, useActiveWallet, ConnectButton, useWalletBalance } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";

const client = createThirdwebClient({ clientId: "5ed891c7b5c6e16703a77290df84b7ab" });
const arcTestnet = defineChain({ id: 5042002, rpc: "https://5042002.rpc.thirdweb.com/5ed891c7b5c6e16703a77290df84b7ab", nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 } });

export { client, arcTestnet };

export default function Header() {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({ client, chain: arcTestnet, address: account?.address });

  return (
    <header style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", background: "rgba(10,10,15,0.8)", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>
          Arc <span style={{ color: "#7F77DD" }}>Assistant</span>
        </div>
        <div style={{ background: "#1D1035", border: "0.5px solid #534AB7", color: "#AFA9EC", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>
          Testnet
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {account && balance && (
          <div style={{ background: "rgba(29,158,117,0.1)", border: "0.5px solid #0F6E56", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", color: "#5DCAA5" }}>
            {parseFloat(balance.displayValue).toFixed(2)} USDC
          </div>
        )}
        <ConnectButton client={client} chain={arcTestnet} theme="dark" />
      </div>
    </header>
  );
}
