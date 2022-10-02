import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';
import styles from './styles';
import components from './components';
import foundations from './foundations';

const theme = extendTheme(
  {
    styles,
    components,
    ...foundations,
  },
  {
    config: defaultTheme.config,
    direction: defaultTheme.direction,
    transition: defaultTheme.transition,
    breakpoints: defaultTheme.breakpoints,
    zIndices: defaultTheme.zIndices,
  }
);

export default theme;
