import { motion } from 'motion/react';
import { GameState } from '../App';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface Props {
  setGameState: (state: GameState) => void;
}

export default function TitleScreen({ setGameState }: Props) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 1, ease: 'easeOut' }}
         className="text-center flex flex-col items-center"
       >
         <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-2 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)]">
           Chaos Loom <br/> Master 2
         </h1>
         <p className="text-pink-300 font-mono text-sm md:text-base mb-12 tracking-widest uppercase">
           Weave The Fabric of Reality
         </p>
         
         <div className="flex flex-col gap-4 w-full max-w-xs">
           <button 
             onClick={() => setGameState('PLAYING')}
             className="relative overflow-hidden group bg-transparent text-white font-bold py-4 px-8 border border-pink-500 rounded-none uppercase tracking-widest text-sm transition-all hover:scale-105"
           >
             <span className="relative z-10">Enter The Loom</span>
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-600 to-pink-600 transition-opacity z-0 blur-sm"></div>
             <div className="absolute inset-0 opacity-0 group-hover:opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 transition-opacity z-0"></div>
           </button>
           
           <div className="grid grid-cols-2 gap-4">
             <button onClick={() => setGameState('CODEX')} className="border border-purple-900 bg-black text-purple-400 py-3 text-xs uppercase tracking-wider hover:bg-purple-900 hover:text-white transition-colors">
               Codex
             </button>
             <button onClick={() => setGameState('SANCTUM')} className="border border-purple-900 bg-black text-purple-400 py-3 text-xs uppercase tracking-wider hover:bg-purple-900 hover:text-white transition-colors">
               Sanctum
             </button>
           </div>
           
           <button onClick={() => setGameState('LEADERBOARD')} className="border border-orange-900 bg-black text-orange-400 py-3 text-xs uppercase tracking-wider hover:bg-orange-900 hover:text-white transition-colors">
             Leaderboard
           </button>
         </div>

         <div className="mt-16 border-t border-purple-900/50 pt-8 w-full max-w-xs flex flex-col items-center">
            {isConnected ? (
              <div className="text-center">
                <p className="text-xs font-mono text-green-400 mb-2">Connected: {address?.substring(0,6)}...{address?.substring(address.length - 4)}</p>
                <button onClick={() => disconnect()} className="text-[10px] text-gray-500 hover:text-gray-300 uppercase tracking-widest">Disconnect</button>
              </div>
            ) : (
              <button 
                onClick={() => connect({ connector: injected() })}
                className="bg-[#0052FF] text-white py-3 px-6 w-full text-xs uppercase tracking-widest font-bold border border-[#0052FF] hover:bg-blue-700 transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Connect Wallet (Base)
              </button>
            )}
         </div>

       </motion.div>
    </div>
  );
}
