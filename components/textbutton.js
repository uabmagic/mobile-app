import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

export default function TextButton(props) {
  const {disabled = false, onPress, title = 'Toggle'} = props;

  const style = disabled ? styles.disabledButton : styles.enabledButton;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  disabledButton: {
    backgroundColor: '#aaaaaa',
  },
  enabledButton: {
    backgroundColor: '#3a98ba',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'avenir_45_book_latin',
    fontSize: 16,
    lineHeight: 21,
  },
});
