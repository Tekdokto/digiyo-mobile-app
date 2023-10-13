import React, { useContext } from 'react'
import { Text, Image, Pressable, View } from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'
import {  } from '@expo/vector-icons';
import { HEIGHT, WIDTH } from '../constants/sizes';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../theme/ThemeContext';

const HeaderComp = ({headerLogo, menu, onPressed}) => {
  const theme = useContext(ThemeContext)
  const navigate = useNavigation()
  return (
    <View 
    style={{ 
      backgroundColor: theme.background,
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      paddingVertical: 15, 
      paddingLeft: 20,
      paddingRight: 20,
      }}> 
        <Image source={theme.logo} />
        <View style={{ flexDirection: "row", backgroundColor: "#EDEBE9", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, width: WIDTH * 0.41, justifyContent: "space-between" }}>
          <Pressable onPress={(e)=> navigate.navigate("FollowingScreen")}>
            <Text style={{  fontWeight: "bold", fontSize: HEIGHT * 0.018 }}>Following</Text>
          </Pressable>
          <Pressable onPress={(e)=> navigate.navigate("FollowersScreen")}>
            <Text style={{  fontWeight: "bold", fontSize: HEIGHT * 0.018 }}>Followers</Text>
          </Pressable>
        </View>
        <Pressable onPress={onPressed}>
            <Feather name={menu} color={theme.color} size={24} />
        </Pressable>
        {/* <Button icon="search">
            Press me
        </Button> */}
    </View>
  )
}

export default HeaderComp