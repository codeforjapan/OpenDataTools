import React from 'react';
import { Link, Icon, Box, forwardRef, LinkProps } from '@chakra-ui/react';
import { MdOutlineChevronRight } from 'react-icons/md';

export type OstLinkProps = {
  isDisabled?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactNode;
  url: string;
};

export const OstLink = forwardRef<LinkProps & OstLinkProps, 'button'>((props, ref) => {
  return (
    <Link
      ref={ref}
      href={props.url}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="18px"
      p="32px 24px"
      bg="bg.active"
      textStyle="link"
      _hover={{ textDecoration: 'none' }}
      {...props}
    >
      <Box display="flex" alignItems="center">
        {props.icon}
        {props.children}
      </Box>
      <Icon as={MdOutlineChevronRight} w={6} h={6} />
    </Link>
  );
});

OstLink.displayName = 'OstLink';
