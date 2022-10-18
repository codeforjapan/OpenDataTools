import { Box } from '@chakra-ui/react';
import { ContentLayout } from '../../../components/Layout';
import { OstLink } from '../../../components/Elements/OstLink';
import { useRecoilValue } from 'recoil';
import { datasetListSelector } from '../../../stores/dataset';
export const Home = () => {
  const datasets = useRecoilValue(datasetListSelector);

  return (
    <ContentLayout title="ホーム">
      {JSON.stringify(datasets)}
      <Box>ホーム</Box>
      <Box w="300px">
        <OstLink to="/upload-file">はじめる（CSV選択画面）</OstLink>
      </Box>
    </ContentLayout>
  );
};
