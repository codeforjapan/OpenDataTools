import { Avatar, Box, Center, cssVar, Flex, Input, InputGroup } from '@chakra-ui/react';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import parser, { ParseResult } from 'papaparse';
import { utilCharEncoding } from 'opendatatool-datamanager';
import { useImportDataset } from '../../../hooks/useDataset';
import { TbFileDescription } from 'react-icons/tb';
import { useDropzone } from 'react-dropzone';

export const FileUpload: FC = () => {
  const [datasetUid, setDatasetUid] = useState<string>();
  const [csvName, setCsvName] = useState<string>();

  const importRowData = useImportDataset();

  const onDrop = useCallback((csvFile: any) => {
    csvFile.forEach((file: any) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          const rowData: any = reader.result;
          const charCodeConvertedData = utilCharEncoding.toString(rowData);
          const rowDataObject: ParseResult<any> = parser.parse(charCodeConvertedData, {
            header: true,
          });
          const rowHeaders = rowDataObject.meta.fields;
          if (!rowHeaders) return;
          const importedDatasetUid = importRowData({
            datasetName: file.name,
            headers: rowHeaders,
            rowDatas: rowDataObject.data,
          });
          setDatasetUid(importedDatasetUid);
          setCsvName(file.name);
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        return;
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ accept: { 'text/csv': ['.csv'] }, onDrop });

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
        setDatasetUid(importedDatasetUid);
        setCsvName(csv.name);
      } catch (error) {
        return;
      }
    };
    reader.onload = readCsv;
    reader.readAsArrayBuffer(csv);
  };

  return (
    <StepLayout
      pageTitle="CSVアップロード"
      headingText={
        !datasetUid
          ? 'CSVファイルをアップロードしてください'
          : '以下のCSVファイルがアップロードされました'
      }
    >
      {!datasetUid && (
        <Center>検証を行いたいファイルを下記の枠内にドラッグ＆ドロップしてください</Center>
      )}
      {!datasetUid ? (
        <div {...getRootProps()}>
          <Box
            p={20}
            mt={10}
            border="4px dashed"
            borderColor="icon.active"
            borderRadius={20}
            bg="information.bg.active"
            textAlign="center"
            as="label"
            display="block"
            cursor="pointer"
            fontSize="xl"
            fontWeight="bold"
            color="icon.active"
          >
            <Center py={5}>
              <TbFileDescription size={50} />
            </Center>
            ここに、CSVファイルをドロップしてください
            <InputGroup>
              <input {...getInputProps()} />
              <Input
                type="file"
                display="none"
                accept="text/csv"
                onChange={(e) => readInputFile(e)}
              />
            </InputGroup>
          </Box>
        </div>
      ) : (
        <Box
          p={20}
          mt={4}
          borderRadius={20}
          bg="information.bg.disabled"
          textAlign="center"
          as="label"
          display="block"
          cursor="pointer"
          fontSize="xl"
          fontWeight="bold"
          color="icon.active"
        >
          <Center py={5}>
            <TbFileDescription size={50} />
          </Center>
          {csvName}
        </Box>
      )}
      {datasetUid && (
        <Flex mt={5} justifyContent="flex-end">
          <Box
            bg="information.bg.active"
            px={10}
            py={2}
            borderRadius={20}
            display="inline-block"
            justifyContent="right"
          >
            次のステップに進むと検証前に必要な自動変換がはじまります
          </Box>
        </Flex>
      )}
      <Flex mt={4} justifyContent="flex-end">
        <OstNavLink
          to={`/${datasetUid}/auto-convert`}
          isDisabled={!datasetUid}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          次のステップへ
        </OstNavLink>
      </Flex>
    </StepLayout>
  );
};
