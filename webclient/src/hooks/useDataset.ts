import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  datasetAtom,
  datasetItemAtom,
  datasetItemListSelector,
  datasetItemUidListAtom,
  datasetListSelector,
  datasetSingleCellAtom,
  datasetSingleCellListByItemSelector,
  datasetSingleCellListByRowSelector,
  datasetSingleCellListSelector,
  datasetSingleCellUidListAtom,
  datasetSingleCellUidListByItemAtom,
  datasetSingleCellUidListByRowAtom,
  datasetSingleRowAtom,
  datasetSingleRowListSelector,
  datasetSingleRowUidListAtom,
  datasetUidListAtom,
} from '../stores/dataset';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { schemeValidator, itemsListOfPublicFacilities } from 'opendatatool-datamanager';

export const useImportDataset = () => {
  const datasets = useRecoilValue(datasetListSelector);

  const importDataset = useRecoilCallback(({ set }) => (datasetName: string, rowLength: number) => {
    const uid = uuid();
    const datasetUidList = [...datasets.map((d) => d?.uid || ''), uid];
    set(datasetUidListAtom, datasetUidList);
    set(datasetAtom({ uid }), { uid, datasetName, rowLength });
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
          datasetUid: params.datasetUid,
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

  const importDatasetSingleCellsUid = useRecoilCallback(
    ({ set }) =>
      (params: { datasetUid: string }, singleCellUids: string[]) => {
        set(datasetSingleCellUidListAtom(params), singleCellUids);
      }
  );

  const executeImport: (params: {
    datasetName: string;
    headers: string[];
    rowDatas: { [header: string]: string }[];
  }) => string = ({ datasetName, headers, rowDatas }) => {
    const datasetUid = importDataset(datasetName, rowDatas.length);
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
    const singleCells: Dataset.SingleCell[] = [];

    for (const row of datasetRows) {
      for (const item of datasetItems) {
        if (!item.rowLabel) break;
        const data: string = rowDatas[row.index][item.rowLabel];
        const singleCell = importDatasetSingleCell({ datasetUid }, item.uid, row.uid, data);
        itemCells[item.uid].push(singleCell);
        rowCells[row.uid].push(singleCell);
        singleCells.push(singleCell);
      }
    }

    for (const itemUid of Object.keys(itemCells)) {
      importDatasetSingleCellsOfItem({ datasetUid, itemUid }, itemCells[itemUid]);
    }
    for (const rowUid of Object.keys(rowCells)) {
      importDatasetSingleCellsOfRow({ datasetUid, rowUid }, rowCells[rowUid]);
    }
    importDatasetSingleCellsUid(
      { datasetUid },
      singleCells.map((sc) => sc.uid)
    );

    return datasetUid;
  };

  return executeImport;
};

export const useGetDataset = (params: { datasetUid: string }) => {
  const [dataset, setDataset] = useState<{ [key: string]: number | string }[]>([]);
  const items = useRecoilValue(datasetItemListSelector(params));
  const rows = useRecoilValue(datasetSingleRowListSelector(params));
  const cellsUid = useRecoilValue(datasetSingleCellUidListAtom(params));
  const cells = useRecoilValue(datasetSingleCellListSelector(params));

  const parseDataset = () => {
    const dataset: { [key: string]: number | string }[] = [];
    if (params.datasetUid && cellsUid.length === cells.length) {
      for (const row of rows) {
        const singleRow: { [key: string]: number | string } = {};
        const rowCells = cells.filter((c) => c.singleRowUid === row.uid);
        for (const item of items) {
          const singleCell = rowCells.find((cell) => cell.itemUid === item.uid);
          if (item.normalizedLabel && singleCell) {
            singleRow[item.normalizedLabel] = singleCell.editedValue || '';
          }
        }
        dataset.push(singleRow);
      }
    }
    return dataset;
  };

  useEffect(() => {
    if (params.datasetUid && cellsUid.length === cells.length) {
      const dataset = parseDataset();
      setDataset(dataset);
    }
  }, [cells]);

  return { dataset, parseDataset };
};

export const useParseDatasetWithNewItems = (params: { datasetUid: string }) => {
  const originalItems = useRecoilValue(datasetItemListSelector(params));
  const currentItems = originalItems.map((item) => item.normalizedLabel || '');
  const missingItems = schemeValidator
    .getMissingItems({
      current_items: currentItems,
      category: 'public-facilities', // TODO: public-facilitiesのベタうちなので、paramか何かに置き換える
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
  const items = [...additionalItems, ...originalItems];
  const mergedItems: Dataset.Item[] = Object.values(
    items.reduce((acc, cur) => Object.assign(acc, { [cur.rowLabel]: cur }), {})
  );
  const labelList = itemsListOfPublicFacilities.map((item) => item.label); // TODO: itemsListOfPublicFacilitiesのベタうちなので、paramか何かに置き換える
  const sortedItems = mergedItems.sort((x: Dataset.Item, y: Dataset.Item) => {
    if (x.normalizedLabel) {
      return labelList.indexOf(x.normalizedLabel) - labelList.indexOf(y.normalizedLabel);
    } else {
      return 1;
    }
  });
  const rows = useRecoilValue(datasetSingleRowListSelector(params));
  const cellsUid = useRecoilValue(datasetSingleCellUidListAtom(params));
  const cells = useRecoilValue(datasetSingleCellListSelector(params));

  const parseDataset = async () => {
    if (params.datasetUid && cellsUid.length === cells.length) {
      const dataset: { [key: string]: string }[] = [];
      for (const row of rows) {
        const singleRow: { [key: string]: string } | any = {};
        for (const item of sortedItems) {
          const singleCell = cells.find(
            (cell) => cell.singleRowUid === row.uid && cell.itemUid === item.uid
          );
          if (singleCell && item.normalizedLabel) {
            singleRow[item.normalizedLabel] = singleCell.editedValue
              ? singleCell.editedValue
              : singleCell.rowValue
              ? singleCell.rowValue
              : '';
          } else if (singleCell && !item.normalizedLabel && item.rowLabel) {
            singleRow[item.rowLabel] = singleCell.editedValue
              ? singleCell.editedValue
              : singleCell.rowValue
              ? singleCell.rowValue
              : '';
          } else {
            singleRow[item.rowLabel!] = '';
          }
        }
        dataset.push(singleRow);
      }
      return dataset;
    } else {
      return;
    }
  };

  return { parseDataset };
};

export const useRemoveDatasetFromLocalstorage = (params: { datasetUid: string }) => {
  const datasetUidList = useRecoilValue(datasetUidListAtom);
  const datasetItemUidList = useRecoilValue(datasetItemUidListAtom(params));
  const datasetSingleRowUidList = useRecoilValue(datasetSingleRowUidListAtom(params));

  const [executing, setExecuting] = useState(false);

  const resetDataset = useRecoilCallback(({ reset, set }) => (params: { uid: string }) => {
    reset(datasetAtom(params));
    const targetIndex = datasetUidList.findIndex((uid) => uid === params.uid);
    const list = [...datasetUidList];
    list.splice(targetIndex, 1);
    set(datasetUidListAtom, list);
  });

  const resetDatasetItem = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string; itemUid: string }) => {
        reset(datasetItemAtom(params));
      }
  );

  const resetDatasetItemUidList = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string }) => {
        reset(datasetItemUidListAtom(params));
      }
  );

  const resetSingleRow = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string; singleRowUid: string }) => {
        reset(datasetSingleRowAtom(params));
      }
  );

  const resetSingleRowUidList = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string }) => {
        reset(datasetSingleRowUidListAtom(params));
      }
  );

  const resetSingleCell = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string; singleCellUid: string }) => {
        reset(datasetSingleCellAtom(params));
      }
  );

  const resetSingleCellUidList = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string }) => {
        reset(datasetSingleCellUidListAtom(params));
      }
  );

  const resetSingleCellUidListByItem = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string; itemUid: string }) => {
        reset(datasetSingleCellUidListByItemAtom(params));
      }
  );

  const resetSingleCellUidListByRow = useRecoilCallback(
    ({ reset }) =>
      (params: { datasetUid: string; rowUid: string }) => {
        reset(datasetSingleCellUidListByRowAtom(params));
      }
  );

  const getCells = useRecoilCallback(({ snapshot }) => async (itemUids: string[]) => {
    let cells: Dataset.SingleCell[] = [];
    for (const itemUid of itemUids) {
      const itemCells = await snapshot.getPromise(
        datasetSingleCellListByItemSelector({ ...params, itemUid })
      );
      cells = cells.concat(itemCells);
    }
    return cells;
  });

  const removeFromLocalstorage = () => {
    setExecuting(true);

    setTimeout(async () => {
      const datasetSingleCells = await getCells(datasetItemUidList);

      for (const singleCell of datasetSingleCells) {
        resetSingleCell({ ...params, singleCellUid: singleCell.uid });
      }
      resetDatasetItemUidList(params);
      for (const itemUid of datasetItemUidList) {
        resetDatasetItem({ ...params, itemUid });
        resetSingleCellUidListByItem({ ...params, itemUid });
      }
      resetSingleRowUidList(params);
      for (const singleRowUid of datasetSingleRowUidList) {
        resetSingleRow({ ...params, singleRowUid });
        resetSingleCellUidListByRow({ ...params, rowUid: singleRowUid });
      }
      resetSingleCellUidList({ datasetUid: params.datasetUid });
      resetDataset({ uid: params.datasetUid });
      setExecuting(false);
    }, 100);
  };

  return { removeFromLocalstorage, executing };
};

export const useGetItemsUnnormalized = (params: { datasetUid: string }) => {
  const [datasetItems, setDatasetItems] = useState<Dataset.Item[]>([]);
  const items = useRecoilValue(datasetItemListSelector(params));

  useEffect(() => {
    if (items.length > 0) {
      const parseDataset = () => {
        const normalizedItems: Dataset.Item[] = items.map((item) => {
          return { ...item, normalizedLabel: item.rowLabel };
        });
        setDatasetItems(normalizedItems);
      };
      parseDataset();
    }
  }, [items]);

  return datasetItems;
};
