import { http, webSocket, fallback, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';

export const BASE_DENIM_BLOCK_TIME_MS = 200;
export const BASE_EXPLORER_URL = 'https://basescan.org';

const rpcHttpUrl =
  (import.meta.env.VITE_BASE_RPC_URL as string | undefined)?.trim() ||
  'https://mainnet.base.org';
const rpcWsUrl = (import.meta.env.VITE_BASE_WS_URL as string | undefined)?.trim();

// Base Mainnet post-Denim: canonical 200ms blocks (Flashblocks retired)
export const baseDenimMainnet = {
  ...base,
  blockTime: BASE_DENIM_BLOCK_TIME_MS,
  rpcUrls: {
    default: {
      http: [rpcHttpUrl],
      ...(rpcWsUrl ? { webSocket: [rpcWsUrl] } : {}),
    },
  },
} as const;

const baseTransport = rpcWsUrl
  ? fallback([webSocket(rpcWsUrl), http(rpcHttpUrl)])
  : http(rpcHttpUrl);

export const wagmiConfig = createConfig({
  chains: [baseDenimMainnet],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'Chaos Loom Master 2',
      preference: 'smartWalletOnly',
    }),
  ],
  pollingInterval: 1_000,
  transports: {
    [baseDenimMainnet.id]: baseTransport,
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
