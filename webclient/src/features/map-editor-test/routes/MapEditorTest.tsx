import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { ContentLayout } from '../../../components/Layout';
import { MapEditorModal } from '../../../components/Editor';

export const MapEditorTest: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lngLat, setLngLat] = useState<{ lng: number | null; lat: number | null }>({
    lng: null,
    lat: null,
  });

  // NOTE: 緯度経度のデータがない場合のチェック。ない場合は東京駅の緯度経度をかえしている。
  const targetLngLat = useMemo((): { lng: number; lat: number } => {
    if (lngLat.lat === null || lngLat.lng === null) {
      return { lng: 139.767125, lat: 35.681236 };
    } else {
      return { lng: lngLat.lng, lat: lngLat.lat };
    }
  }, [lngLat.lat, lngLat.lng]);

  return (
    <ContentLayout title="マップ">
      <Box>
        <Button onClick={onOpen}>Open Modal</Button>
      </Box>
      <MapEditorModal
        isOpen={isOpen}
        onClose={onClose}
        initialLngLat={targetLngLat}
        onComplete={(lngLat) => {
          setLngLat({ ...lngLat });
          onClose();
        }}
      />
    </ContentLayout>
  );
};
