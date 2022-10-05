import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Grid, GridItem, Input } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataEditorMain, DataEditorSidenav } from '../../../components/Editor';
import { ContentLayout } from '../../../components/Layout';

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
      <Button color="blue.400" variant="solid">
        <Link to="/map">次へ（マップページ）</Link>
      </Button>
    </ContentLayout>
  );
};
