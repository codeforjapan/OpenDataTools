import { Flex, Box, Text } from '@chakra-ui/react';
import { InfoOutlineIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { datasetItemAtom, datasetItemListSelector } from '../../stores/dataset';

type Props = {
  selectedItemUid?: string;
  onSelect: (uid: string) => void;
};

export const DataEditorSidenav: FC<Props> = ({ onSelect, selectedItemUid }) => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const datasetItemList = useRecoilValue(
    datasetItemListSelector({ datasetUid: String(dataset_uid) })
  );
  const activeDatasetItemList = datasetItemList.filter((item) => item.isActive);
  const LatLngUids = datasetItemList.filter((item) => ["緯度", "経度"].includes(item.normalizedLabel || "")).map((item) => item.uid);
  const [selectedItemUidState, setSelectedItemUidState] = useState<string>('');

  useEffect(() => {
    if (selectedItemUid) {
      setSelectedItemUidState(selectedItemUid);
    } else {
      setSelectedItemUidState(activeDatasetItemList[0].uid);
      onSelect(activeDatasetItemList[0].uid);
    }
  }, [selectedItemUid]);

  const DatasetItem: FC<{ datasetUid: string; itemUid: string }> = ({ datasetUid, itemUid }) => {
    const item = useRecoilValue(datasetItemAtom({ datasetUid, itemUid }));
    const handleOnClick = () => {
      if (!item) return;
      onSelect(item.uid);
    };

    const isSelectedItem = useMemo(() => {
      // note: 緯度と経度の時だけ両方選択された状態にする
      if(LatLngUids.includes(selectedItemUidState) && LatLngUids.includes(item?.uid || "")) return true
      return item?.uid === selectedItemUidState
    },[LatLngUids, selectedItemUidState])

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
                borderColor: 'icon.active',
                cursor: 'default',
              }
            : {
                paddingLeft: 'calc(16px + 3px)',
                cursor: 'pointer',
              }
        }
        onClick={handleOnClick}
      >
        <Flex alignItems="center" overflow="hidden">
          <InfoOutlineIcon color="icon.active" />
          <Text px={2} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {item?.normalizedLabel || item?.rowLabel}
          </Text>
        </Flex>
        {isSelectedItem && <ChevronRightIcon />}
      </Flex>
    );
  };

  return (
    <Box ml="-40px">
      {activeDatasetItemList.map((item, index) => (
        <DatasetItem key={index} itemUid={item.uid} datasetUid={String(dataset_uid)} />
      ))}
    </Box>
  );
};
