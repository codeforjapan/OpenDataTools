/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';

import { Head } from '../Head';

const titleStyle = css`
  font-weight: normal;
  color: var(--chakra-colors-white);
  background-color: var(--chakra-colors-black);
  padding: 15px 30px;
`;

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div>
        <h1 css={titleStyle}>{title}</h1>
        <div>{children}</div>
      </div>
    </>
  );
};
