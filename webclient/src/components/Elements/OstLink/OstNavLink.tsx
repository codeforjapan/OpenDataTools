import React from 'react';
import { Link, forwardRef, LinkProps } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export type OstNavLinkProps = {
  isDisabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  children?: React.ReactNode;
  url?: string;
  to?: string;
};

export const OstNavLink = forwardRef<LinkProps & OstNavLinkProps, 'button'>((props, ref) => {
  return (
    <Link
      ref={ref}
      href={props.url}
      as={props.to && !props.isDisabled ? RouterLink : 'span'}
      to={props.to}
      display="flex"
      alignItems="center"
      gap={2}
      textStyle="link"
      _hover={{ textDecoration: 'none' }}
      sx={
        props.isDisabled
          ? {
              color: 'icon.disabled',
              cursor: 'not-allowed',
              '.chakra-avatar': {
                color: 'inherit',
                backgroundColor: 'transparent',
                border: '1px solid currentColor',
              },
            }
          : {
              '.chakra-avatar': {
                backgroundColor: 'bg.active',
              },
            }
      }
      {...props}
    >
      {props.iconLeft}
      {props.children}
      {props.iconRight}
    </Link>
  );
});

OstNavLink.displayName = 'OstNavLink';
