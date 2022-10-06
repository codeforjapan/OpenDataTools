import { Box, Divider, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { NormalizeDatasetItemLabel } from '../../../components/Editor';
import { ContentLayout } from '../../../components/Layout';
import { OstLink } from '../../../components/Elements/OstLink';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { datasetAtom, datasetItemUidListAtom } from '../../../stores/dataset';

export const NormalizeLabel: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const datasetItemUidList = useRecoilValue(
    datasetItemUidListAtom({ datasetUid: String(dataset_uid) })
  );
  const handleSelectDataset = (v: string) => {
    // データセット種類選択時の処理
    // データ項目の候補や推定を変更
    // 正規化された項目名のSelectorの中身更新
    console.log(v);
    return;
  };

  return (
    <ContentLayout title="項目名の正規化">
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

      <Box w="300px">
        <OstLink to={`/${dataset_uid}/auto-convert`}>次へ（自動変換ページ）</OstLink>
      </Box>
    </ContentLayout>
  );
};
