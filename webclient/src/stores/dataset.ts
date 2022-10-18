import { atom, atomFamily, selector, selectorFamily, DefaultValue, AtomEffect } from 'recoil';
import { AtomKeys, SelectorKeys } from './recoil_keys';

// データセットの単体
export const datasetAtom = atomFamily<Dataset.Dataset | null, { uid: string }>({
  key: AtomKeys.dataset,
  default: null,
  effects: [
    ({ setSelf, onSet, storeID, node }) => {
      const savedValue = localStorage.getItem(node.key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newVal, _, isReset) => {
        isReset
          ? localStorage.removeItem(node.key)
          : localStorage.setItem(node.key, JSON.stringify(newVal));
      });
    },
  ],
});

// データセットのuidリスト
export const datasetUidListAtom = atom<string[]>({
  key: AtomKeys.datasetUidList,
  default: [],
  effects: [
    ({ setSelf, onSet, node }) => {
      const savedValue = localStorage.getItem(node.key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newVal, _, isReset) => {
        isReset
          ? localStorage.removeItem(node.key)
          : localStorage.setItem(node.key, JSON.stringify(newVal));
      });
    },
  ],
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

// 行単位データの単体
export const datasetSingleRowAtom = atomFamily<
  Dataset.SingleRow | null,
  { datasetUid: string; singleRowUid: string }
>({
  key: AtomKeys.datasetSingleRow,
  default: null,
});

// 行単位データのuidリスト
export const datasetSingleRowUidListAtom = atomFamily<string[], { datasetUid: string }>({
  key: AtomKeys.datasetSingleRowUidList,
  default: [],
});

// 行単位データのリスト
export const datasetSingleRowListSelector = selectorFamily<
  Dataset.SingleRow[],
  { datasetUid: string }
>({
  key: SelectorKeys.datasetSingleRowList,
  get:
    ({ datasetUid }) =>
    ({ get }) => {
      const uidList = get(datasetSingleRowUidListAtom({ datasetUid }));
      const datasetSingleRows = [];
      for (const singleRowUid of uidList) {
        const singleRow = get(datasetSingleRowAtom({ datasetUid, singleRowUid }));
        if (singleRow) {
          datasetSingleRows.push(singleRow);
        }
      }
      return datasetSingleRows;
    },
  set:
    ({ datasetUid }) =>
    ({ set }, singleRows) => {
      if (singleRows instanceof DefaultValue) return;
      const uidList = [];
      for (const singleRow of singleRows) {
        uidList.push(singleRow.uid);
        set(datasetSingleRowAtom({ datasetUid, singleRowUid: singleRow.uid }), singleRow);
      }
      set(datasetSingleRowUidListAtom({ datasetUid }), uidList);
    },
});

// セル単位データの単体
export const datasetSingleCellAtom = atomFamily<
  Dataset.SingleCell | null,
  { datasetUid: string; singleCellUid: string }
>({
  key: AtomKeys.datasetSingleCell,
  default: null,
});

// itemでまとめたセル単位データのuidリスト
export const datasetSingleCellUidListByItemAtom = atomFamily<
  string[],
  { datasetUid: string; itemUid: string }
>({
  key: AtomKeys.datasetSingleCellUidListByItem,
  default: [],
});

// rowでまとめたセル単位データのuidリスト
export const datasetSingleCellUidListByRowAtom = atomFamily<
  string[],
  { datasetUid: string; rowUid: string }
>({
  key: AtomKeys.datasetSingleCellUidListByRow,
  default: [],
});

// itemでまとめたセル単位データのリスト
export const datasetSingleCellListByItemSelector = selectorFamily<
  Dataset.SingleCell[],
  { datasetUid: string; itemUid: string }
>({
  key: SelectorKeys.datasetSingleCellListByItem,
  get:
    ({ datasetUid, itemUid }) =>
    ({ get }) => {
      const uidList = get(datasetSingleCellUidListByItemAtom({ datasetUid, itemUid }));
      const datasetSingleCells = [];
      for (const singleCellUid of uidList) {
        const singleCell = get(datasetSingleCellAtom({ datasetUid, singleCellUid }));
        if (singleCell) {
          datasetSingleCells.push(singleCell);
        }
      }
      return datasetSingleCells;
    },
  set:
    ({ datasetUid, itemUid }) =>
    ({ set }, singleCells) => {
      if (singleCells instanceof DefaultValue) return;
      const uidList = singleCells.map((cell) => cell.uid);
      set(datasetSingleCellUidListByItemAtom({ datasetUid, itemUid }), uidList);
    },
});

// rowでまとめたセル単位データのリスト
export const datasetSingleCellListByRowSelector = selectorFamily<
  Dataset.SingleCell[],
  { datasetUid: string; rowUid: string }
>({
  key: SelectorKeys.datasetSingleCellListByRow,
  get:
    ({ datasetUid, rowUid }) =>
    ({ get }) => {
      const uidList = get(datasetSingleCellUidListByRowAtom({ datasetUid, rowUid }));
      const datasetSingleCells = [];
      for (const singleCellUid of uidList) {
        const SingleCell = get(datasetSingleCellAtom({ datasetUid, singleCellUid }));
        if (SingleCell) {
          datasetSingleCells.push(SingleCell);
        }
      }
      return datasetSingleCells;
    },
  set:
    ({ datasetUid, rowUid }) =>
    ({ set }, singleCells) => {
      if (singleCells instanceof DefaultValue) return;
      const uidList = singleCells.map((cell) => cell.uid);
      set(datasetSingleCellUidListByRowAtom({ datasetUid, rowUid }), uidList);
    },
});
