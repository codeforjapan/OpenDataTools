import { Checkbox, Grid, GridItem } from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { datasetItemAtom } from '../../stores/dataset';
import { itemLabelFormatter, itemsListOfPublicFacilities } from 'opendatatool-datamanager';
import { OstSelect } from '../Elements/OstSelect';

type Params = {
  datasetUid: string;
  itemUid: string;
};

export const NormalizeDatasetItemLabel: FC<Params> = ({ datasetUid, itemUid }) => {
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

  const selectOptions = useMemo(() => {
    const optionsList = itemsListOfPublicFacilities.map((item) => {
      return { value: item.label, label: item.label };
    });
    optionsList.unshift({ value: '', label: '選択してください' });
    return optionsList;
  }, []);

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
        <OstSelect
          value={item?.normalizedLabel || ''}
          onChange={(e) => handleSelect(e.target.value)}
          options={selectOptions}
        />
      </GridItem>
    </Grid>
  );
};
