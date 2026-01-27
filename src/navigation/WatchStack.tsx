import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MovieDetailScreen,
  MovieListScreen,
  SearchScreen,
  SeatSelectionScreen,
  TrailerPlayerScreen,
} from '@/features/movies';
import { WatchStackParamList } from './types';

const Stack = createNativeStackNavigator<WatchStackParamList>();

const WatchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen
        name="SeatSelectionScreen"
        component={SeatSelectionScreen}
      />
    </Stack.Navigator>
  );
};

export default WatchStack;
