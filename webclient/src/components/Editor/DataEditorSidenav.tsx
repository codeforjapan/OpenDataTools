import { Box } from '@chakra-ui/layout';
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
      <Box
        p={2}
        backgroundColor={item?.uid === selectedItemUid ? 'blue' : ''}
        onClick={handleOnClick}
      >
        {item?.normalizedLabel}
      </Box>
    );
  };

  return (
    <>
      {datasetItemUidList.map((itemUid, index) => (
        <DatasetItem key={index} itemUid={itemUid} datasetUid={String(dataset_uid)} />
      ))}
    </>
  );
};
