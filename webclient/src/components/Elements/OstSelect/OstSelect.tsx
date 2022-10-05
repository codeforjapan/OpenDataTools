import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Select,
  forwardRef,
  SelectProps,
} from '@chakra-ui/react';
import { OstFormLabel } from '../OstFormLabel';

type Option = {
  label: string | number;
  value: string | number;
};

export type OstSelectProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  options: Option[];
  value?: string | number;
  changeValue?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const OstSelect = forwardRef<SelectProps & OstSelectProps, 'select'>((props, ref) => {
  const isError = props.isRequired ? props.value === '' : false;

  const optionItems = props.options.map((item, index) => (
    <option key={`option-${index}`} value={item.value}>
      {item.label}
    </option>
  ));

  return (
    <FormControl
      isRequired={props.isRequired || false}
      isDisabled={props.isDisabled}
      isInvalid={isError}
    >
      {props.label && <OstFormLabel>{props.label}</OstFormLabel>}
      <Select
        ref={ref}
        value={props.value}
        onChange={(e) => props.changeValue?.(e)}
        placeholder={props.placeholder}
        {...props}
      >
        {optionItems}
      </Select>
      {!isError && props.helperText ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
});

OstSelect.displayName = 'OstSelect';
