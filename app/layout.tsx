import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arc Developer Assistant",
  description: "Build on Arc Testnet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className} style={{ background: "#0a0a0f", minHeight: "100vh" }}>
        <ThirdwebProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ style: { background: "#1a1a2e", color: "#fff", border: "0.5px solid rgba(255,255,255,0.1)" } }} />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
