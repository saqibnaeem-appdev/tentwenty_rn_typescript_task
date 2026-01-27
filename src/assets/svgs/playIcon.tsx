import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { SvgProps } from './types';

const PlayIcon: React.FC<SvgProps> = ({
  width = getWidth(8),
  height = getHeight(12),
  color = colors.white,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 8 12"
      fill="none"
      {...props}
    >
      <Path
        d="M8 5.998a.433.433 0 01-.042.186.39.39 0 01-.114.142L.57 11.928a.341.341 0 01-.375.028.38.38 0 01-.143-.148A.43.43 0 010 11.6V.397A.43.43 0 01.053.188.38.38 0 01.196.041.335.335 0 01.56.069L7.833 5.67c.05.036.091.084.12.141.03.058.046.122.047.187z"
        fill={color}
      />
    </Svg>
  );
};

export default PlayIcon;
