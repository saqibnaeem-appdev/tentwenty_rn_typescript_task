import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type CrossIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const CrossIcon: React.FC<CrossIconProps> = ({
  width = getWidth(30),
  height = getHeight(30),
  color,
  ...props
}) => {
  const fillColor = color || colors.black;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.5 7.5l15 15M7.5 22.5l15-15"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CrossIcon;
