/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';

const wrapperStyle = css`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 100%;
  min-height: 100vh;
  background-color: var(--chakra-colors-body-bg);
`;

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div css={wrapperStyle}>
      <main>{children}</main>
    </div>
  );
};
