import { atom, atomFamily, selector, selectorFamily, DefaultValue } from 'recoil';
import { db } from './db';
import { AtomKeys, SelectorKeys } from './recoil_keys';

// データセットの単体
export const datasetAtom = atomFamily<Dataset.Dataset | null, { uid: string }>({
  key: AtomKeys.dataset,
  default: null,
  effects: [
    ({ setSelf, onSet, node }) => {
      db.datasets.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.dataset);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.datasets.delete(String(node.key));
        } else {
          if (newVal) {
            db.datasets.put({ nodeKey: String(node.key), dataset: newVal });
          }
        }
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
      db.datasetUids.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.uids);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.datasetUids.delete(String(node.key));
        } else {
          if (newVal.length > 0) {
            db.datasetUids.put({ nodeKey: String(node.key), uids: newVal });
          }
        }
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
  effects: [
    ({ setSelf, onSet, node }) => {
      db.items.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.item);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.items.delete(String(node.key));
        } else {
          if (newVal) {
            db.items.put({ nodeKey: String(node.key), item: newVal });
          }
        }
      });
    },
  ],
});

// データ項目のuidリスト
export const datasetItemUidListAtom = atomFamily<string[], { datasetUid: string }>({
  key: AtomKeys.datasetItemUidList,
  default: [],
  effects: [
    ({ setSelf, onSet, node }) => {
      db.datasetItemUids.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.uids);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.datasetItemUids.delete(String(node.key));
        } else {
          if (newVal.length > 0) {
            db.datasetItemUids.put({ nodeKey: String(node.key), uids: newVal });
          }
        }
      });
    },
  ],
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
  effects: [
    ({ setSelf, onSet, node }) => {
      db.rows.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.singleRow);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.rows.delete(String(node.key));
        } else {
          if (newVal) {
            db.rows.put({ nodeKey: String(node.key), singleRow: newVal });
          }
        }
      });
    },
  ],
});

// 行単位データのuidリスト
export const datasetSingleRowUidListAtom = atomFamily<string[], { datasetUid: string }>({
  key: AtomKeys.datasetSingleRowUidList,
  default: [],
  effects: [
    ({ setSelf, onSet, node }) => {
      db.datasetSingleRowUids.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.uids);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.datasetSingleRowUids.delete(String(node.key));
        } else {
          if (newVal.length > 0) {
            db.datasetSingleRowUids.put({ nodeKey: String(node.key), uids: newVal });
          }
        }
      });
    },
  ],
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
  effects: [
    ({ setSelf, onSet, node }) => {
      db.cells.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.singleCell);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.cells.delete(String(node.key));
        } else {
          if (newVal) {
            db.cells.put({ nodeKey: String(node.key), singleCell: newVal });
          }
        }
      });
    },
  ],
});

// itemでまとめたセル単位データのuidリスト
export const datasetSingleCellUidListByItemAtom = atomFamily<
  string[],
  { datasetUid: string; itemUid: string }
>({
  key: AtomKeys.datasetSingleCellUidListByItem,
  default: [],
  effects: [
    ({ setSelf, onSet, node }) => {
      db.datasetSingleCellUidsByItems.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.uids);
        }
      });

      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.datasetSingleCellUidsByItems.delete(String(node.key));
        } else {
          if (newVal.length > 0) {
            db.datasetSingleCellUidsByItems.put({ nodeKey: String(node.key), uids: newVal });
          }
        }
      });
    },
  ],
});

// rowでまとめたセル単位データのuidリスト
export const datasetSingleCellUidListByRowAtom = atomFamily<
  string[],
  { datasetUid: string; rowUid: string }
>({
  key: AtomKeys.datasetSingleCellUidListByRow,
  default: [],
  effects: [
    ({ setSelf, onSet, node }) => {
      db.datasetSingleCellUidListByRows.get(String(node.key)).then((v) => {
        if (v) {
          setSelf(v.uids);
        }
      });
      onSet((newVal, _, isReset) => {
        if (newVal instanceof DefaultValue || isReset) {
          db.datasetSingleCellUidListByRows.delete(String(node.key));
        } else {
          if (newVal.length > 0) {
            db.datasetSingleCellUidListByRows.put({ nodeKey: String(node.key), uids: newVal });
          }
        }
      });
    },
  ],
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
