import { atom, atomFamily, selector, selectorFamily, DefaultValue } from 'recoil';
import { AtomKeys, SelectorKeys } from './recoil_keys';

// データセットの単体
export const datasetAtom = atomFamily<Dataset.Dataset | null, { uid: string }>({
  key: AtomKeys.dataset,
  default: null,
});

// データセットのuidリスト
export const datasetUidListAtom = atom<string[]>({
  key: AtomKeys.datasetUidList,
  default: [],
});

// データセットのリスト
export const datasetListSelector = selector({
  key: SelectorKeys.datasetList,
  get: ({ get }) => {
    const uidList = get(datasetUidListAtom);
    const datasets = uidList.map((uid) => {
      const dataset = get(datasetAtom({ uid }));
      return dataset;
    });
    return datasets;
  },
});

// データ項目の単体
export const datasetItemAtom = atomFamily<
  Dataset.Item | null,
  { datasetUid: string; itemUid: string }
>({
  key: AtomKeys.datasetItem,
  default: null,
});

// データ項目のuidリスト
export const datasetItemUidListAtom = atomFamily<string[], { datasetUid: string }>({
  key: AtomKeys.datasetItemUidList,
  default: [],
});

// データ項目のリスト
export const datasetItemListSelector = selectorFamily<Dataset.Item[], { datasetUid: string }>({
  key: SelectorKeys.datasetItemList,
  get:
    ({ datasetUid }) =>
    ({ get }) => {
      const uidList = get(datasetItemUidListAtom({ datasetUid }));
      const datasetItems: Dataset.Item[] = [];
      for (const itemUid of uidList) {
        const datasetItem = get(datasetItemAtom({ datasetUid, itemUid }));
        if (datasetItem) {
          datasetItems.push(datasetItem);
        }
      }
      return datasetItems;
    },
  set:
    ({ datasetUid }) =>
    ({ set }, items) => {
      if (items instanceof DefaultValue) return;
      const uidList = [];
      for (const item of items) {
        uidList.push(item.uid);
        set(datasetItemAtom({ datasetUid, itemUid: item.uid }), item);
      }
      set(datasetItemUidListAtom({ datasetUid }), uidList);
    },
});

// セル単位データの単体
export const datasetSingleDataAtom = atomFamily<
  Dataset.SingleData | null,
  { datasetUid: string; itemUid: string; singleDataUid: string }
>({
  key: AtomKeys.datasetSingleData,
  default: null,
});

// セル単位データのuidリスト
export const datasetSingleDataUidListAtom = atomFamily<
  string[],
  { datasetUid: string; itemUid: string }
>({
  key: AtomKeys.datasetSingleDataUidList,
  default: [],
});

// セル単位データのリスト
export const datasetSingleDataListSelector = selectorFamily<
  Dataset.SingleData[],
  { datasetUid: string; itemUid: string }
>({
  key: SelectorKeys.datasetItemList,
  get:
    ({ datasetUid, itemUid }) =>
    ({ get }) => {
      const uidList = get(datasetSingleDataUidListAtom({ datasetUid, itemUid }));
      const datasetSingleDatas = [];
      for (const singleDataUid of uidList) {
        const singleData = get(datasetSingleDataAtom({ datasetUid, itemUid, singleDataUid }));
        if (singleData) {
          datasetSingleDatas.push(singleData);
        }
      }
      return datasetSingleDatas;
    },
  set:
    ({ datasetUid, itemUid }) =>
    ({ set }, singleDatas) => {
      if (singleDatas instanceof DefaultValue) return;
      const uidList = [];
      for (const singleData of singleDatas) {
        uidList.push(singleData.uid);
        set(
          datasetSingleDataAtom({ datasetUid, itemUid, singleDataUid: singleData.uid }),
          singleData
        );
      }
      set(datasetSingleDataUidListAtom({ datasetUid, itemUid }), uidList);
    },
});
