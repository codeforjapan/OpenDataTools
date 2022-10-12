import { Avatar, Box, Center, Flex, InputGroup, Text } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import {ArrowForwardIcon, InfoOutlineIcon} from '@chakra-ui/icons';
import { TbFileDescription } from 'react-icons/tb';
import { useDropzone } from 'react-dropzone';
import { useSetRecoilState } from 'recoil';
import { uploadedFileBufferAtom } from '../../../stores/upload_file';

export const FileUpload: FC = () => {
  const [csvName, setCsvName] = useState<string>();
  const [fileLength, setFileLength] = useState(false);
  const setUploadedFileBuffer = useSetRecoilState(uploadedFileBufferAtom);

  const onDrop = useCallback((csvFile: any) => {
    csvFile.forEach((file: any) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          if (csvFile.length >= 2){
            setFileLength( true);
            return;
          }
          setFileLength(false);
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

  return (
    <StepLayout
      pageTitle="CSVアップロード"
      headingText={
        !csvName
          ? 'CSVファイルをアップロードしてください'
          : '以下のCSVファイルがアップロードされました'
      }
    >
      {fileLength && (
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
      {csvName && (
        <Flex mt={5} justifyContent="flex-end">
          <Text display="inline-block" bg="information.bg.active" borderRadius="3em" px={8} py={2}>
            次のステップに進むと検証前に必要な自動変換がはじまります
          </Text>
        </Flex>
      )}
      <Flex mt={4} justifyContent="flex-end">
        <OstNavLink
          to={`/auto-convert`}
          isDisabled={!csvName}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          次のステップへ
        </OstNavLink>
      </Flex>
    </StepLayout>
  );
};
