import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  datasetAtom,
  datasetItemListSelector,
  datasetSingleCellAtom,
  datasetSingleCellListByItemSelector,
  datasetSingleCellListByRowSelector,
  datasetSingleRowListSelector,
} from '../stores/dataset';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { schemeValidator } from 'opendatatool-datamanager';

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
        return items;
      }
  );

  const importDatasetRows = useRecoilCallback(
    ({ set }) =>
      (params: { datasetUid: string }, rowNumber: number) => {
        const rows: Dataset.SingleRow[] = new Array(rowNumber).fill('').map((_, index) => {
          const uid = uuid();
          return {
            uid: uid,
            index: index,
          };
        });
        set(datasetSingleRowListSelector(params), rows);
        return rows;
      }
  );

  const importDatasetSingleCell = useRecoilCallback(
    ({ set }) =>
      (
        params: { datasetUid: string },
        itemUid: string,
        singleRowUid: string,
        rowValue: string | number
      ) => {
        const uid = uuid();
        const singleCell: Dataset.SingleCell = {
          uid,
          itemUid,
          singleRowUid,
          rowValue,
          editedValue: rowValue,
          error: [],
        };
        set(datasetSingleCellAtom({ ...params, singleCellUid: uid }), singleCell);
        return singleCell;
      }
  );

  const importDatasetSingleCellsOfItem = useRecoilCallback(
    ({ set }) =>
      (params: { datasetUid: string; itemUid: string }, singleCells: Dataset.SingleCell[]) => {
        set(datasetSingleCellListByItemSelector(params), singleCells);
      }
  );

  const importDatasetSingleCellsOfRow = useRecoilCallback(
    ({ set }) =>
      (params: { datasetUid: string; rowUid: string }, singleCells: Dataset.SingleCell[]) => {
        set(datasetSingleCellListByRowSelector(params), singleCells);
      }
  );

  const executeImport: (params: {
    datasetName: string;
    headers: string[];
    rowDatas: { [header: string]: string }[];
  }) => string = ({ datasetName, headers, rowDatas }) => {
    const datasetUid = importDataset(datasetName);
    const datasetItems = importDatasetItems({ datasetUid }, headers);
    const datasetRows = importDatasetRows({ datasetUid }, rowDatas.length);

    const itemCells: { [key: string]: Dataset.SingleCell[] } = datasetItems.reduce(
      (current, item) => ({
        ...current,
        [item.uid]: [],
      }),
      {}
    );
    const rowCells: { [key: string]: Dataset.SingleCell[] } = datasetRows.reduce(
      (current, row) => ({
        ...current,
        [row.uid]: [],
      }),
      {}
    );

    for (const row of datasetRows) {
      for (const item of datasetItems) {
        if (!item.rowLabel) break;
        const data: string = rowDatas[row.index][item.rowLabel];
        const singleCell = importDatasetSingleCell({ datasetUid }, item.uid, row.uid, data);
        itemCells[item.uid].push(singleCell);
        rowCells[row.uid].push(singleCell);
      }
    }

    for (const itemUid of Object.keys(itemCells)) {
      importDatasetSingleCellsOfItem({ datasetUid, itemUid }, itemCells[itemUid]);
    }
    for (const rowUid of Object.keys(rowCells)) {
      importDatasetSingleCellsOfRow({ datasetUid, rowUid }, rowCells[rowUid]);
    }

    return datasetUid;
  };

  return executeImport;
};

export const useGetDataset = (params: { datasetUid: string }) => {
  const [dataset, setDataset] = useState<{ [key: string]: number | string }[]>([]);
  const items = useRecoilValue(datasetItemListSelector(params));
  const rows = useRecoilValue(datasetSingleRowListSelector(params));

  const getRowCells = useRecoilCallback(({ snapshot }) => (rowUid: string) => {
    const cells = snapshot.getPromise(datasetSingleCellListByRowSelector({ ...params, rowUid }));
    return cells;
  });

  useEffect(() => {
    const parseDataset = async () => {
      const dataset: { [key: string]: number | string }[] = [];
      for (const row of rows) {
        const singleRow: { [key: string]: number | string } = {};
        const rowCells = await getRowCells(row.uid);
        for (const item of items) {
          const singleCell = rowCells.find((cell) => cell.itemUid === item.uid);
          if (!item.normalizedLabel || !singleCell) break;
          singleRow[item.normalizedLabel] = singleCell.editedValue || '';
        }
        dataset.push(singleRow);
      }
      setDataset(dataset);
    };
    parseDataset();
  }, []);

  return dataset;
};

export const useGetDatasetWithNewItems = (params: { datasetUid: string }) => {
  const [dataset, setDataset] = useState<{ [key: string]: number | string }[]>([]);
  const originalItems = useRecoilValue(datasetItemListSelector(params));
  const currentItems = originalItems.map((item) => item.rowLabel || '');
  const missingItems = schemeValidator
    .getMissingItems({
      current_items: currentItems,
      category: 'public-facilities', // TODO: paramか何かに置き換える
    })
    .map((item) => item.label);
  const additionalItems = missingItems.map((item) => {
    const uid = uuid();
    return {
      uid,
      rowLabel: item,
      normalizedLabel: item,
      isActive: false,
      dataType: null,
    };
  });
  const items = [...originalItems, ...additionalItems];
  const rows = useRecoilValue(datasetSingleRowListSelector(params));

  const getRowCells = useRecoilCallback(({ snapshot }) => (rowUid: string) => {
    const cells = snapshot.getPromise(datasetSingleCellListByRowSelector({ ...params, rowUid }));
    return cells;
  });

  useEffect(() => {
    const parseDataset = async () => {
      const dataset: { [key: string]: number | string }[] = [];

      for (const row of rows) {
        const singleRow: { [key: string]: number | string } | any = {};
        const rowCells = await getRowCells(row.uid);
        for (const item of items) {
          const singleCell = rowCells.find((cell) => cell.itemUid === item.uid);
          if (singleCell) {
            singleRow[item.normalizedLabel] = singleCell.editedValue || ''; // TODO: どの値が入るべきか？
          } else {
            singleRow[item.normalizedLabel] = '';
          }
        }
        dataset.push(singleRow);
      }
      setDataset(dataset);
    };
    parseDataset();
  }, []);

  return dataset;
};
