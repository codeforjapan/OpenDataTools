import { Avatar, Box, Center, Code, Flex, InputGroup, Spinner, Text } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BoxLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { ArrowForwardIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { TbFileDescription } from 'react-icons/tb';
import { useDropzone } from 'react-dropzone';
import parser, { ParseResult } from 'papaparse';
import { useGetItemsUnnormalized, useImportDataset } from '../../../hooks/useDataset';
import { utilCharEncoding } from 'opendatatool-datamanager';
import { useSetRecoilState } from 'recoil';
import { datasetItemListSelector } from '../../../stores/dataset';

export const FileUploadForMap: FC = () => {
  const [csvName, setCsvName] = useState<string>();
  const [isFilesMultiple, setIsFilesMultiple] = useState<boolean>(false);
  const [datasetUid, setDatasetUid] = useState<string>();
  const [uploadedFileBuffer, setUploadedFileBuffer] = useState<{
    fileName: string;
    buffer: Buffer;
  } | null>(null);
  const [charCodeConvertedData, setCharCodeConvertedData] = useState<string>();
  const [isFinishedProgress, setIsFinishedProgress] = useState<boolean>(false);
  const importRowData = useImportDataset();
  const itemsUnnormalized = useGetItemsUnnormalized({ datasetUid: datasetUid || '' });
  const setDatasetItem = useSetRecoilState(
    datasetItemListSelector({ datasetUid: datasetUid || '' })
  );

  const onDrop = useCallback((csvFile: any) => {
    csvFile.forEach((file: any) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          if (csvFile.length >= 2) {
            setIsFilesMultiple(true);
            return;
          }
          setIsFilesMultiple(false);
          const rowData: any = reader.result;
          setUploadedFileBuffer({ fileName: file.name, buffer: rowData });
          setCsvName(file.name);
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        return;
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ accept: { 'text/csv': ['.csv'] }, onDrop });

  useEffect(() => {
    if (uploadedFileBuffer) {
      setCharCodeConvertedData(utilCharEncoding.toString(uploadedFileBuffer.buffer));
    }
  }, [uploadedFileBuffer]);

  useEffect(() => {
    if (charCodeConvertedData && uploadedFileBuffer) {
      try {
        const rowDataObject: ParseResult<any> = parser.parse(charCodeConvertedData, {
          header: true,
          skipEmptyLines: 'greedy',
        });
        const rowHeaders = rowDataObject.meta.fields;
        if (!rowHeaders) throw new Error('file is not selected');
        const importedDatasetUid = importRowData({
          datasetName: uploadedFileBuffer.fileName,
          headers: rowHeaders,
          rowDatas: rowDataObject.data,
        });
        setDatasetUid(importedDatasetUid);
      } catch (error) {
        return;
      }
    }
  }, [charCodeConvertedData, uploadedFileBuffer]);

  useEffect(() => {
    if (itemsUnnormalized.length > 0) {
      setDatasetItem(itemsUnnormalized);
      setIsFinishedProgress(true);
    }
  }, [datasetUid, JSON.stringify(itemsUnnormalized)]);

  return (
    <BoxLayout
      pageTitle="CSVアップロード"
      headingText={
        !csvName
          ? 'CSVファイルをアップロードしてください'
          : '以下のCSVファイルがアップロードされました'
      }
    >
      {isFilesMultiple && (
        <Flex alignItems="center" px={6} py={4} mb={10} bg="information.bg.alert" borderRadius={8}>
          <InfoOutlineIcon />
          <Text ml={6}>CSVファイルのアップロードは一つずつ行ってください</Text>
        </Flex>
      )}
      {!csvName && (
        <Center>検証を行いたいファイルを下記の枠内にドラッグ＆ドロップしてください</Center>
      )}
      {!csvName ? (
        <div {...getRootProps()}>
          <Box
            p={20}
            mt={10}
            border="4px dashed"
            borderColor="icon.active"
            borderRadius={20}
            bg="information.bg.active"
            textAlign="center"
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
      {uploadedFileBuffer && !isFinishedProgress && (
        <Flex
          alignItems="center"
          px={6}
          py={4}
          my={6}
          borderRadius={8}
          textStyle="navigationLarge"
          bg="information.bg.alert"
          color="body.text"
        >
          <Spinner mr={6} w={5} h={5} />
          <Text>マップを表示する準備をしています</Text>
        </Flex>
      )}
      {datasetUid && isFinishedProgress && (
        <Flex mt={5} justifyContent="flex-end">
          <Text display="inline-block" bg="information.bg.active" borderRadius="3em" px={8} py={2}>
            マップを表示する準備が終わりました
          </Text>
        </Flex>
      )}
      <Flex mt={4} justifyContent="flex-end">
        <OstNavLink
          to={`/${datasetUid}/map`}
          isDisabled={!datasetUid || !isFinishedProgress}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          マップを表示する
        </OstNavLink>
      </Flex>
    </BoxLayout>
  );
};
