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
  const { isDisabled, iconLeft, iconRight, ...linkProps } = props;

  return (
    <Link
      ref={ref}
      href={linkProps.url}
      as={linkProps.to && !isDisabled ? RouterLink : 'span'}
      to={linkProps.to}
      display="flex"
      alignItems="center"
      gap={2}
      textStyle="link"
      _hover={{ textDecoration: 'none' }}
      sx={
        isDisabled
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
      {...linkProps}
    >
      {iconLeft}
      {linkProps.children}
      {iconRight}
    </Link>
  );
});

OstNavLink.displayName = 'OstNavLink';
