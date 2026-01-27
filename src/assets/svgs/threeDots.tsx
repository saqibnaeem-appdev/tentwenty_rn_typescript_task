import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { SvgProps } from './types';

const ThreeDots: React.FC<SvgProps> = ({
  width = getWidth(20),
  height = getHeight(4),
  color = colors.secondary,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 4"
      fill="none"
      {...props}
    >
      <Circle cx={2} cy={2} r={2} fill={color} />
      <Circle cx={10} cy={2} r={2} fill={color} />
      <Circle cx={18} cy={2} r={2} fill={color} />
    </Svg>
  );
};

export default ThreeDots;
