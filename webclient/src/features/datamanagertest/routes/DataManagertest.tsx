import { FC, useEffect } from 'react';
import { validateUrl } from 'opendatatool-datamanager';

export const DataManagertest: FC = () => {
  useEffect(() => {
    checkURL();
  }, []);

  const checkURL = () => {
    try {
      validateUrl.validateDataType('httt');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return <div></div>;
};
