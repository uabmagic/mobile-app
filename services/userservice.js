import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

import * as ApiService from '../services/apiservice';

import * as Constants from '../util/constants';

const getPassword = async () => {
  return (await AsyncStorage.getItem(Constants.settings.keys.password)) || '';
};

const getUsername = async () => {
  return (await AsyncStorage.getItem(Constants.settings.keys.username)) || '';
};

const getUserCredentials = async () => {
  const authInfoFromStorage = await AsyncStorage.getItem(
    Constants.settings.keys.authInfo
  );

  return authInfoFromStorage != null ? JSON.parse(authInfoFromStorage) : null;
};

const login = async () => {
  const username = await getUsername();
  const password = await getPassword();

  const authInfo = await ApiService.login(username, password);

  const token = await messaging().getToken();
  await ApiService.updatePushToken(username, authInfo.userId, token);

  authInfo.username = username;
  authInfo.password = password;

  await AsyncStorage.setItem(
    Constants.settings.keys.authInfo,
    JSON.stringify(authInfo)
  );
};

export default {
  getUsername,
  getUserCredentials,
  login,
};
