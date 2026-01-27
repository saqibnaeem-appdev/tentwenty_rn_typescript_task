import React, { FC } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, Text } from 'react-native';
import MovieListItem from './MovieListItem';
import { getHeight, colors, getWidth } from '@/theme';
import { Movie } from '@/api/types';
import { useUpcomingMovies } from '@/features/movies';

const MainFlatList: FC = () => {
  const { data, isLoading, isError, refetch } = useUpcomingMovies();

  const movies: Movie[] | undefined = data?.results;

  const renderItem = ({ item }: { item: Movie | null }) => (
    <MovieListItem movie={item} isLoading={isLoading} />
  );

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={movies ?? [null, null, null]}
      keyExtractor={(item, index) =>
        item?.id ? String(item.id) : `placeholder-${index}`
      }
      ItemSeparatorComponent={() => <View style={{ height: getHeight(20) }} />}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
      }
      ListFooterComponent={<View style={{ height: getHeight(200) }} />}
      ListEmptyComponent={
        !isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isError
                ? 'Failed to load movies. Pull down to retry.'
                : 'No movies available.'}
            </Text>
          </View>
        ) : null
      }
    />
  );
};

export default MainFlatList;

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: getHeight(30),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getHeight(50),
  },
  emptyText: {
    fontSize: 16,
    color: colors.black,
  },
});
