import { FC, useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Grid, GridItem, Flex, Avatar } from '@chakra-ui/react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { DataEditorMain, DataEditorSidenav } from '../../../components/Editor';
import { useParams } from 'react-router-dom';

export const DataEditor: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [selectedItemUid, setItemUid] = useState<string>();

  return (
    <StepLayout pageTitle="データ形式確認" headingText="データ形式確認" uid={dataset_uid}>
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
          to={`/${dataset_uid}/upload-file`}
          iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
        >
          ステップ３に戻る
        </OstNavLink>
        <OstNavLink
          to={`/${dataset_uid}/map`}
          isDisabled={false}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          完了
        </OstNavLink>
      </Flex>
    </StepLayout>
  );
};
