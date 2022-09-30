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
  }

  interface SingleData {
    uid: string;
    rowValue: string | number | null;
    editedValue: string | number | null;
    error: { message: string; status: 'alert' | 'warning' }[];
  }
}
