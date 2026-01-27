import React, { FC } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, getFontSize, getHeight, getWidth, textStyles } from '@/theme';
import { Movie } from '@/api/types';
import MovieSearchListItem from '../list/MovieSearchListItem';

interface Props {
  movies: Movie[] | undefined;
  isLoading?: boolean;
}

const SearchResults: FC<Props> = ({ movies, isLoading = false }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={
          isLoading
            ? Array(5).fill({ id: 'skeleton' })
            : movies ?? [null, null, null, null, null]
        }
        keyExtractor={item => String(item?.id)}
        renderItem={({ item }) => <MovieSearchListItem movie={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={{ height: getHeight(20) }} />
        )}
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
  },
});
