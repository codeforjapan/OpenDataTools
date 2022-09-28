declare namespace Dataset {
  interface Dataset {
    uid: string | null;
    datasetName: string | null;
  }

  interface Item {
    uid: string | null;
    rowLabel: string | null;
    normalizedLabel: NormalizedItemLabel;
    isActive: boolean;
  }

  interface SingleData {
    uid: string | null;
    rowValue: string | number | null;
    editedValue: string | number | null;
    error: { message: string; status: 'alert' | 'warning' }[];
  }

  type NormalizedItemLabel =
    | typeof import('opendatatool-datamanager').datasetListOfRecommendBasic[number]
    | '独自定義'
    | null;
}
