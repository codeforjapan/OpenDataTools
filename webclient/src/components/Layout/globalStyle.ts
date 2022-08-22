/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const globalStyle = css`
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
