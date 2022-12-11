import {Box, Heading, Text, Flex, Avatar, Stack, Image, Spacer} from '@chakra-ui/react';
import {FC, useCallback, useMemo} from 'react';
import { ContentLayout } from '../../../components/Layout';
import { GeoloniaMap } from '@geolonia/embed-react';
import GeoJSON from 'geojson';
import { useGetDataset } from '../../../hooks/useDataset';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { datasetAtom } from '../../../stores/dataset';
import { OstNavLink } from '../../../components/Elements/OstLink';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import map_image_step1 from '../../../assets/map_step1.png';
import map_image_step2 from '../../../assets/map_step2.png';
import map_image_step3 from '../../../assets/map_step3.png';

type StepCardProps = {
    image: string;
    children: React.ReactNode;
    stepNum: React.ReactNode;
}

const StepCardWithImage = ({ image, children, stepNum }: StepCardProps) => {
    return(
        <Stack
        alignItems="left"
        borderRadius={8}
        textStyle="navigationLarge"
        background="white"
        width="100%"
        >
            <Stack px={6} py={4} borderTopRadius={8}>
                <Text fontSize="md">{stepNum}</Text>
                {children}
            </Stack>
            <Spacer />
            <Image src={image} borderBottomRadius={8} />
        </Stack>
    )
}

export const Map: FC = () => {
    const { dataset_uid } = useParams<{ dataset_uid: string }>();
    const dataset = useGetDataset({ datasetUid: dataset_uid || '' });
    const csvFile = useRecoilValue(datasetAtom({ uid: dataset_uid || '' }));

    const description = (point: any) => {
        return `<div>
            <strong>${point.名称}(${point.名称_カナ})</strong>
            <ul>
                <li>住所: ${point.住所}</li>
                <li>電話番号: ${point.電話番号}</li>
            </ul>
        </div>`;
    };

    const points = useMemo(() => {
        return dataset
            .filter((point) => point.緯度 && point.経度)
            .map((point) => {
                return {
                    title: point.名称,
                    description: description(point),
                    lat: Number(point.緯度),
                    lng: Number(point.経度),
                };
            }
        );
    }, [dataset]);

    const onLoad = useCallback(
        (map: any) => {
            map.on('load', () => {
            const geojson = (GeoJSON as any).parse(points, {
                Point: ['lat', 'lng'],
            });
            const simpleStyle = new (window as any).geolonia.simpleStyle(geojson);
            simpleStyle.addTo(map).fitBounds();
            }
        );
    }, [points]);

    return (
        <ContentLayout title="マップ">
            <Box background="white" px={6} py={6}>
                <Flex justifyContent="space-between">
                    <Box>
                        <Heading size="md">マップ表示</Heading>
                        <Text fontSize="sm">表示ファイル：{csvFile?.datasetName}</Text>
                    </Box>
                    <OstNavLink
                        to="/"
                        iconRight={<Avatar size="md" p="12px" icon={<HiArrowUturnLeft />} />}
                    >
                        トップページに戻る
                    </OstNavLink>
                </Flex>
            </Box>
            <GeoloniaMap
                style={{ height: '60vh', width: '100%' }}
                className="geolonia"
                lat="35.681236"
                lng="139.767125"
                zoom="16"
                markerColor="#555"
                marker="off"
                onLoad={onLoad}
            />
            <Flex justifyContent="center" my={10} mx={60} gap={6}>
                <StepCardWithImage stepNum={1} image={map_image_step1}>
                    <Text fontSize="md">
                        作成したリストの件数が、マップ上に表示されます。右上の「＋」ボタンでマップを拡大してください。
                    </Text>
                </StepCardWithImage>
                <StepCardWithImage stepNum={2} image={map_image_step2}>
                    <Text fontSize="md">
                        拡大していくと、それぞれのエリア内での件数に細分化されていきます。エリアに含まれないものは個別に表示されるようになります。
                    </Text>
                </StepCardWithImage>
                <StepCardWithImage stepNum={3} image={map_image_step3}>
                    <Text fontSize="md">
                        さらに拡大を進めると、それぞれの場所にピン留めされた情報が確認できるようになり、クリックすると、吹き出しで情報確認することができます。
                    </Text>
                </StepCardWithImage>
            </Flex>
        </ContentLayout>
    );
};
