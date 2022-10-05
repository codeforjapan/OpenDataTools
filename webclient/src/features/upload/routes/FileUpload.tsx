import { Box, Input } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepLayout } from '../../../components/Layout';
import parser, { ParseResult } from 'papaparse';
import { utilCharEncoding } from 'opendatatool-datamanager';
import { useImportDataset } from '../../../hooks/useDataset';

export const FileUpload: FC = () => {
  const navigator = useNavigate();
  const importRowData = useImportDataset();

  const readInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const csv = e.target.files[0];

    const reader = new FileReader();
    const readCsv = () => {
      try {
        const rowData: any = reader.result;
        const charCodeConvertedData = utilCharEncoding.toString(rowData);
        const rowDataObject: ParseResult<any> = parser.parse(charCodeConvertedData, {
          header: true,
        });
        const rowHeaders = rowDataObject.meta.fields;
        if (!rowHeaders) return;
        const importedDatasetUid = importRowData({
          datasetName: csv.name,
          headers: rowHeaders,
          rowDatas: rowDataObject.data,
        });
        navigator(`/${importedDatasetUid}/normalize-label`);
      } catch (error) {
        return;
      }
    };
    reader.onload = readCsv;
    reader.readAsArrayBuffer(csv);
  };

  return (
    <StepLayout pageTitle="CSVアップロード" headingText={`CSVファイルをアップロードしてください`}>
      <Box
        p={20}
        mt={4}
        border="dashed 1px"
        borderRadius={5}
        textAlign="center"
        as="label"
        display="block"
        cursor="pointer"
      >
        CSVファイルをアップロード
        <Input type="file" display="none" accept="text/csv" onChange={(e) => readInputFile(e)} />
      </Box>
    </StepLayout>
  );
};
