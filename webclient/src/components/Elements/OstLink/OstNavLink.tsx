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
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const OstNavLink = forwardRef<LinkProps & OstNavLinkProps, 'button'>((props, ref) => {
  const { isDisabled, iconLeft, iconRight, onClick, ...linkProps } = props;

  return (
    <Link
      ref={ref}
      href={linkProps.url}
      as={linkProps.to && !isDisabled ? RouterLink : 'span'}
      to={linkProps.to}
      // onClick は as で別コンポーネントを指定している場合 isDisabled と連動しないため、自前で判定
      // https://github.com/chakra-ui/chakra-ui/issues/1436
      onClick={onClick && !isDisabled ? onClick : () => undefined}
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
                color: 'inherit',
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
