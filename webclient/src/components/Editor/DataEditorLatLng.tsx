import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, GridItem, layout, Text } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLabel2DataType, useValidator } from '../../hooks/useValidate';
import {
  datasetItemAtom,
  datasetItemListSelector,
  datasetSingleCellAtom,
  datasetSingleCellUidListByItemAtom,
  datasetSingleRowUidListAtom,
  datasetSingleCellListByRowSelector,
} from '../../stores/dataset';
import OstLatLngInput from '../Elements/OstLatLngInput/OstLatLngInput';
import { OstInput } from '../Elements/OstInput';
import { MapEditorModal } from './MapEditorModal';

type Props = {
  selectedItemUid?: string;
};

export const DataEditorLatLng: FC<Props> = ({ selectedItemUid }) => {
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
    datasetSingleRowUidListAtom({
      datasetUid: String(dataset_uid),
    })
  );
  const latLngItems = datasetItemList.filter((item) =>
    ['緯度', '経度'].includes(item.normalizedLabel || '')
  );
  const nameItemId = datasetItemList.find((item) => item.normalizedLabel === '名称')?.uid;
  const latItemId = latLngItems.find((item) => item.normalizedLabel == '緯度')?.uid;
  const lngItemId = latLngItems.find((item) => item.normalizedLabel === '経度')?.uid;

  useEffect(() => {
    if (!datasetItem || !datasetItem.normalizedLabel) return;
    const dataType = label2DataType(datasetItem.normalizedLabel);
    setValidatorDataType(dataType);
    setDatasetItem({ ...datasetItem, dataType });
  }, [datasetItem?.normalizedLabel]);

  const LatLngCellElm: FC<{ singleCellUid: string; rowNum: number; nameSingleCellUid: string }> = ({
    singleCellUid,
    rowNum,
    nameSingleCellUid,
  }) => {
    const validatorFactory = useValidator({ dataType: validatorDataType });
    const [singleRow, setSingleRow] = useRecoilState(
      datasetSingleCellListByRowSelector({
        datasetUid: String(dataset_uid),
        rowUid: String(singleCellUid),
      })
    );
    const [latUid, setLatUid] = useState('');
    const [lngUid, setLngUid] = useState('');
    const [nameUid, setNameUid] = useState('');
    const [open, setOpen] = useState(false);
    const name = useRecoilValue(
      datasetSingleCellAtom({
        datasetUid: String(dataset_uid),
        singleCellUid: nameUid,
      })
    );
    const [latCell, setLatCell] = useRecoilState(
      datasetSingleCellAtom({
        datasetUid: String(dataset_uid),
        singleCellUid: latUid,
      })
    );
    const [lngCell, setLngCell] = useRecoilState(
      datasetSingleCellAtom({
        datasetUid: String(dataset_uid),
        singleCellUid: lngUid,
      })
    );

    const getCellUid = (itemUid: string | undefined): string => {
      if (itemUid === undefined) return '';
      const item = singleRow.find((row) => row.itemUid === itemUid);

      return item ? item.uid : '';
    };

    const validateLatValue = () => {
      if (!latCell) return;
      try {
        const validator = validatorFactory();
        validator(latCell.editedValue);
        setLatCell({
          ...latCell,
          error: [],
        });
      } catch (error: any) {
        if (error.message) {
          setLatCell({
            ...latCell,
            error: [{ message: error.message, status: 'warning' }],
          });
        }
      }
    };

    const validateLngValue = () => {
      if (!lngCell) return;
      try {
        const validator = validatorFactory();
        validator(lngCell.editedValue);
        setLngCell({
          ...lngCell,
          error: [],
        });
      } catch (error: any) {
        if (error.message) {
          setLngCell({
            ...lngCell,
            error: [{ message: error.message, status: 'warning' }],
          });
        }
      }
    };

    useEffect(() => {
      if (!singleRow.length) return;
      // TODO: 二重呼び出しみたいになっているので変えたい
      setLatUid(getCellUid(latItemId));
      setLngUid(getCellUid(lngItemId));
      setNameUid(getCellUid(nameItemId));
    }, [singleRow]);

    useEffect(() => {
      validateLatValue();
      validateLngValue();
    }, [latCell?.editedValue, lngCell?.editedValue]);

    const handleChangeLatData = (v: string) => {
      if (!latCell) return;
      setLatCell({ ...latCell, editedValue: v });
    };

    const handleChangeLngData = (v: string) => {
      if (!lngCell) return;
      setLngCell({ ...lngCell, editedValue: v });
    };

    const nameSingleCell = useRecoilValue(
      datasetSingleCellAtom({
        datasetUid: String(dataset_uid),
        singleCellUid: nameSingleCellUid,
      })
    );

    // NOTE: 緯度経度のデータがない場合のチェック。ない場合は東京駅の緯度経度をかえしている。
    const targetLngLat = useMemo((): { lng: number; lat: number } => {
      if (latCell?.editedValue === undefined || lngCell?.editedValue === undefined) {
        return { lng: 139.767125, lat: 35.681236 };
      } else {
        return { lng: Number(lngCell.editedValue), lat: Number(latCell.editedValue) };
      }
    }, [latCell?.editedValue, lngCell?.editedValue]);

    return (
      <Grid gridTemplateColumns="1fr 50px 1fr" alignItems="end" mb={6}>
        <GridItem>
          <Text>
            {rowNum}行目: {nameSingleCell?.editedValue || ''}
          </Text>
          <OstInput
            value={latCell?.rowValue || ''}
            readOnly
            bg="information.bg.disabled"
            color="body.text"
          />
          <Box pt="3">
            <OstInput
              value={lngCell?.rowValue || ''}
              readOnly
              bg="information.bg.disabled"
              color="body.text"
            />
          </Box>
        </GridItem>
        <GridItem>
          <ChevronRightIcon w={10} h={10} />
          <Box pt="3">
            <ChevronRightIcon w={10} h={10} />
          </Box>
        </GridItem>
        <GridItem justifyContent="end">
          <Flex flexDirection="column" alignItems="end">
            {latCell && latCell.error.length > 0 ? (
              latCell.error.map((err, index) => (
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
            <OstLatLngInput
              value={latCell?.editedValue || ''}
              onChange={(e) => e.preventDefault()}
              onClick={() => setOpen(true)}
            />
            <Box pt="3" width={'100%'}>
              <OstLatLngInput
                value={lngCell?.editedValue || ''}
                onChange={(e) => e.preventDefault()}
                onClick={() => setOpen(true)}
              />
            </Box>
          </Flex>
        </GridItem>
        <MapEditorModal
          isOpen={open}
          name={String(name?.editedValue)}
          onClose={() => setOpen(false)}
          initialLngLat={targetLngLat}
          onComplete={(latLng) => {
            handleChangeLatData(String(latLng.lat));
            handleChangeLngData(String(latLng.lng));
            setOpen(false);
          }}
        />
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
          <LatLngCellElm
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
