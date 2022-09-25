import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
