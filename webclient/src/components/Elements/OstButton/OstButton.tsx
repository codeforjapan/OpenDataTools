import React from 'react';
import { Button, forwardRef, ButtonProps } from '@chakra-ui/react';

export type OstButtonProps = {
  isDisabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  size: 'L' | 'S';
  children?: React.ReactNode;
  view: 'button' | 'skeleton' | 'icon-only';
};

export const OstButton = forwardRef<ButtonProps & OstButtonProps, 'button'>((props, ref) => {
  const { iconLeft, iconRight, ...buttonProps } = props;

  let variant;
  if (buttonProps.view === 'button') {
    if (buttonProps.size === 'L') {
      variant = 'buttonL';
    } else if (buttonProps.size === 'S') {
      variant = 'buttonS';
    }
  } else if (buttonProps.view === 'skeleton') {
    if (buttonProps.size === 'L') {
      variant = 'skeletonL';
    } else if (buttonProps.size === 'S') {
      variant = 'skeletonS';
    }
  } else if (buttonProps.view === 'icon-only') {
    variant = 'iconOnly';
  } else {
    variant = 'buttonL';
  }

  return (
    <Button ref={ref} variant={variant} leftIcon={iconLeft} rightIcon={iconRight} {...buttonProps}>
      {buttonProps.children}
    </Button>
  );
});

OstButton.displayName = 'OstButton';
