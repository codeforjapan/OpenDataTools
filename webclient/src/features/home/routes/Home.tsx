import { Box } from '@chakra-ui/react';
import { ContentLayout } from '../../../components/Layout';
import { HomeSavedDatasetList, Description } from '../../../components/Home';

export const Home = () => {
  return (
    <ContentLayout title="ホーム">
      <Box mx={6}>
        <Description />
        <Box
          background="white"
          borderRadius={8}
          my={6}
          px={6}
          py={6}
        >
          <HomeSavedDatasetList />
        </Box>
      </Box>
    </ContentLayout>
  );
};
