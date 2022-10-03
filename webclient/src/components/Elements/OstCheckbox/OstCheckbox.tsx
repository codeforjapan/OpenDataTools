import React from 'react';
import { Checkbox, forwardRef, CheckboxProps } from '@chakra-ui/react';

export type OstCheckboxProps = {
  children?: React.ReactNode;
  isDisabled?: boolean;
};

export const OstCheckbox = forwardRef<CheckboxProps & OstCheckboxProps, 'input'>((props, ref) => {
  return (
    <Checkbox ref={ref} {...props}>
      {props.children}
    </Checkbox>
  );
});

OstCheckbox.displayName = 'OstCheckbox';
