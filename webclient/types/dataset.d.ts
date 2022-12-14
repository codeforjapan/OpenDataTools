declare namespace Dataset {
  interface Dataset {
    uid: string;
    datasetName: string | null;
  }

  interface Item {
    uid: string;
    rowLabel: string | null;
    normalizedLabel: string | null;
    isActive: boolean;
    dataType: Dataset.DataType;
  }

  interface SingleRow {
    uid: string;
    index: number;
  }

  interface SingleCell {
    uid: string;
    datasetUid: string;
    itemUid: string;
    singleRowUid: string;
    rowValue: string | number | null;
    editedValue: string | number | null;
    error: { message: string; status: 'alert' | 'warning' }[];
  }

  type DataType =
    | 'regioncode'
    | 'regionname'
    | 'cityname'
    | 'no'
    | 'kana_string'
    | 'lat'
    | 'lng'
    | 'tel'
    | 'extension_tel'
    | 'address'
    | 'day_of_week'
    | 'time'
    | 'date'
    | 'poi'
    | 'barrier_free'
    | 'url'
    | null;
}
