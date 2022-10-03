import React from 'react';
import { Button, forwardRef, ButtonProps } from '@chakra-ui/react';

export type OstButtonProps = {
  isDisabled?: boolean;
  icon?: React.ReactElement;
  size: 'L' | 'S';
  label?: string;
  view: 'button' | 'skeleton' | 'icon-only';
};

export const OstButton = forwardRef<ButtonProps & OstButtonProps, 'button'>((props, ref) => {
  let variant;
  if (props.view === 'button') {
    if (props.size === 'L') {
      variant = 'buttonL';
    } else if (props.size === 'S') {
      variant = 'buttonS';
    }
  } else if (props.view === 'skeleton') {
    if (props.size === 'L') {
      variant = 'skeletonL';
    } else if (props.size === 'S') {
      variant = 'skeletonS';
    }
  } else if (props.view === 'icon-only') {
    variant = 'iconOnly';
  } else {
    variant = 'buttonL';
  }

  return (
    <Button ref={ref} variant={variant} leftIcon={props.icon} {...props}>
      {props.label}
    </Button>
  );
});

OstButton.displayName = 'OstButton';
