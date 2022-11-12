import { CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

export const DataEditorNumOfError: FC = () => {
  const [numOfErrorMessage, setNumOfError] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setNumOfError(document.getElementsByClassName('ost-error').length);
    }, 1000);
  }, []);

  return (
    <Flex
      alignItems="center"
      px={6}
      py={4}
      mb={10}
      bg={numOfErrorMessage === 0 ? 'information.bg.active' : 'information.bg.alert'}
      borderRadius={8}
    >
      {numOfErrorMessage === 0 ? <CheckIcon /> : <InfoOutlineIcon />}
      <Text ml={6}>
        {numOfErrorMessage === 0
          ? '形式の確認が完了しました。'
          : `${numOfErrorMessage}件のデータ形式を確認して修正してください。`}
      </Text>
    </Flex>
  );
};
