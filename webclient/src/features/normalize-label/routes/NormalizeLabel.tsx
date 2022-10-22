import { FC, useState } from 'react';
import { Avatar, Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { NormalizeDatasetItemLabel } from '../../../components/Editor';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { datasetItemUidListAtom } from '../../../stores/dataset';

export const NormalizeLabel: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const datasetItemUidList = useRecoilValue(
    datasetItemUidListAtom({ datasetUid: String(dataset_uid) })
  );
  const [isFormatSelected, setIsFormatSelected] = useState<boolean>(false);
  const isCheckFinished = true; //TODO: 確認終了のステータスを監視する

  const handleSelectFormat = (value: string) => {
    if (value !== '') {
      setIsFormatSelected(true);
    } else {
      setIsFormatSelected(false);
    }
  };

  return (
    <StepLayout
      pageTitle="データ項目名の正規化"
      headingText="データ項目名の正規化"
      uid={dataset_uid}
      isProcessFinished={isFormatSelected && isCheckFinished}
    >
      <Flex
        alignItems="center"
        p={8}
        mb={4}
        borderRadius={20}
        bg={isFormatSelected ? 'information.bg.disabled' : 'information.bg.active'}
      >
        <Box flex="0 0 50%" pr={8}>
          <Text>正規化したい推奨データフォーマットを選択してください</Text>
        </Box>
        <Box flex="0 0 50%">
          <OstSelect
            options={[
              { label: 'フォーマットを選択', value: '' },
              { label: '公共施設一覧', value: 'public-facilities' },
            ]}
            changeValue={(e) => handleSelectFormat(e.target.value)}
          />
        </Box>
      </Flex>

      {isFormatSelected && (
        <>
          <Flex
            alignItems="center"
            px={6}
            py={4}
            mb={10}
            bg={isCheckFinished ? 'information.bg.alert' : 'information.bg.active'}
            borderRadius={8}
          >
            {isCheckFinished ? (
              <>
                <InfoOutlineIcon />
                <Text ml={6}>
                  推奨データフォーマットの項目名と一致した項目はチェック済みです。
                  <br />
                  未チェックの項目で正規化できる項目があれば、チェックを入れ正規化する対象項目を選択してください。
                </Text>
              </>
            ) : (
              <>
                <Spinner />
                <Text ml={6}>推奨データフォーマットと照合しています</Text>
              </>
            )}
          </Flex>
          {isCheckFinished &&
            datasetItemUidList.map((uid) => (
              <NormalizeDatasetItemLabel datasetUid={String(dataset_uid)} itemUid={uid} key={uid} />
            ))}
        </>
      )}

      <Box mt={8}>
        {isFormatSelected && isCheckFinished && (
          <Flex justifyContent="flex-end">
            <Text
              display="inline-block"
              bg="information.bg.active"
              borderRadius="3em"
              px={8}
              py={2}
            >
              次のステップでは各項目ごとのデータ修正を行います
            </Text>
          </Flex>
        )}
        <Flex mt={8} justifyContent="space-between">
          <OstNavLink
            to={`/${dataset_uid}/auto-convert`}
            iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
            mr={8}
          >
            ステップ２に戻る
          </OstNavLink>
          <OstNavLink
            to={`/${dataset_uid}/data-editor`}
            isDisabled={!isFormatSelected || !isCheckFinished}
            iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
          >
            次のステップへ
          </OstNavLink>
        </Flex>
      </Box>
    </StepLayout>
  );
};
