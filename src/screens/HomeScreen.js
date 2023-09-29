import React from 'react'
import { Dimensions, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../components/Header';
import SideIconsComp from '../components/SideIcons';
import Posts from '../components/Posts';

const HomeScreen = () => {
  // const theme = useTheme();

  const handlePress = () => {
    console.log("click")
  }

  return (
    <SafeAreaView style={{ flex:1, }}>

       
          <HeaderComp headerLogo={"DigiYo"} menu={"menu"} onPressed={handlePress} />

          {/* side icons */}
          <View style={{ flex: 1, }}>
            <View style={{ marginHorizontal: Dimensions.get("screen").width *0.17 }}>
              <Posts />
            </View>
            <SideIconsComp />
          </View> 
    </SafeAreaView>
  )
}

export default HomeScreen