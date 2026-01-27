import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { SvgProps } from './types';

const SearchIcon: React.FC<SvgProps> = ({
  width = getWidth(20),
  height = getHeight(20),
  color = colors.black,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.25 13.136l-4.053-4.052a5.67 5.67 0 10-1.114 1.114l4.053 4.052 1.114-1.114zM9.765 5.67a4.095 4.095 0 11-8.19 0 4.095 4.095 0 018.19 0z"
        fill={color}
      />
    </Svg>
  );
};

export default SearchIcon;
