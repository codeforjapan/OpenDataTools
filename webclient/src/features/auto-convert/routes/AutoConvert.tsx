import { CheckCircleIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Spinner } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { StepLayout } from '../../../components/Layout';
import { OstLink } from '../../../components/Elements/OstLink';

export const AutoConvert: FC = () => {
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

  const CharacterCodeStatusElm: FC = () => {
    switch (progress.characterCode.status) {
      case 'waiting':
        return <MinusIcon />;
      case 'processing':
        return <Spinner />;
      case 'finished':
        return <CheckCircleIcon />;
      default:
        return <MinusIcon />;
    }
  };

  const CharacterTypeStatusElm: FC = () => {
    switch (progress.characterType.status) {
      case 'waiting':
        return <MinusIcon />;
      case 'processing':
        return <Spinner />;
      case 'finished':
        return <CheckCircleIcon />;
      default:
        return <MinusIcon />;
    }
  };

  const RequiredFieldStatusElm: FC = () => {
    switch (progress.requiredField.status) {
      case 'waiting':
        return <MinusIcon />;
      case 'processing':
        return <Spinner />;
      case 'finished':
        return <CheckCircleIcon />;
      default:
        return <MinusIcon />;
    }
  };

  return (
    <StepLayout pageTitle="自動変換" headingText={`データを自動変換しています`}>
      <Box p={5} background="gray.200" border="1px solid" my={3}>
        <CharacterCodeStatusElm />
        文字コードを変換しています。
      </Box>
      <Box p={5} background="gray.200" border="1px solid" my={3}>
        <CharacterTypeStatusElm />
        全角英数字を半角英数字に変換しています。
      </Box>
      <Box p={5} background="gray.200" border="1px solid" my={3}>
        <RequiredFieldStatusElm />
        必須項目を確認しています。
      </Box>
      <Box w="300px">
        <OstLink to="/data-editor">次へ（データ項目詳細編集）</OstLink>
      </Box>
    </StepLayout>
  );
};
