import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '@/theme';

const DasboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DasboardScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
export default DasboardScreen;
