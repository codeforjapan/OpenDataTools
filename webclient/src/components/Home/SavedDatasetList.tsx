import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useRemoveDatasetFromLocalstorage } from '../../hooks/useDataset';
import { datasetListSelector } from '../../stores/dataset';
import { OstButton } from '../Elements/OstButton';

type RemoveButtonProps = {
  datasetUid: string;
};

export const HomeSavedDatasetList: FC = () => {
  const datasets = useRecoilValue(datasetListSelector);

  const RemoveButton: FC<RemoveButtonProps> = ({ datasetUid }) => {
    const remove = useRemoveDatasetFromLocalstorage({ datasetUid });

    const execute = async () => {
      await remove();
    };

    return (
      <OstButton size="S" view="button" onClick={() => execute()}>
        削除
      </OstButton>
    );
  };

  return (
    <Table>
      <Thead>
        <Th>ID</Th>
        <Th>ファイル名</Th>
        <Th></Th>
      </Thead>
      <Tbody>
        {datasets
          .filter((d) => d)
          .map((dataset) => (
            <Tr key={dataset?.uid}>
              <Td>{dataset?.uid}</Td>
              <Td>{dataset?.datasetName}</Td>
              <Td>
                <Link to={`/${dataset?.uid}/map`}>
                  <OstButton size="S" view="button">
                    マップ
                  </OstButton>
                </Link>
                <Link to={`/${dataset?.uid}/data-editor`}>
                  <OstButton size="S" view="button">
                    データ編集
                  </OstButton>
                </Link>
                <RemoveButton datasetUid={String(dataset?.uid)} />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
