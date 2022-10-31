import { Avatar, Box, Flex } from '@chakra-ui/react';
import { ContentLayout } from '../../../components/Layout';
import { OstLink, OstNavLink } from '../../../components/Elements/OstLink';
import { HomeSavedDatasetList } from '../../../components/Home';
import { ArrowForwardIcon } from '@chakra-ui/icons';
export const Home = () => {
  return (
    <ContentLayout title="ホーム">
      <Box>ホーム</Box>
      <Flex mt={4} justifyContent="flex-end">
        <OstNavLink
          to="/upload-file-for-map"
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          CSVを元にMapを表示する
        </OstNavLink>
      </Flex>
      <HomeSavedDatasetList />
      <Box w="300px">
        <OstLink to="/upload-file">はじめる（CSV選択画面）</OstLink>
      </Box>
    </ContentLayout>
  );
};
