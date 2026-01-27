import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { SvgProps } from './types';

const SeatIcon: React.FC<SvgProps> = ({
  width = getWidth(18),
  height = getHeight(17),
  color = colors.grayLight,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill="none"
      {...props}
    >
      <Rect width={17.012} height={12.759} rx={2} fill={color} />
      <Rect
        x={2.55182}
        y={13.6096}
        width={11.9084}
        height={2.5518}
        rx={1.2759}
        fill={color}
      />
    </Svg>
  );
};

export default SeatIcon;
