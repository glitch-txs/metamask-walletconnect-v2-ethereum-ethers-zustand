import { useWeb3Store } from '../../store/web3store'
import { networks } from "../networks";

export const openWCModal = async()=> {
  let approved = false

  const childProvider = useWeb3Store.getState().childProvider

  let chains = []

  for (const [key, value] of Object.entries(networks)){
    chains.push(value.id)
  }

  console.log("chains",chains)

  await childProvider?.connect({
        chains,
        rpcMap: {
          1:'https://eth.llamarpc.com',
          56: 'https://bsc-dataseed.binance.org/',
          137:'https://polygon-rpc.com',
          250:'https://rpc.ftm.tools',
          43114:'https://api.avax.network/ext/bc/C/rpc',
        }
  }).then((e: any)=> approved = true).catch((e: any)=> console.log(e))

  return approved
}