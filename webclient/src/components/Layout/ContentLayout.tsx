import * as React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Head } from '../Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div>
        <Box textStyle="h1" color="white" bg="black" px={8} py={4}>
          {/* 2022/10/2時点 chakra-uiのバグ？でHeadingに直接textStyleを指定できない*/}
          <Heading as="h1" fontSize="inherit" fontWeight="inherit">
            {title}
          </Heading>
        </Box>
        <div>{children}</div>
      </div>
    </>
  );
};
