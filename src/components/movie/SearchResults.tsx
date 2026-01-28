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
  fonts,
  getFontSize,
  getHeight,
  getWidth,
  textStyles,
} from '@/theme';
import { Movie } from '@/api/types';
import MovieSearchListItem from '../list/MovieSearchListItem';

interface Props {
  movies: Movie[] | undefined;
  isLoading?: boolean;
  isShowingResult?: boolean;
}

const SearchResults: FC<Props> = ({
  movies,
  isLoading = false,
  isShowingResult = false,
}) => {
  return (
    <View style={styles.container}>
      {isShowingResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>Top Results</Text>
        </View>
      )}

      <FlatList
        data={
          isLoading
            ? Array(5).fill({ id: 'skeleton' })
            : movies ?? [null, null, null, null, null]
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item?.id)}
        renderItem={({ item }) => <MovieSearchListItem movie={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={{ height: getHeight(20) }} />
        )}
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{'No movies available.'}</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(20),
    paddingBottom: getHeight(100),
  },
  resultContainer: {
    marginHorizontal: getWidth(20),
    color: colors.textMain,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMedium,
    paddingTop: getHeight(20),
  },
  title: {
    ...textStyles.h2,
    color: colors.textMain,
    paddingBottom: getHeight(10),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getHeight(50),
  },
  emptyText: {
    fontSize: getFontSize(16),
    color: colors.black,
    fontFamily: fonts.poppins.poppins500,
  },
});
