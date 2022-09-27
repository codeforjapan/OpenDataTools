import { Box, Button, Checkbox, Divider, Grid, GridItem, Select, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ContentLayout } from '../../../components/Layout';

export const NormalizeLabel: FC = () => {
  const importDataLabel_mock = [
    { use: true, rowLabel: '都道府県名', normalizedLabel: '' },
    { use: false, rowLabel: '名称', normalizedLabel: '' },
    { use: false, rowLabel: '電話番号', normalizedLabel: '' },
    { use: false, rowLabel: '住所', normalizedLabel: '' },
    { use: false, rowLabel: '緯度経度', normalizedLabel: '' },
  ];

  const handleSelectDataset = (v: string) => {
    // データセット種類選択時の処理
    // データ項目の候補や推定を変更
    // 正規化された項目名のSelectorの中身更新
    console.log(v);
    return;
  };

  const handleUseCheck = () => {
    // 該当項目を使うかどうかの選択処理
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
      <Grid gridTemplateColumns="50px 1fr 1fr" mb={5}>
        <GridItem></GridItem>
        <GridItem>インポートしたデータ項目名</GridItem>
        <GridItem>正規化されたデータ項目名</GridItem>
      </Grid>

      {importDataLabel_mock.map((l, index) => (
        <Grid gridTemplateColumns="50px 1fr 1fr" key={index} mb={2}>
          <GridItem>
            <Checkbox
              defaultChecked={l.use}
              onChange={() => {
                handleUseCheck();
              }}
            />
          </GridItem>
          <GridItem>{l.rowLabel}</GridItem>
          <GridItem>
            <Select>
              <option value="都道府県名">都道府県名</option>
              <option value="名称">名称</option>
              <option value="電話番号">電話番号</option>
              <option value="緯度">緯度</option>
              <option value="経度">経度</option>
            </Select>
          </GridItem>
        </Grid>
      ))}

      <Button color="blue.400" variant="solid">
        <Link to="/auto-convert">次へ（自動変換ページ）</Link>
      </Button>
    </ContentLayout>
  );
};
