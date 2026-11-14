import { useEffect, useState } from 'react';
import {
  useAccount,
  useCallsStatus,
  useSendCalls,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { useWalletCapabilities } from './useWalletCapabilities';
import { BASE_DENIM_BLOCK_TIME_MS, baseDenimMainnet } from '../lib/wagmi';
import { logTransactionAttribution } from '../lib/erc8021/attribution';

const GM_CONTRACT = '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7' as const;
const DATA_SUFFIX = '0x07626173656170700080218021802180218021802180218021' as const; // App Builder Code Suffix

export function useSayGM() {
  const { isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { supportsBatching } = useWalletCapabilities();

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [callsId, setCallsId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { sendCallsAsync, isPending: isCallsPending } = useSendCalls();
  const { sendTransactionAsync, isPending: isTxPending } = useSendTransaction();

  // Denim Mainnet produces canonical blocks every 200ms (no Flashblocks preconfirmation receipts)
  const {
    data: receipt,
    isLoading: isTxConfirming,
    isSuccess: isTxConfirmed,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: baseDenimMainnet.id,
    confirmations: 1,
    pollingInterval: BASE_DENIM_BLOCK_TIME_MS,
    query: {
      enabled: Boolean(txHash),
    },
  });

  const { data: callsStatus } = useCallsStatus({
    id: callsId ?? '',
    query: {
      enabled: Boolean(callsId),
      refetchInterval: (query) => {
        const status = query.state.data?.status;
        if (status === 'success' || status === 'failure') return false;
        return BASE_DENIM_BLOCK_TIME_MS;
      },
    },
  });

  const isCallsConfirming = Boolean(callsId) && callsStatus?.status === 'pending';
  const isCallsConfirmed = callsStatus?.status === 'success';

  const confirmedTxHash =
    receipt?.transactionHash ??
    callsStatus?.receipts?.[0]?.transactionHash ??
    txHash;

  useEffect(() => {
    if ((isTxConfirmed || isCallsConfirmed) && confirmedTxHash) {
      logTransactionAttribution(confirmedTxHash);
    }
  }, [isTxConfirmed, isCallsConfirmed, confirmedTxHash]);

  const isPending = isCallsPending || isTxPending;
  const isConfirming = isTxConfirming || isCallsConfirming;
  const isConfirmed = isTxConfirmed || isCallsConfirmed;

  const reset = () => {
    setTxHash(undefined);
    setCallsId(undefined);
    setError(null);
  };

  const sayGM = async () => {
    if (!isConnected) return;

    setError(null);
    setTxHash(undefined);
    setCallsId(undefined);

    try {
      if (chainId !== baseDenimMainnet.id) {
        await switchChainAsync({ chainId: baseDenimMainnet.id });
      }

      if (supportsBatching) {
        const result = await sendCallsAsync({
          chainId: baseDenimMainnet.id,
          calls: [
            {
              to: GM_CONTRACT,
              value: parseEther('0'),
              data: '0x474d',
            },
          ],
          capabilities: {
            dataSuffix: {
              value: DATA_SUFFIX,
              optional: true,
            },
          },
        });
        setCallsId(result.id);
      } else {
        // EOA fallback: append ERC-8021 builder code suffix manually
        const dataWithSuffix = `0x474d${DATA_SUFFIX.slice(2)}` as `0x${string}`;
        const hash = await sendTransactionAsync({
          chainId: baseDenimMainnet.id,
          to: GM_CONTRACT,
          value: parseEther('0'),
          data: dataWithSuffix,
        });
        setTxHash(hash);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Transaction failed on Base Mainnet';
      setError(message.split('\n')[0]);
    }
  };

  return {
    sayGM,
    isPending,
    isConfirming,
    isConfirmed,
    txHash: confirmedTxHash,
    error,
    reset,
  };
}
