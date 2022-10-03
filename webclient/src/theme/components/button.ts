export const buttonTheme = {
  baseStyle: {
    fontWeight: 'normal',
    lineHeight: '1.2',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    color: 'var(--chakra-colors-text-active)',
    backgroundColor: 'var(--chakra-colors-bg-active)',
    _focusVisible: {
      boxShadow: 'outline',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
      color: 'var(--chakra-colors-text-disabled)',
      backgroundColor: 'var(--chakra-colors-white)',
      border: '1px solid var(--chakra-colors-border-disabled)',
    },
    _hover: {
      _disabled: {
        bg: 'initial',
      },
    },
  },
  variants: {
    buttonL: {
      fontSize: '16px',
      padding: '24px 40px',
      borderRadius: '18px',
    },
    buttonS: {
      fontSize: '14px',
      padding: '12px 24px',
      borderRadius: '3em',
    },
    skeletonL: {
      fontSize: '16px',
      padding: '0 24px 0 0',
      borderRadius: '3em',
      backgroundColor: 'transparent',
      _disabled: {
        border: 'none',
      },
    },
    skeletonS: {
      fontSize: '14px',
      padding: '0 12px 0 0',
      borderRadius: '3em',
      backgroundColor: 'transparent',
      _disabled: {
        border: 'none',
      },
    },
    iconOnly: {
      backgroundColor: 'transparent',
      _disabled: {
        border: 'none',
      },
    },
  },
  defaultProps: {
    variant: 'buttonL',
  },
};
