import React, {Component} from 'react';
import {Dimensions, Image, ImageBackground, View, Text} from 'react-native';
import TrackPlayer, {Capability, State} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

import * as ApiService from '../services/apiservice';
import UserService from '../services/userservice';

import FavoriteButton from '../components/favoritebutton';
import IconButton from '../components/iconbutton';
import UpNextButton from '../components/upnextbutton';

import * as Constants from '../util/constants';
import DurationDisplay from '../components/durationdisplay';

export default class ListenScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        images: {},
        playback: {},
      },
      iconName: Constants.icons.play,
      paused: true,
    };

    this.props.navigation.addListener(
      'didFocus',
      async () => await this.refresh()
    );

    TrackPlayer.addEventListener('remote-stop', () => {
      this.setState({paused: true, iconName: Constants.icons.play});
      TrackPlayer.stop();
    });

    TrackPlayer.addEventListener('remote-pause', () => {
      this.setState({paused: true, iconName: Constants.icons.play});
      TrackPlayer.stop();
    });
  }

  async componentDidMount() {
    await UserService.login();

    const nowPlaying = await this.getNowPlaying();

    this.setState({
      data: {...nowPlaying},
    });

    var that = this;

    const buffer = 0.5;

    await TrackPlayer.setupPlayer({
      playBuffer: buffer,
      minBuffer: buffer * 2,
      maxBuffer: buffer * 2,
      waitForBuffer: true,
    }).then(() => {
      TrackPlayer.updateOptions({
        capabilities: [Capability.Play],
        compactCapabilities: [Capability.Play],
        waitForBuffer: true,
      });
    });

    setTimeout(async function () {
      await that.updateNowPlaying();
    }, nowPlaying.playback.timeLeft);
  }

  async updateNowPlaying() {
    const nowPlaying = await this.getNowPlaying();

    var track = {
      title: nowPlaying.attractionAndSong,
      artist: nowPlaying.themeParkAndLand,
      artwork: nowPlaying.images.url,
    };

    this.setState({
      data: {...nowPlaying},
    });

    var that = this;

    const currentPlayerState = await TrackPlayer.getState();
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentPlayerState !== State.None && currentTrack !== 0) {
      TrackPlayer.updateMetadataForTrack(Constants.streamTrackId, track)
        .then(() => {})
        .catch(error => {
          console.log(error, 'Error updating track metadata');
        });
    }

    setTimeout(async function () {
      await that.updateNowPlaying();
    }, nowPlaying.playback.timeLeft * 1000);
  }

  getNowPlaying = async () => {
    const authInfoFromStorage = await AsyncStorage.getItem(
      Constants.settings.keys.authInfo
    );

    const authInfo =
      authInfoFromStorage != null ? JSON.parse(authInfoFromStorage) : null;

    const userId = authInfo.userId || 0;
    const sid = authInfo.sid || '';

    return await ApiService.getNowPlaying(userId, sid);
  };

  refresh = async () => {
    await this.updateNowPlaying();
  };

  toggle = async () => {
    var playState = await TrackPlayer.getState();
    const currentTrack = await TrackPlayer.getCurrentTrack();

    var track = {
      id: Constants.streamTrackId,
      url: Constants.streamUrls.hq,
      title: this.state.data.attractionAndSong,
      artist: this.state.data.themeParkAndLand,
      artwork: this.state.data.images.uabUrl,
    };

    if (currentTrack === 0) {
      await TrackPlayer.reset();

      await TrackPlayer.add([track]);
      await TrackPlayer.play();

      this.setState({
        paused: false,
        iconName: Constants.icons.pause,
        playLabel: Constants.icons.pause,
      });
    } else {
      if (playState !== TrackPlayer.STATE_PLAYING) {
        await TrackPlayer.play();
        this.setState({
          paused: false,
          iconName: Constants.icons.pause,
          playLabel: Constants.icons.pause,
        });
      } else {
        await TrackPlayer.stop();
        this.setState({
          paused: true,
          iconName: Constants.icons.play,
          playLabel: Constants.icons.play,
        });
      }
    }

    playState = await TrackPlayer.getState();
  };

  render() {
    console.log('ListenScene render');

    const nowPlaying = this.state.data;

    const requestorText =
      nowPlaying.requestor && nowPlaying.requestor !== ''
        ? `Requested by ${nowPlaying.requestor}`
        : '';

    const durationDisplay =
      nowPlaying.playback.durationDisplay !== undefined
        ? nowPlaying.playback.durationDisplay
        : '';

    const images = this.state.data.images;

    const timeLeft = nowPlaying.playback.timeLeft * 1000 || 30000;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{uri: images.blurredUrl}}
          fadeDuration={0}
          style={styles.imageBG}>
          <View style={styles.overlay} />
          <View style={styles.mainContent}>
            <Text style={styles.schedule}>{nowPlaying.schedule}</Text>
            <Image
              source={{uri: images.url}}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.themeParkAndLand}>
              {nowPlaying.themeParkAndLand}
            </Text>
            <Text style={styles.attractionAndSong}>
              {nowPlaying.attractionAndSong}
            </Text>
            <Text style={[styles.requestor, styles.standardText]}>
              {requestorText}
            </Text>
          </View>
          <View style={styles.bottom}>
            <DurationDisplay
              duration={nowPlaying.playback.duration}
              durationDisplay={durationDisplay || ''}
              timeLeft={timeLeft}
            />
            <IconButton onPress={this.toggle} icon={this.state.iconName} />
            <View style={styles.playback}>
              <UpNextButton upNext={nowPlaying.upNext} />
              <FavoriteButton isFavorite={nowPlaying.isFavorite} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  attractionAndSong: {
    color: Constants.colors.white,
    fontFamily: Constants.fonts.bold,
    fontSize: 24,
    margin: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  bottom: {
    alignItems: 'center',
    flex: 0,
    justifyContent: 'flex-end',
    marginBottom: 32,
    width: Dimensions.get('window').width * 0.9,
  },
  container: {
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width * 0.6,
  },
  imageBG: {
    alignItems: 'center',
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    marginTop: 8,
  },
  playback: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
  },
  playbackText: {
    marginHorizontal: 12,
    marginVertical: 16,
  },
  progressBar: {
    elevation: 1,
  },
  overlay: {
    backgroundColor: '#00000055',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  requestor: {
    fontSize: 18,
  },
  schedule: {
    color: Constants.colors.white,
    fontFamily: Constants.fonts.light,
    margin: 16,
    textAlign: 'center',
  },
  standardText: {
    color: Constants.colors.white,
    fontFamily: Constants.fonts.light,
    textAlign: 'center',
  },
  themeParkAndLand: {
    color: Constants.colors.gray,
    fontFamily: Constants.fonts.light,
    marginTop: 16,
    paddingHorizontal: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};
