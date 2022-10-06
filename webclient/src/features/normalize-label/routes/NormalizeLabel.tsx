import { Avatar, Box, Divider, Flex, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { NormalizeDatasetItemLabel } from '../../../components/Editor';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { datasetItemUidListAtom } from '../../../stores/dataset';

export const NormalizeLabel: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const datasetItemUidList = useRecoilValue(
    datasetItemUidListAtom({ datasetUid: String(dataset_uid) })
  );

  return (
    <StepLayout pageTitle="項目名の正規化" headingText="データ項目名の正規化" uid={dataset_uid}>
      <Box my={4}>
        <OstSelect
          label="データセット名を選択してください。"
          options={[{ label: '公共施設一覧', value: 'public-facility' }]}
        />
      </Box>
      <Divider my={10} borderColor="black" />
      <Grid gridTemplateColumns="70px 120px 1fr 1fr" mb={5}>
        <GridItem>対象</GridItem>
        <GridItem>独自定義</GridItem>
        <GridItem>インポートしたデータ項目名</GridItem>
        <GridItem>正規化されたデータ項目名</GridItem>
      </Grid>

      {datasetItemUidList.map((uid) => (
        <NormalizeDatasetItemLabel datasetUid={String(dataset_uid)} itemUid={uid} key={uid} />
      ))}

      <Flex mt={4} justifyContent="space-between">
        <OstNavLink
          to="/auto-convert"
          iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
        >
          ステップ２に戻る
        </OstNavLink>
        <OstNavLink
          to="/auto-convert"
          isDisabled={false}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          次のステップへ
        </OstNavLink>
      </Flex>
    </StepLayout>
  );
};
