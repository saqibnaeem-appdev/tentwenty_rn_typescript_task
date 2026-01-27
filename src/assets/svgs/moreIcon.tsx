import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type MoreIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const MoreIcon: React.FC<MoreIconProps> = ({
  width = getWidth(18),
  height = getHeight(18),
  color,
  ...props
}) => {
  const fillColor = color || colors.white;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 6.145a1 1 0 001 1h1.063a1 1 0 001-1v-.17a1 1 0 00-1-1H1a1 1 0 00-1 1v.17zm0 4.998a1 1 0 001 1h1.063a1 1 0 001-1v-.28a1 1 0 00-1-1H1a1 1 0 00-1 1v.28zm0-10.06a1 1 0 001 1h1.063a1 1 0 001-1V1a1 1 0 00-1-1H1a1 1 0 00-1 1v.082zm4.593 5.062a1 1 0 001 1h11a1 1 0 001-1v-.17a1 1 0 00-1-1h-11a1 1 0 00-1 1v.17zm0 4.998a1 1 0 001 1h11a1 1 0 001-1v-.28a1 1 0 00-1-1h-11a1 1 0 00-1 1v.28zM5.593 0a1 1 0 00-1 1v.082a1 1 0 001 1h11a1 1 0 001-1V1a1 1 0 00-1-1h-11z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default MoreIcon;
