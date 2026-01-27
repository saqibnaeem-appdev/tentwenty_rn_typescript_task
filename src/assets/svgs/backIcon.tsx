import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type BackIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const BackIcon: React.FC<BackIconProps> = ({
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
        d="M18.75 22.5l-7.5-7.5 7.5-7.5"
        stroke={fillColor}
        strokeWidth={2}
      />
    </Svg>
  );
};

export default BackIcon;
