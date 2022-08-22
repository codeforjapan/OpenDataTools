/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';

import { Spinner } from '../Spinner';

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  font-weight: 600;
  padding: 0.8em 1.5em;
  border-radius: 3em;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
`;

const styleTypes = {
  primary: css`
    background-color: var(--color-primary);
  `,
  error: css`
    background-color: var(--color-error);
  `,
  disable: css`
    background-color: var(--color-gray);
    cursor: not-allowed;
  `,
  outline: css`
    background-color: var(--color-white);
    color: var(--color-primary);
    box-shadow: 0 0 0 2px currentColor inset;
  `,
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: keyof typeof styleTypes;
  isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = 'button', styleType = 'primary', isLoading = false, startIcon, endIcon, ...props },
    ref
  ) => {
    return (
      <button ref={ref} type={type} css={[buttonStyle, styleTypes[styleType]]} {...props}>
        {isLoading && (
          <Spinner
            size="sm"
            css={css`
              margin-right: 8px;
            `}
          />
        )}
        {!isLoading && startIcon}
        <span>{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
