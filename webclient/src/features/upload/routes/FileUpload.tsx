/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ContentLayout } from '../../../components/Layout';

export const FileUpload = () => {
  return (
    <ContentLayout title="CSVアップロード">
      <div css={css`text-align: center`}>
        CSVファイルをアップロード
      </div>
    </ContentLayout>
  );
};
