import * as React from 'react';
import LinkIcon from './Icons/LinkIcon';
import ArrowRightIcon from './Icons/ArrowRightIcon';

export type Props = { type: Type };

const svgMap = {
  LinkIcon: LinkIcon,
  ArrowRight: ArrowRightIcon,
};

export type Type = keyof typeof svgMap; //enum(列挙型=またはまたはまたは)

export const Icon: React.FC<Props> = ({ type }) => {
  const SvgComponent = svgMap[type];
  return <SvgComponent />;
};
