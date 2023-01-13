import React from 'react';
import {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

export default class UABText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text style={[styles.text, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'avenir_35_light_latin',
    textAlign: 'center',
  },
});
