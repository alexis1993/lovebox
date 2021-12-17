import React from "react"
import { SafeAreaView, TextStyle, View, ViewStyle,} from "react-native"
import { FooterProps } from "./footer.props"
import { Button } from "../button/button"
import { color, spacing, typography } from "../../theme"

// static styles

const ACTIVE: ViewStyle = {
  borderRadius: 0,
  width:'50%',
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const NOTACTIVE: ViewStyle = {
  borderRadius: 0,
  width:'50%',
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor:"#251A34",
}

const FOOTER: ViewStyle = {  position: 'absolute',
bottom:0,
left:0,
width:'100%'
}
const FOOTER_CONTENT: ViewStyle = {
  width:'100%',
  flexDirection: 'row'
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 2,
}
/**
 * Footer that appears on send and list message screens.
 */
export function Footer(props: FooterProps) {
  const {
    fromSend,
    onSendPress,
    onListPress,
  } = props

  return (
    <SafeAreaView style={FOOTER}>
    <View style={FOOTER_CONTENT}>
      <Button
        testID="send-message-btn"
        disabled={fromSend}
        style={fromSend ?ACTIVE : NOTACTIVE}
        textStyle={TEXT}
        tx="message.send"
        onPress={onSendPress}
      />
      <View style={{flex:0.1}}/>
       <Button
        testID="list-message-btn"
        disabled={!fromSend}
        style={fromSend ?NOTACTIVE : ACTIVE}
        textStyle={TEXT}
        tx="message.list"
        onPress={onListPress}
      />
    </View>
  </SafeAreaView>
  )
}
