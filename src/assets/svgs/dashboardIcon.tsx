import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { SvgProps } from './types';

const DashboardIcon: React.FC<SvgProps> = ({
  width = getWidth(16),
  height = getHeight(16),
  color = colors.white,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Circle cx={13} cy={3} r={3} fill={color} />
      <Circle cx={13} cy={13} r={3} fill={color} />
      <Circle cx={3} cy={13} r={3} fill={color} />
      <Circle cx={3} cy={3} r={3} fill={color} />
    </Svg>
  );
};

export default DashboardIcon;
