import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '@/theme';

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MoreScreen</Text>
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
export default MoreScreen;
