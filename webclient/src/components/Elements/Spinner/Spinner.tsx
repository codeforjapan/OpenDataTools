/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';

const spinnerStyle = css`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const sizes = {
  sm: css`
    width: 1rem;
    height: 1rem;
  `,
  md: css`
    width: 2rem;
    height: 2rem;
  `,
  lg: css`
    width: 4rem;
    height: 4rem;
  `,
  xl: css`
    width: 6rem;
    height: 6rem;
  `,
};

export type SpinnerProps = React.SVGAttributes<SVGElement> & {
  size?: keyof typeof sizes;
};

export const Spinner = ({ size = 'md', ...props }: SpinnerProps) => {
  return (
    <>
      <svg
        css={[spinnerStyle, sizes[size]]}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="loading"
        {...props}
      >
        <circle
          css={css`
            opacity: 0.25;
          `}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          css={css`
            opacity: 0.75;
          `}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="visually-hidden">Loading</span>
    </>
  );
};
