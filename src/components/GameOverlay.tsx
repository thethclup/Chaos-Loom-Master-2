import React from 'react';
import { GameState } from '../App';

interface Props {
  setGameState: (state: GameState) => void;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function GameOverlay({ setGameState, score, setScore }: Props) {
  // In a real implementation, score would be updated by the CanvasGame
  // Here we'll just mock random score increases for effect if we wanted.

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <p className="text-[10px] uppercase font-mono text-pink-500 tracking-widest">Chaos Intensity</p>
          <h2 className="text-4xl font-black font-mono text-white drop-shadow-[0_0_10px_white]">{Math.floor(score).toLocaleString()}</h2>
        </div>
        
        <button 
          onClick={() => setGameState('SHATTERED')}
          className="pointer-events-auto bg-red-900 border border-red-500 text-red-200 px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-red-600 transition-colors"
        >
          Shatter Reality (End)
        </button>
      </div>

      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-2">
          <div className="bg-black/50 border border-purple-500/50 p-2 text-xs uppercase text-purple-200 tracking-wider backdrop-blur-sm">
            Gravity Domain Active
          </div>
          <div className="bg-black/50 border border-blue-500/50 p-2 text-xs uppercase text-blue-200 tracking-wider backdrop-blur-sm">
            Fractal Threads: Unlocked
          </div>
        </div>
        
        <div className="flex gap-2">
           <button 
             className="pointer-events-auto h-16 w-16 rounded-full border border-pink-500 bg-black/60 backdrop-blur-md flex items-center justify-center text-xs uppercase flex-col group hover:bg-pink-900 transition-all"
             onClick={() => window.dispatchEvent(new Event('trigger-surge'))}
             >
             <span className="text-[10px] text-pink-400 group-hover:text-white">Chaos</span>
             <span className="font-bold text-white tracking-widest">SURGE</span>
           </button>
        </div>
      </div>

    </div>
  );
}
