import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { BackIcon } from '@/assets/svgs';

const MovieDetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const navigation = useNavigation<any>();
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

  const getRandomColor: () => string = () => {
    const colorPalette = [
      colors.primary,
      colors.error,
      colors.secondary,
      colors.warning,
      colors.success,
      colors.teal,
    ];

    const randomIndex = Math.floor(Math.random() * colorPalette.length);

    return colorPalette[randomIndex];
  };
  return (
    <ScrollView
      contentContainerStyle={[
        styles.screenContainer,
        { flexDirection: isLandscape ? 'row' : 'column' },
      ]}
    >
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <CustomSkeletonWrapper
        isLoading={isLoading}
        style={{ height: getHeight(359) }}
      >
        <ImageBackground
          resizeMode="stretch"
          style={styles.imageContainer}
          source={{ uri: IMAGE_BASE_URL + backdropPath }}
        >
          <View style={styles.fullOverlay} />

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <BackIcon color={colors.white} />
              <Text style={styles.watchText}>Watch</Text>
            </TouchableOpacity>
          </View>

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
                  navigation.navigate(routes.ticketBookingScreen, {
                    movieId: id,
                    movieTitle: movieDetail?.title,
                    date: movieDetail?.release_date,
                  })
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

      <View style={styles.contentContainer}>
        <CustomSkeletonWrapper
          isLoading={isLoading}
          style={{
            height: getHeight(100),
            width: getWidth(360),
            alignSelf: 'center',
          }}
        >
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
        </CustomSkeletonWrapper>
        <CustomSkeletonWrapper
          isLoading={isLoading}
          style={{
            height: getHeight(200),
            width: getWidth(360),
            alignSelf: 'center',
          }}
        >
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
        </CustomSkeletonWrapper>
      </View>
      <VideoPlayer
        visible={videoUrl !== undefined}
        onClose={() => setVideoUrl(undefined)}
        videoKey={videoUrl ?? ''}
      />
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    height: getHeight(359),
    paddingBottom: getHeight(20),
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    alignItems: 'center',
    paddingBottom: 20,
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1,
  },
  fullOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  header: {
    marginTop: getHeight(50),
    paddingHorizontal: getWidth(20),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  watchText: {
    ...textStyles.h3,
    color: colors.white,
    fontSize: getFontSize(16),
  },
});
