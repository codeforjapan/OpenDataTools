import { Box, Button, Checkbox, Divider, Grid, GridItem, Select, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { NormalizeDatasetItemLabel } from '../../../components/Editor';
import { ContentLayout } from '../../../components/Layout';
import { datasetItemUidListAtom } from '../../../stores/dataset';

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
        <Text>データセット名を選択してください。</Text>
        <Select onChange={(e) => handleSelectDataset(e.target.value)}>
          <option value="public-facility">公共施設一覧</option>
        </Select>
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

      <Button color="blue.400" variant="solid">
        <Link to={`/${dataset_uid}/auto-convert`}>次へ（自動変換ページ）</Link>
      </Button>
    </ContentLayout>
  );
};
