import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import useInterval from '../hooks/useInterval';

import * as Constants from '../util/constants';

const DurationDisplay = props => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30000);
  const [timePassed, setTimePassed] = useState('');

  useEffect(() => {
    setTimeLeft(props.timeLeft);
  }, [props.timeLeft]);

  useInterval(() => {
    const currentTimeLeft =
      timeLeft < 0 || timeLeft - 1000 < 0 ? 0 : timeLeft - 1000;

    setTimeLeft(currentTimeLeft);

    const currentElapsedTime = (props.duration || 0) - currentTimeLeft / 1000;

    const currentProgress =
      (currentElapsedTime / ((props.duration || 0) * 1000)) * 1000;

    setProgress(currentProgress);

    const minutes = Math.floor(currentElapsedTime / 60);
    const seconds = currentElapsedTime % 60;

    setTimePassed(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  }, 1000);

  return (
    <>
      <ProgressBar
        animated={false}
        borderRadius={4}
        borderWidth={0}
        height={4}
        color={Constants.colors.UABBlue}
        progress={progress}
        style={styles.progressBar}
        unfilledColor={Constants.colors.gray}
        width={Dimensions.get('window').width * 0.85}
      />
      <View style={styles.playback}>
        <Text style={[styles.playbackText, styles.standardText]}>
          {timePassed}
        </Text>
        <Text style={[styles.playbackText, styles.standardText]}>
          {props.durationDisplay}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  standardText: {
    color: Constants.colors.white,
    fontFamily: Constants.fonts.light,
    textAlign: 'center',
  },
});

export default DurationDisplay;
