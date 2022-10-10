import { FC, useState } from 'react';
import {
  InfoOutlineIcon,
  CheckIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  DownloadIcon,
} from '@chakra-ui/icons';
import { Grid, GridItem, Flex, Avatar, Text } from '@chakra-ui/react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstButton } from '../../../components/Elements/OstButton';
import { DataEditorMain, DataEditorSidenav } from '../../../components/Editor';
import { useParams } from 'react-router-dom';

export const DataEditor: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [selectedItemUid, setItemUid] = useState<string>();

  const isCheckFinished = false; //TODO: 確認終了のステータスを監視する

  return (
    <StepLayout
      pageTitle="データ形式確認"
      headingText="データ形式確認"
      uid={dataset_uid}
      isProcessFinished={isCheckFinished}
    >
      <Flex
        alignItems="center"
        px={6}
        py={4}
        mb={10}
        bg={isCheckFinished ? 'information.bg.active' : 'information.bg.alert'}
        borderRadius={8}
      >
        {isCheckFinished ? <CheckIcon /> : <InfoOutlineIcon />}
        <Text ml={6}>
          {isCheckFinished
            ? '形式の確認が完了しました。'
            : `X件のデータ形式を確認して修正してください。`}
        </Text>
      </Flex>
      <Grid gridTemplateColumns="200px 1fr" mt={4}>
        <GridItem borderRight="1px solid" borderColor="inputAreaBorder.active">
          <DataEditorSidenav
            selectedItemUid={selectedItemUid}
            onSelect={(uid: string) => setItemUid(uid)}
          />
        </GridItem>
        <GridItem pl={10}>
          <DataEditorMain selectedItemUid={selectedItemUid} />
        </GridItem>
      </Grid>

      <Flex mt={8} justifyContent="space-between">
        <Flex flexWrap="wrap">
          <OstNavLink
            to={`/${dataset_uid}/normalize-label`}
            iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
            mr={8}
          >
            ステップ３に戻る
          </OstNavLink>
          {isCheckFinished && (
            <OstButton
              view="skeleton"
              size="L"
              icon={<Avatar bg="bg.active" size="md" p="12px" icon={<DownloadIcon />} />}
            >
              一時ファイルのダウンロード
            </OstButton>
          )}
        </Flex>
        <OstNavLink
          to={`/${dataset_uid}/map`}
          isDisabled={!isCheckFinished}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          完了
        </OstNavLink>
      </Flex>
    </StepLayout>
  );
};
