/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import LinkIcon from './Icons/link';
import ArrowRight from './Icons/arrow_right';

export type Props = { type: Type };

const svgMap = {
  LinkIcon: LinkIcon,
  ArrowRight: ArrowRight,
};

export type Type = keyof typeof svgMap; //enum(列挙型=またはまたはまたは)

export const Icon: React.FC<Props> = ({ type }) => {
  const SvgComponent = svgMap[type];
  return <SvgComponent />;
};