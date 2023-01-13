import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

import FavoriteButton from '../components/favoritebutton';

import NavigationService from '../services/navigationservice.js';

import * as Constants from '../util/constants';

const SongList = props => {
  const [refreshing] = useState(false);

  const songSelected = item => {
    const isRequested = props.songsRequested;

    NavigationService.navigate('Song', {item, isRequested}, `Song${item.id}`);
  };

  const renderItem = item => {
    return (
      <ListItem bottomDivider key={item.id} onPress={() => songSelected(item)}>
        <Avatar source={{uri: item.images.uabUrl}} />
        <ListItem.Content>
          <ListItem.Title style={styles.text}>
            {item.attractionAndSong}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.text}>
            {item.themeParkAndLand}
          </ListItem.Subtitle>
        </ListItem.Content>
        <FavoriteButton darkMode={true} isFavorite={item.isFavorite} />
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {props.isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="#3a98ba" animating={true} />
          </View>
        ) : (
          <FlatList
            data={props.results}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                colors={[Constants.colors.UABBlue]}
                onRefresh={props.loadData}
                refreshing={refreshing}
              />
            }
            renderItem={({item}) => renderItem(item)}
            ListEmptyComponent={() => (
              <View style={styles.noResults}>
                <Text>{props.noResultsText}</Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    height: 50,
    marginRight: 8,
    width: 50,
  },
  noResults: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  subtitle: {
    color: Constants.colors.gray,
    fontSize: 10,
  },
  text: {
    fontFamily: Constants.fonts.slightlyBold,
  },
  title: {
    color: Constants.colors.white,
    fontSize: 14,
  },
});

export default SongList;
