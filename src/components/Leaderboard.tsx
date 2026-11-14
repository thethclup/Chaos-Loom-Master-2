import { GameState } from '../App';
import { useAccount } from 'wagmi';
import { useSayGM } from '../hooks/useSayGM';
import { BASE_EXPLORER_URL } from '../lib/wagmi';

interface Props {
  setGameState: (state: GameState) => void;
}

export default function Leaderboard({ setGameState }: Props) {
  const { isConnected } = useAccount();
  const { sayGM, isPending, isConfirming, isConfirmed, txHash, error } = useSayGM();
  const isBusy = isPending || isConfirming;

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
            <p className="text-xs text-gray-400 mb-6 max-w-sm mx-auto">Submit a transaction to Base Mainnet (200ms canonical blocks) to leave your mark permanently in the Chaos Loom.</p>
            
            <button 
              onClick={sayGM}
              disabled={!isConnected || isBusy}
              className={`w-full py-3 font-mono text-sm tracking-widest uppercase transition-colors ${!isConnected || isBusy ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
              {!isConnected
                ? 'CONNECT WALLET FIRST'
                : isPending
                  ? 'SUBMITTING TO BASE...'
                  : isConfirming
                    ? 'CONFIRMING ON BASE...'
                    : 'SAY GM ON Base'}
            </button>

            {isConfirmed && txHash && (
              <a
                href={`${BASE_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-mono text-emerald-400 hover:underline"
              >
                Confirmed on Base Mainnet ({txHash.slice(0, 8)}...{txHash.slice(-6)})
              </a>
            )}
            {error && (
              <p className="mt-3 text-xs font-mono text-red-400">{error}</p>
            )}
        </div>

      </div>
    </div>
  );
}
