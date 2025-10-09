import { useState, useEffect } from "react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  PublicKey 
} from '@solana/web3.js';
import Tokenomics from './Tokenomics';

export default function PresaleCard() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [totalPledged, setTotalPledged] = useState(0);
  
  const targetAmount = 1000000; // 1M SOL
  const RECIPIENT_ADDRESS = 'CLw3nPbuo9UiikgDtxpEKGtWpUMgELJrCyEKH9TXG7E9';

  // Fetch total pledged amount
  useEffect(() => {
    const fetchTotalPledged = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BASE_API_URL;
        const response = await fetch(`${apiUrl}/api/transactions/total`);
        const data = await response.json();
        if (data.success) {
          setTotalPledged(data.totalPledged);
        }
      } catch (error) {
        console.error('Error fetching total pledged:', error);
      }
    };

    fetchTotalPledged();
    // Refresh every 1 minute (60 seconds)
    const interval = setInterval(fetchTotalPledged, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectWallet = () => {
    const walletButton = document.querySelector('.wallet-adapter-button');
    if (walletButton) {
      walletButton.click();
    }
  };

  const handleCommit = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }
    
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount to participate!");
      return;
    }
    
    if (amount > targetAmount) {
      alert(`You cannot commit more than ${targetAmount} SOL.`);
      return;
    }

    setLoading(true);
    setTxHash('');

    try {
      const solAmount = parseFloat(amount);
      const lamportsToSend = Math.floor(solAmount * LAMPORTS_PER_SOL);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(RECIPIENT_ADDRESS),
          lamports: lamportsToSend,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      await connection.confirmTransaction(signature, 'confirmed');

      setTxHash(signature);
      
      try {
        const apiUrl = import.meta.env.VITE_BASE_API_URL;
        console.log(apiUrl);
        const data = await fetch(`${apiUrl}/api/transactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            signature: signature,
            walletAddress: publicKey.toString(),
            amount: solAmount,
            timestamp: new Date().toISOString()
          }),
          
        });
        console.log('Transaction logged successfully',data);
      } catch (apiError) {
        console.error('API Error:', apiError);
      }
      
      alert(`Successfully committed ${amount} SOL!`);
      setAmount('');
    } catch (err) {
      alert(`Transaction failed: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.min((totalPledged / targetAmount) * 100, 100);

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-6 mt-8 md:mt-12 mb-8 md:mb-12">
      <div className="max-w-[1200px] w-full">
        {/* 60-40 Split Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6">
          {/* Left Side - 60% - Progress Chart */}
          <div className="w-full lg:w-[60%] p-6 md:p-8 lg:p-10 bg-[#212121] rounded-3xl flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              PRESALE
            </h2>
            
            {/* Progress Info */}
            <div className="bg-[#2a2a2a] rounded-2xl p-4 mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base text-gray-300">Progress</span>
                <span className="text-base text-white font-semibold">{totalPledged} / 1M SOL</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-[#4ade80] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-end">
                <span className="text-sm text-gray-400">$1,000,000</span>
              </div>
            </div>

            {/* Tokenomics Chart */}
            <div className="flex-1 relative min-h-[250px] sm:min-h-[300px] md:min-h-[350px] bg-[#1a1a1a] rounded-2xl border border-gray-700 overflow-hidden p-3 sm:p-4 md:p-6 flex flex-col">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4 text-center">
                Tokenomics
              </h3>
              <div className="flex-1 flex items-center justify-center w-full">
                <Tokenomics />
              </div>
            </div>
          </div>

          {/* Right Side - 40% - Buy Form */}
          <div className="w-full lg:w-[40%] p-6 md:p-8 lg:p-10 bg-[#212121] rounded-3xl flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Buy CGAI
            </h2>

            {/* You Pay Section */}
            <div className="mb-6">
              <div className="bg-[#2a2a2a] rounded-2xl p-2.5 sm:p-3 md:p-4 border border-gray-700 flex items-center gap-1.5 sm:gap-2 md:gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 font-semibold text-white outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-0 text-[20px] sm:text-[24px]"
                />
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0 self-center mt-[2px] sm:mt-0">
                  <img 
                    src="/LandingPage/presale/SolanaLogo.png" 
                    alt="Solana" 
                    className="object-contain w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]"
                  />
                  <span className="font-semibold text-white whitespace-nowrap text-[20px] sm:text-[24px]">SOL</span>
                </div>
              </div>
            </div>

            {/* Hidden Wallet Button */}
            <div style={{ display: 'none' }}>
              <WalletMultiButton />
            </div>

            {/* Connect Wallet Button */}
            <button
              onClick={connected ? handleCommit : handleConnectWallet}
              disabled={connected && (loading || !amount || parseFloat(amount) <= 0)}
              className={`w-full h-14 bg-black text-white rounded-full text-lg font-semibold mb-6 transition-all duration-200 ${
                connected && (loading || !amount || parseFloat(amount) <= 0) 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:text-black'
              }`}
            >
              {loading ? 'Processing...' : connected ? 'Commit' : 'Connect Wallet'}
            </button>

            {/* Target and Offering */}
            <div className="flex gap-2 sm:gap-3 mb-4 mt-6">
              <div className="flex-1 bg-[#2a2a2a] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-gray-700">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Target</p>
                <p className="text-sm sm:text-lg font-bold text-white">1M SOL</p>
              </div>
              <div className="flex-1 bg-[#2a2a2a] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-gray-700">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Offering</p>
                <p className="text-sm sm:text-lg font-bold text-white">20M UPLH</p>
              </div>
            </div>

            {/* Promo Video */}
            <div className="bg-[#2a2a2a] rounded-2xl overflow-hidden border border-gray-700 h-32 mt-auto">
              <video
                className="w-full h-full object-cover"
                src="/LandingPage/presale/promo.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Transaction Success */}
            {txHash && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-500 rounded-xl">
                <p className="text-green-400 text-sm font-medium mb-2">Transaction Successful!</p>
                <p className="text-green-300 text-xs font-mono mb-2">
                  {txHash.slice(0, 12)}...{txHash.slice(-12)}
                </p>
                <a
                  href={`https://solscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 text-sm hover:underline"
                >
                  View on Solscan
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}