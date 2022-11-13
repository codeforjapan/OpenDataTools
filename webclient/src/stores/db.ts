import Dexie, { Table } from 'dexie';

interface DatasetType {
    nodeKey: string;
    dataset: Dataset.Dataset;
}
interface ItemType {
    nodeKey: string;
    item: Dataset.Item;
}
interface SingleRowType {
    nodeKey: string;
    singleRow: Dataset.SingleRow;
}
interface SingleCellType {
    nodeKey: string;
    singleCell: Dataset.SingleCell;
}
interface idListType {
    nodeKey: string;
    uids: string[];
}

export class openDataFormatterDB extends Dexie {

    datasets!: Table<DatasetType>;
    items!: Table<ItemType>;
    rows!: Table<SingleRowType>;
    cells!: Table<SingleCellType>;
    datasetUids!: Table<idListType>;
    datasetItemUids!: Table<idListType>;
    datasetSingleRowUids!: Table<idListType>;
    datasetSingleCellUidsByItems!: Table<idListType>;
    datasetSingleCellUidListByRows!: Table<idListType>;
    datasetSingleCellUids!: Table<idListType>;
  
    constructor() {
      super('formatterDB');
      this.version(1).stores({
        datasets: '&nodeKey, dataset',
        items: '&nodeKey, item',
        rows: '&nodeKey, singleRow',
        cells: '&nodeKey, singleCell',
        datasetUids: '&nodeKey, uids',
        datasetItemUids: '&nodeKey, uids',
        datasetSingleRowUids: '&nodeKey, uids',
        datasetSingleCellUidsByItems: '&nodeKey, uids',
        datasetSingleCellUidListByRows: '&nodeKey, uids',
        datasetSingleCellUids: '&nodeKey, uids'
      });
    }
  }
  
  export const db = new openDataFormatterDB();
