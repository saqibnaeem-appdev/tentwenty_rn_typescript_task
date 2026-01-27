import React, { FC } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  colors,
  getBorderRadius,
  getFontSize,
  getHeight,
  getWidth,
  textStyles,
} from '@/theme';
import { useGenres } from '@/features/movies';
import CustomSkeletonWrapper from '../common/CustomSkeletonWrapper';

const GENRE_COLORS = [
  '#E2B255',
  '#D1C8C8',
  '#4F8498',
  '#9C8F8F',
  '#6A5151',
  '#C67C7C',
  '#8D8D8D',
  '#415A77',
  '#778DA9',
  '#1B263B',
];

interface Props {
  onSelectGenre: (genre: string) => void;
}

const CategoryGrid: FC<Props> = ({ onSelectGenre }) => {
  const { data, isLoading } = useGenres();
  const genresList = data?.genres || [];

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          isLoading
            ? Array.from({ length: 10 }, (_, index) => ({
                id: `skeleton-${index}`,
              }))
            : genresList
        }
        keyExtractor={(item, index) => String(item.id) || `skeleton-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: getHeight(100) }}
        ItemSeparatorComponent={() => (
          <View style={{ height: getHeight(10) }} />
        )}
        renderItem={({ item, index }) => (
          <CustomSkeletonWrapper
            isLoading={isLoading}
            borderRadius={getBorderRadius(10)}
            style={styles.itemContainer}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => item.name && onSelectGenre(item.name)}
              style={[
                styles.itemContainer,
                { backgroundColor: GENRE_COLORS[index % GENRE_COLORS.length] },
              ]}
              disabled={isLoading}
            >
              <Text
                style={[
                  textStyles.h3,
                  {
                    fontSize: getFontSize(16),
                    alignSelf: 'flex-start',
                    paddingTop: 20,
                  },
                ]}
              >
                {item.name || ''}
              </Text>
            </TouchableOpacity>
          </CustomSkeletonWrapper>
        )}
      />
    </View>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    backgroundColor: colors.searchBackground,
  },
  itemContainer: {
    width: getWidth(163),
    height: getHeight(100),
    borderRadius: getBorderRadius(10),
    justifyContent: 'center',
    paddingHorizontal: getWidth(15),
    overflow: 'hidden',
  },
});
