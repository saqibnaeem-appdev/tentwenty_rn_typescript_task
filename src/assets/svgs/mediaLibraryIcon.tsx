import { colors, getHeight, getWidth } from '@/theme';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { SvgProps } from './types';

const MediaLibraryIcon: React.FC<SvgProps> = ({
  width = getWidth(18),
  height = getHeight(18),
  color = colors.white,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Rect
        y={3.47369}
        width={18}
        height={14.5263}
        rx={0.947368}
        fill={color}
      />
      <Path
        d="M16.105 1.579c.505 0 .632.526.632.79H.947c0-.632.421-.79.632-.79h14.526zM15.246 0c.435 0 .543.421.543.632H2.21c0-.506.363-.632.544-.632h12.492z"
        fill={color}
      />
    </Svg>
  );
};

export default MediaLibraryIcon;
