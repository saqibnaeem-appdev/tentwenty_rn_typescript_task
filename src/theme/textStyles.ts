import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { ThemeTypography } from './types';
import { getLineHeight } from '@/utils/lineHeight';

export const textStyles: ThemeTypography = StyleSheet.create({
  h1: {
    fontFamily: fonts.poppins.poppins700,
    fontSize: 5.38,
    lineHeight: 6.75,
    color: colors.black,
  },
  h2: {
    fontFamily: fonts.poppins.poppins600,
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
  },
  h3: {
    fontFamily: fonts.poppins.poppins500,
    fontSize: 18,
    lineHeight: getLineHeight(18, 125),
    color: colors.white,
  },
  h4: {
    fontFamily: fonts.poppins.poppins400,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMain + 0.3,
  },

  body1: {
    fontFamily: fonts.poppins.poppins400,
    fontSize: 12,
    lineHeight: getLineHeight(12, 160),
    color: colors.textMain,
  },

  button: {
    fontFamily: fonts.poppins.poppins600,
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
  },
  activeTab: {
    fontFamily: fonts.roboto.roboto700,
    fontSize: 10,
    lineHeight: getLineHeight(10, 100),
    color: colors.white,
  },
  inActiveTab: {
    fontFamily: fonts.roboto.roboto400,
    fontSize: 10,
    lineHeight: getLineHeight(10, 100),
    color: colors.white,
  },
});
