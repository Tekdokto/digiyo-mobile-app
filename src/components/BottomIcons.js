import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import { create } from 'apisauce'
import BottomSheets from './BottomSheets'

const BottomIcons = ({ like, likeColor, likeName, likeLink, chat, chatLink, save, saveLink, saveColor, saveName, share, shareLink, }) => {

    const api = create({
        baseURL: "https://jsonplaceholder.typicode.com",
        headers: {}
    })

    api.any({ method: 'GET', url: "/comments?postId=", params: {id: 1} })
  return (
    <View style={{ flex: 1, }}>
        <View style={{ flexDirection: "row", alignItems: "center",   }}>
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={likeLink}>
                <Image source={likeName}  />
                <Text>{like}</Text>
            </Pressable>
             
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={chatLink}>
                <Image source={require("../../assets/icons/chat-round.png")}  />
                <Text>{chat}</Text>
            </Pressable>
             
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={saveLink}>
                <Image source={saveName}  />
                <Text>{save}</Text>
            </Pressable>
            
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={shareLink}>
                <Image source={require("../../assets/icons/share.png")}  />
                <Text>{share}</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default BottomIcons;

