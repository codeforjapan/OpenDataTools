import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { StepLayout } from '../../../components/Layout';
import { OstLink } from '../../../components/Elements/OstLink';
import { OstInput } from '../../../components/Elements/OstInput';

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
    <StepLayout pageTitle="データ詳細編集" headingText="データ形式確認">
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
                <OstInput value={data.rowData} isDisabled={true} />
              </GridItem>
              <GridItem>
                <ChevronRightIcon w={10} h={10} />
              </GridItem>
              <GridItem>
                <OstInput changeValue={(e) => handleChangeData(e.target.value)} />
              </GridItem>
            </Grid>
          ))}
        </GridItem>
      </Grid>
      <Box w="300px">
        <OstLink to="/map">次へ（マップページ）</OstLink>
      </Box>
    </StepLayout>
  );
};
