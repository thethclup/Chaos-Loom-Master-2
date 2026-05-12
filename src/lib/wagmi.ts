import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, safe, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    injected(),
    safe(),
  ],
});
