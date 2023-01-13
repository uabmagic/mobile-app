import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import NotificationService from '../services/notificationservice.js';
import UserService from '../services/userservice';

import * as Constants from '../util/constants';

export default class SettingsScene extends Component {
  async refreshCredentials() {
    await UserService.login();

    NotificationService.showSuccessMessage('Credentials refreshed!');
  }

  render() {
    return (
      <View style={styles.view}>
        <Pressable
          style={styles.button}
          onPress={() => this.refreshCredentials()}>
          <Text style={styles.buttonText}>Refresh credentials</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Constants.colors.UABBlue,
    borderRadius: 4,
    padding: 16,
  },
  buttonText: {
    color: Constants.colors.white,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
