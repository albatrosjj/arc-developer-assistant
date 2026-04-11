"use client";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

const ERC20_BYTECODE = "0x60806040523480156200001157600080fd5b5060405162000e6838038062000e688339818101604052810190620000379190620001f4565b828281600390816200004a919062000507565b5080600490816200005c919062000507565b505050620000716200008760201b60201c565b620000838282620000a060201b60201c565b50506200060e565b6000620000996200018060201b60201c565b9050905090565b620000b08282620001ef60201b60201c565b5050565b505050565b6000620000d762000c1460201b60201c";

export default function Deployer() {
  const account = useActiveAccount();
  const [tab, setTab] = useState("erc20");
  const [loading, setLoading] = useState(false);
  const [deployed, setDeployed] = useState("");
  const [erc20, setErc20] = useState({ name: "", symbol: "", supply: "" });
  const [erc721, setErc721] = useState({ name: "", description: "" });

  async function deployToken() {
    if (!account) return toast.error("Connect wallet first");
    if (!erc20.name || !erc20.symbol) return toast.error("Fill all fields");
    try {
      setLoading(true);
      const toastId = toast.loading("Deploying ERC-20 token...");
      const { ethers } = await import("ethers");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const factory = new ethers.ContractFactory(
        ["constructor(string name_, string symbol_)"],
        "0x608060405234801561001057600080fd5b5060405161001d3390565b",
        signer
      );
      const supply = erc20.supply ? ethers.parseUnits(erc20.supply, 18) : ethers.parseUnits("1000000", 18);
      const abi = ["constructor(string,string,uint256)","function name() view returns(string)","function symbol() view returns(string)","function totalSupply() view returns(uint256)","function balanceOf(address) view returns(uint256)","function transfer(address,uint256) returns(bool)","function approve(address,uint256) returns(bool)","function transferFrom(address,address,uint256) returns(bool)"];
      const bytecode = "0x60806040523480156200001157600080fd5b5060405162000f2638038062000f268339818101604052810190620000379190620001f4565b82828160039081620000499190620004c6565b508060049081620000609190620004c6565b5050506200009133620000736200009760201b60201c565b60ff16600a620000849190620006b3565b85620000919190620006ff565b620000a060201b60201c565b50505062000784565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000112576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001099062000787565b60405180910390fd5b62000126600083836200021760201b60201c565b80600260008282546200013a9190620007a9565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001eb9190620007f5565b60405180910390a35050565b6000806000606084860312156200020d576200020c62000812565b5b81516200021b8162000817565b60208501519093506200022e8162000817565b604085015190925062000241816200083b565b809150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200028e57607f821691505b602082108103620002a457620002a362000246565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003087fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620002cf565b620003148683620002cf565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000361620003576200035184620002c6565b62000335565b62000335565b9050919050565b6000819050919050565b6200037d836200033f565b620003956200038c8262000368565b848454620002dc565b825550505050565b600090565b620003ac6200039d565b620003b981848462000372565b505050565b5b81811015620003e157620003d5600082620003a2565b600181019050620003bf565b5050565b601f8211156200043057620003fa81620002aa565b6200040584620002bf565b8101602085101562000415578190505b6200042d6200042485620002bf565b830182620003be565b50505b505050565b600082821c905092915050565b6000620004556000198460080262000435565b1980831691505092915050565b60006200047083836200043e565b9150826002028217905092915050565b6200048b826200024c565b67ffffffffffffffff811115620004a757620004a662000257565b5b620004b3825462000275565b620004c0828285620003e5565b00505b505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620004f882620004cb565b9050919050565b6200050a81620004eb565b81146200051657600080fd5b50565b60008151905062000529816200050e565b92915050565b6000819050919050565b6200054481620005315b81146200055057600080fd5b50565b600081519050620005638162000538565b92915050565b6000806000606084860312156200058557620005846200048b565b5b600084015167ffffffffffffffff811115620005a657620005a562000490565b5b620005b48682870162000519565b935050602084015167ffffffffffffffff811115620005d857620005d762000490565b5b620005e68682870162000519565b9250506040620005f98682870162000553565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200063f82620005310565b91506200064c83620005310565b9250828202620006568162000530565b91508282048414831517620006705762000670620006030565b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000620006b382620005310565b9150620006c083620005310565b925082620006d357620006d262000677565b5b828204905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b60006200071560258201620006a4565b9150620007228262000708565b60200291505090565b600060208201905081810360008301526200074681620006a5565b9050919050565b60006200075a82620005310565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000790576200078f62000603565b5b600182019050919050565b6200079f81620005310565b82525050565b6000602082019050620007bc600083018462000794565b92915050565b600080fd5b6000620007d482620004eb565b9050919050565b620007e681620007c7565b8114620007f257600080fd5b50565b6000815190506200080681620007db565b92915050565b600080fd5b6200081c81620004eb565b81146200082857600080fd5b50565b6000819050919050565b62000840816200082b565b81146200084c57600080fd5b50600b8101905091905056fea2646970667358221220";
      const f = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await f.deploy(erc20.name, erc20.symbol, supply);
      await contract.waitForDeployment();
      const addr = await contract.getAddress();
      setDeployed(addr);
      toast.dismiss(toastId);
      toast.success("ERC-20 deployed!");
    } catch (e: any) {
      toast.dismiss();
      toast.error(e.message?.slice(0, 80) || "Deploy failed");
    } finally { setLoading(false); }
  }

  const input = (placeholder: string, value: string, onChange: (v: string) => void) => (
    <input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", color: "#fff", marginBottom: "10px", outline: "none", boxSizing: "border-box" }} />
  );

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
      <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: 500, marginBottom: "16px" }}>Token / NFT Deployer</h2>
      <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "4px", marginBottom: "16px" }}>
        {["erc20", "erc721"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px", fontSize: "13px", borderRadius: "7px", cursor: "pointer", border: "none", background: tab === t ? "#534AB7" : "transparent", color: tab === t ? "#fff" : "rgba(255,255,255,0.4)" }}>
            {t === "erc20" ? "ERC-20 Token" : "ERC-721 NFT"}
          </button>
        ))}
      </div>
      {tab === "erc20" ? (
        <>
          {input("Token name", erc20.name, v => setErc20({ ...erc20, name: v }))}
          {input("Symbol (e.g. TKN)", erc20.symbol, v => setErc20({ ...erc20, symbol: v }))}
          {input("Initial supply", erc20.supply, v => setErc20({ ...erc20, supply: v }))}
          <button onClick={deployToken} disabled={loading} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 500, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Deploying..." : "Deploy ERC-20"}
          </button>
        </>
      ) : (
        <>
          {input("Collection name", erc721.name, v => setErc721({ ...erc721, name: v }))}
          {input("Description", erc721.description, v => setErc721({ ...erc721, description: v }))}
          <button onClick={() => toast("ERC-721 coming soon!")} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
            Deploy ERC-721
          </button>
        </>
      )}
      {deployed && (
        <div style={{ marginTop: "14px", background: "rgba(29,158,117,0.1)", border: "0.5px solid #0F6E56", borderRadius: "10px", padding: "12px 14px" }}>
          <div style={{ fontSize: "11px", color: "#5DCAA5", marginBottom: "4px" }}>Deployed at:</div>
          <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#fff", wordBreak: "break-all" }}>{deployed}</div>
        </div>
      )}
    </div>
  );
}
