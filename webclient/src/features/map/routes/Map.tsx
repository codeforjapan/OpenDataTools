import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { ContentLayout } from '../../../components/Layout';
import { GeoloniaMap } from '@geolonia/embed-react';
import GeoJSON from 'geojson';
import { useGetDataset } from '../../../hooks/useDataset';
import { useParams } from 'react-router-dom';

export const Map: FC = () => {
  const { dataset_uid } = useParams<{ dataset_uid: string }>();

  const dataset = useGetDataset({ datasetUid: dataset_uid || '' });
  console.log(dataset);

  const points = [
    { description: '東京駅', lng: 139.766103, lat: 35.681391 },
    { description: '有楽町駅', lng: 139.763806, lat: 35.675441 },
    { description: '新橋駅', lng: 139.758587, lat: 35.666195 },
    { description: '浜松町駅', lng: 139.757135, lat: 35.655391 },
    { description: '田町駅', lng: 139.747575, lat: 35.645736 },
    { description: '品川駅', lng: 139.738999, lat: 35.62876 },
    { description: '大崎駅', lng: 139.728439, lat: 35.619772 },
    { description: '五反田駅', lng: 139.723822, lat: 35.625974 },
    { description: '目黒駅', lng: 139.715775, lat: 35.633923 },
    { description: '恵比寿駅', lng: 139.71007, lat: 35.646685 },
    { description: '渋谷駅', lng: 139.701238, lat: 35.658871 },
    { description: '原宿駅', lng: 139.702592, lat: 35.670646 },
    { description: '代々木駅', lng: 139.702042, lat: 35.683061 },
    { description: '新宿駅', lng: 139.700464, lat: 35.689729 },
    { description: '新大久保駅', lng: 139.700261, lat: 35.700875 },
    { description: '高田馬場駅', lng: 139.703715, lat: 35.712677 },
    { description: '目白駅', lng: 139.706228, lat: 35.720476 },
    { description: '池袋駅', lng: 139.711086, lat: 35.730256 },
    { description: '大塚駅', lng: 139.728584, lat: 35.731412 },
    { description: '巣鴨駅', lng: 139.739303, lat: 35.733445 },
    { description: '駒込駅', lng: 139.748053, lat: 35.736825 },
    { description: '田端駅', lng: 139.761229, lat: 35.737781 },
    { description: '西日暮里駅', lng: 139.766857, lat: 35.731954 },
    { description: '日暮里駅', lng: 139.771287, lat: 35.727908 },
    { description: '鶯谷駅', lng: 139.778015, lat: 35.721484 },
    { description: '上野駅', lng: 139.777043, lat: 35.71379 },
    { description: '御徒町駅', lng: 139.774727, lat: 35.707282 },
    { description: '秋葉原駅', lng: 139.773288, lat: 35.698619 },
    { description: '神田駅', lng: 139.770641, lat: 35.691173 },
  ];

  const onLoad = useCallback((map: any) => {
    map.on('load', () => {
      const geojson = (GeoJSON as any).parse(points, {
        Point: ['lat', 'lng'],
      });
      const simpleStyle = new (window as any).geolonia.simpleStyle(geojson);
      simpleStyle.addTo(map).fitBounds();
    });
  }, []);

  return (
    <ContentLayout title="マップ">
      <Box></Box>
      <GeoloniaMap
        style={{ height: '300px', width: '100%' }}
        className="geolonia"
        lat="35.681236"
        lng="139.767125"
        zoom="16"
        markerColor="#555"
        marker="off"
        onLoad={onLoad}
      />
    </ContentLayout>
  );
};
