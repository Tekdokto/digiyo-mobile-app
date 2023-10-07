import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { FontAwesome, Feather } from '@expo/vector-icons'
import {  } from '@expo/vector-icons';
import { HEIGHT, WIDTH } from '../constants/sizes';

const HeaderComp = ({headerLogo, menu, onPressed}) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 15, marginHorizontal: 20 }}> 
        <Image style={{ flex:1, width: WIDTH * 0.1, height: HEIGHT * 0.055 }} source={require("../../assets/images/logo.png")} />
        <Text style={{ flex: 1, fontWeight: "bold", fontSize: 20 }}></Text>
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