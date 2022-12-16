import * as React from 'react';
import { Box } from '@chakra-ui/react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box
      display="grid"
      gridTemplateRows="1fr auto"
      gridTemplateColumns="100%"
      minHeight="100vh"
      backgroundColor="body.bg"
    >
      <main>{children}</main>
    </Box>
  );
};
