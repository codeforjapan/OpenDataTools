import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import foundations from './foundations';

const theme = extendTheme(
  {
    styles,
    ...foundations,
  },
);

export default theme;
