import { FC, useState } from 'react';
import { MdOutlineMap } from 'react-icons/md';
import {
  InfoOutlineIcon,
  CheckIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  DownloadIcon,
} from '@chakra-ui/icons';
import {
  Grid,
  GridItem,
  Flex,
  Avatar,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstButton } from '../../../components/Elements/OstButton';
import { DataEditorMain, DataEditorSidenav } from '../../../components/Editor';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { datasetAtom } from '../../../stores/dataset';
import { useGetDatasetWithNewItems } from '../../../hooks/useDataset';
import { exportCsv } from '../../../utils/exportCsv';
import civitanFinished from '../../../assets/civitan_finished.png';
import civitanSearching from '../../../assets/civitan_searching.png';

export const DataEditor: FC = () => {
  // Modalの状態管理
  const { isOpen: isDownloadOpen, onOpen: onDownloadOpen, onClose: onDownloadClose } = useDisclosure();
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();

  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [selectedItemUid, setItemUid] = useState<string>();
  const dataset = useRecoilValue(datasetAtom({ uid: dataset_uid || '' }));

  const isCheckFinished = true; //TODO: 確認終了のステータスを監視する

  const datasetWithNewItems = useGetDatasetWithNewItems({
    datasetUid: String(dataset_uid),
  });

  return (
    <StepLayout
      pageTitle="データ形式確認"
      headingText="データ形式確認"
      uid={dataset_uid}
      isProcessFinished={isCheckFinished}
    >
      {dataset?.datasetName}
      <Flex
        alignItems="center"
        px={6}
        py={4}
        mb={10}
        bg={isCheckFinished ? 'information.bg.active' : 'information.bg.alert'}
        borderRadius={8}
      >
        {isCheckFinished ? <CheckIcon /> : <InfoOutlineIcon />}
        <Text ml={6}>
          {isCheckFinished
            ? '形式の確認が完了しました。'
            : `X件のデータ形式を確認して修正してください。`}
        </Text>
      </Flex>
      <Grid gridTemplateColumns="200px 1fr" mt={4}>
        <GridItem borderRight="1px solid" borderColor="inputAreaBorder.active">
          <DataEditorSidenav
            selectedItemUid={selectedItemUid}
            onSelect={(uid: string) => setItemUid(uid)}
          />
        </GridItem>
        <GridItem pl={10}>
          <DataEditorMain selectedItemUid={selectedItemUid} />
        </GridItem>
      </Grid>

      <Flex mt={8} justifyContent="space-between">
        <Flex flexWrap="wrap">
          <OstNavLink
            to={`/${dataset_uid}/normalize-label`}
            iconLeft={<Avatar size="md" p="12px" icon={<ArrowBackIcon />} />}
            mr={8}
          >
            ステップ３に戻る
          </OstNavLink>
          {isCheckFinished && (
            <OstButton
              view="skeleton"
              size="L"
              icon={<Avatar bg="bg.active" size="md" p="12px" icon={<DownloadIcon />} />}
              onClick={() => exportCsv(datasetWithNewItems)}
            >
              ダウンロード
            </OstButton>
          )}
        </Flex>
        <OstNavLink
          onClick={onDownloadOpen}
          isDisabled={!isCheckFinished}
          iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
        >
          完了
        </OstNavLink>
      </Flex>

      {/* TODO: モーダル利用箇所が増えたら共通デザインとしてコンポーネント化する */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isDownloadOpen}
        onClose={onDownloadClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="640px" maxH="640py">
          <ModalHeader bg="information.bg.disabled">
            お疲れさまでした！作業を完了します！
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex mt={6} mb={6} justify="center">
              <img src={civitanFinished} />
            </Flex>
            <Text>
              ここまでの作業ファイル（CSV）を、ご自身のパソコン環境にダウンロードしましょう。
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <OstButton
              size="L"
              view="button"
              onClick={() => {
                onDownloadClose();
                exportCsv(datasetWithNewItems); // 完成したcsvのダウンロード
                onPreviewOpen();
              }}
            >
              作業ファイルをダウンロード<DownloadIcon w={6} h={6} ml={4} />
            </OstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isPreviewOpen}
        onClose={onPreviewClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="640px" maxH="640py">
          <ModalHeader bg="information.bg.disabled">
            作ったデータをマップ上で確認してみましょう！
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex mt={6} mb={6} justify="center">
              <img src={civitanSearching} />
            </Flex>
            ここまでの作業ファイルが、マップ上に表示されるか気になりますよね？どんな表示になっているか見てみましょう！
          </ModalBody>

          <ModalFooter justifyContent="center">
            {/* NOTE: 見た目を塗りつぶしたボタンにするため、OstNavLinkではなくOstButtonを使用 */}
            <Link to={`/${dataset_uid}/map`}>
              <OstButton
                size="L"
                view="button"
              >
                マップでプレビュー確認<Icon as={MdOutlineMap} w={6} h={6} ml={4} />
              </OstButton>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </StepLayout>
  );
};
