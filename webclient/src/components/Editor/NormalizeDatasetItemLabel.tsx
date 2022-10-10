import { Box, Flex, Text } from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { datasetItemAtom } from '../../stores/dataset';
import { itemLabelFormatter, itemsListOfPublicFacilities } from 'opendatatool-datamanager';
import { OstSelect } from '../Elements/OstSelect';
import { OstCheckbox } from '../Elements/OstCheckbox';

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

  const isLabelOriginal = false; //TODO: 独自定義かどうかチェックする

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
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={4}
      borderTop="1px solid"
      borderColor="icon.disabled"
    >
      <Box flex="1 1 40%">
        <OstCheckbox
          defaultChecked={item?.isActive}
          onChange={() => {
            handleIsActiveCheck();
          }}
        >
          {item?.rowLabel}
        </OstCheckbox>
      </Box>
      <Flex flex="1 1 60%">
        <Box p={4}>
          <Text
            px={4}
            py={2}
            bg={isLabelOriginal ? 'information.bg.alert' : 'information.bg.disabled'}
            borderRadius="3em"
            whiteSpace="nowrap"
            cursor="default"
          >
            {isLabelOriginal ? '項目名を選択' : '一致しました'}
          </Text>
        </Box>
        <OstSelect
          value={item?.normalizedLabel || ''}
          onChange={(e) => handleSelect(e.target.value)}
          options={selectOptions}
        />
      </Flex>
    </Flex>
  );
};
