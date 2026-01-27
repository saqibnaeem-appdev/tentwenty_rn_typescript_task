import { SvgProps as RNSvgProps } from 'react-native-svg';

export interface SvgProps extends RNSvgProps {
  color?: string;
  width?: number;
  height?: number;
  size?: number;
}
