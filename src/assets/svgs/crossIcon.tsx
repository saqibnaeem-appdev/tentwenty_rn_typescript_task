import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { SvgProps } from './types';

const CrossIcon: React.FC<SvgProps> = ({
  width = getWidth(30),
  height = getHeight(30),
  color = colors.black,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <Path
        d="M7.5 7.5l15 15M7.5 22.5l15-15"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CrossIcon;
