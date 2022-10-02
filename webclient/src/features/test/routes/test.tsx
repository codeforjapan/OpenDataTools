import { Link } from '../../../components/Elements/Link';
import { OstInput } from '../../../components/Elements/OstInput';
import { OstTextarea } from '../../../components/Elements/OstTextarea';
import { OstSelect } from '../../../components/Elements/OstSelect';
import { OstCheckbox } from '../../../components/Elements/OstCheckbox';

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
    </>
  );
};
