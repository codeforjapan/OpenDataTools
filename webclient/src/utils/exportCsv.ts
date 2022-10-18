import { unparse, UnparseObject } from 'papaparse';

export const exportCsv = (json: any[] | UnparseObject<any>) => {
  const csv = unparse(json, {
    header: true,
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'Result.csv';
  link.click();
};
