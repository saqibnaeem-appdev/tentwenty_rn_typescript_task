import React, { FC, ReactNode } from 'react';
import { View, StatusBar, StyleSheet, ImageBackground } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface CustomContainerProps {
  children: ReactNode;
  backgroundColor?: string;
  backgroundImage?: any;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  statusBarColor?: string;
}

const CustomContainer: FC<CustomContainerProps> = ({
  children,
  backgroundColor = '#fff',
  backgroundImage,
  barStyle = 'default',
  statusBarColor = 'transparent',
}) => {
  const insets = useSafeAreaInsets();

  const Wrapper = backgroundImage ? ImageBackground : View;

  const safeAreaBackgroundColor = backgroundImage
    ? 'transparent'
    : statusBarColor && statusBarColor !== 'transparent'
    ? statusBarColor
    : backgroundColor;

  return (
    <Wrapper
      source={backgroundImage}
      resizeMode="cover"
      style={[
        styles.wrapper,
        { backgroundColor: backgroundImage ? undefined : backgroundColor },
      ]}
    >
      {backgroundImage && <View style={styles.overlay} />}

      <View
        style={{
          height: insets.top,
          backgroundColor: safeAreaBackgroundColor,
          zIndex: 1,
        }}
      />

      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={barStyle}
      />

      <SafeAreaView edges={['bottom']} style={styles.flex}>
        <View style={styles.flex}>{children}</View>
      </SafeAreaView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default CustomContainer;
