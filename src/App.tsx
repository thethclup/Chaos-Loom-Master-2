import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import CanvasGame from './components/CanvasGame';
import GameOverlay from './components/GameOverlay';
import RealityShattered from './components/RealityShattered';
import ChaosCodex from './components/ChaosCodex';
import Leaderboard from './components/Leaderboard';
import LoomSanctum from './components/LoomSanctum';
import { useAccount } from 'wagmi';

export type GameState = 'TITLE' | 'PLAYING' | 'SHATTERED' | 'CODEX' | 'LEADERBOARD' | 'SANCTUM';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [score, setScore] = useState(0);

  return (
    <div className="w-full h-screen bg-black overflow-hidden font-sans text-white select-none">
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
