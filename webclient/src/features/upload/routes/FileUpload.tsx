import { Box, Input } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '../../../components/Layout';

export const FileUpload: FC = () => {
  const navigator = useNavigate();
  const readInputFile = (e: any) => {
    // ToDo選択されたcsvファイルをjson化して、ステートに保持（グローバルステートにするほうがいいかな）
    console.log(e);
    navigator('/normalize-label');
  };

  return (
    <ContentLayout title="CSVアップロード">
      <Box p={20} border="dashed 1px" borderRadius={5} textAlign="center" as="label">
        CSVファイルをアップロード
        <Input
          type="file"
          display="none"
          accept="text/csv"
          onChange={(e) => readInputFile(e.target.value)}
        />
      </Box>
    </ContentLayout>
  );
};
