import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ContentLayout } from '../../../components/Layout';

export const Home = () => {
  return (
    <ContentLayout title="ホーム">
      <Box>ホーム</Box>
      <Link to="/upload-file">はじめる（CSV選択画面）</Link>
    </ContentLayout>
  );
};
