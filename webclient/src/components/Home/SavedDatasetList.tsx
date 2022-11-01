import { Icon } from '@chakra-ui/icons';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdModeEditOutline, MdOutlineMap, MdOutlineTextSnippet } from "react-icons/md";
import { useRecoilValue } from 'recoil';
import { useRemoveDatasetFromLocalstorage } from '../../hooks/useDataset';
import { datasetListSelector } from '../../stores/dataset';
import { OstButton } from '../Elements/OstButton';
import { OstNavLink } from '../Elements/OstLink';

const RemoveAllButton: FC = () => {
  const datasets = useRecoilValue(datasetListSelector);
  // HACK: ループ処理で各datasetにuseRemoveDatasetFromLocalstorageを定義することができないため、1要素ずつ削除
  // (関数コンポーネント内のフックの個数が動的に変化するとReactがクラッシュするため https://ja.reactjs.org/docs/hooks-rules.html)
  const [deleting, setDeleting] = useState(false);
  // 先頭のdatasetを削除する関数
  const { removeFromLocalstorage } = useRemoveDatasetFromLocalstorage({datasetUid: String(datasets[0]?.uid)});

  useEffect(() => {
    // HACK: 以下のループにより、要素を逐次的にすべて削除
    // (先頭要素を削除 → stateが更新され再レンダリング → removeFromLocalstorageの対象が「先頭要素削除後のdatasetsの先頭(=次の要素)」になる
    // → useEffect実行 → 先頭要素削除)

    if (datasets.length <= 0) {
      setDeleting(false);
      return;
    }

    if (deleting) {
      removeFromLocalstorage();
    }
  });

  return (
    <OstNavLink
      size="S"
      onClick={() => setDeleting(true)}
      // <Avatar size="md" p="12px" icon={<MdDeleteOutline />} />
      iconRight={<Avatar size="md" p="12px" icon={<MdDeleteOutline />} />}
      mx={1}
    >
      データリストのクリア
    </OstNavLink>
  );
};

type RemoveButtonProps = {
  datasetUid: string;
};

export const HomeSavedDatasetList: FC = () => {
  const datasets = useRecoilValue(datasetListSelector);

  const RemoveButton: FC<RemoveButtonProps> = ({ datasetUid }) => {
    const { executing, removeFromLocalstorage } = useRemoveDatasetFromLocalstorage({
      datasetUid,
    });

    return (
      <OstButton
        size="S"
        view="button"
        onClick={() => removeFromLocalstorage()}
        isLoading={executing}
        iconRight={<Icon as={MdDeleteOutline} w={5} h={5}/>}
        mx={1}
      >
        削除
      </OstButton>
    );
  };

  return (
    <>
      <Heading size="lg" my={4}>データリスト</Heading>
      <Flex justifyContent="right">
        <RemoveAllButton/>
      </Flex>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th visibility="hidden">ファイル名</Th>
            <Th visibility="hidden">ID</Th>
            <Th visibility="hidden"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {datasets
            .filter((d) => d)
            .map((dataset) => (
              <Tr key={dataset?.uid}>
                <Td>
                  <Flex align="center" >
                    <Icon as={MdOutlineTextSnippet} w={6} h={6} mr={2}/><Text>{dataset?.datasetName}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center">
                    {/* NOTE: 文字を等幅にし全体の長さを揃えるためmonospaceを使用 */}
                    {/* TODO: 別箇所でも同様のデザインが必要になったらElement化 */}
                    <Box px={3} py={1} fontFamily="monospace, serif" background="dimgray" color="white" borderRadius="10px 0 0 10px">ID</Box>
                    <Box px={3} py={1} fontFamily="monospace, serif" background="lightgray" borderRadius="0 10px 10px 0">{dataset?.uid}</Box>
                  </Flex>
                </Td>
                <Td>
                  <Link to={`/${dataset?.uid}/map`}>
                    <OstButton
                      size="S"
                      view="button"
                      iconRight={<Icon as={MdOutlineMap} w={5} h={5}/>}
                      mx={1}
                    >
                      マップ表示
                    </OstButton>
                  </Link>
                  <Link to={`/${dataset?.uid}/data-editor`}>
                    <OstButton
                      size="S"
                      view="button"
                      iconRight={<Icon as={MdModeEditOutline} w={5} h={5}/>}
                      mx={1}
                    >
                      編集
                    </OstButton>
                  </Link>
                  <RemoveButton datasetUid={String(dataset?.uid)} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};
