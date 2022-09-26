import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ContentLayout } from '../../../components/Layout';

export const DataEditor: FC = () => {
  const DataLabels = useMemo(() => {
    // normalize labelで選択したものを対象にリスト生成
    return [
      '都道府県コード又は市区町村コード',
      '名称',
      '名称_カナ',
      '都道府県名',
      '住所',
      '緯度/経度',
    ];
  }, []);

  const selectedLabelData = useMemo(() => {
    return [
      { rowData: 'テスト1', editedData: '' },
      { rowData: 'テスト2', editedData: '' },
      { rowData: 'テスト3', editedData: '' },
      { rowData: 'テスト4', editedData: '' },
      { rowData: 'テスト5', editedData: '' },
      { rowData: 'テスト6', editedData: '' },
      { rowData: 'テスト7', editedData: '' },
      { rowData: 'テスト8', editedData: '' },
      { rowData: 'テスト9', editedData: '' },
      { rowData: 'テスト10', editedData: '' },
      { rowData: 'テスト11', editedData: '' },
      { rowData: 'テスト12', editedData: '' },
      { rowData: 'テスト13', editedData: '' },
    ];
  }, []);

  const handleChangeData = (v: string) => {
    // 編集データをグローバルステートに保存
    // 編集データをバリデート
    // アラートを変更
    console.log(v);
    return;
  };

  return (
    <ContentLayout title="データ詳細編集">
      <Grid gridTemplateColumns="200px 1fr" mt={4}>
        <GridItem pr={3} borderRight="1px solid">
          {DataLabels.map((label, index) => (
            <Box key={index}>{label}</Box>
          ))}
        </GridItem>
        <GridItem pl={10}>
          {selectedLabelData.map((data, dIndex) => (
            <Grid key={`data_${dIndex}`} gridTemplateColumns="1fr 50px 1fr" mb={5}>
              <GridItem>
                <Input type="text" value={data.rowData} disabled />
              </GridItem>
              <GridItem>
                <ChevronRightIcon w={10} h={10} />
              </GridItem>
              <GridItem>
                <Input type="text" onChange={(e) => handleChangeData(e.target.value)} />
              </GridItem>
            </Grid>
          ))}
        </GridItem>
      </Grid>
      <Button color="blue.400" variant="solid">
        <Link to="/map">次へ（マップページ）</Link>
      </Button>
    </ContentLayout>
  );
};
