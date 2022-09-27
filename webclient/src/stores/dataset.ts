import { atom, atomFamily } from 'recoil';
import { AtomKeys } from './recoil_keys';

export const datasetAtom = atomFamily<Dataset.Dataset, { uid: string }>({
  key: AtomKeys.dataset,
  default: { uid: null, datasetName: null },
});

export const datasetUidListAtom = atom<string[]>({
  key: AtomKeys.datasetUidList,
  default: [],
});

export const datasetItemAtom = atomFamily<Dataset.Item, { datasetUid: string; itemUid: string }>({
  key: AtomKeys.datasetItem,
  default: { uid: null, rowLabel: null, normalizedLabel: null, isActive: true },
});

export const datasetItemUidList = atomFamily<string[], { datasetUid: string }>({
  key: AtomKeys.datasetItemUidList,
  default: [],
});

export const datasetSingleDataAtom = atomFamily<
  Dataset.SingleData,
  { datasetUid: string; itemUid: string; uid: string }
>({
  key: AtomKeys.datasetSingleData,
  default: { uid: null, rowValue: null, editedValue: null, error: [] },
});

export const datasetSingleDataUidListAtom = atomFamily<
  string[],
  { datasetUid: string; itemUid: string }
>({
  key: AtomKeys.datasetSingleDataUidList,
  default: [],
});
