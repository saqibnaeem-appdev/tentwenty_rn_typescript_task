import { NavigatorScreenParams } from '@react-navigation/native';

export type WatchStackParamList = {
  MovieListScreen: undefined;
  MovieDetailScreen: { id: number };
  SearchScreen: undefined;
  TicketBookingScreen: {
    movieId: number;
    movieTitle: string;
    date: string;
  };
  SeatSelectionScreen: {
    movieTitle: string;
    dateString: string;
    hall: string;
    price?: number;
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
