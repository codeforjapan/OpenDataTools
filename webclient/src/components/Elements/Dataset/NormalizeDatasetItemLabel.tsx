import { Grid, GridItem } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { datasetItemAtom } from '../../../stores/dataset';
import { itemLabelFormatter, itemsListOfPublicFacilities } from 'opendatatool-datamanager';
import { OstCheckbox } from '../OstCheckbox';
import { OstSelect } from '../OstSelect';

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

  const options = itemsListOfPublicFacilities.map((item) => {
    return { label: item.label, value: item.label };
  });

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
        <OstCheckbox
          defaultChecked={item?.isActive}
          onChange={() => {
            handleIsActiveCheck();
          }}
        />
      </GridItem>
      <GridItem>
        <OstCheckbox
          onChange={() => {
            handleOriginalCheck();
          }}
        />
      </GridItem>
      <GridItem>{item?.rowLabel}</GridItem>
      <GridItem>
        <OstSelect
          options={[{ label: '選択してください', value: '' }, ...options]}
          value={item?.normalizedLabel || ''}
          changeValue={(e) => handleSelect(e.target.value)}
        />
      </GridItem>
    </Grid>
  );
};

export default NormalizeDatasetItemLabel;
