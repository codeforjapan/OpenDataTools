import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { GeoloniaMap } from '@geolonia/embed-react';
import maplibregl, { Map } from 'maplibre-gl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lat: string, lng: string) => void;
  initialLat: string | undefined;
  initialLng: string | undefined;
};

export const MapEditorModal: FC<Props> = ({
  isOpen,
  onClose,
  onComplete,
  initialLat,
  initialLng,
}) => {
  const [lat, setLat] = useState<string>(initialLat || '35.681236');
  const [lng, setLng] = useState<string>(initialLng || '139.767125');

  const onLoad = useCallback(
    (map: Map) => {
      const marker = new maplibregl.Marker({
        draggable: true,
      })
        .setLngLat([Number(lng), Number(lat)])
        .addTo(map);

      marker.on('dragend', function () {
        const LngLat = marker.getLngLat();
        setLng(String(LngLat.lng));
        setLat(String(LngLat.lat));
      });
    },
    [initialLat, initialLng]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent mx="1rem">
        <ModalHeader backgroundColor={'#B9C5D3'}>緯度と経度の調整</ModalHeader>
        <ModalBody pb={6}>
          <GeoloniaMap
            style={{ height: '500px', width: '100%' }}
            className="geolonia"
            lng={initialLng || '139.767125'}
            lat={initialLat || '35.681236'}
            zoom="16"
            marker="off"
            onLoad={onLoad}
          />
          <Box display="flex" alignItems="center" pt={3}>
            <FormControl width={'30%'}>
              <FormLabel>緯度</FormLabel>
              <Input placeholder="緯度" value={lat} readOnly />
            </FormControl>
            <FormControl width={'30%'} ml={4}>
              <FormLabel>経度</FormLabel>
              <Input placeholder="経度" value={lng} readOnly />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="teal" variant="outline">
            調整をやめる
          </Button>
          <Button onClick={() => onComplete(lat, lng)} colorScheme="blue" ml={3}>
            保存して閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
