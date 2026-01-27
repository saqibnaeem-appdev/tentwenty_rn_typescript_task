import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { colors, getHeight, getWidth, textStyles } from '@/theme';
import { PlayIcon } from '@/assets/svgs';

interface AppButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary';
  title: string;
  width?: number;
}

const AppButton: FC<AppButtonProps> = ({
  variant = 'primary',
  width,
  title,
  style,
  ...extra
}) => {
  const containerStyle: ViewStyle[] = [
    styles.container,
    { width: width ?? getWidth(253) },
    variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer,
    style as ViewStyle,
  ];

  const textStyle: TextStyle[] = [
    textStyles.h2 as TextStyle,
    { color: colors.white },
  ];

  return (
    <TouchableOpacity activeOpacity={0.7} style={containerStyle} {...extra}>
      <View style={styles.content}>
        {variant === 'secondary' && (
          <View style={styles.iconContainer}>
            <PlayIcon width={20} height={20} fill={colors.secondary} />
          </View>
        )}

        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    height: getHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: colors.secondary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: getWidth(10),
  },
  primaryContainer: {
    backgroundColor: colors.secondary,
  },
  secondaryContainer: {
    backgroundColor: 'transparent',
  },
});
