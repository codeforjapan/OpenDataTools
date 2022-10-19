import { unparse, UnparseObject } from 'papaparse';

export const exportCsv = (json: any[] | UnparseObject<any>) => {
  const csv = unparse(json, {
    header: true,
  });
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csv], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'temp.csv'; // TODO: ダウンロードcsvのファイル名を可変にする
  link.click();
};
