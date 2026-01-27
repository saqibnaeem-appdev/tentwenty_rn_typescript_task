import { NavigatorScreenParams } from '@react-navigation/native';

export type WatchStackParamList = {
  MovieListScreen: undefined;
  MovieDetailScreen: { id: number };
  SearchScreen: undefined;
  SeatSelectionScreen: {
    movieId: number;
    title: string;
    posterPath: string;
    date: string;
    time: string;
  };
  TrailerPlayerScreen: { videoId: string };
};

export type BottomTabParamList = {
  DashboardScreen: undefined;
  WatchStack: NavigatorScreenParams<WatchStackParamList>;
  MediaLibraryScreen: undefined;
  MoreScreen: undefined;
};

export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
