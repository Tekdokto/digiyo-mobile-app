import React from 'react'
import { Dimensions, Image, Pressable, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { FontAwesome, Feather } from '@expo/vector-icons'
import {  } from '@expo/vector-icons';
import { HEIGHT, WIDTH } from '../constants/sizes';
import { useNavigation } from '@react-navigation/native';

const HeaderComp = ({headerLogo, menu, onPressed}) => {
  const navigate = useNavigation()
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15, marginHorizontal: 20 }}> 
        <Image source={require("../../assets/icons/logo-black.png")} />
        <View style={{ flexDirection: "row", backgroundColor: "#EDEBE9", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, width: WIDTH * 0.41, justifyContent: "space-between" }}>
          <Pressable onPress={(e)=> navigate.navigate("FollowingScreen")}>
            <Text style={{  fontWeight: "bold", fontSize: HEIGHT * 0.018 }}>Following</Text>
          </Pressable>
          <Pressable onPress={(e)=> navigate.navigate("FollowersScreen")}>
            <Text style={{  fontWeight: "bold", fontSize: HEIGHT * 0.018 }}>Followers</Text>
          </Pressable>
        </View>
        <Pressable onPress={onPressed}>
            <Feather name={menu} color="#000" size={24} />
        </Pressable>
        {/* <Button icon="search">
            Press me
        </Button> */}
    </View>
  )
}

export default HeaderComp