/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const wrapperStyle = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  min-height: 100vh;
`;

const commonElementStyle = css`
  background-color: var(--chakra-colors-gray-light);
  padding: 30px;
`;

const mainContainerStyle = css`
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
`;

type NavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Navigation = () => {
  const navigation = [
    { name: 'File Upload', to: '.' },
    { name: 'Select Category', to: './select-category' },
  ].filter(Boolean) as NavigationItem[];

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {navigation.map((item, index) => (
        <div
          key={item.name}
          css={css`
            margin: 0 8px;
          `}
        >
          <NavLink end={index === 0} to={item.to}>
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div css={wrapperStyle}>
      <header css={commonElementStyle}>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div>header</div>
          <Navigation />
        </div>
      </header>
      <main css={mainContainerStyle}>{children}</main>
      <footer css={commonElementStyle}>
        <div>footer</div>
      </footer>
    </div>
  );
};
