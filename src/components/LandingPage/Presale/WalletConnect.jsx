import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function WalletConnect() {
  const { publicKey, connected } = useWallet();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Wallet Status</h1>
        <WalletMultiButton style={styles.walletButton} />
      </div>

      {connected ? (
        <div style={styles.walletInfo}>
          <p style={styles.label}>Connected Wallet</p>
          <p style={styles.address}>
            {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
          </p>
          <p style={styles.infoText}>
            Your wallet is connected and ready for transactions.
          </p>
        </div>
      ) : (
        <div style={styles.connectPrompt}>
          <h2 style={styles.promptTitle}>Connect Your Wallet</h2>
          <p style={styles.promptText}>
            Click the "Select Wallet" button above to connect your Solana wallet
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  walletButton: {
    backgroundColor: '#512da8',
    borderRadius: '8px',
  },
  walletInfo: {
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    border: '1px solid #333',
    textAlign: 'center',
  },
  label: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
  },
  address: {
    fontSize: '16px',
    fontFamily: 'monospace',
    color: '#14F195',
    fontWeight: '600',
    marginBottom: '12px',
  },
  infoText: {
    fontSize: '14px',
    color: '#aaa',
    margin: 0,
  },
  connectPrompt: {
    padding: '40px 20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    border: '2px solid #333',
    textAlign: 'center',
  },
  promptTitle: {
    fontSize: '20px',
    marginTop: 0,
    marginBottom: '15px',
  },
  promptText: {
    fontSize: '14px',
    color: '#aaa',
    marginBottom: 0,
  },
};

export default WalletConnect;
