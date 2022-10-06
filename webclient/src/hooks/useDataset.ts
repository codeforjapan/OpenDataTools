import { useRecoilCallback } from 'recoil';
import {
  datasetAtom,
  datasetItemListSelector,
  datasetSingleDataListSelector,
} from '../stores/dataset';
import { v4 as uuid } from 'uuid';

export const useImportDataset = () => {
  const importDataset = useRecoilCallback(({ set }) => (datasetName: string) => {
    const uid = uuid();
    set(datasetAtom({ uid }), { uid, datasetName: datasetName });
    return uid;
  });

  const importDatasetItems = useRecoilCallback(
    ({ set }) =>
      (params: { datasetUid: string }, headers: string[]) => {
        const items: Dataset.Item[] = headers.map((header) => {
          const uid = uuid();
          return {
            uid,
            rowLabel: header,
            normalizedLabel: null,
            isActive: false,
            dataType: null,
          };
        });
        set(datasetItemListSelector(params), items);
        return items.map((item) => item);
      }
  );

  const importDatasetSingleDatas = useRecoilCallback(
    ({ set }) =>
      (params: { datasetUid: string; itemUid: string }, datas: (string | number)[]) => {
        const singleDatas: Dataset.SingleData[] = datas.map((data) => {
          const uid = uuid();
          return {
            uid,
            rowValue: data,
            editedValue: null,
            error: [],
          };
        });
        set(datasetSingleDataListSelector(params), singleDatas);
      }
  );

  const executeImport: (params: {
    datasetName: string;
    headers: string[];
    rowDatas: { [header: string]: string }[];
  }) => string = ({ datasetName, headers, rowDatas }) => {
    const datasetUid = importDataset(datasetName);
    const datasetItems = importDatasetItems({ datasetUid }, headers);
    for (const item of datasetItems) {
      if (!item.rowLabel) break;
      const datas: string[] = rowDatas.map((rowData) => rowData[String(item.rowLabel)]);
      importDatasetSingleDatas({ datasetUid, itemUid: item.uid }, datas);
    }
    return datasetUid;
  };

  return executeImport;
};
