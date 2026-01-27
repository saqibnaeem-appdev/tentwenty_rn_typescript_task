import React, { FC, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackIcon, CrossIcon, SearchIcon } from '@/assets/svgs';
import {
  colors,
  getBorderRadius,
  getFontSize,
  getHeight,
  getWidth,
  textStyles,
} from '@/theme';

interface SearchBarProps extends TextInputProps {
  onClear: () => void;
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
  onClose: () => void;
  isSubmitted?: boolean;
  resultsCount?: number;
  onBack?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  isSearching,
  setIsSearching,
  onClear,
  onClose,
  isSubmitted,
  resultsCount = 0,
  onBack,
  ...textInputProps
}) => {
  const textInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (isSearching && !isSubmitted) {
      setTimeout(() => textInputRef.current?.focus(), 100);
    }
  }, [isSearching, isSubmitted]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {isSubmitted ? (
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBack} style={{ padding: 5 }}>
              <BackIcon
                // width={getWidth(20)}
                // height={getHeight(20)}
                color={colors.black}
              />
            </TouchableOpacity>
            <Text style={styles.resultsText}>{resultsCount} Results Found</Text>
          </View>
        ) : isSearching ? (
          <View style={styles.searchContainer}>
            <SearchIcon />
            <TextInput
              ref={textInputRef}
              placeholder="TV shows, movies and more"
              style={[textStyles.h4, { width: getWidth(220) }]}
              {...textInputProps}
              placeholderTextColor={colors.placeholderColor}
            />

            <TouchableOpacity
              onPress={() => {
                onClear();
              }}
            >
              <CrossIcon width={getWidth(30)} height={getHeight(30)} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={[textStyles.h3, styles.heading]}>Watch</Text>

            <TouchableOpacity onPress={() => setIsSearching(true)}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    top: getHeight(10),
  },
  heading: {
    fontSize: getFontSize(16),
    color: colors.black,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.searchBackground,
    height: getHeight(52),
    width: getWidth(334),
    borderRadius: getBorderRadius(30),
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  headerContainer: {
    // paddingVertical: getHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
  resultsText: {
    ...textStyles.h3,
    color: colors.black,
    fontSize: getFontSize(16),
  },
});
