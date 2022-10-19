import { Box } from '@chakra-ui/react';
import { ContentLayout } from '../../../components/Layout';
import { OstLink } from '../../../components/Elements/OstLink';
import { HomeSavedDatasetList } from '../../../components/Home';
export const Home = () => {
  return (
    <ContentLayout title="ホーム">
      <Box>ホーム</Box>
      <HomeSavedDatasetList />
      <Box w="300px">
        <OstLink to="/upload-file">はじめる（CSV選択画面）</OstLink>
      </Box>
    </ContentLayout>
  );
};
