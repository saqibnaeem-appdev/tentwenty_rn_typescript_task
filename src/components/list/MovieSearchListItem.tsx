import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Movie } from '@/api/types';
import { IMAGE_BASE_URL } from '@/api/constant';
import { colors, getFontSize, getHeight, getWidth, textStyles } from '@/theme';
import { ThreeDots } from '@/assets/svgs';
import routes from '@/navigation/routes';
import { useGenres } from '@/features/movies';
import CustomSkeletonWrapper from '../common/CustomSkeletonWrapper';

interface Props {
  movie?: Movie | null;
}

const MovieSearchListItem: FC<Props> = ({ movie }) => {
  const navigation = useNavigation<any>();
  const { data: genresData } = useGenres();
  const [loading, setLoading] = useState<boolean>(true);
  const onLoadEnd = () => {
    setLoading(false);
  };
  const hasImage = !!movie?.backdrop_path;

  const getGenreName = (ids: number[]) => {
    if (!ids || ids.length === 0 || !genresData?.genres) return '';
    const genre = genresData.genres.find(g => g.id === ids[0]);
    return genre ? genre.name : 'Unknown';
  };
  const imageUri = hasImage ? IMAGE_BASE_URL + movie.backdrop_path : undefined;

  return (
    <CustomSkeletonWrapper isLoading={!movie} style={styles.container}>
      {movie ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.movieDetailScreen, {
              id: movie.id,
            } as never)
          }
          activeOpacity={0.7}
          style={styles.container}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUri }}
              resizeMode="cover"
              style={styles.image}
              onLoadEnd={onLoadEnd}
            />
            {loading && imageUri && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color={colors.secondary} />
              </View>
            )}
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {movie.title}
            </Text>
            <Text style={styles.genre}>{getGenreName(movie.genre_ids)}</Text>
          </View>

          <TouchableOpacity style={styles.optionsButton}>
            <ThreeDots
              color={colors.secondary || '#61C3F2'}
              width={getWidth(20)}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : null}
    </CustomSkeletonWrapper>
  );
};

export default MovieSearchListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: getHeight(103), // Adjust as needed
    alignSelf: 'center',
    marginBottom: getHeight(10),
  },
  imageContainer: {
    width: getWidth(130),
    height: getHeight(100),
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: getWidth(15),
    backgroundColor: colors.grayMedium,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: getHeight(5),
  },
  title: {
    ...textStyles.h3,
    fontSize: getFontSize(16),
    color: colors.black,
  },
  genre: {
    ...textStyles.h4,
    fontSize: getFontSize(12),
    color: colors.inActiveTab || '#DBDBDF',
  },
  optionsButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
