import * as React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Head } from '../Head';

type BoxLayoutProps = {
  children: React.ReactNode;
  headingText: string;
  pageTitle: string;
};

export const BoxLayout = (props: BoxLayoutProps) => {
  return (
    <>
      <Head title={props.pageTitle} />
      <Box w="100%" maxW={1280} mx="auto" py={20}>
        <Box mx={4} borderRadius={20} bg="white">
          <Box textStyle="h1" p={10}>
            {/* 2022/10/2時点 chakra-uiのバグ？でHeadingに直接textStyleを指定できない*/}
            <Heading as="h1" fontSize="inherit" fontWeight="inherit" textAlign="center">
              {props.headingText}
            </Heading>
          </Box>
          <Box p={10} pt={0}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
};
