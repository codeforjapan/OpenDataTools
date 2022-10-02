import { Link } from '../../../components/Elements/Link';
import { OstInput } from '../../../components/Elements/OstInput';
import { OstTextarea } from '../../../components/Elements/OstTextarea';

export const Test = () => {
  return (
    <>
      <Link />
      <OstInput label="inputフィールド" />
      <OstTextarea label="テキストエリア" />
    </>
  );
};
