import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { SvgProps } from './types';

const MoreIcon: React.FC<SvgProps> = ({
  width = getWidth(18),
  height = getHeight(18),
  color = colors.white,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 13"
      fill="none"
      {...props}
    >
      <Path
        d="M0 6.145a1 1 0 001 1h1.063a1 1 0 001-1v-.17a1 1 0 00-1-1H1a1 1 0 00-1 1v.17zm0 4.998a1 1 0 001 1h1.063a1 1 0 001-1v-.28a1 1 0 00-1-1H1a1 1 0 00-1 1v.28zm0-10.06a1 1 0 001 1h1.063a1 1 0 001-1V1a1 1 0 00-1-1H1a1 1 0 00-1 1v.082zm4.593 5.062a1 1 0 001 1h11a1 1 0 001-1v-.17a1 1 0 00-1-1h-11a1 1 0 00-1 1v.17zm0 4.998a1 1 0 001 1h11a1 1 0 001-1v-.28a1 1 0 00-1-1h-11a1 1 0 00-1 1v.28zM5.593 0a1 1 0 00-1 1v.082a1 1 0 001 1h11a1 1 0 001-1V1a1 1 0 00-1-1h-11z"
        fill={color}
      />
    </Svg>
  );
};

export default MoreIcon;
