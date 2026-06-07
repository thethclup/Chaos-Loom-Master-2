import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import CanvasGame from './components/CanvasGame';
import GameOverlay from './components/GameOverlay';
import RealityShattered from './components/RealityShattered';
import ChaosCodex from './components/ChaosCodex';
import Leaderboard from './components/Leaderboard';
import LoomSanctum from './components/LoomSanctum';
import { useAccount, useSendTransaction } from 'wagmi';
import { Sun } from 'lucide-react';
import { parseEther } from 'viem';

export type GameState = 'TITLE' | 'PLAYING' | 'SHATTERED' | 'CODEX' | 'LEADERBOARD' | 'SANCTUM';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [score, setScore] = useState(0);
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7',
      value: parseEther('0'),
      data: '0x474d', // "GM" in hex
    });
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden font-sans text-white select-none relative">
      {isConnected && (
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={sendGMTransaction}
            className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
          >
            <Sun size={16} />
            Say GM
          </button>
        </div>
      )}

      {gameState === 'PLAYING' && (
         <CanvasGame setScore={setScore} />
      )}
      
      {gameState === 'PLAYING' && (
        <GameOverlay setGameState={setGameState} score={score} setScore={setScore} />
      )}

      {gameState === 'TITLE' && (
        <TitleScreen setGameState={setGameState} />
      )}
      
      {gameState === 'SHATTERED' && (
        <RealityShattered setGameState={setGameState} score={score} />
      )}
      
      {gameState === 'CODEX' && (
        <ChaosCodex setGameState={setGameState} />
      )}
      
      {gameState === 'LEADERBOARD' && (
        <Leaderboard setGameState={setGameState} />
      )}
      
      {gameState === 'SANCTUM' && (
        <LoomSanctum setGameState={setGameState} />
      )}
    </div>
  );
}
