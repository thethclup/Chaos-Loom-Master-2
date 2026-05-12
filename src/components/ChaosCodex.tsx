import { GameState } from '../App';

interface Props {
  setGameState: (state: GameState) => void;
}

export default function ChaosCodex({ setGameState }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black bg-opacity-90 backdrop-blur-xl p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-purple-400">
            Chaos Codex
          </h2>
          <button 
            onClick={() => setGameState('TITLE')}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors border border-gray-800 px-4 py-2"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Thread Evolutions</h3>
            
            <div className="bg-gray-900 border border-gray-800 p-4 relative overflow-hidden group hover:border-pink-500 transition-colors">
               <div className="absolute top-0 right-0 p-2 text-pink-500 opacity-20 group-hover:opacity-100 transition-opacity">01</div>
               <h4 className="text-lg font-bold text-white mb-1">Fractal Thread</h4>
               <p className="text-xs text-gray-400">Splits into smaller threads upon collision with the loom boundaries edge. Very chaotic.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-4 relative overflow-hidden group hover:border-purple-500 transition-colors">
               <div className="absolute top-0 right-0 p-2 text-purple-500 opacity-20 group-hover:opacity-100 transition-opacity">02</div>
               <h4 className="text-lg font-bold text-white mb-1">Void Thread</h4>
               <p className="text-xs text-gray-400">Absorbs nearby normal threads. Eats reality. Must be balanced.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-4 relative overflow-hidden group hover:border-yellow-500 transition-colors">
               <div className="absolute top-0 right-0 p-2 text-yellow-500 opacity-20 group-hover:opacity-100 transition-opacity">03</div>
               <h4 className="text-lg font-bold text-white mb-1 opacity-50">Singularity Thread</h4>
               <p className="text-xs text-gray-600">[LOCKED] Combine 10 Void Threads.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Chaos Domains</h3>
            
            <div className="bg-gray-900 border border-gray-800 p-4">
              <h4 className="text-lg font-bold text-blue-400 mb-1">Gravity Chaos</h4>
              <p className="text-xs text-gray-400">Multiple looms exert extreme gravitational pull, creating thread slingshots.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-4">
              <h4 className="text-lg font-bold text-emerald-400 mb-1 opacity-50">Mirror Realm</h4>
              <p className="text-xs text-gray-600">[LOCKED] Discover the edge of the screen 50 times.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
