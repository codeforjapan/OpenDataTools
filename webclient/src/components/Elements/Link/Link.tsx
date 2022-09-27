/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import { Icon } from '../Icon';

const linkStyle = css`
  cursor: pointer;
  background: #73cdff;
  border-radius: 18px;
  color: #1e232e;
`;
const linkInner = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px;
  gap: 12px;
  width: 229px;
  height: 85px;
`;

export const Link = React.forwardRef(() => {
  return (
    <a css={[linkStyle]}>
      <div css={[linkInner]}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="LinkIcon" />
          <span style={{ marginLeft: '8px' }}>次へ</span>
        </div>
        <Icon type="ArrowRight" />
      </div>
    </a>
  );
});

Link.displayName = 'Link';
