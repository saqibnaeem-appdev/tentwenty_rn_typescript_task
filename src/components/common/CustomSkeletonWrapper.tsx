import React, { FC, useRef, useEffect } from 'react';
import { View, Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { colors, getBorderRadius } from '@/theme';

interface CustomSkeletonWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shimmerBackgroundColor?: string;
  borderRadius?: number;
}

const CustomSkeletonWrapper: FC<CustomSkeletonWrapperProps> = ({
  isLoading,
  children,
  style,
  shimmerBackgroundColor = colors.grayMedium,
  borderRadius = getBorderRadius(10),
}) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isLoading) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(shimmerValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      );
      animation.start();
    }

    return () => {
      animation?.stop();
    };
  }, [isLoading, shimmerValue]);

  const backgroundColor = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [shimmerBackgroundColor, colors.grayLight],
  });

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <Animated.View
      style={[
        styles.skeletonContainer,
        { backgroundColor, borderRadius },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    width: '100%',
    height: 180,
    marginVertical: 8,
  },
});

export default CustomSkeletonWrapper;
