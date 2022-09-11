/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ContentLayout } from '../../../components/Layout';
import { Button } from '../../../components/Elements/Button';

export const DataCategory = () => {
  return (
    <ContentLayout title="データ種別を選択">
      <div
        css={css`
          display: flex;
        `}
      >
        <Button isLoading={true}>primary</Button>
        <Button styleType="error">error</Button>
        <Button styleType="disable">disable</Button>
        <Button styleType="outline">outline</Button>
      </div>
    </ContentLayout>
  );
};
