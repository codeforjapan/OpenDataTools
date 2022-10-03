import { Stack, Avatar } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

import { Link } from '../../../components/Elements/Link';
import { OstInput } from '../../../components/Elements/OstInput';
import { OstTextarea } from '../../../components/Elements/OstTextarea';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { OstCheckbox } from '../../../components/Elements/OstCheckbox';
import { OstButton } from '../../../components/Elements/OstButton';

export const Test = () => {
  return (
    <div>
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
      <OstButton label="ボタン" view="button" size="L" icon={<PhoneIcon />} />
      <OstButton label="ボタン" view="button" size="L" isDisabled={true} icon={<PhoneIcon />} />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="L"
        icon={<Avatar bg="bg.active" size="md" p="12px" icon={<PhoneIcon />} />}
      />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="L"
        isDisabled={true}
        icon={<Avatar size="md" p="12px" icon={<PhoneIcon />} />}
      />
      <OstButton
        view="icon-only"
        size="L"
        icon={<Avatar bg="bg.active" size="md" p="12px" icon={<PhoneIcon />} />}
      />
      <OstButton
        view="icon-only"
        size="L"
        isDisabled={true}
        icon={<Avatar size="md" p="12px" icon={<PhoneIcon />} />}
      />
      <OstButton label="ボタン" view="button" size="S" />
      <OstButton label="ボタン" view="button" size="S" isDisabled={true} />
      <OstButton label="ボタン" view="button" size="S" icon={<PhoneIcon />} />
      <OstButton label="ボタン" view="button" size="S" isDisabled={true} icon={<PhoneIcon />} />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="S"
        icon={<Avatar bg="bg.active" size="sm" icon={<PhoneIcon />} />}
      />
      <OstButton
        label="ボタン"
        view="skeleton"
        size="S"
        isDisabled={true}
        icon={<Avatar size="sm" icon={<PhoneIcon />} />}
      />
      <OstButton
        view="icon-only"
        size="S"
        icon={<Avatar bg="bg.active" size="sm" icon={<PhoneIcon />} />}
      />
      <OstButton
        view="icon-only"
        size="S"
        isDisabled={true}
        icon={<Avatar size="sm" icon={<PhoneIcon />} />}
      />
    </div>
  );
};
