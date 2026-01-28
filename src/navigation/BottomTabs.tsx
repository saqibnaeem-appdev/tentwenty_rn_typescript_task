import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
  DashboardScreen,
  MediaLibraryScreen,
  MoreScreen,
} from '@/features/movies';
import WatchStack from './WatchStack';
import type { BottomTabParamList } from './types';
import {
  DashboardIcon,
  MediaLibraryIcon,
  MoreIcon,
  WatchIcon,
} from '@/assets/svgs';
import { colors, getBorderRadius, getHeight } from '@/theme';
import { textStyles } from '@/theme/textStyles';
import routes from './routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const ICON_SIZE = 18;
const ICON_SIZE_INACTIVE = 16;
const TAB_BAR_HEIGHT = 75;
const TAB_BAR_BORDER_RADIUS = 27;

const BottomTabs: React.FC = () => {
  const screenOptions = ({
    route,
  }: {
    route: { name: keyof BottomTabParamList };
  }): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarActiveTintColor: colors.activeTab,
    tabBarInactiveTintColor: colors.inActiveTab,
    tabBarStyle: {
      backgroundColor: colors.bottomTabBackground,
      borderTopLeftRadius: getBorderRadius(TAB_BAR_BORDER_RADIUS),
      borderTopRightRadius: getBorderRadius(TAB_BAR_BORDER_RADIUS),
      height: getHeight(TAB_BAR_HEIGHT),
      position: 'absolute',
      bottom: 0,
      borderTopWidth: 0,
      paddingTop: getHeight(8),
      display: (
        [
          routes.movieDetailScreen,
          routes.trailerPlayerScreen,
          routes.seatSelectionScreen,
          routes.ticketBookingScreen,
        ] as string[]
      ).includes(getFocusedRouteNameFromRoute(route) ?? '')
        ? 'none'
        : 'flex',
    },
    tabBarItemStyle: {
      paddingTop: getHeight(5),
    },
    tabBarIcon: ({ color, focused }) => {
      const iconSize = focused ? ICON_SIZE : ICON_SIZE_INACTIVE;
      const iconProps = {
        color,
        width: iconSize,
        height: iconSize,
      };

      switch (route.name) {
        case 'DashboardScreen':
          return <DashboardIcon {...iconProps} />;
        case 'WatchStack':
          return <WatchIcon {...iconProps} />;
        case 'MediaLibraryScreen':
          return <MediaLibraryIcon {...iconProps} />;
        case 'MoreScreen':
          return <MoreIcon {...iconProps} />;
        default:
          return null;
      }
    },
    tabBarLabel: ({ focused }) => {
      const labelMap: Record<keyof BottomTabParamList, string> = {
        DashboardScreen: 'Dashboard',
        WatchStack: 'Watch',
        MediaLibraryScreen: 'Media Library',
        MoreScreen: 'More',
      };

      return (
        <Text style={focused ? textStyles.activeTab : textStyles.inActiveTab}>
          {labelMap[route.name]}
        </Text>
      );
    },
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bottomTabBackground }}
      edges={['bottom']}
    >
      <Tab.Navigator
        screenOptions={screenOptions}
        initialRouteName={routes.watchStack}
      >
        <Tab.Screen name={routes.dashboardScreen} component={DashboardScreen} />
        <Tab.Screen name={routes.watchStack} component={WatchStack} />
        <Tab.Screen
          name={routes.mediaLibraryScreen}
          component={MediaLibraryScreen}
        />
        <Tab.Screen name={routes.moreScreen} component={MoreScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabs;
