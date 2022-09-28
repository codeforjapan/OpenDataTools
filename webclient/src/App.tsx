import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

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
