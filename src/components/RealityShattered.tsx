import { useState } from 'react';
import { GameState } from '../App';
import { motion } from 'motion/react';
import { CODE, logTransactionAttribution } from '../lib/erc8021/attribution';
import { Sun } from 'lucide-react';
import { useSayGM } from '../hooks/useSayGM';
import { BASE_EXPLORER_URL } from '../lib/wagmi';

interface Props {
  setGameState: (state: GameState) => void;
  score: number;
}

export default function RealityShattered({ setGameState, score }: Props) {
  const { sayGM, isPending, isConfirming, isConfirmed, txHash, error } = useSayGM();
  const [recordedMessage, setRecordedMessage] = useState<string | null>(null);
  const isBusy = isPending || isConfirming;
  
  const handleRecordOnChain = async () => {
    setRecordedMessage(null);
    await sayGM();
    logTransactionAttribution(`score:${Math.floor(score)}`);
    setRecordedMessage(`Builder Code ${CODE} attached on Base Mainnet.`);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-transparent backdrop-blur-xl">
      <div className="absolute inset-0 bg-red-900/20 mix-blend-color-burn pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center relative z-10 max-w-lg px-8 w-full"
      >
        <h2 className="text-6xl font-black text-white mix-blend-overlay opacity-10 uppercase track-tighter absolute inset-0 -top-12 flex justify-center items-center pointer-events-none">
          SHATTERED
        </h2>
        <h2 className="text-5xl font-black text-red-500 uppercase tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(255,0,0,1)] relative">
          Reality Shattered
        </h2>
        <p className="text-xl font-mono text-pink-300 mb-8">
          The loom could not contain your chaos.
        </p>
        
        <div className="bg-black/50 border border-red-500/50 p-6 mb-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Maximum Chaos Reached</p>
          <p className="text-5xl font-black font-mono text-white drop-shadow-[0_0_10px_white]">
            {Math.floor(score).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleRecordOnChain}
            disabled={isBusy}
            className="w-full bg-[#0052FF] text-white py-4 font-black uppercase text-sm tracking-widest hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(0,82,255,0.4)] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isBusy ? 'Recording on Base Mainnet...' : 'Record Legendary Chaos On-Chain'}
          </button>
          
          <button 
            onClick={sayGM}
            disabled={isBusy}
            className={`w-full py-4 font-black uppercase text-sm tracking-widest transition-colors shadow-[0_0_20px_rgba(232,160,32,0.2)] flex justify-center items-center gap-2 ${
              isBusy 
                ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                : 'bg-[#E8A020]/20 border border-[#E8A020]/50 text-[#E8A020] hover:bg-[#E8A020]/30'
            }`}
          >
            <Sun size={18} />
            {isPending ? 'Sending...' : isConfirming ? 'Confirming...' : 'Say GM'}
          </button>

          {isConfirmed && txHash && (
            <a
              href={`${BASE_EXPLORER_URL}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              Confirmed on Base Mainnet ({txHash.slice(0, 8)}...{txHash.slice(-6)})
            </a>
          )}
          {recordedMessage && !error && (
            <p className="text-xs font-mono text-blue-300">{recordedMessage}</p>
          )}
          {error && (
            <p className="text-xs font-mono text-red-400">{error}</p>
          )}
          
          <button 
            onClick={() => setGameState('TITLE')}
            className="w-full border border-gray-600 bg-transparent text-gray-400 py-4 font-bold uppercase text-sm tracking-widest hover:border-white hover:text-white transition-colors mt-2"
          >
            Return to Title
          </button>
        </div>
      </motion.div>
    </div>
  );
}
