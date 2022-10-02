import React from 'react';
import { Checkbox, forwardRef, CheckboxProps } from '@chakra-ui/react';

export type OstCheckboxProps = {
  label?: string;
};

export const OstCheckbox = forwardRef<CheckboxProps & OstCheckboxProps, 'input'>((props, ref) => {
  return <Checkbox {...props}>{props.label}</Checkbox>;
});

OstCheckbox.displayName = 'OstCheckbox';
