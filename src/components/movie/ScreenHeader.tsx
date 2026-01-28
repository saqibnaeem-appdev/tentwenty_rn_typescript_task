import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';

import { BackIcon } from '@/assets/svgs';
import { colors, getFontSize, getHeight, getWidth, textStyles } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenHeaderProps {
  title: string;
  description?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  description,
  onPress,
}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.mainHeaderView}>
        <View style={styles.rowView}>
          <TouchableOpacity onPress={onPress} hitSlop={10}>
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.centerContent}>
            <Text style={[textStyles.h3, styles.title]} numberOfLines={1}>
              {title}
            </Text>

            {description ? (
              <Text
                style={[textStyles.h3, styles.description]}
                numberOfLines={1}
              >
                {description}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  mainHeaderView: {
    paddingHorizontal: getWidth(5),
    backgroundColor: colors.white,
    marginVertical: getHeight(10),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
  centerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(16),
    color: colors.black,
    width: getWidth(300),
  },
  description: {
    fontSize: getFontSize(12),
    color: colors.secondary,
    width: getWidth(300),
  },
});
