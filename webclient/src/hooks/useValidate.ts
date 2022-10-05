import { validateRegCode, validateTel } from 'opendatatool-datamanager';
import { useCallback, useMemo } from 'react';

export const useValidator = (params: { dataType: Dataset.DataType }) => {
  const validator = useCallback(() => {
    switch (params.dataType) {
      case 'tel':
        return validateTel.validateDataType;
      case 'regcode':
        return validateRegCode.validateDataType;
      default:
        return () => {
          return;
        };
    }
  }, [params.dataType]);

  return validator;
};

export const useLabel2DataType = () => {
  const label2DataType: (label: string) => Dataset.DataType = (label) => {
    switch (label) {
      case '都道府県コード又は市区町村コード':
        return 'regcode';
      case '電話番号':
        return 'tel';
      default:
        return null;
    }
  };

  return label2DataType;
};
