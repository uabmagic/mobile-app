import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Constants from '../util/constants';

export default function IconButton(props) {
  const {onPress, icon = 'home'} = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons style={styles.icon} name={icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Constants.colors.UABBlue,
    borderRadius: 30,
    elevation: 3,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  icon: {
    color: Constants.colors.white,
    fontSize: 30,
  },
});
