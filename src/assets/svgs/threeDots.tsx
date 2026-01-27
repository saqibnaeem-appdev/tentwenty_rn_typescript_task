import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type ThreeDotsProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const ThreeDots: React.FC<ThreeDotsProps> = ({
  width = getWidth(20),
  height = getHeight(4),
  color,
  ...props
}) => {
  const fillColor = color || colors.secondary;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={2} cy={2} r={2} fill={fillColor} />
      <Circle cx={10} cy={2} r={2} fill={fillColor} />
      <Circle cx={18} cy={2} r={2} fill={fillColor} />
    </Svg>
  );
};

export default ThreeDots;
