import { Avatar, Icon } from '@chakra-ui/react';
import { MdFolder, MdSettings, MdSupervisedUserCircle } from 'react-icons/md';

import { OstInput } from '../../../components/Elements/OstInput';
import { OstTextarea } from '../../../components/Elements/OstTextarea';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { OstCheckbox } from '../../../components/Elements/OstCheckbox';
import { OstButton } from '../../../components/Elements/OstButton';
import { OstLink } from '../../../components/Elements/OstLink';

export const Test = () => {
  return (
    <>
      <OstInput label="テキストフィールド" />
      <OstTextarea label="テキストエリア" />
      <OstSelect
        label="セレクトボックス"
        options={[
          { label: 'テスト１', value: 'test1' },
          { label: 'テスト２', value: 'test2' },
          { label: 'テスト３', value: 'test3' },
        ]}
      />
      <OstCheckbox>チェック１</OstCheckbox>
      <OstCheckbox isDisabled={true}>チェック２</OstCheckbox>
      <OstButton view="button" size="L">
        ボタン
      </OstButton>
      <OstButton view="button" size="L" isDisabled={true}>
        ボタン
      </OstButton>
      <OstButton view="button" size="L" icon={<Icon as={MdFolder} />}>
        ボタン
      </OstButton>
      <OstButton view="button" size="L" isDisabled={true} icon={<Icon as={MdFolder} />}>
        ボタン
      </OstButton>
      <OstButton
        view="skeleton"
        size="L"
        icon={<Avatar bg="bg.active" size="md" p="12px" icon={<Icon as={MdFolder} />} />}
      >
        ボタン
      </OstButton>
      <OstButton
        view="skeleton"
        size="L"
        isDisabled={true}
        icon={<Avatar size="md" p="12px" icon={<Icon as={MdFolder} />} />}
      >
        ボタン
      </OstButton>
      <OstButton
        view="icon-only"
        size="L"
        icon={<Avatar bg="bg.active" size="md" p="12px" icon={<Icon as={MdFolder} />} />}
      />
      <OstButton
        view="icon-only"
        size="L"
        isDisabled={true}
        icon={<Avatar size="md" p="12px" icon={<Icon as={MdFolder} />} />}
      />
      <OstButton view="button" size="S">
        ボタン
      </OstButton>
      <OstButton view="button" size="S" isDisabled={true}>
        ボタン
      </OstButton>
      <OstButton view="button" size="S" icon={<Icon as={MdSettings} />}>
        ボタン
      </OstButton>
      <OstButton view="button" size="S" isDisabled={true} icon={<Icon as={MdSettings} />}>
        ボタン
      </OstButton>
      <OstButton
        view="skeleton"
        size="S"
        icon={<Avatar bg="bg.active" size="sm" icon={<Icon as={MdSettings} />} />}
      >
        ボタン
      </OstButton>
      <OstButton
        view="skeleton"
        size="S"
        isDisabled={true}
        icon={<Avatar size="sm" icon={<Icon as={MdSettings} />} />}
      >
        ボタン
      </OstButton>
      <OstButton
        view="icon-only"
        size="S"
        icon={<Avatar bg="bg.active" size="sm" icon={<Icon as={MdSettings} />} />}
      />
      <OstButton
        view="icon-only"
        size="S"
        isDisabled={true}
        icon={<Avatar size="sm" icon={<Icon as={MdSettings} />} />}
      />
      <OstLink url="https://www.google.com">リンク</OstLink>
      <OstLink url="https://www.google.com" icon={<Icon as={MdSupervisedUserCircle} />}>
        リンク
      </OstLink>
    </>
  );
};
