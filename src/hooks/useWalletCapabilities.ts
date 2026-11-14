import { useCapabilities } from 'wagmi';
import { useMemo } from 'react';
import { baseDenimMainnet } from '../lib/wagmi';

export function useWalletCapabilities() {
  const { data: capabilities } = useCapabilities();

  const supportsBatching = useMemo(() => {
    const atomic = capabilities?.[baseDenimMainnet.id]?.atomic;
    return atomic?.status === 'ready' || atomic?.status === 'supported';
  }, [capabilities]);

  const supportsPaymaster = useMemo(() => {
    return capabilities?.[baseDenimMainnet.id]?.paymasterService?.supported === true;
  }, [capabilities]);

  return { supportsBatching, supportsPaymaster };
}
