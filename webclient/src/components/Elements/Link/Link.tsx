/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import { Icon } from '../Icon';
import { Button } from '@chakra-ui/react';

const linkStyle = css`
  cursor: pointer;

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
      <Button css={[linkInner]} colorScheme="linkedin" width="229px" height="85px">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="LinkIcon" />
          <span style={{ marginLeft: '8px' }}>次へ</span>
        </div>
        <Icon type="ArrowRight" />
      </Button>
    </a>
  );
});

Link.displayName = 'Link';
