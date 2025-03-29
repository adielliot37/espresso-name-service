import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { http } from 'viem' 

export const espressoRollup = {
  id: 6969,
  name: 'Espresso Rollup',
  network: 'espresso-rollup',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      transport: http('http://167.71.238.55:8547'), 
    },
  },

  testnet: true,
}

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) throw new Error('Reown projectId is not defined')

export const networks = [espressoRollup]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig
