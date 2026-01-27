import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type SeatIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const SeatIcon: React.FC<SeatIconProps> = ({
  width = getWidth(18),
  height = getHeight(17),
  color,
  ...props
}) => {
  const fillColor = color || colors.grayLight;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={17.012} height={12.759} rx={2} fill="#CD9D0F" />
      <Rect
        x={2.55182}
        y={13.6096}
        width={11.9084}
        height={2.5518}
        rx={1.2759}
        fill={fillColor}
      />
    </Svg>
  );
};

export default SeatIcon;
