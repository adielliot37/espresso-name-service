import { espressoRollup, wagmiAdapter, projectId } from '@/config';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const metadata = {
  name: 'Espresso Name Service',
  description: 'Register .esp names',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};


createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [espressoRollup],
  defaultNetwork: espressoRollup,
  metadata,
});

export default function ContextProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
