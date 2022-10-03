import { Avatar, Icon } from '@chakra-ui/react';
import { MdFolder, MdSettings } from 'react-icons/md';

import { Link } from '../../../components/Elements/Link';
import { OstInput } from '../../../components/Elements/OstInput';
import { OstTextarea } from '../../../components/Elements/OstTextarea';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { OstCheckbox } from '../../../components/Elements/OstCheckbox';
import { OstButton } from '../../../components/Elements/OstButton';

export const Test = () => {
  return (
    <>
      <Link />
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
      <OstCheckbox label="チェック１" />
      <OstCheckbox label="チェック２" isDisabled={true} />
      <OstButton label="ボタン" view="button" size="L" />
      <OstButton label="ボタン" view="button" size="L" isDisabled={true} />
      <OstButton label="ボタン" view="button" size="L" icon={<Icon as={MdFolder} />} />
      <OstButton
        label="ボタン"
        view="button"
        size="L"
        isDisabled={true}
        icon={<Icon as={MdFolder} />}
      />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="L"
        icon={<Avatar bg="bg.active" size="md" p="12px" icon={<Icon as={MdFolder} />} />}
      />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="L"
        isDisabled={true}
        icon={<Avatar size="md" p="12px" icon={<Icon as={MdFolder} />} />}
      />
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
      <OstButton label="ボタン" view="button" size="S" />
      <OstButton label="ボタン" view="button" size="S" isDisabled={true} />
      <OstButton label="ボタン" view="button" size="S" icon={<Icon as={MdSettings} />} />
      <OstButton
        label="ボタン"
        view="button"
        size="S"
        isDisabled={true}
        icon={<Icon as={MdSettings} />}
      />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="S"
        icon={<Avatar bg="bg.active" size="sm" icon={<Icon as={MdSettings} />} />}
      />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="S"
        isDisabled={true}
        icon={<Avatar size="sm" icon={<Icon as={MdSettings} />} />}
      />
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
    </>
  );
};
