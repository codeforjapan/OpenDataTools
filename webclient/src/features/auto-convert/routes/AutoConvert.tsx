import { Avatar, Box, Flex, Spinner, Text } from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  MinusIcon,
  DownloadIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import { FC, useEffect, useMemo, useState } from 'react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstButton } from '../../../components/Elements/OstButton';
import { useRecoilValue } from 'recoil';
import { uploadedFileBufferAtom } from '../../../stores/upload_file';
import { utilCharEncoding } from 'opendatatool-datamanager';
import parser, { ParseResult } from 'papaparse';
import { useGetDatasetWithNewItems, useImportDataset } from '../../../hooks/useDataset';
import { exportCsv } from '../../../utils/exportCsv';

export const AutoConvert: FC = () => {
  const [datasetUid, setDatasetUid] = useState<string>();
  const [characterCodeProgress, setCharacterCodeProgress] = useState({
    status: 'waiting',
    error: false,
  });
  const [characterTypeProgress, setCharacterTypeProgress] = useState({
    status: 'waiting',
    error: false,
  });
  const [requiredFieldProgress, setRequiredFieldProgress] = useState({
    status: 'waiting',
    error: false,
  });

  const uploadedFileBuffer = useRecoilValue(uploadedFileBufferAtom);
  const importRowData = useImportDataset();

  const datasetWithNewItems = useGetDatasetWithNewItems({
    datasetUid: String(datasetUid),
  });

  useEffect(() => {
    if (uploadedFileBuffer) {
      setCharacterCodeProgress({ status: 'processing', error: false });
      const charCodeConvertedData = utilCharEncoding.toString(uploadedFileBuffer.buffer);
      setCharacterCodeProgress({ status: 'finished', error: false });
      setCharacterTypeProgress({ status: 'processing', error: false });
      setCharacterTypeProgress({ status: 'finished', error: false });
      setRequiredFieldProgress({ status: 'processing', error: false });
      const rowDataObject: ParseResult<any> = parser.parse(charCodeConvertedData, {
        header: true,
      });
      const rowHeaders = rowDataObject.meta.fields;
      if (!rowHeaders) return;
      const importedDatasetUid = importRowData({
        datasetName: uploadedFileBuffer.fileName,
        headers: rowHeaders,
        rowDatas: rowDataObject.data,
      });
      setDatasetUid(importedDatasetUid);
      setRequiredFieldProgress({ status: 'finished', error: false });
    }
  }, [uploadedFileBuffer]);

  const statusStyle = (status: string) => {
    switch (status) {
      case 'waiting':
        return {
          bg: 'white',
          color: 'text.disabled',
          border: '1px solid',
          borderColor: 'inputAreaBorder.active',
        };
      case 'processing':
        return {
          bg: 'information.bg.active',
          color: 'body.text',
        };
      case 'finished':
        return {
          bg: 'information.bg.disabled',
          color: 'icon.active',
        };
      default:
        return {
          bg: 'white',
          color: 'text.disabled',
          border: '1px solid',
          borderColor: 'inputAreaBorder.active',
        };
    }
  };

  const CharacterCodeStatusElm: FC = () => {
    switch (characterCodeProgress.status) {
      case 'waiting':
        return (
          <>
            <MinusIcon mr={6} />
            <Text>文字コードを確認しています</Text>
          </>
        );
      case 'processing':
        return (
          <>
            <Spinner mr={6} w={5} h={5} />
            <Text>文字コードを変換しています</Text>
          </>
        );
      case 'finished':
        return (
          <>
            <CheckIcon mr={6} />
            <Text>文字コードを変換しました</Text>
          </>
        );
      default:
        return (
          <>
            <MinusIcon mr={6} />
            <Text>文字コードを確認しています</Text>
          </>
        );
    }
  };

  const CharacterTypeStatusElm: FC = () => {
    switch (characterTypeProgress.status) {
      case 'waiting':
        return (
          <>
            <MinusIcon mr={6} />
            <Text>全角半角を確認しています</Text>
          </>
        );
      case 'processing':
        return (
          <>
            <Spinner mr={6} w={5} h={5} />
            <Text>全角半角変換しています</Text>
          </>
        );
      case 'finished':
        return (
          <>
            <CheckIcon mr={6} />
            <Text>全角半角変換しました</Text>
          </>
        );
      default:
        return (
          <>
            <MinusIcon mr={6} />
            <Text>全角半角を確認しています</Text>
          </>
        );
    }
  };

  const RequiredFieldStatusElm: FC = () => {
    switch (requiredFieldProgress.status) {
      case 'waiting':
        return (
          <>
            <MinusIcon mr={6} />
            <Text>必須項目を確認しています</Text>
          </>
        );
      case 'processing':
        return (
          <>
            <Spinner mr={6} w={5} h={5} />
            <Text>必須項目を変換しています</Text>
          </>
        );
      case 'finished':
        return (
          <>
            <CheckIcon mr={6} />
            <Text>必須項目を確認しました</Text>
          </>
        );
      default:
        return (
          <>
            <MinusIcon mr={6} />
            <Text>必須項目を確認しています</Text>
          </>
        );
    }
  };

  const isAllProgressFinished = useMemo(() => {
    if (
      characterCodeProgress.status === 'finished' &&
      characterTypeProgress.status === 'finished' &&
      requiredFieldProgress.status === 'finished'
    ) {
      return true;
    } else {
      return false;
    }
  }, [characterCodeProgress, characterTypeProgress, requiredFieldProgress]);

  return (
    <StepLayout
      pageTitle="データ自動変換"
      headingText={
        isAllProgressFinished ? 'データの自動変換が完了しました' : 'データを自動変換しています'
      }
      uid={datasetUid}
      isProcessFinished={isAllProgressFinished}
    >
      {!isAllProgressFinished && (
        <Flex alignItems="center" px={6} py={4} bg="information.bg.alert" borderRadius={8}>
          <InfoOutlineIcon />
          <Text ml={6}>変換には時間がかかります。しばらくお待ちください。</Text>
        </Flex>
      )}

      <Box py={4}>
        <Flex
          alignItems="center"
          px={6}
          py={4}
          my={6}
          borderRadius={8}
          textStyle="navigationLarge"
          {...statusStyle(characterCodeProgress.status)}
        >
          <CharacterCodeStatusElm />
        </Flex>
        <Flex
          alignItems="center"
          px={6}
          py={4}
          my={6}
          borderRadius={8}
          textStyle="navigationLarge"
          {...statusStyle(characterTypeProgress.status)}
        >
          <CharacterTypeStatusElm />
        </Flex>
        <Flex
          alignItems="center"
          px={6}
          py={4}
          my={6}
          borderRadius={8}
          textStyle="navigationLarge"
          {...statusStyle(requiredFieldProgress.status)}
        >
          <RequiredFieldStatusElm />
        </Flex>
      </Box>

      <Box mt={8}>
        {isAllProgressFinished && (
          <Flex justifyContent="flex-end">
            <Text
              display="inline-block"
              bg="information.bg.active"
              borderRadius="3em"
              px={8}
              py={2}
            >
              次のステップではデータ項目名の正規化を行います
            </Text>
          </Flex>
        )}
        <Flex mt={8} justifyContent="space-between">
          <Flex flexWrap="wrap">
            <OstNavLink
              to="/upload-file"
              iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
              mr={8}
            >
              ステップ１に戻る
            </OstNavLink>
            {isAllProgressFinished && (
              <OstButton
                view="skeleton"
                size="L"
                icon={<Avatar bg="bg.active" size="md" p="12px" icon={<DownloadIcon />} />}
                onClick={() => exportCsv(datasetWithNewItems)}
              >
                一時ファイルのダウンロード
              </OstButton>
            )}
          </Flex>
          <OstNavLink
            to={`/${datasetUid}/normalize-label`}
            isDisabled={!isAllProgressFinished}
            iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
          >
            次のステップへ
          </OstNavLink>
        </Flex>
      </Box>
    </StepLayout>
  );
};
