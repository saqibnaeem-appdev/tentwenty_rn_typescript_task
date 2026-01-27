import { SvgProps as RNSvgProps } from 'react-native-svg';

export interface SvgProps extends RNSvgProps {
  color?: string;
  width?: number | string;
  height?: number | string;
  size?: number;
}
