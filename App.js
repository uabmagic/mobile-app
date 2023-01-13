import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';

import AppContainer from './scenes/AppContainer';

import NavigationService from './services/navigationservice.js';

import * as Constants from './util/constants';

class App extends Component {
  async componentDidMount() {
    try {
      await messaging().requestPermission();

      messaging().subscribeToTopic(
        Constants.notificationTopics.topTenCountdown
      );

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log(remoteMessage);
      });
    } catch (error) {
      console.error(error);
    }

    // try {
    //   await notifee.requestPermission();

    //   await notifee.createChannel({
    //     id: Constants.notificationTopics.nowPlaying,
    //     name: 'Now Playing',
    //   });

    //   await notifee.createChannel({
    //     id: Constants.notificationTopics.requests,
    //     name: 'Requests',
    //   });

    //   await notifee.createChannel({
    //     id: Constants.notificationTopics.topTenCountdown,
    //     name: 'Top Ten Countdown',
    //   });

    //   messaging().onMessage(this.onMessageReceived);
    //   messaging().setBackgroundMessageHandler(this.onMessageReceived);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  // async onMessageReceived(message) {
  //   let shouldShowNotification = true;

  //   const messageData = JSON.parse(message.data.notifee);

  //   if (messageData.topic === Constants.notificationTopics.requests) {
  //     const username = await UserService.getUsername();

  //     shouldShowNotification =
  //       username && messageData.data && messageData.data.username === username;
  //   }

  //   if (shouldShowNotification) {
  //     messageData.android = {
  //       channelId: messageData.topic,
  //       smallIcon: 'ic_stat_appbar_icon',
  //       style: {
  //         type: AndroidStyle.BIGTEXT,
  //         text: messageData.body,
  //       },
  //     };

  //     if (messageData.imageUrl) {
  //       messageData.android.largeIcon = messageData.imageUrl;
  //     }

  //     messageData.notification = {
  //       body: messageData.body,
  //       title: messageData.title,
  //     };

  //     await notifee.displayNotification(messageData);
  //   }
  // }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <FlashMessage floating={true} position="bottom" />
      </>
    );
  }
}

export default App;
