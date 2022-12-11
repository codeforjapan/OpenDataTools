import { Flex, Box, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import {
  datasetItemAtom,
  datasetItemListSelector,
  datasetSingleCellListByItemSelector,
} from '../../stores/dataset';

type Props = {
  selectedItemUid?: string;
  onSelect: (uid: string) => void;
};

const DatasetItem: FC<{
  datasetUid: string;
  itemUid: string;
  datasetItemList: Dataset.Item[];
  selectedItemUidState: string;
  onSelect: (uid: string) => void;
}> = ({ datasetUid, itemUid, datasetItemList, selectedItemUidState, onSelect }) => {
  const LatLngUids = datasetItemList
    .filter((item) => ['緯度', '経度'].includes(item.normalizedLabel || ''))
    .map((item) => item.uid);

  const item = useRecoilValue(datasetItemAtom({ datasetUid, itemUid }));
  const handleOnClick = () => {
    if (!item) return;
    onSelect(item.uid);
  };

  const isSelectedItem = useMemo(() => {
    // note: 緯度と経度の時だけ両方選択された状態にする
    if (LatLngUids.includes(selectedItemUidState) && LatLngUids.includes(item?.uid || ''))
      return true;
    return item?.uid === selectedItemUidState;
  }, [LatLngUids, selectedItemUidState]);

  const SingleCellUidListByItem = useRecoilValue(
    datasetSingleCellListByItemSelector({
      datasetUid: String(datasetUid),
      itemUid: String(itemUid),
    })
  );

  const errorLength = useMemo(() => {
    return SingleCellUidListByItem.filter((i) => i.error.length > 0).length;
  }, [SingleCellUidListByItem]);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      p={4}
      sx={
        isSelectedItem
          ? {
              bg: 'information.bg.disabled',
              borderLeft: '3px solid',
              borderLeftColor: 'icon.active',
              cursor: 'default',
            }
          : {
              paddingLeft: 'calc(16px + 3px)',
              cursor: 'pointer',
            }
      }
      onClick={handleOnClick}
      borderBottom="1px solid"
      borderBottomColor="inputAreaBorder.active"
    >
      <Box overflow="hidden">
        <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {item?.normalizedLabel || item?.rowLabel}
        </Text>
        {errorLength > 0 && (
          <Box
            py={1}
            px={2}
            backgroundColor="information.bg.error"
            color="white"
            wordBreak="keep-all"
            borderRadius="full"
            as="span"
            display="inline-block"
            className="ost-error"
          >
            {errorLength}件
          </Box>
        )}
      </Box>
      {isSelectedItem && <ChevronRightIcon />}
    </Flex>
  );
};

export const DataEditorSidenav: FC<Props> = ({ onSelect, selectedItemUid }) => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const datasetItemList = useRecoilValue(
    datasetItemListSelector({ datasetUid: String(dataset_uid) })
  );
  const activeDatasetItemList = datasetItemList.filter((item) => item.isActive);
  const [selectedItemUidState, setSelectedItemUidState] = useState<string>('');

  useEffect(() => {
    if (selectedItemUid) {
      setSelectedItemUidState(selectedItemUid);
    } else {
      if (activeDatasetItemList.length > 0) {
        setSelectedItemUidState(activeDatasetItemList[0].uid);
        onSelect(activeDatasetItemList[0].uid);
      }
    }
  }, [selectedItemUid, activeDatasetItemList[0]]);

  return (
    <Box ml="-40px" borderTop="1px solid" borderTopColor="inputAreaBorder.active">
      {activeDatasetItemList.map((item, index) => (
        <DatasetItem
          key={index}
          itemUid={item.uid}
          datasetUid={String(dataset_uid)}
          datasetItemList={datasetItemList}
          selectedItemUidState={selectedItemUidState}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
};
