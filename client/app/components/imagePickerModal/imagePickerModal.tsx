import React from "react";
import { Pressable, SafeAreaView, Text, TextStyle, ViewStyle } from "react-native";
import { ImagePickerModalProps } from "./imagePickerModal.props";
import Modal from 'react-native-modal';
const MODAL: ViewStyle = {
  justifyContent: 'flex-end',
  margin: 0,
}

const BUTTONS: ViewStyle = {
  backgroundColor: 'white',
  flexDirection: 'row',
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
}

const BUTTON: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: '600',
}

export function ImagePickerModal(props: ImagePickerModalProps) {
  const {
    isVisible,
    onClose,
    onCameraPress,
    onImageLibraryPress
  } = props
  return (
    <Modal
    isVisible={isVisible}
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
    style={MODAL}>
      <SafeAreaView style={BUTTONS}>
        <Pressable style={BUTTON} onPress={onImageLibraryPress}>
          <Text style={TEXT}>Library</Text>
        </Pressable>
        <Pressable style={BUTTON} onPress={onCameraPress}>
          <Text style={TEXT}>Camera</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}