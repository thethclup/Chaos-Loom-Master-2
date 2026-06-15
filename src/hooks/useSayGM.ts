import { useSendCalls, useSendTransaction, useAccount } from 'wagmi';
import { useWalletCapabilities } from './useWalletCapabilities';
import { parseEther } from 'viem';
import { base } from 'wagmi/chains';

const GM_CONTRACT = '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7';
const DATA_SUFFIX = '0x07626173656170700080218021802180218021802180218021'; // App Builder Code Suffix

export function useSayGM() {
  const { isConnected } = useAccount();
  const { supportsBatching } = useWalletCapabilities();
  const { sendCalls, isPending: isCallsPending } = useSendCalls();
  const { sendTransaction, isPending: isTxPending } = useSendTransaction();

  const isPending = isCallsPending || isTxPending;

  const sayGM = () => {
    if (!isConnected) return;

    if (supportsBatching) {
      sendCalls({
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
    } else {
      // EOA fallback: append manually. 
      // 0x474d + suffix (omitting the "0x" from suffix)
      const dataWithSuffix = `0x474d${DATA_SUFFIX.slice(2)}` as `0x${string}`;
      sendTransaction({
        to: GM_CONTRACT,
        value: parseEther('0'),
        data: dataWithSuffix,
      });
    }
  };

  return { sayGM, isPending };
}
