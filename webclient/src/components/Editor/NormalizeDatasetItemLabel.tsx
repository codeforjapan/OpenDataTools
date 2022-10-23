import { Box, Flex, Text } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { FC, useEffect, useMemo, useState } from 'react';
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
  const [isLabelOriginal, setIsLabelOriginal] = useState<boolean>(false);
  const [isLabelRecommend, setIsLabelRecommend] = useState<boolean>(false);

  useEffect(() => {
    if (!item?.rowLabel) return;
    const { recommend, success, collectedLabel } = itemLabelFormatter.format(item.rowLabel);
    if (recommend && success) {
      setItem({ ...item, normalizedLabel: collectedLabel });
      setIsLabelRecommend(true);
      setIsLabelOriginal(true);
    } else if (success) {
      setItem({ ...item, normalizedLabel: item.rowLabel, isActive: true });
    } else {
      setIsLabelOriginal(true);
    }
  }, [item?.rowLabel]);

  const handleIsActiveCheck = (c: boolean) => {
    if (!item) return;
    setItem({ ...item, isActive: c });
    return;
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
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={4}
      borderTop="1px solid"
      borderColor="icon.disabled"
    >
      <Box flex="1 1 30%">
        <OstCheckbox
          isChecked={item?.isActive}
          onChange={(e) => {
            handleIsActiveCheck(e.target.checked);
          }}
        >
          {item?.rowLabel}
        </OstCheckbox>
      </Box>
      <Flex flex="1 1 70%">
        <Flex p={4} flex="0 0 21em" justifyContent="flex-end">
          {isLabelOriginal && (
            <Flex
              alignItems="center"
              px={4}
              py={1}
              border="3px solid"
              borderColor="information.bg.error"
              borderRadius="3em"
              cursor="default"
            >
              <InfoOutlineIcon color="information.bg.error" mr={2} />
              <Text color="information.bg.error" whiteSpace="nowrap">
                独自項目です
              </Text>
            </Flex>
          )}
          <Text
            ml={2}
            px={4}
            py={2}
            color={isLabelRecommend && isLabelOriginal ? 'white' : 'inherit'}
            bg={
              isLabelRecommend
                ? 'icon.active'
                : isLabelOriginal
                ? 'information.bg.alert'
                : 'information.bg.disabled'
            }
            borderRadius="3em"
            whiteSpace="nowrap"
            cursor="default"
          >
            {isLabelRecommend ? '差し替え済み' : isLabelOriginal ? '項目名を選択' : '一致しました'}
          </Text>
        </Flex>
        <OstSelect
          value={item?.normalizedLabel || ''}
          onChange={(e) => handleSelect(e.target.value)}
          options={selectOptions}
        />
      </Flex>
    </Flex>
  );
};
