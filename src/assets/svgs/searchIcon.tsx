import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type SearchIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const SearchIcon: React.FC<SearchIconProps> = ({
  width = getWidth(15),
  height = getHeight(15),
  color,
  ...props
}) => {
  const fillColor = color || colors.black;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.25 13.136l-4.053-4.052a5.67 5.67 0 10-1.114 1.114l4.053 4.052 1.114-1.114zM9.765 5.67a4.095 4.095 0 11-8.19 0 4.095 4.095 0 018.19 0z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default SearchIcon;
