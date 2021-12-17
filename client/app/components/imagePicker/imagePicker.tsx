import React, { useImperativeHandle, useRef } from "react";
import { Text, ImageBackground, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { captureRef } from "react-native-view-shot";
import { ImagePickerProps } from "./imagePicker.props";
const bowserLogo = require("./bowser.png")

const AVATAR: ViewStyle = {
  alignItems: 'center',
  marginTop: '40%',
}

const AVATARIMAGE: ImageStyle = {
  height: 260,
  width: 260,
  justifyContent: 'center', //Centered horizontally
  alignItems: 'center', 
}

const TEXTIMAGE : TextStyle = {
  fontSize: 30,
  fontWeight: "bold",
  color : 'red' 
}

const ADDBUTTON: ViewStyle = {
  height: 24,
  width: 24,
  backgroundColor: '#5D2555',
  borderRadius: 50,
  position: 'absolute',
  right: 70,
  bottom: 0,
}

const TEXT: TextStyle = {
  fontSize:20,
  fontWeight:"bold",
  marginLeft:6,
  marginTop:-3,
  color: '#ffffff'
}
const ImagePickerAvatar = React.forwardRef((props: ImagePickerProps, ref) =>{
  const {
    uri,
    text,
    onPress,
    sendImage,
  } = props
  const captureViewRef = useRef();
  const getNewImage = () => {
    captureNewImage()
  }
  const captureNewImage =() =>{
    captureRef(captureViewRef,{
      format: "jpg",
      quality: 0.8
    }).then(
      uri => {console.log("nouvelle image",uri);
              sendImage(uri)
            },
      error =>{console.error("Oops, snapshot failed", error)}
    );
  }
  useImperativeHandle(ref, () => ({
    getNewImage
 }));
  return (
    <View ref={captureViewRef} collapsable={false} style={AVATAR}>
          <ImageBackground
            style={AVATARIMAGE}
            source={uri ? { uri } : bowserLogo}
          >
            <Text style={TEXTIMAGE}>{text}</Text>
          </ImageBackground>
      <TouchableOpacity style={ADDBUTTON} onPress={onPress}>
        <Text style={TEXT}>+</Text>
      </TouchableOpacity>
    </View>
  );
})
export default ImagePickerAvatar