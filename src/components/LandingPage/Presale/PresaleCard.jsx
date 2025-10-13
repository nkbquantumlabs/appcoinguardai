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
import Alert from './Alert';

export default function PresaleCard() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [totalPledged, setTotalPledged] = useState(0);
  const [alert, setAlert] = useState(null);
  
  const targetAmount = 300; // 1M SOL
  const RECIPIENT_ADDRESS = 'CLw3nPbuo9UiikgDtxpEKGtWpUMgELJrCyEKH9TXG7E9';

  const showAlert = (type, message, txHash = null) => {
    setAlert({ type, message, txHash });
  };

  const closeAlert = () => {
    setAlert(null);
  };

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
    // Refresh every 5 seconds
    const interval = setInterval(fetchTotalPledged, 5000);
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
      showAlert('warning', 'Please connect your wallet first!');
      return;
    }
    
    if (!amount || amount <= 0) {
      showAlert('warning', 'Please enter a valid amount to participate!');
      return;
    }
    
    if (amount > targetAmount) {
      showAlert('warning', `You cannot commit more than ${targetAmount} SOL.`);
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
        await fetch(`${apiUrl}/api/transactions`, {
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
      } catch (apiError) {
        // Silently handle API logging errors
      }
      
      showAlert('success', `Successfully committed ${amount} SOL!`, signature);
      setAmount('');
    } catch (err) {
      showAlert('error', `Transaction failed: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.min((totalPledged / targetAmount) * 100, 100);

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0%, 100% {
              background-position: left;
            }
            50% {
              background-position: right;
            }
          }

          .progress-container {
            position: relative;
            width: 100%;
            height: 20px;
            background: radial-gradient(circle,rgba(27, 39, 53, 0.56), #090a0f);
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
            box-sizing: border-box;
            border: 1px solid #313131;
          }

          .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, #00f260, #0575e6);
            border-radius: 30px;
            transition: width 0.5s ease-in-out;
            box-shadow: 0 0 15px #00f260, 0 0 30px #0575e6;
          }

          .progress-bar::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent);
            opacity: 0.5;
            animation: ripple 3s infinite;
          }

          .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #fff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
            z-index: 2;
          }

          .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            opacity: 0.6;
            animation: float 5s infinite ease-in-out;
          }

          @keyframes ripple {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0.7;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.5);
              opacity: 0;
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }

          .particle:nth-child(1) {
            top: 10%;
            left: 20%;
            animation-delay: 0s;
          }
          .particle:nth-child(2) {
            top: 30%;
            left: 70%;
            animation-delay: 1s;
          }
          .particle:nth-child(3) {
            top: 50%;
            left: 50%;
            animation-delay: 2s;
          }
          .particle:nth-child(4) {
            top: 80%;
            left: 40%;
            animation-delay: 1.5s;
          }
          .particle:nth-child(5) {
            top: 90%;
            left: 60%;
            animation-delay: 2.5s;
          }
        `}
      </style>
      <div className="w-full flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-6 mt-8 md:mt-12 mb-8 md:mb-12">
      <div className="max-w-[1200px] w-full">
        {/* 60-40 Split Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6">
          <div className="w-full lg:w-[60%] p-6 md:p-8 lg:p-10 bg-[#212121] rounded-3xl flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              PRESALE
            </h2>
            
            {/* Progress Info */}
            <div className="bg-[#2a2a2a] rounded-2xl p-4 mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base text-gray-300">Progress</span>
                <span className="text-base text-white font-semibold">{totalPledged.toFixed(2)} / 300 SOL</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                />
                <div className="particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </div>
              
              <div className="flex justify-end mt-3">
                <span className="text-sm text-gray-400">&nbsp;</span>
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
              Buy $CGAI
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
              className={`w-full h-14 rounded-full text-lg font-semibold mb-6 relative flex items-center justify-center cursor-pointer overflow-hidden ${
                connected && (loading || !amount || parseFloat(amount) <= 0) 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
              style={{
                border: 'none',
                background: 'linear-gradient(to right, #77530a, #ffd277, #77530a, #77530a, #ffd277, #77530a)',
                backgroundSize: '250%',
                color: '#ffd277',
                animation: 'gradientShift 3s ease-in-out infinite',
              }}
              onMouseDown={(e) => {
                if (!(connected && (loading || !amount || parseFloat(amount) <= 0))) {
                  e.target.style.transform = 'scale(0.95)';
                }
              }}
              onMouseUp={(e) => {
                if (!(connected && (loading || !amount || parseFloat(amount) <= 0))) {
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              <span
                className="absolute flex items-center justify-center transition-all duration-1000"
                style={{
                  content: '""',
                  color: '#ffd277',
                  width: '97%',
                  height: '90%',
                  borderRadius: '25px',
                  backgroundColor: 'rgba(0, 0, 0, 0.842)',
                  backgroundSize: '200%',
                }}
              >
                {loading ? 'Processing...' : connected ? 'Commit' : 'Connect Wallet'}
              </span>
            </button>

            {/* Target and Offering */}
            <div className="flex gap-2 sm:gap-3 mb-4 mt-6">
              <div className="flex-1 bg-[#2a2a2a] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-gray-700">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Target</p>
                <p className="text-sm sm:text-lg font-bold text-white">300 SOL</p>
              </div>
              <div className="flex-1 bg-[#2a2a2a] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-gray-700">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Offering</p>
                <p className="text-sm sm:text-lg font-bold text-white">100M $CGAI</p>
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
          </div>
        </div>
      </div>
      </div>

      {/* Alert Component */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          txHash={alert.txHash}
          onClose={closeAlert}
        />
      )}
    </>
  );
}