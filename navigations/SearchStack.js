import {createStackNavigator} from 'react-navigation-stack';

import SearchScene from '../scenes/SearchScene';
import SongScene from '../scenes/SongScene';

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScene,
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

export default SearchStack;
