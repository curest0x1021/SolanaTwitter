import type { AppProps } from "next/app";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ToastContainer } from "react-toastify";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

// Day.js
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => {
    return [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })];
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
