import { FC, Suspense, useEffect, useMemo, useState } from 'react';
import { MdOutlineMap } from 'react-icons/md';
import { ArrowBackIcon, DownloadIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { StepLayout } from '../../../components/Layout';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { OstButton } from '../../../components/Elements/OstButton';
import {
  DataEditorCompleteButton,
  DataEditorLatLng,
  DataEditorMain,
  DataEditorSidenav,
} from '../../../components/Editor';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { datasetItemListSelector, datasetSingleCellListSelector } from '../../../stores/dataset';
import { useParseDatasetWithNewItems } from '../../../hooks/useDataset';
import civitanFinished from '../../../assets/civitan_finished.png';
import civitanSearching from '../../../assets/civitan_searching.png';
import { exportCsv } from '../../../utils/exportCsv';

export const DataDownloader: FC<{ onDownloaded: () => void }> = ({ onDownloaded }) => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const { parseDataset } = useParseDatasetWithNewItems({ datasetUid: dataset_uid! });
  const cells = useRecoilValue(datasetSingleCellListSelector({ datasetUid: dataset_uid! }));

  useEffect(() => {
    const fetch = async () => {
      const dataset = await parseDataset();
      if (!dataset || dataset.length === 0) return;
      exportCsv(dataset);
      onDownloaded();
    };
    fetch();
  }, [cells]);

  return <></>;
};

export const DataEditor: FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  // Modalの状態管理
  const {
    isOpen: isDownloadOpen,
    onOpen: onDownloadOpen,
    onClose: onDownloadClose,
  } = useDisclosure();
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();

  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [selectedItemUid, setItemUid] = useState<string>();

  // NOTE: 緯度経度のitemチェックのため
  const datasetItemList = useRecoilValue(
    datasetItemListSelector({ datasetUid: String(dataset_uid) })
  );
  const latLngUids = datasetItemList
    .filter((item) => ['緯度', '経度'].includes(item.normalizedLabel || ''))
    .map((item) => item.uid);
  const isIncludeLatLng = useMemo(() => {
    if (selectedItemUid === undefined) return false;
    return latLngUids.includes(selectedItemUid);
  }, [latLngUids, selectedItemUid]);

  return (
    <StepLayout
      pageTitle="データ形式確認"
      headingText="データ形式確認"
      intro="項目名別に細かく修正ポイントが表示されますので、メッセージに従ってデータ形式を修正してください"
      uid={dataset_uid}
    >
      <Grid gridTemplateColumns="200px 1fr">
        <GridItem borderRight="1px solid" borderColor="inputAreaBorder.active">
          <DataEditorSidenav
            selectedItemUid={selectedItemUid}
            onSelect={(uid: string) => setItemUid(uid)}
          />
        </GridItem>
        <GridItem pl={10}>
          {isIncludeLatLng ? (
            <DataEditorLatLng selectedItemUid={selectedItemUid} />
          ) : (
            <DataEditorMain selectedItemUid={selectedItemUid} />
          )}
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
          <OstButton
            view="skeleton"
            size="L"
            iconLeft={<Avatar bg="bg.active" size="md" p="12px" icon={<DownloadIcon />} />}
            onClick={() => setIsDownloading(true)}
            isLoading={isDownloading}
          >
            ダウンロード
          </OstButton>
          {isDownloading && (
            <Suspense fallback="">
              <DataDownloader onDownloaded={() => setIsDownloading(false)} />
            </Suspense>
          )}
        </Flex>
        <DataEditorCompleteButton onClick={onDownloadOpen} />
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
              iconRight={<Icon as={DownloadIcon} w={6} h={6} />}
              onClick={() => {
                onDownloadClose();
                setIsDownloading(true); // 完成したcsvのダウンロード
                onPreviewOpen();
              }}
              isLoading={isDownloading}
            >
              作業ファイルをダウンロード
            </OstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal closeOnOverlayClick={false} isOpen={isPreviewOpen} onClose={onPreviewClose} isCentered>
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
              <OstButton size="L" view="button" iconRight={<Icon as={MdOutlineMap} w={6} h={6} />}>
                マップでプレビュー確認
              </OstButton>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </StepLayout>
  );
};
