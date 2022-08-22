/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Global, css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const globalStyle = css`
  :root {
    --color-primary: #074ee8;
    --color-gray: #d9d9d9;
    --color-bg: #f5f5f5;
    --color-black: #222;
    --color-white: #fff;
    --color-focus: #ffd73e;
    --color-error: #e24242;
  }

  html {
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-bg);
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
  }

  *:focus {
    outline: 2px solid var(--color-focus);
  }

  .visually-hidden {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 4px !important;
    height: 4px !important;
    opacity: 0 !important;
    overflow: hidden !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    display: block !important;
    visibility: visible !important;
  }
`;

const wrapperStyle = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  min-height: 100vh;
`;

const commonElementStyle = css`
  background-color: var(--color-gray);
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
          css={css`
            margin: 0 8px;
          `}
        >
          <NavLink end={index === 0} key={item.name} to={item.to}>
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
      <Global styles={globalStyle} />
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
