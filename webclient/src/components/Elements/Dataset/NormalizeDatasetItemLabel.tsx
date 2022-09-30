import { Checkbox, Grid, GridItem, Select } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { datasetItemAtom } from '../../../stores/dataset';
import { itemLabelFormatter, itemsListOfPublicFacitities } from 'opendatatool-datamanager';

type Params = {
  datasetUid: string;
  itemUid: string;
};

const NormalizeDatasetItemLabel: FC<Params> = ({ datasetUid, itemUid }) => {
  const [item, setItem] = useRecoilState(datasetItemAtom({ datasetUid, itemUid }));

  useEffect(() => {
    if (!item?.rowLabel) return;
    const { recommend, success, collectedLabel } = itemLabelFormatter.format(item.rowLabel);
    if (recommend && success) {
      setItem({ ...item, normalizedLabel: collectedLabel });
    } else if (success) {
      setItem({ ...item, normalizedLabel: item.rowLabel });
    }
  }, [item?.rowLabel]);

  const handleIsActiveCheck = () => {
    // 該当項目を使うかどうかの選択処理
    return;
  };

  const handleOriginalCheck = () => {
    // 独自定義かどうかの選択処理
    // 独自定義の場合はrowLabelをそのままnormalizedLabelにいれる
  };

  const handleSelect = (v: string) => {
    if (!item) return;
    setItem({ ...item, normalizedLabel: v });
    return;
  };

  return (
    <Grid gridTemplateColumns="70px 120px 1fr 1fr" mb={2}>
      <GridItem>
        <Checkbox
          defaultChecked={item?.isActive}
          onChange={() => {
            handleIsActiveCheck();
          }}
        />
      </GridItem>
      <GridItem>
        <Checkbox
          onChange={() => {
            handleOriginalCheck();
          }}
        />
      </GridItem>
      <GridItem>{item?.rowLabel}</GridItem>
      <GridItem>
        <Select value={item?.normalizedLabel || ''} onChange={(e) => handleSelect(e.target.value)}>
          <option value="">選択してください</option>
          {itemsListOfPublicFacitities
            .map((item) => item.label)
            .map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </Select>
      </GridItem>
    </Grid>
  );
};

export default NormalizeDatasetItemLabel;
