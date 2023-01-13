import {createStackNavigator} from 'react-navigation-stack';

import FavoritesScene from '../scenes/FavoritesScene';
import SongScene from '../scenes/SongScene';

const FavoritesStack = createStackNavigator({
  Favorites: {
    screen: FavoritesScene,
    navigationOptions: {
      headerShown: false,
    },
  },
  Song: {
    screen: SongScene,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default FavoritesStack;
