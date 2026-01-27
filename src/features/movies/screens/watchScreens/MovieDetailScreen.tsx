import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  useMovieDetails,
  useMovieImages,
  useMovieVideos,
} from '@/features/movies';
import { IMAGE_BASE_URL } from '@/api/constant';
import { AppButton, CustomSkeletonWrapper, VideoPlayer } from '@/components';
import routes from '@/navigation/routes';
import useOrientation from '../../hooks/useOrientation';
import { colors, getFontSize, getHeight, getWidth, textStyles } from '@/theme';

const MovieDetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const isLandscape = useOrientation();

  const [videoUrl, setVideoUrl] = useState<string | undefined>();

  const { data: movieDetail, isLoading } = useMovieDetails(id);
  const { data: movieImages } = useMovieImages(id);
  const { data: movieVideos } = useMovieVideos(id);

  const trailerKey = movieVideos?.results?.[0]?.key;

  const backdropPath =
    movieImages?.backdrops?.[1]?.file_path ?? movieDetail?.backdrop_path;

  const handleWatchTrailer = useCallback(() => {
    if (trailerKey) {
      setVideoUrl(trailerKey);
    }
  }, [trailerKey]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.loader}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  const getRandomColor: () => string = () => {
    const colors = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F'];

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  };
  return (
    <ScrollView
      contentContainerStyle={[
        styles.screenContainer,
        { flexDirection: isLandscape ? 'row' : 'column' },
      ]}
    >
      <CustomSkeletonWrapper
        isLoading={isLoading}
        style={{ height: getHeight(359) }}
      >
        <ImageBackground
          resizeMode="stretch"
          style={styles.imageContainer}
          source={{ uri: IMAGE_BASE_URL + backdropPath }}
        >
          <View style={styles.imageOverlay}>
            <Text style={[textStyles.h2, { fontSize: getFontSize(16) }]}>
              In theaters{' '}
              {movieDetail?.release_date &&
                new Date(movieDetail.release_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
            </Text>
            <View style={styles.buttonContainer}>
              <AppButton
                title="Get Tickets"
                variant="primary"
                onPress={() =>
                  navigation.navigate(routes.seatSelectionScreen as never)
                }
              />

              <AppButton
                title="Watch Trailer"
                variant="secondary"
                onPress={handleWatchTrailer}
              />
            </View>
          </View>
        </ImageBackground>
      </CustomSkeletonWrapper>
      <CustomSkeletonWrapper
        isLoading={isLoading}
        style={{
          height: getHeight(100),
          width: getWidth(360),
          alignSelf: 'center',
        }}
      >
        <View style={styles.contentContainer}>
          <Text style={[textStyles.h3, { color: colors.textMain }]}>
            Genres
          </Text>

          <View style={styles.genresContainer}>
            {movieDetail?.genres?.map(item => (
              <View
                key={item.id}
                style={[
                  styles.genreaItem,
                  { backgroundColor: getRandomColor() },
                ]}
              >
                <Text
                  style={[
                    textStyles.h2,
                    { color: colors.white, fontSize: getFontSize(12) },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          <Text
            style={[
              textStyles.h3,
              { color: colors.textMain, marginVertical: getHeight(10) },
            ]}
          >
            Overview
          </Text>
          <Text style={[textStyles.h4, { color: colors.grayMedium }]}>
            {movieDetail?.overview}
          </Text>
        </View>
      </CustomSkeletonWrapper>
      <VideoPlayer
        visible={videoUrl !== undefined}
        onClose={() => setVideoUrl(undefined)}
        videoKey={videoUrl ?? ''}
      />

      {/* <VideoPlayer
        visible={!!videoUrl}
        onClose={() => setVideoUrl(undefined)}
        videoKey={videoUrl ?? ''}
      /> */}
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    height: getHeight(359),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    paddingBottom: 20,
    justifyContent: 'flex-end',
    gap: 5,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: getHeight(20),
    paddingHorizontal: getWidth(20),
  },
  genresContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: getWidth(20),
    borderBottomWidth: 1,
    borderColor: colors.grayLight,
    flexWrap: 'wrap',
    marginBottom: getHeight(10),
  },
  genreaItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    gap: getHeight(10),
  },
});
