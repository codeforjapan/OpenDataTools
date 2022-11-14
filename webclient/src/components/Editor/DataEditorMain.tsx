import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLabel2DataType, useValidator } from '../../hooks/useValidate';
import {
  datasetItemAtom,
  datasetItemListSelector,
  datasetSingleCellAtom,
  datasetSingleCellUidListByItemAtom,
} from '../../stores/dataset';
import { OstInput } from '../Elements/OstInput';

type Props = {
  selectedItemUid?: string;
};

export const DataEditorMain: FC<Props> = ({ selectedItemUid }) => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();
  const [validatorDataType, setValidatorDataType] = useState<Dataset.DataType>(null);
  const label2DataType = useLabel2DataType();

  // セルに対応する名称も表示するため、「名称」項目を取得
  const datasetItemList = useRecoilValue(
    datasetItemListSelector({ datasetUid: String(dataset_uid) })
  );
  // TODO: 名称項目が存在しない場合のエラーハンドリング
  const nameDatasetItem: Dataset.Item | null = datasetItemList.filter(
    (item) => item.normalizedLabel == '名称'
  )[0];
  const nameSingleCellUidListByItem = useRecoilValue(
    datasetSingleCellUidListByItemAtom({
      datasetUid: String(dataset_uid),
      itemUid: String(nameDatasetItem?.uid),
    })
  );

  // 選択した項目を取得
  const [datasetItem, setDatasetItem] = useRecoilState(
    datasetItemAtom({ datasetUid: String(dataset_uid), itemUid: String(selectedItemUid) })
  );
  const SingleCellUidListByItem = useRecoilValue(
    datasetSingleCellUidListByItemAtom({
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

  const SingleCellElm: FC<{ singleCellUid: string; rowNum: number; nameSingleCellUid: string }> = ({
    singleCellUid,
    rowNum,
    nameSingleCellUid,
  }) => {
    const validatorFactory = useValidator({ dataType: validatorDataType });
    const [SingleCell, setSingleCell] = useRecoilState(
      datasetSingleCellAtom({
        datasetUid: String(dataset_uid),
        singleCellUid,
      })
    );

    useEffect(() => {
      if (!SingleCell) return;
      try {
        const validator = validatorFactory();
        validator(SingleCell.editedValue);
        setSingleCell({
          ...SingleCell,
          error: [],
        });
      } catch (error: any) {
        if (error.message) {
          setSingleCell({
            ...SingleCell,
            error: [{ message: error.message, status: 'warning' }],
          });
        }
      }
    }, [SingleCell?.editedValue]);

    const handleChangeData = (v: string) => {
      if (!SingleCell) return;
      setSingleCell({ ...SingleCell, editedValue: v });
    };

    const nameSingleCell = useRecoilValue(
      datasetSingleCellAtom({
        datasetUid: String(dataset_uid),
        singleCellUid: nameSingleCellUid,
      })
    );

    return (
      <Grid gridTemplateColumns="1fr 50px 1fr" alignItems="end" mb={6}>
        <GridItem>
          <Text>
            {rowNum}行目: {nameSingleCell?.editedValue || ''}
          </Text>
          <OstInput
            value={SingleCell?.rowValue || ''}
            readOnly
            bg="information.bg.disabled"
            color="body.text"
          />
        </GridItem>
        <GridItem>
          <ChevronRightIcon w={10} h={10} />
        </GridItem>
        <GridItem justifyContent="end">
          <Flex flexDirection="column" alignItems="end">
            {SingleCell && SingleCell.error.length > 0 ? (
              SingleCell.error.map((err, index) => (
                <Text
                  key={`error-${index}`}
                  display="inline-block"
                  bg="information.bg.alert"
                  borderRadius={8}
                  px={4}
                  py={2}
                  mb={1}
                  className="ost-error"
                >
                  {err.message}
                </Text>
              ))
            ) : (
              <Text
                display="inline-block"
                bg="information.bg.disabled"
                borderRadius={8}
                px={4}
                py={2}
                mb={1}
              >
                完了
              </Text>
            )}
            <OstInput
              value={SingleCell?.editedValue || ''}
              onChange={(e) => handleChangeData(e.target.value)}
            />
          </Flex>
        </GridItem>
      </Grid>
    );
  };

  return (
    <>
      {SingleCellUidListByItem.map((uid, index) => {
        const nameSingleCellUid = nameSingleCellUidListByItem[index];
        // HACK: 行番号 = index(0始まり) + 1(1始まりに変換) + 1(1行目はヘッダーのため)
        const rowNum = index + 2;
        return (
          <SingleCellElm
            key={index}
            rowNum={rowNum}
            singleCellUid={uid}
            nameSingleCellUid={nameSingleCellUid}
          />
        );
      })}
    </>
  );
};
