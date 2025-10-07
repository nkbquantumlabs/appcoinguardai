import { useState } from "react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  PublicKey 
} from '@solana/web3.js';

export default function PresaleCard() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  
  const maxAmount = 1240000;
  const RECIPIENT_ADDRESS = 'CLw3nPbuo9UiikgDtxpEKGtWpUMgELJrCyEKH9TXG7E9';

  const handleMaxClick = () => {
    setAmount(maxAmount);
  };

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
    
    if (amount > maxAmount) {
      alert(`You cannot commit more than ${maxAmount} WHYPE.`);
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
      
      alert(`Successfully committed ${amount} WHYPE!`);
      setAmount('');
    } catch (err) {
      alert(`Transaction failed: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-6 mt-8 md:mt-12 mb-8 md:mb-12">
      <div className="max-w-[900px] w-full bg-zinc-800 rounded-2xl md:rounded-[36px] overflow-hidden flex flex-col gap-3 md:gap-4 pb-4 md:pb-6">
      <div className="w-full px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-lime-400 via-lime-600 to-zinc-800 rounded-tl-2xl rounded-tr-2xl md:rounded-tl-[36px] md:rounded-tr-[36px]">
        <h2 className="text-zinc-800 text-2xl md:text-3xl lg:text-4xl font-bold font-['Manrope'] uppercase">
          Presale
        </h2>
      </div>

      <div className="w-full px-4 md:px-6 flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col gap-1 md:gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-stone-300 text-sm md:text-base lg:text-lg font-['Manrope']">
              Progress
            </span>
            <span className="text-white text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
              1.24M WHYPE
            </span>
          </div>
          <div className="w-full h-2.5 md:h-3 lg:h-4 bg-zinc-500 rounded-full shadow-[inset_0_4px_4px_rgba(51,51,51,0.25)] md:shadow-[inset_0_6px_6px_rgba(51,51,51,0.25)]" />
          <div className="text-right text-stone-300 text-sm md:text-base lg:text-lg font-['Manrope']">
            $12,545,545,683
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="w-full sm:w-44 md:w-48 bg-stone-300 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col gap-1 md:gap-2">
            <span className="text-zinc-800 text-sm md:text-base font-['Manrope']">
              Target
            </span>
            <span className="text-zinc-800 text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
              1.24M WHYPE
            </span>
          </div>
          <div className="w-full sm:w-44 md:w-48 bg-stone-300 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col gap-1 md:gap-2">
            <span className="text-zinc-800 text-sm md:text-base font-['Manrope']">
              Offering
            </span>
            <span className="text-zinc-800 text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
              20M UPLH
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <span className="text-stone-300 text-sm md:text-base font-['Manrope']">
            Period
          </span>
          <div className="flex items-center gap-2 text-white text-base md:text-lg lg:text-xl font-semibold font-['Manrope']">
            <span>26/05/2025</span>
            <span>-</span>
            <span>15/08/2025</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-zinc-500">
          <span className="text-stone-300 text-base md:text-lg lg:text-xl font-medium font-['Manrope']">
            Participate
          </span>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="w-full sm:w-64 md:w-80 flex justify-between items-center h-12 md:h-14 px-3 md:px-4 bg-stone-300 rounded-xl md:rounded-2xl">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full h-full bg-transparent text-zinc-800 text-base md:text-lg lg:text-xl font-medium font-['Manrope'] outline-none"
              />
              <button
                onClick={handleMaxClick}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-500 rounded-md md:rounded-lg text-white text-base md:text-lg lg:text-xl font-medium font-['Manrope']"
              >
                Max
              </button>
            </div>

            <div style={{ display: 'none' }}>
              <WalletMultiButton />
            </div>
            
            <button
              onClick={connected ? handleCommit : handleConnectWallet}
              disabled={connected && (loading || !amount || parseFloat(amount) <= 0)}
              className={`w-full ${connected ? 'sm:w-32 md:w-36' : 'sm:w-44 md:w-48'} flex justify-center items-center h-12 md:h-14 px-4 md:px-5 bg-zinc-800 rounded-xl md:rounded-2xl border border-lime-400 text-lime-400 text-base md:text-lg lg:text-xl font-medium font-['Manrope'] ${
                connected && (loading || !amount || parseFloat(amount) <= 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-400 hover:text-zinc-800 transition-colors duration-200'
              }`}
            >
              {loading ? 'Processing...' : connected ? 'Commit' : 'Connect Wallet'}
            </button>
          </div>
        </div>
        
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
  );
}