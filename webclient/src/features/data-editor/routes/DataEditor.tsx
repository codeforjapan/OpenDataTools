import { FC, useState } from 'react';
import { DataEditorMain, DataEditorSidenav } from '../../../components/Editor';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ContentLayout } from '../../../components/Layout';
import { OstLink } from '../../../components/Elements/OstLink';

export const DataEditor: FC = () => {
  const [selectedItemUid, setItemUid] = useState<string>();

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
          <DataEditorSidenav
            selectedItemUid={selectedItemUid}
            onSelect={(uid: string) => setItemUid(uid)}
          />
        </GridItem>
        <GridItem pl={10}>
          <DataEditorMain selectedItemUid={selectedItemUid} />
        </GridItem>
      </Grid>
      <Box w="300px">
        <OstLink to="/map">次へ（マップページ）</OstLink>
      </Box>
    </ContentLayout>
  );
};
