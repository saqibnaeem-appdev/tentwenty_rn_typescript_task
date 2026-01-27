import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '@/api/constant';
import { getBorderRadius, getHeight, getWidth, textStyles } from '@/theme';
import { Movie } from '@/api/types';
import routes from '@/navigation/routes';

import CustomSkeletonWrapper from '../common/CustomSkeletonWrapper';

interface Props {
  movie?: Movie | null;
  isLoading: boolean;
}

const MovieListItem: FC<Props> = ({ movie, isLoading }) => {
  const navigation = useNavigation();

  return (
    <CustomSkeletonWrapper
      isLoading={isLoading}
      style={{
        height: getHeight(180),
        borderRadius: getBorderRadius(10),
        width: '92%',
        alignSelf: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.movieDetailScreen, { id: movie?.id })
        }
        activeOpacity={0.8}
        style={{
          width: '92%',
          alignSelf: 'center',
        }}
      >
        <ImageBackground
          source={{
            uri: movie?.backdrop_path
              ? IMAGE_BASE_URL + movie.backdrop_path
              : undefined,
          }}
          resizeMode="cover"
          style={styles.container}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={[styles.container, { justifyContent: 'flex-end' }]}
          >
            <Text style={[textStyles.h3, { padding: getWidth(20) }]}>
              {movie?.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </CustomSkeletonWrapper>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    height: getHeight(180),
    borderRadius: getBorderRadius(10),
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});
