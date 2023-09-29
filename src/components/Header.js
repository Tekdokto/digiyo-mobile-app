import React from 'react'
import { Pressable, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { FontAwesome, Feather } from '@expo/vector-icons'
import {  } from '@expo/vector-icons';

const HeaderComp = ({headerLogo, menu, onPressed}) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 15, marginHorizontal: 20 }}> 
        <Text style={{ flex: 1, fontWeight: "bold", fontSize: 20 }}>{headerLogo}</Text>
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