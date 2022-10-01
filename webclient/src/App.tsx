import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import theme from './theme';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
