import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type DashboardIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const DashboardIcon: React.FC<DashboardIconProps> = ({
  width = getWidth(16),
  height = getHeight(16),
  color,
  ...props
}) => {
  const fillColor = color || colors.white;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={13} cy={3} r={3} fill={fillColor} />
      <Circle cx={13} cy={13} r={3} fill={fillColor} />
      <Circle cx={3} cy={13} r={3} fill={fillColor} />
      <Circle cx={3} cy={3} r={3} fill={fillColor} />
    </Svg>
  );
};

export default DashboardIcon;
