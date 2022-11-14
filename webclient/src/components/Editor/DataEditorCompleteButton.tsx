import { Avatar } from '@chakra-ui/avatar';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FC, useEffect, useState } from 'react';
import { OstNavLink } from '../Elements/OstLink';

type Props = {
  onClick: () => void;
};

export const DataEditorCompleteButton: FC<Props> = ({ onClick }) => {
  const [isCheckFinished, setIsCheckFinished] = useState(false);

  useEffect(() => {
    const count = setInterval(() => {
      setIsCheckFinished(document.getElementsByClassName('ost-error').length === 0);
    }, 1000);

    return () => clearInterval(count);
  }, []);

  return (
    <OstNavLink
      onClick={onClick}
      isDisabled={!isCheckFinished}
      iconRight={<Avatar size="md" p="12px" icon={<ArrowForwardIcon />} />}
    >
      完了
    </OstNavLink>
  );
};
