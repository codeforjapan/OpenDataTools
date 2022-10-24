import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { ContentLayout } from '../../../components/Layout';
import { MapEditorModal } from '../../../components/Editor';

export const MapEditorTest: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lat, setLat] = useState<string | undefined>(undefined);
  const [lng, setLng] = useState<string | undefined>(undefined);

  return (
    <ContentLayout title="マップ">
      <Box>
        <Button onClick={onOpen}>Open Modal</Button>
      </Box>
      <MapEditorModal
        isOpen={isOpen}
        onClose={onClose}
        initialLat={lat}
        initialLng={lng}
        onComplete={(lat, lng) => {
          setLat(lat);
          setLng(lng);
          onClose();
        }}
      />
    </ContentLayout>
  );
};
