import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';

import { BackIcon } from '@/assets/svgs';
import { colors, getFontSize, getWidth, textStyles } from '@/theme';

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
    <View style={styles.mainHeaderView}>
      <View style={styles.rowView}>
        <TouchableOpacity onPress={onPress} hitSlop={10}>
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.centerContent}>
          <Text style={[textStyles.h3, styles.title]}>{title}</Text>

          {description ? (
            <Text style={[textStyles.h3, styles.description]}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  mainHeaderView: {
    paddingHorizontal: getWidth(5),
    paddingVertical: getWidth(2),
    backgroundColor: colors.white,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
  centerContent: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: getFontSize(16),
    color: colors.black,
  },
  description: {
    fontSize: getFontSize(12),
    color: colors.secondary,
  },
});
