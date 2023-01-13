import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as ApiService from '../services/apiservice';
import NotificationService from '../services/notificationservice.js';

import FavoriteButton from '../components/favoritebutton';
import TextButton from '../components/textbutton';

import * as Constants from '../util/constants';

export default class SongScene extends Component {
  constructor(props) {
    super(props);

    const song = this.props.navigation.getParam('item');
    const isRequested = this.props.navigation.getParam('isRequested');

    this.state = {
      isLoading: true,
      isRequested,
      isRequesting: false,
      requestId: song.requestId,
      song,
      songId: song.id,
    };
  }

  async componentDidMount() {
    await this.loadSong();
  }

  close = () => {
    this.props.navigation.goBack();
  };

  async loadSong() {
    const song = await ApiService.getSong(this.state.songId);

    this.setState({isLoading: false, song});
  }

  async requestSong() {
    this.setState({isRequesting: true});

    const authInfoFromStorage = await AsyncStorage.getItem(
      Constants.settings.keys.authInfo
    );

    const authInfo =
      authInfoFromStorage != null ? JSON.parse(authInfoFromStorage) : null;

    if (authInfo === null) {
      console.log('authInfo is null!');

      return;
    }

    const requestResult = await ApiService.request(
      this.state.songId,
      authInfo.userId,
      authInfo.sid
    );

    await this.loadSong();

    this.setState({isRequesting: false});

    requestResult.success
      ? NotificationService.showSuccessMessage(requestResult.message)
      : NotificationService.showErrorMessage(requestResult.message);
  }

  async deleteRequest() {
    this.setState({isRequesting: true});

    const authInfoFromStorage = await AsyncStorage.getItem(
      Constants.settings.keys.authInfo
    );

    const authInfo =
      authInfoFromStorage != null ? JSON.parse(authInfoFromStorage) : null;

    if (authInfo === null) {
      console.log('authInfo is null!');

      return;
    }

    const deleteRequestResult = await ApiService.deleteRequest(
      this.state.requestId,
      this.state.songId,
      authInfo.username,
      authInfo.userId,
      authInfo.sid
    );

    await this.loadSong();

    this.setState({isRequesting: false});

    deleteRequestResult.success
      ? NotificationService.showSuccessMessage('Request deleted!')
      : NotificationService.showErrorMessage(
          'Delete request failed. Please try again.'
        );
  }

  render() {
    const song = this.state.song;

    const enableRequestButton =
      !this.state.isRequesting &&
      !this.state.isLoading &&
      song !== null &&
      song.canRequest;

    return (
      <View style={styles.main}>
        {this.state.isLoading && song === null ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <View style={styles.main}>
            <View style={styles.mainContent}>
              <Image
                source={{uri: song.images.url}}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.themeParkAndLand}>
                {song.themeParkAndLand}
              </Text>
              <Text style={styles.attractionAndSong}>
                {song.attractionAndSong}
              </Text>
              <FavoriteButton darkMode={true} isFavorite={song.isFavorite} />
              <View style={styles.minorInfo}>
                {song.composer ? (
                  <Text style={styles.standardText}>
                    <Text style={styles.boldText}>Composer: </Text>
                    {song.composer}
                  </Text>
                ) : null}
                {song.playback && song.playback.durationDisplay ? (
                  <Text style={styles.standardText}>
                    <Text style={styles.boldText}>Duration: </Text>
                    {song.playback.durationDisplay}
                  </Text>
                ) : null}
                <Text style={styles.standardText}>
                  <Text style={styles.boldText}>Last played: </Text>
                  {song.lastPlayed} (PST)
                </Text>
                {song.year ? (
                  <Text style={styles.standardText}>
                    <Text style={styles.boldText}>Year: </Text>
                    {song.year}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={styles.bottom}>
              {this.state.isRequested ? (
                <TextButton
                  disabled={!this.state.isRequested}
                  onPress={() => this.deleteRequest()}
                  title={'Delete Request'}
                />
              ) : (
                <TextButton
                  disabled={!enableRequestButton}
                  onPress={() => this.requestSong()}
                  title={'Request'}
                />
              )}
              <TextButton onPress={() => this.close()} title={'Close'} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  attractionAndSong: {
    color: Constants.colors.black,
    fontFamily: Constants.fonts.bold,
    fontSize: 24,
    margin: 8,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  image: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width * 0.6,
  },
  loading: {
    color: '#000000',
    fontFamily: Constants.fonts.light,
    fontSize: 40,
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    marginTop: 8,
  },
  minorInfo: {
    borderTopColor: Constants.colors.gray,
    borderTopWidth: 1,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    textAlign: 'right',
  },
  standardText: {
    color: Constants.colors.black,
    fontFamily: Constants.fonts.normal,
    fontSize: 20,
    paddingBottom: 8,
  },
  themeParkAndLand: {
    color: Constants.colors.darkGray,
    fontFamily: Constants.fonts.light,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
