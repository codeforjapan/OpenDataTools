import { FC, useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Flex, Avatar } from '@chakra-ui/react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { DataEditorMain, DataEditorSidenav } from '../../../components/Editor';

export const DataEditor: FC = () => {
  const [selectedItemUid, setItemUid] = useState<string>();

  return (
    <StepLayout pageTitle="データ形式確認" headingText="データ形式確認">
      <Grid gridTemplateColumns="200px 1fr" mt={4}>
        <GridItem pr={3} borderRight="1px solid">
          <DataEditorSidenav
            selectedItemUid={selectedItemUid}
            onSelect={(uid: string) => setItemUid(uid)}
          />
        </GridItem>
        <GridItem pl={10}>
          <DataEditorMain selectedItemUid={selectedItemUid} />
        </GridItem>
      </Grid>

      <Flex mt={4} justifyContent="space-between">
        <OstNavLink
          to="/upload-file"
          iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
        >
          ステップ３に戻る
        </OstNavLink>
        <OstNavLink
          to="/map"
          isDisabled={false}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          完了
        </OstNavLink>
      </Flex>
    </StepLayout>
  );
};
