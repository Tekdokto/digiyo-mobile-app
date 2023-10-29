import React, { useContext } from 'react'
import { Text, Image, Pressable, View } from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'
import {  } from '@expo/vector-icons';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { useNavigation } from '@react-navigation/native';
// import ThemeContext from '../../theme/ThemeContext';

import Logo from '../../../assets/icons/logo.svg'
import LogoBlack from '../../../assets/icons/logo-black.svg'
import ThemeContext from '../../theme/ThemeContext';
import { Colors } from '../../constants/styles2';


const HeaderComp = ({ menu, navigation}) => {
  const theme = useContext(ThemeContext)
  const navigate = useNavigation()
  return (
    <>
      <View 
      style={{ 
        backgroundColor: theme.background,
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        paddingVertical: 10, 
        paddingLeft: 20,
        paddingRight: 20,
        }}> 
        {theme.theme === "dark" ? (
          <Logo height={35} width={87} />
          ) : (
          <LogoBlack height={35} width={87} />
        )}
          {/* <View style={{ flexDirection: "row", backgroundColor: "#EDEBE9", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, width: WIDTH * 0.41, justifyContent: "space-between" }}>
            <Pressable onPress={(e)=> navigate.navigate("FollowingScreen")}>
              <Text style={{  fontFamily: "Bold", fontSize: HEIGHT * 0.018 }}>Following</Text>
            </Pressable>
            <Pressable onPress={(e)=> navigate.navigate("FollowersScreen")}>
              <Text style={{  fontFamily: "Bold", fontSize: HEIGHT * 0.018 }}>Followers</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => navigate.openDrawer()}>
              <Feather name={menu} color={theme.color} size={24} />
          </Pressable> */}
          {/* <Button icon="search">
              Press me
          </Button> */}
      </View>
      <View style={{ paddingVertical: 1, width: WIDTH,  backgroundColor: Colors.lightGrey, color: Colors.lightGrey  }}></View>
    </>
  )
}

export default HeaderComp