import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  forwardRef,
  InputProps,
} from '@chakra-ui/react';
import { OstFormLabel } from '../OstFormLabel';

export type OstInputProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string | number;
};

export const OstInput = forwardRef<InputProps & OstInputProps, 'input'>((props, ref) => {
  const isError = props.isRequired ? props.value === '' : false;

  return (
    <FormControl
      isRequired={props.isRequired || false}
      isDisabled={props.isDisabled}
      isInvalid={isError}
    >
      {props.label && <OstFormLabel>{props.label}</OstFormLabel>}
      <Input ref={ref} value={props.value} placeholder={props.placeholder} {...props} />
      {!isError && props.helperText ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
});

OstInput.displayName = 'OstInput';
