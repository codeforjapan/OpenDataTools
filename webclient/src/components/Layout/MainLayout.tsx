/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Global, css } from '@emotion/react';

const global = css`
  :root {
    --color-primary: #074EE8;
    --color-gray: #D9D9D9;
    --color-bg: #F5F5F5;
    --color-black: #222;
    --color-white: #FFF;
    --color-focus: #FFD73E;
    --color-error: #E24242;
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
`

const wrapper = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  min-height: 100vh;
`

const commonElement = css`
  background-color: var(--color-gray);
  padding: 30px;
`

const mainContainer = css`
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
`

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div css={wrapper}>
      <Global styles={global} />
      <header css={commonElement}>
        <div>
          header
        </div>
      </header>
      <main css={mainContainer}>{children}</main>
      <footer css={commonElement}>
        <div>
          footer
        </div>
      </footer>
    </div>
  );
};
