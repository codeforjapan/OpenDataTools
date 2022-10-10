import { Avatar, Box, Flex, Spinner, Text } from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  MinusIcon,
  DownloadIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import { FC, useEffect, useState } from 'react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstButton } from '../../../components/Elements/OstButton';
import { useParams } from 'react-router-dom';

export const AutoConvert: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [progress, setProgress] = useState({
    characterCode: { status: 'waiting', error: false },
    characterType: { status: 'waiting', error: false },
    requiredField: { status: 'waiting', error: false },
  });

  useEffect(() => {
    // 自動変換を順番に実施していく処理
    // モックとしてsleepを使っている。
    // 実際にはuseEffect内でprogressが動的に変わらないので注意
    const sleep = (waitSec: number) => {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve('');
        }, waitSec);
      });
    };

    const fetch = async () => {
      setProgress({
        ...progress,
        characterCode: { status: 'processing', error: false },
      });
      await sleep(1000);
      setProgress({
        ...progress,
        characterCode: { status: 'finished', error: false },
        characterType: { status: 'processing', error: false },
      });
    };
    fetch();
  }, []);

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
    switch (progress.characterCode.status) {
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
    switch (progress.characterType.status) {
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
    switch (progress.requiredField.status) {
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

  const isAllProgressFinished = false; //TODO: 処理完了のステータスを監視する

  return (
    <StepLayout
      pageTitle="データ自動変換"
      headingText={
        isAllProgressFinished ? 'データの自動変換が完了しました' : 'データを自動変換しています'
      }
      uid={dataset_uid}
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
          {...statusStyle(progress.characterCode.status)}
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
          {...statusStyle(progress.characterType.status)}
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
          {...statusStyle(progress.requiredField.status)}
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
              >
                一時ファイルのダウンロード
              </OstButton>
            )}
          </Flex>
          <OstNavLink
            to={`/${dataset_uid}/normalize-label`}
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
