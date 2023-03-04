import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { useWeb3Store } from "../../store/web3store";
import { networks } from "../networks";
import { checkChainAndAccount } from "./helper/checkChainAndAccount";


export const WCInit = async()=> {

  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
  }

  let chains = []

  for (const [key, value] of Object.entries(networks)){
    chains.push(value.id)
  }

  const provider = await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // REQUIRED your projectId
    chains, // REQUIRED chain ids
    methods: [
      "eth_sendTransaction",
      "eth_signTransaction",
      "eth_sign",
      "personal_sign",
      "eth_signTypedData",
    ],
    events: ["chainChanged", "accountsChanged"],
    rpcMap: {
      1:'https://eth.llamarpc.com',
      56: 'https://bsc-dataseed.binance.org/',
      137:'https://polygon-rpc.com',
      250:'https://rpc.ftm.tools',
      43114:'https://api.avax.network/ext/bc/C/rpc',
    },
    metadata: {
      name: "Glitch Dapp",
      description: "Glitch Dapp",
      url: "mywebsite.com",
      icons: ["https://lh3.googleusercontent.com/ogw/AOh-ky0c2alK5GAwefGWkwQHVpcJR637KRzHSZx9dV31rg=s32-c-mo"],
    },
    showQrModal: true, // OPTIONAL - `true` by default
  });

  
  // provider?.on("display_uri", async (uri: any) => {
  //   web3Modal?.openModal({ uri });
  // });
        
  provider?.on("connect", (e: any) => {
    console.log("WC: connect",e);
  });

  provider?.on("chainChanged", (e: any) => {
    console.log("WC: connect",e);
  });

  provider?.on("accountsChanged", (e: any) => {
    console.log("WC: connect",e);
  });
      
  provider?.on("session_event", (e: any) => {
    console.log("WC: session_event",e);
  });
  
  provider?.on("session_update", (e: any) => {
    console.log("WC: session_update",e);
  });
  
  provider?.on("disconnect", (e) => {
    console.log("WC: session ended", e);
    window.localStorage.clear()
    useWeb3Store.getState().restartWeb3()
  });
  console.log(provider?.session)
  if(provider?.session){
    checkChainAndAccount(provider)
  }

  console.log('Walletconnect has initialized')

  return provider
}