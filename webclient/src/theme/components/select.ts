import { selectAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';
import { inputTheme } from './input';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleField = defineStyle((props) => {
  return {
    ...inputTheme.baseStyle?.field,
    bg: mode('white', 'gray.700')(props),
    appearance: 'none',
    paddingBottom: '1px',
    lineHeight: 'normal',
    '> option, > optgroup': {
      bg: mode('white', 'gray.700')(props),
    },
  };
});

const baseStyleIcon = defineStyle({
  width: '6',
  height: '100%',
  insetEnd: '2',
  position: 'relative',
  color: 'currentColor',
  fontSize: 'xl',
  _disabled: {
    opacity: 0.5,
  },
});

const baseStyle = definePartsStyle((props) => ({
  field: baseStyleField(props),
  icon: baseStyleIcon,
}));

const iconSpacing = defineStyle({
  paddingInlineEnd: '8',
});

const customField = defineStyle({
  padding: '24px',
  paddingRight: '36px',
  height: 'auto',
  background: 'white',
});

const sizes = {
  lg: {
    ...inputTheme.sizes?.lg,
    field: {
      ...inputTheme.sizes?.lg.field,
      ...iconSpacing,
      ...customField,
    },
  },
  md: {
    ...inputTheme.sizes?.md,
    field: {
      ...inputTheme.sizes?.md.field,
      ...iconSpacing,
      ...customField,
    },
  },
  sm: {
    ...inputTheme.sizes?.sm,
    field: {
      ...inputTheme.sizes?.sm.field,
      ...iconSpacing,
      ...customField,
    },
  },
  xs: {
    ...inputTheme.sizes?.xs,
    field: {
      ...inputTheme.sizes?.xs.field,
      ...iconSpacing,
      ...customField,
    },
    icon: {
      insetEnd: '1',
    },
  },
};

export const selectTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps,
});
