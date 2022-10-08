import { Flex, Box, Text } from '@chakra-ui/layout';
import { InfoOutlineIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { datasetItemAtom, datasetItemUidListAtom } from '../../stores/dataset';

type Props = {
  selectedItemUid?: string;
  onSelect: (uid: string) => void;
};

export const DataEditorSidenav: FC<Props> = ({ onSelect, selectedItemUid }) => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const datasetItemUidList = useRecoilValue(
    datasetItemUidListAtom({ datasetUid: String(dataset_uid) })
  );

  const DatasetItem: FC<{ datasetUid: string; itemUid: string }> = ({ datasetUid, itemUid }) => {
    const item = useRecoilValue(datasetItemAtom({ datasetUid, itemUid }));
    const handleOnClick = () => {
      if (!item) return;
      onSelect(item.uid);
    };

    return (
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p={4}
        sx={
          item?.uid === selectedItemUid
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
            {item?.normalizedLabel}
          </Text>
        </Flex>
        {item?.uid === selectedItemUid && <ChevronRightIcon />}
      </Flex>
    );
  };

  return (
    <Box ml="-40px">
      {datasetItemUidList.map((itemUid, index) => (
        <DatasetItem key={index} itemUid={itemUid} datasetUid={String(dataset_uid)} />
      ))}
    </Box>
  );
};
