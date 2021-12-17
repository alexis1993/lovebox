import React, { useEffect, useState } from "react"
import { Image, ImageStyle, ScrollView, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Text, Wallpaper } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"

const FULL: ViewStyle = { flex: 1 }
const IMAGECONTAINER: ViewStyle = { justifyContent: 'center', alignItems: 'center' }
const IMAGE: ImageStyle = { marginTop:20, width: 150, height: 150 }

export const ListMessageScreen = observer(function ListMessageScreen() {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]);
  const sendMessage = () => navigation.navigate("sendMessage")
  const GETMESSAGES = gql`
  query{messages{uri}}
  `
  const {data, refetch} = useQuery(GETMESSAGES);
  useEffect(() => {
    //We refetch data from appolo when we load this screen to be sure to get the last data from server.
    refetch()
  });
  useEffect(() => {
    if(data!=null){
      setMessages(data.messages)
    }
  }, [data]);
  return (
    <View testID="ListMessageScreen" style={FULL}>
      <Wallpaper />
      <ScrollView>
        <View style={IMAGECONTAINER}>
          {
          messages.length > 0 ?messages.map((r, index) => <Image key={index} style={IMAGE} source={{uri :r.uri}}/>)
          :
          <Text tx="message.noMessages"/>
          }
        </View>
      </ScrollView>
      <Footer fromSend={false} onSendPress={sendMessage}/>
    </View>
  )
})
