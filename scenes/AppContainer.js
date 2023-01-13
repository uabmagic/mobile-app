import React from 'react';
import {Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FavoritesStack from '../navigations/FavoritesStack';
import ListenScene from '../scenes/ListenScene';
import PendingRequestsStack from '../navigations/PendingRequestsStack';
import SearchStack from '../navigations/SearchStack';
import SettingsScene from '../scenes/SettingsScene';

import * as Constants from '../util/constants';

const TabNavigator = createBottomTabNavigator(
  {
    Listen: ListenScene,
    Search: SearchStack,
    PendingRequests: PendingRequestsStack,
    Favorites: FavoritesStack,
    Settings: SettingsScene,
  },
  {
    initialRouteName: 'Listen',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName = Constants.icons.headphones;
        let label = 'Listen';

        if (routeName === 'Search') {
          iconName = Constants.icons.magnify;
          label = 'Search';
        } else if (routeName === 'PendingRequests') {
          iconName = Constants.icons.playlistPlus;
          label = 'Requests';
        } else if (routeName === 'Favorites') {
          iconName = Constants.icons.heartOutline;
          label = 'Favorites';
        } else if (routeName === 'Settings') {
          iconName = Constants.icons.cog;
          label = 'Settings';
        }

        return (
          <>
            <MaterialCommunityIcons
              name={iconName}
              size={25}
              color={tintColor}
            />
            <Text
              style={{color: tintColor, fontFamily: Constants.fonts.normal}}>
              {label}
            </Text>
          </>
        );
      },
    }),
    tabBarOptions: {
      adaptive: false,
      activeTintColor: Constants.colors.UABBlue,
      inactiveTintColor: Constants.colors.lightGray,
      showLabel: false,
      style: {
        backgroundColor: Constants.colors.white,
      },
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
