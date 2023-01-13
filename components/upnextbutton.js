import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Constants from '../util/constants';

const UpNextButton = props => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const toggleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  return (
    <View>
      <Modal isVisible={modalIsVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalView}>
          <Text style={styles.title}>What's Next?</Text>
          <View style={styles.modalBody}>
            {props.upNext?.map((value, index) => {
              return (
                <Text key={index} style={styles.upNext}>
                  {value}
                </Text>
              );
            })}
          </View>
        </View>
      </Modal>
      <Pressable style={styles.button} onPress={toggleModal}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={Constants.icons.playlistMusic}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    elevation: 3,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  icon: {
    color: Constants.colors.white,
    fontSize: 22,
  },
  modal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalBody: {
    color: Constants.colors.black,
    marginTop: 16,
    opacity: 0.6,
  },
  modalView: {
    backgroundColor: Constants.colors.white,
    borderRadius: 4,
    padding: 24,
  },
  title: {
    fontFamily: Constants.fonts.bold,
    fontSize: 24,
  },
  upNext: {
    fontFamily: Constants.fonts.normal,
    height: 48,
    paddingHorizontal: 16,
    textAlignVertical: 'center',
  },
});

export default UpNextButton;
