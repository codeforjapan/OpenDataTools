import { ChevronRightIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Grid, GridItem, Text } from '@chakra-ui/layout';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLabel2DataType, useValidator } from '../../hooks/useValidate';
import {
  datasetItemAtom,
  datasetSingleDataAtom,
  datasetSingleDataUidListAtom,
} from '../../stores/dataset';

type Props = {
  selectedItemUid?: string;
};

export const DataEditorMain: FC<Props> = ({ selectedItemUid }) => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [validatorDataType, setValidatorDataType] = useState<Dataset.DataType>(null);
  const label2DataType = useLabel2DataType();

  const [datasetItem, setDatasetItem] = useRecoilState(
    datasetItemAtom({ datasetUid: String(dataset_uid), itemUid: String(selectedItemUid) })
  );
  const singleDataUidList = useRecoilValue(
    datasetSingleDataUidListAtom({
      datasetUid: String(dataset_uid),
      itemUid: String(selectedItemUid),
    })
  );

  useEffect(() => {
    if (!datasetItem || !datasetItem.normalizedLabel) return;
    const dataType = label2DataType(datasetItem.normalizedLabel);
    setValidatorDataType(dataType);
    setDatasetItem({ ...datasetItem, dataType });
  }, [datasetItem?.normalizedLabel]);

  const SingleDataElm: FC<{ singleDataUid: string }> = ({ singleDataUid }) => {
    const validatorFactory = useValidator({ dataType: validatorDataType });
    const [singleData, setSingleData] = useRecoilState(
      datasetSingleDataAtom({
        datasetUid: String(dataset_uid),
        itemUid: String(selectedItemUid),
        singleDataUid,
      })
    );

    useEffect(() => {
      if (!singleData) return;
      try {
        const validator = validatorFactory();
        validator(singleData.editedValue);
        setSingleData({
          ...singleData,
          error: [],
        });
      } catch (error: any) {
        if (error.message) {
          setSingleData({
            ...singleData,
            error: [{ message: error.message, status: 'warning' }],
          });
        }
      }
    }, [singleData?.editedValue]);

    const handleChangeData = (v: string) => {
      if (!singleData) return;
      setSingleData({ ...singleData, editedValue: v });
    };

    return (
      <>
        <Grid gridTemplateColumns="1fr 1fr">
          <GridItem>名称がここにくる</GridItem>
          <GridItem>{singleData?.error.map((err) => err.message)}</GridItem>
        </Grid>
        <Grid gridTemplateColumns="1fr 50px 1fr" mb={5}>
          <GridItem>
            <Input type="text" value={singleData?.rowValue || ''} disabled />
          </GridItem>
          <GridItem>
            <ChevronRightIcon w={10} h={10} />
          </GridItem>
          <GridItem>
            <Input
              value={singleData?.editedValue || ''}
              type="text"
              onChange={(e) => handleChangeData(e.target.value)}
            />
          </GridItem>
        </Grid>
      </>
    );
  };

  return (
    <Box>
      {singleDataUidList.map((uid, index) => (
        <SingleDataElm key={index} singleDataUid={uid} />
      ))}
    </Box>
  );
};
