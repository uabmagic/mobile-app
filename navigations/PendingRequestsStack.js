import {createStackNavigator} from 'react-navigation-stack';

import PendingRequestsScene from '../scenes/PendingRequestsScene';
import SongScene from '../scenes/SongScene';

const PendingRequestsStack = createStackNavigator({
  PendingRequests: {
    screen: PendingRequestsScene,
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

export default PendingRequestsStack;
