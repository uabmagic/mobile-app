import React from 'react';
import {StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Constants from '../util/constants';

const FavoriteButton = props => {
  // const [isFavorite, setFavorite] = useState(false);

  // const toggleChecked
  // const [isRealSong, setIsRealSong] = useState(true);

  // useEffect(() => {
  //   async function getIsFavorite() {
  //     const favoritesFromStorage = await AsyncStorage.getItem(
  //       Constants.settings.keys.favorites
  //     );

  //     const favorites =
  //       favoritesFromStorage != null ? JSON.parse(favoritesFromStorage) : null;

  //     setFavorite(favorites !== null && favorites.includes(props.songId));
  //   }

  //   getIsFavorite();

  //   setIsRealSong(props.songId !== 0);
  // }, [props.songId]);

  // const onPress = async () => {
  //   const favoritesFromStorage = await AsyncStorage.getItem(
  //     Constants.settings.keys.favorites
  //   );

  //   let favorites =
  //     favoritesFromStorage != null ? JSON.parse(favoritesFromStorage) : null;

  //   if (favorites === null) {
  //     console.log('favorites is null');
  //     return;
  //   }

  //   if (isFavorite) {
  //     favorites = favorites.filter(f => f !== props.songId);
  //   } else {
  //     favorites.push(props.songId);
  //   }

  //   setFavorite(!isFavorite);

  //   await AsyncStorage.setItem(
  //     Constants.settings.keys.favorites,
  //     JSON.stringify(favorites)
  //   );
  // };

  return (
    // <Pressable disabled={!isRealSong} onPress={onPress} style={styles.button}>
    //   <MaterialCommunityIcons
    //     style={[
    //       styles.icon,
    //       props.darkMode ? styles.darkIcon : styles.lightIcon,
    //     ]}
    //     name={isFavorite ? Constants.icons.heart : Constants.icons.heartOutline}
    //   />
    // </Pressable>
    <MaterialCommunityIcons
      style={[styles.icon, props.darkMode ? styles.darkIcon : styles.lightIcon]}
      name={
        props.isFavorite ? Constants.icons.heart : Constants.icons.heartOutline
      }
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    elevation: 3,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  darkIcon: {
    color: Constants.colors.red,
  },
  icon: {
    fontSize: 22,

    alignItems: 'center',
    alignSelf: 'flex-end',
    elevation: 3,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  lightIcon: {
    color: Constants.colors.white,
  },
});

export default FavoriteButton;
