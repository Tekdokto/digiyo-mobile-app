import React from 'react'
import { Pressable, View } from 'react-native'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from 'react-native-paper'

const BottomIcons = ({ like, likeColor, likeName, likeLink, chat, chatLink, save, saveLink, saveColor, saveName, share, shareLink, }) => {
  return (
    <View style={{ flex: 1, }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20 }}>
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={likeLink}>
                <FontAwesome name={likeName} size={30} style={{color: likeColor}} />
                <Text>{like}</Text>
            </Pressable>
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={chatLink}>
                <Ionicons name={"chatbubble-outline"} size={30} />
                <Text>{chat}</Text>
            </Pressable>
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={saveLink}>
                <Ionicons name={saveName} size={30} color={saveColor} />
                <Text>{save}</Text>
            </Pressable>
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={shareLink}>
                <MaterialCommunityIcons name={"share-outline"} size={30} />
                <Text>{share}</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default BottomIcons