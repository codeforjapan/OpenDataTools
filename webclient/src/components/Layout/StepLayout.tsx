import * as React from 'react';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Head } from '../Head';
import { useLocation } from 'react-router-dom';

type StepLayoutProps = {
  children: React.ReactNode;
  headingText: string;
  pageTitle: string;
  intro: string;
  uid?: string;
  isProcessFinished?: boolean;
};

export const StepLayout = (props: StepLayoutProps) => {
  const location = useLocation();

  const stepItems = [
    {
      text: 'ステップ１',
      path: '/upload-file',
    },
    {
      text: 'ステップ２',
      path: `/auto-convert`,
    },
    {
      text: 'ステップ３',
      path: `/${props.uid}/normalize-label`,
    },
    {
      text: 'ステップ４',
      path: `/${props.uid}/data-editor`,
    },
  ];

  const currentIndex = stepItems.findIndex((item) => {
    return item.path === location.pathname;
  });

  return (
    <>
      <Head title={props.pageTitle} />
      <Box w="100%" maxW={1280} mx="auto" py={20}>
        <Box mx={4}>
          <Flex borderTopRadius={20} gap={1}>
            {stepItems.map((item, index) => (
              <Flex
                key={`step-${index}`}
                w="calc(100%/4)"
                flexDirection="column"
                alignItems="center"
                position="relative"
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w={8}
                  h={8}
                  mb={10}
                  borderRadius="50%"
                  sx={
                    index <= currentIndex
                      ? {
                          border: '3px solid white',
                          bg: 'icon.active',
                          boxShadow: 'md',
                          '&::after': {
                            background: 'white',
                          },
                        }
                      : {
                          border: '3px solid rgba(255, 255, 255, 0.45)',
                          bg: 'transparent',
                          boxShadow: 'none',
                          '&::after': {
                            background: 'rgba(255, 255, 255, 0.45)',
                          },
                        }
                  }
                  _after={
                    index !== 0
                      ? {
                          content: '""',
                          position: 'absolute',
                          zIndex: '1',
                          top: '15px',
                          left: '-50%',
                          marginLeft: '16px',
                          width: 'calc(100% - 40px)',
                          height: '2px',
                        }
                      : {}
                  }
                >
                  {(index < currentIndex ||
                    (index === currentIndex && props.isProcessFinished)) && (
                    <CheckIcon color="white" />
                  )}
                </Flex>
                <Box
                  w="100%"
                  p={8}
                  textAlign="center"
                  bg={item.path === location.pathname ? 'white' : 'rgba(255, 255, 255, 0.45)'}
                  position="relative"
                  borderTopLeftRadius={index === 0 ? 20 : 0}
                  borderTopRightRadius={index === stepItems.length - 1 ? 20 : 0}
                  _before={
                    item.path === location.pathname
                      ? {
                          content: '""',
                          position: 'absolute',
                          top: '-35px',
                          left: '50%',
                          marginLeft: '-15px',
                          border: '15px solid transparent',
                          borderBottom: '20px solid white',
                        }
                      : {}
                  }
                >
                  {item.text}
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
        <Box mx={4} borderBottomRadius={20} bg="white">
          <Box textStyle="h1" p={10} pb={5}>
            {/* 2022/10/2時点 chakra-uiのバグ？でHeadingに直接textStyleを指定できない*/}
            <Heading as="h1" fontSize="inherit" fontWeight="inherit" textAlign="center">
              {props.headingText}
            </Heading>
          </Box>
          <Center mb={8}>{props.intro}</Center>
          <Box p={10} pt={0}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
};
