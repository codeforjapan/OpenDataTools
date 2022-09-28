import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
