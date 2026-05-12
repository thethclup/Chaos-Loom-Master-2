import { GameState } from '../App';
import { deployAgent } from '../lib/erc8004/agents';

interface Props {
  setGameState: (state: GameState) => void;
}

export default function LoomSanctum({ setGameState }: Props) {
  
  const handleDeployAgent = () => {
    deployAgent({
      id: "tsk_" + Date.now(),
      name: "Auto-Weave Protocol",
      targetAddress: "0x123..."
    });
    alert("Trustless Agent deployed! It will now weave chaos in the background automatically on-chain.");
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black bg-opacity-95 backdrop-blur-3xl p-8 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            Loom Sanctum
          </h2>
          <button 
            onClick={() => setGameState('TITLE')}
            className="text-xs uppercase tracking-widest text-cyan-500/50 hover:text-cyan-400 transition-colors"
          >
            Return
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          <div className="border border-cyan-500/30 bg-cyan-900/10 p-6 flex flex-col justify-between">
             <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2 uppercase">Core Resonator</h3>
                <p className="text-sm text-gray-400">Increases base thread spawn rate by 25%.</p>
             </div>
             <button className="bg-cyan-900 text-cyan-200 py-2 text-xs uppercase tracking-widest border border-cyan-700 hover:bg-cyan-800">
               Upgrade (1,000 Chaos)
             </button>
          </div>

          <div className="border border-purple-500/30 bg-purple-900/10 p-6 flex flex-col justify-between">
             <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2 uppercase">Void Capacitors</h3>
                <p className="text-sm text-gray-400">Allows Void Threads to survive 50% longer without consuming normal threads.</p>
             </div>
             <button className="bg-purple-900 text-purple-200 py-2 text-xs uppercase tracking-widest border border-purple-700 hover:bg-purple-800">
               Upgrade (5,000 Chaos)
             </button>
          </div>

        </div>

        <div className="border border-[#0052FF]/50 bg-[#0052FF]/10 p-8 text-center mt-12 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <h3 className="text-xl font-bold text-white mb-4 uppercase relative z-10">ERC-8004 Trustless Agents</h3>
           <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto relative z-10">
             Deploy an autonomous agent to continue weaving chaos and earning points even when you are disconnected.
           </p>
           <button 
             onClick={handleDeployAgent}
             className="relative z-10 bg-[#0052FF] text-white px-8 py-3 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(0,82,255,0.6)] hover:bg-blue-600 hover:scale-105 transition-all"
           >
             Deploy Auto-Weaver Agent
           </button>
        </div>

      </div>
    </div>
  );
}
