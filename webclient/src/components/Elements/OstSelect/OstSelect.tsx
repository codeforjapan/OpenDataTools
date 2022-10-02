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
};

export const OstSelect = forwardRef<SelectProps & OstSelectProps, 'select'>((props, ref) => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const isError = props.isRequired ? value === '' : false;

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
      {props.label && <OstFormLabel label={props.label} />}
      <Select ref={ref} value={value} onChange={handleInputChange} placeholder={props.placeholder}>
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
