import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout';
import { Web3ContextProvider } from '../store/context';
import { NotificationContextProvider } from '../store/notification-context';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Web3ContextProvider>
          <NotificationContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationContextProvider>
        </Web3ContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
