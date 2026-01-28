import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '@/api/constant';
import {
  colors,
  getBorderRadius,
  getHeight,
  getWidth,
  textStyles,
} from '@/theme';
import { Movie } from '@/api/types';
import routes from '@/navigation/routes';

import CustomSkeletonWrapper from '../common/CustomSkeletonWrapper';

interface Props {
  movie?: Movie | null;
  isLoading: boolean;
}

const MovieListItem: FC<Props> = ({ movie, isLoading }) => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const onLoadEnd = () => {
    setLoading(false);
  };
  const imageUri = movie?.backdrop_path
    ? IMAGE_BASE_URL + movie.backdrop_path
    : undefined;
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
            uri: imageUri,
          }}
          resizeMode="cover"
          style={styles.container}
          onLoadEnd={onLoadEnd}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={[styles.container, { justifyContent: 'flex-end' }]}
          >
            {loading && imageUri && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.secondary} />
              </View>
            )}
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
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
