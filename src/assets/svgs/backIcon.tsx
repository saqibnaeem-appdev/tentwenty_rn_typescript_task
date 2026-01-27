import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { SvgProps } from './types';

const BackIcon: React.FC<SvgProps> = ({
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
      <Path d="M18.75 22.5l-7.5-7.5 7.5-7.5" stroke={color} strokeWidth={2} />
    </Svg>
  );
};

export default BackIcon;
