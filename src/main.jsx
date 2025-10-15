import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

function WalletContextProvider({ children }) {
  const endpoint = useMemo(
    () => `https://mainnet.helius-rpc.com/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`,
    []
  );
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </StrictMode>,
)