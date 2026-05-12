import { GameState } from '../App';
import { useAccount, useSendTransaction, useWriteContract } from 'wagmi';

interface Props {
  setGameState: (state: GameState) => void;
}

export default function Leaderboard({ setGameState }: Props) {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const handleSayGm = () => {
    // Basic "Say GM" transaction (Mocked or simple transfer to oneself with data if we had an ABI, 
    // here we just use sendTransaction to self for demonstration of on-chain tx).
    // In a real app we'd call a contract method.
    sendTransaction({
      to: '0x0000000000000000000000000000000000000000',
      value: BigInt(0),
      data: '0x474d', // 'GM' in hex
    });
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black bg-opacity-90 backdrop-blur-xl p-8 overflow-y-auto">
      <div className="max-w-2xl w-full mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-600">
            Supreme Masters (Base)
          </h2>
          <button 
            onClick={() => setGameState('TITLE')}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            [Close]
          </button>
        </div>

        <div className="space-y-4 mb-12">
          {/* Mock Leaderboard */}
          {[
            { rank: 1, p: '0x8A1...4fD2', score: '9,999,999', chaos: 'Fractal Annihilation' },
            { rank: 2, p: '0x1C9...88a1', score: '8,412,020', chaos: 'Void Collapse' },
            { rank: 3, p: 'base.eth', score: '7,100,500', chaos: 'Singularity Weave' },
            { rank: 4, p: 'chaoslover.eth', score: '5,023,101', chaos: 'Rainbow Anomaly' },
          ].map((entry) => (
            <div key={entry.rank} className="flex justify-between items-center bg-gray-900 border border-gray-800 p-4 hover:border-orange-500/50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-orange-500 font-mono text-xl">{entry.rank}</span>
                <span className="font-bold text-gray-300">{entry.p}</span>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg text-white">{entry.score}</div>
                <div className="text-[10px] text-gray-500 uppercase">{entry.chaos}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900/50 p-6 border border-gray-800 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">On-Chain Interaction</h3>
            <p className="text-xs text-gray-400 mb-6 max-w-sm mx-auto">Submit a transaction to the Base network to leave your mark permanently in the Chaos Loom.</p>
            
            <button 
              onClick={handleSayGm}
              disabled={!isConnected}
              className={`w-full py-3 font-mono text-sm tracking-widest uppercase transition-colors ${isConnected ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              {isConnected ? 'SAY GM ON Base' : 'CONNECT WALLET FIRST'}
            </button>
        </div>

      </div>
    </div>
  );
}
