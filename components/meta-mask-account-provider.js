import { useState, useEffect, createContext, useContext } from "react";

const MetaMaskAccountContext = createContext();

export default function MetaMaskAccountProvider({ children }) {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);

  /** Sets metamask from browser */
  const setEthereumFromWindow = async () => {
    if (window.ethereum) {
      // Reload if chain changes, see
      // <https://docs.metamask.io/guide/ethereum-provider.html#chainchanged>
      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      // See <https://docs.metamask.io/guide/ethereum-provider.html#chain-ids>
      const rinkebyId = "0x4";
      if (chainId === rinkebyId) {
        setEthereum(window.ethereum);
      } else {
        alert("Please use Rinkeby network");
      }
    }
  };
  useEffect(() => setEthereumFromWindow(), []);

  /** Connects first of metamask's accounts  */
  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("We have an authorized account: ", account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet");
    }
  };

  /** 
    Gets metamask accounts  
    @var handleAccounts - returns first account from metamask accounts
    @var account - list of metamask accounts
  */
  const getConnectedAccount = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      handleAccounts(accounts);
    }
  };
  useEffect(() => getConnectedAccount());

  const connectAccount = async () => {
    if (!ethereum) {
      console.error("Ethereum object is required to connect an account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);
  };

  const value = { ethereum, connectedAccount, connectAccount };

  return (
    <MetaMaskAccountContext.Provider value={value}>
      {children}
    </MetaMaskAccountContext.Provider>
  );
}

export function useMetaMaskAccount() {
  return useContext(MetaMaskAccountContext);
}
