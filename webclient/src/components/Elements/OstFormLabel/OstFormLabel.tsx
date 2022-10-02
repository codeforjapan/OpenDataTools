import React from 'react';
import { FormLabel, forwardRef } from '@chakra-ui/react';

export type OstFormLabelProps = {
  label: string;
};

export const OstFormLabel = forwardRef<OstFormLabelProps, 'label'>((props, ref) => {
  return (
    <FormLabel ref={ref} fontSize="14px" fontWeight="bold">
      {props.label}
    </FormLabel>
  );
});

OstFormLabel.displayName = 'OstFormLabel';
