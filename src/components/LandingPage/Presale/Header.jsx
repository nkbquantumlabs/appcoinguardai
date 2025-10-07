import { RiWallet3Fill } from "react-icons/ri";

const PresaleHeader = () => {
  const handleConnectWallet = () => {
    // Add wallet connection logic here
    console.log("Connect wallet clicked");
  };

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-6 py-6 relative">
      <header className="w-full max-w-4xl bg-[rgb(17,17,17)] rounded-xl shadow-lg pr-6 py-3 relative z-10">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center -ml-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/presale/coinguard.png" 
                alt="CoinGuard" 
                className="h-9 w-9 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <h3 className="text-white text-2xl md:text-3xl font-[Righteous] font-medium tracking-wide">
                coinguard
              </h3>
            </div>
          </div>
          
          {/* Connect Wallet Button */}
          <div className="wallet-button-container">
            <button
              onClick={handleConnectWallet}
              className="wallet-button"
            >
              <RiWallet3Fill className="w-4 h-4 mr-2" />
              Connect Wallet
            </button>
          </div>
          
          <style jsx>{`
            .wallet-button {
              font-size: 1rem;
              padding: 0.625rem 1rem;
              border-radius: 0.5em;
              border: none;
              background-color: #000;
              color: #fff;
              cursor: pointer;
              box-shadow: 2px 2px 3px #000000b4;
              display: flex;
              align-items: center;
              font-weight: 600;
              position: relative;
              z-index: 1;
            }

            .wallet-button-container {
              position: relative;
              padding: 3px;
              background: linear-gradient(90deg, #03a9f4, #f441a5);
              border-radius: 0.9em;
              transition: all 0.4s ease;
              overflow: visible;
            }

            .wallet-button-container::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 0.9em;
              z-index: -1;
              filter: blur(0);
              transition: filter 0.4s ease;
              opacity: 0;
            }

            .wallet-button-container:hover::before {
              background: linear-gradient(90deg, #03a9f4, #f441a5);
              filter: blur(1.2em);
              opacity: 1;
            }
            
            .wallet-button-container:active::before {
              filter: blur(0.2em);
              opacity: 1;
            }

            .wallet-button-container:hover {
              transform: translateY(-1px);
            }
          `}</style>
        </div>
      </header>
    </div>
  );
};

export default PresaleHeader;
