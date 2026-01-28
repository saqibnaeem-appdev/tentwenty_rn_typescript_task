// import React, { FC, useEffect, useRef, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TextInputProps,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { BackIcon, CrossIcon, SearchIcon } from '@/assets/svgs';
// import {
//   colors,
//   getBorderRadius,
//   getFontSize,
//   getHeight,
//   getWidth,
//   textStyles,
// } from '@/theme';

// interface SearchBarProps extends TextInputProps {
//   onClear: () => void;
//   isSearching: boolean;
//   setIsSearching: (val: boolean) => void;
//   onClose: () => void;
//   isSubmitted?: boolean;
//   resultsCount?: number;
//   onBack?: () => void;
// }

// const SearchBar: FC<SearchBarProps> = ({
//   isSearching,
//   setIsSearching,
//   onClear,
//   onClose,
//   isSubmitted,
//   resultsCount = 0,
//   onBack,
//   ...textInputProps
// }) => {
//   const textInputRef = useRef<TextInput | null>(null);

//   useEffect(() => {
//     if (isSearching && !isSubmitted) {
//       setTimeout(() => textInputRef.current?.focus(), 100);
//     }
//   }, [isSearching, isSubmitted]);

//   return (
//     <SafeAreaView edges={['top']} style={styles.safeArea}>
//       <View style={styles.container}>
//         {isSubmitted ? (
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={onBack} style={{ padding: 5 }}>
//               <BackIcon
//                 // width={getWidth(20)}
//                 // height={getHeight(20)}
//                 color={colors.black}
//               />
//             </TouchableOpacity>
//             <Text style={styles.resultsText}>{resultsCount} Results Found</Text>
//           </View>
//         ) : isSearching ? (
//           <View style={styles.searchContainer}>
//             <SearchIcon />
//             <TextInput
//               ref={textInputRef}
//               placeholder="TV shows, movies and more"
//               style={[textStyles.h4, { width: getWidth(220) }]}
//               {...textInputProps}
//               placeholderTextColor={colors.placeholderColor}
//             />

//             <TouchableOpacity
//               onPress={() => {
//                 onClear();
//               }}
//             >
//               <CrossIcon width={getWidth(30)} height={getHeight(30)} />
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.contentContainer}>
//             <Text style={[textStyles.h3, styles.heading]}>Watch</Text>

//             <TouchableOpacity onPress={() => setIsSearching(true)}>
//               <SearchIcon />
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SearchBar;

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderColor,
//   },

//   container: {
//     // paddingHorizontal: '5%',
//     backgroundColor: colors.error,
//     marginVertical: getHeight(10),
//   },
//   contentContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignContent: 'center',
//     alignItems: 'center',
//     top: getHeight(10),
//   },
//   heading: {
//     fontSize: getFontSize(16),
//     color: colors.black,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: colors.searchBackground,
//     height: getHeight(52),
//     width: getWidth(334),
//     borderRadius: getBorderRadius(30),
//     borderWidth: 1,
//     borderColor: colors.borderColor,
//     alignContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     justifyContent: 'space-around',
//   },
//   headerContainer: {
//     // paddingVertical: getHeight(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   resultsText: {
//     ...textStyles.h3,
//     color: colors.black,
//     fontSize: getFontSize(16),
//   },
// });
import React, { FC, useEffect, useRef } from 'react';
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
      const timer = setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isSearching, isSubmitted]);

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {isSubmitted ? (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={styles.iconHit}>
            <BackIcon color={colors.black} />
          </TouchableOpacity>

          <Text style={styles.resultsText}>{resultsCount} Results Found</Text>
        </View>
      ) : isSearching ? (
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <SearchIcon />

            <TextInput
              ref={textInputRef}
              placeholder="TV shows, movies and more"
              style={[textStyles.h4, styles.input]}
              placeholderTextColor={colors.placeholderColor}
              {...textInputProps}
            />

            <TouchableOpacity onPress={onClear} style={styles.iconHit}>
              <CrossIcon width={getWidth(24)} height={getHeight(24)} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={[textStyles.h3, styles.heading]}>Watch</Text>

          <TouchableOpacity
            onPress={() => setIsSearching(true)}
            style={styles.iconHit}
          >
            <SearchIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
    // </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  container: {
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: getHeight(10),
  },

  heading: {
    fontSize: getFontSize(16),
    color: colors.black,
  },

  searchWrapper: {
    alignItems: 'center',
    marginVertical: getHeight(10),
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.searchBackground,
    height: getHeight(50),
    width: '100%',
    borderRadius: getBorderRadius(30),
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    paddingHorizontal: getWidth(12),
  },

  input: {
    flex: 1,
    marginHorizontal: getWidth(8),
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getHeight(10),
  },

  resultsText: {
    ...textStyles.h3,
    color: colors.black,
    fontSize: getFontSize(16),
    marginLeft: getWidth(8),
  },

  iconHit: {
    padding: getWidth(6),
  },
});
