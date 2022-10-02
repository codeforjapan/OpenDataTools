import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  forwardRef,
  TextareaProps,
} from '@chakra-ui/react';
import { OstFormLabel } from '../OstFormLabel';

export type OstTextareaProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
};

export const OstTextarea = forwardRef<TextareaProps & OstTextareaProps, 'textarea'>(
  (props, ref) => {
    const [value, setValue] = React.useState('');

    const handleInputChange = (e: { target: { value: string } }) => {
      const inputValue = e.target.value;
      setValue(inputValue);
    };

    const isError = props.isRequired ? value === '' : false;

    return (
      <FormControl
        isRequired={props.isRequired || false}
        isDisabled={props.isDisabled}
        isInvalid={isError}
      >
        {props.label && <OstFormLabel label={props.label} />}
        <Textarea
          ref={ref}
          value={value}
          onChange={handleInputChange}
          placeholder={props.placeholder}
          {...props}
        />
        {!isError && props.helperText ? (
          <FormHelperText>{props.helperText}</FormHelperText>
        ) : (
          <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

OstTextarea.displayName = 'OstTextarea';
