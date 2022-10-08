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
  const { changeValue, ...selectProps } = props;

  const isError = selectProps.isRequired ? selectProps.value === '' : false;

  const optionItems = selectProps.options.map((item, index) => (
    <option key={`option-${index}`} value={item.value}>
      {item.label}
    </option>
  ));

  return (
    <FormControl
      isRequired={selectProps.isRequired || false}
      isDisabled={selectProps.isDisabled}
      isInvalid={isError}
    >
      {selectProps.label && <OstFormLabel>{selectProps.label}</OstFormLabel>}
      <Select
        ref={ref}
        value={selectProps.value}
        onChange={(e) => changeValue?.(e)}
        placeholder={selectProps.placeholder}
        {...selectProps}
      >
        {optionItems}
      </Select>
      {!isError && selectProps.helperText ? (
        <FormHelperText>{selectProps.helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{selectProps.errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
});

OstSelect.displayName = 'OstSelect';
