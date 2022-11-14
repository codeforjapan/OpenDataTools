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
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GeoloniaMap } from '@geolonia/embed-react';
import maplibregl, { Map } from 'maplibre-gl';

type LngLat = {
  lng: number;
  lat: number;
};

type Props = {
  isOpen: boolean;
  name: string;
  onClose: () => void;
  onComplete: (args: LngLat) => void;
  initialLngLat: LngLat;
};

const orgRoundAtSix = (value: number): number => {
  // NOTE: 小数点６桁で丸める
  return Math.round(value * 1000000) / 1000000;
};

const convertLngLat = (LngLat: LngLat): LngLat => {
  return { lng: orgRoundAtSix(LngLat.lng), lat: orgRoundAtSix(LngLat.lat) };
};

export const MapEditorModal: FC<Props> = ({ isOpen, onClose, onComplete, initialLngLat, name }) => {
  const convertedInitialLngLat = useMemo(
    () => convertLngLat(initialLngLat),
    [initialLngLat.lat, initialLngLat.lng]
  );
  const [lngLat, setLngLat] = useState<LngLat>(convertedInitialLngLat);

  useEffect(() => {
    setLngLat(convertedInitialLngLat);
  }, [convertedInitialLngLat]);

  const onLoad = useCallback(
    (map: Map) => {
      const marker = new maplibregl.Marker({
        draggable: true,
      })
        .setLngLat({ ...convertedInitialLngLat })
        .addTo(map);

      marker.on('dragend', function () {
        const lngLat = marker.getLngLat();
        const convertedLngLat = convertLngLat(lngLat);
        setLngLat({ ...convertedLngLat });
      });
    },
    [initialLngLat]
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
            lng={String(convertedInitialLngLat.lng)}
            lat={String(convertedInitialLngLat.lat)}
            zoom="16"
            marker="off"
            onLoad={onLoad}
          />
          <Box py={3}>{name}</Box>
          <Box display="flex" alignItems="center">
            <FormControl width={'30%'}>
              <Input placeholder="緯度" value={lngLat.lat} readOnly />
            </FormControl>
            <FormControl width={'30%'} ml={4}>
              <Input placeholder="経度" value={lngLat.lng} readOnly />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="teal" variant="outline">
            調整をやめる
          </Button>
          <Button onClick={() => onComplete(lngLat)} colorScheme="blue" ml={3}>
            保存して閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
