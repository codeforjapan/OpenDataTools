import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  forwardRef,
  InputProps,
  InputRightElement,
  IconButton,
  InputGroup,
} from '@chakra-ui/react';
import { OstFormLabel } from '../OstFormLabel';
import MapEditIcon from '../Icon/Icons/MapEditIcon';

export type OstInputProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string | number;
  changeValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const OstLatLngInput = forwardRef<InputProps & OstInputProps, 'input'>((props, ref) => {
  const isError = props.isRequired ? props.value === '' : false;

  return (
    <InputGroup size='md'>
      <FormControl
        isRequired={props.isRequired || false}
        isDisabled={props.isDisabled}
        isInvalid={isError}
      >
        {props.label && <OstFormLabel>{props.label}</OstFormLabel>}
        <Input
          ref={ref}
          value={props.value}
          onChange={(e) => props.changeValue?.(e)}
          type="number"
          placeholder={props.placeholder}
          {...props}
        />
        {!isError && props.helperText ? (
          <FormHelperText>{props.helperText}</FormHelperText>
        ) : (
          <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
        )}
        <InputRightElement width='4.5rem'>
          <IconButton aria-label='open map edit' icon={<MapEditIcon />} backgroundColor="none" onClick={() => props.onClick()}/>
        </InputRightElement>
      </FormControl>
    </InputGroup>
  );
});

OstLatLngInput.displayName = 'OstLatLngInput';

export default OstLatLngInput
