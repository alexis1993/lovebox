import React, { useCallback, useEffect, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Wallpaper } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerModal } from "../../../components/imagePickerModal/imagePickerModal"
import { CameraOptions, ImageLibraryOptions } from "react-native-image-picker"
import { gql } from "graphql-tag"
import { useMutation } from "@apollo/client"
import { color, spacing, typography } from "../../../theme"
import I18n from "i18n-js"
import ImagePickerAvatar from "../../../components/imagePicker/imagePicker"

const FULL: ViewStyle = { flex: 1 }
const MESSAGEBTN: ViewStyle = {
  marginTop:20,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const MESSAGEBTN_TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 2,
}

const INPUT:TextStyle = {
  height: 40,
  margin: 12,
  borderWidth: 1,
  borderColor:'#ffffff',
  color:'#ffffff',
  padding: 10,
}

export const SendMessageScreen = observer(function SendMessageScreen() {
  const imagePickerAvatarRef = useRef(null)
  const navigation = useNavigation()
  const listMessage = () => navigation.navigate("listMessage")
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  const [sendBtnDisabled, setSendBtnDisabled] = useState(true);
  const [uri, setUri] = useState(null);
  const [textImage, onChangeTextImage] = useState(null);
const SENDNEWMESSAGE = gql`
mutation AddMessage($uri: String!) {
  addMessage(uri: $uri) {
    uri
  }
}
`

  useEffect(() => {
    if(pickerResponse?.assets){
      setUri(pickerResponse.assets[0].uri)
      setSendBtnDisabled(false)
    }
  }, [pickerResponse]);

  const onImageLibraryPress = useCallback(() => {
    const options : ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
    setVisible(false);
  }, []);
  const onCameraPress = useCallback(() => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);
  const [sendMessages] = useMutation(SENDNEWMESSAGE);
  const getImage =() =>{
    if(imagePickerAvatarRef.current != null){
      if(textImage != null && textImage.trim() != ""){
        imagePickerAvatarRef.current.getNewImage();
      }
      else {
        sendMessages({ variables: { uri: uri } })
      }
    }
    else {
      console.log("pas d'instance d'imagePickAvatar")
    }
  }
  return (
    <View testID="SendMessageScreen" style={FULL}>
      <Wallpaper />
      <ImagePickerAvatar ref={imagePickerAvatarRef} sendImage={(uri)=>sendMessages({ variables: { uri: uri } })} uri={uri} text={textImage} onPress={() => setVisible(true)} />
      <TextInput
        style={INPUT}
        onChangeText={onChangeTextImage}
        value={textImage}
        placeholder={I18n.t('message.textImage')}
        placeholderTextColor="#ffffff" 
      />
      <Button
            testID="send-button"
            style={MESSAGEBTN}
            textStyle={MESSAGEBTN_TEXT}
            tx="message.sendBtn"
            disabled={sendBtnDisabled}
            onPress={getImage}
          />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
      <Footer fromSend={true} onListPress={listMessage}/>
    </View>
  )
})
