import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'react-native';
import { Switch } from 'react-native';
import { StatusBar, View, Text } from 'react-native'
import { EventRegister } from 'react-native-event-listeners';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import ThemeContext from '../../theme/ThemeContext';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../../constants/colors';

import ShareSvg from '../../../assets/icons/share.svg'
import EditSvg from '../../../assets/icons/edit.svg'

const MyProfileScreen = ({ }) => {

  const theme = useContext(ThemeContext)

  const [darkMode, setDarkMode ] = useState(false)

  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode === 'true')
        }
      } catch (error) {
        console.log('error dark mode', error)
      }
    }

    loadDarkMode()
  }, [])
 
  return (
    <>
        <StatusBar barStyle={ theme.theme == "dark" ? "light-content" : "dark-content"} />
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
          <View style={{ backgroundColor: theme.background, 
            justifyContent: "flex-end", 
            flexDirection: "row", paddingHorizontal: 20, 
            paddingVertical: 20 }}> 
            <Switch 
              value={darkMode} 
              onValueChange={(value) => {
                setDarkMode(value)
                EventRegister.emit("ChangeTheme", value)
                AsyncStorage.setItem('darkMode', value.toString())
              }}
            />
          </View>
          
          {/*  */}
          <View style={{ backgroundColor: theme.background, alignItems: "center" }}>
              <Image  source={ require("../../../assets/images/4.jpeg")} style={{ height: 100, width: 100, borderRadius: 60,}} />
            <Text style={{ fontSize: 20, color: theme.color, fontWeight: "700", paddingTop: 10, }}>
                MyProfileScreen
            </Text>
            <Text style={{ fontSize: 16, color: theme.color, fontWeight: "400", }}>
                Canada
            </Text>
          </View>

          {/*  */}
          <View 
          style={[ 
            styles.flexRow, 
            {marginHorizontal: WIDTH * 0.2,
            marginTop: 20,} ]}>
            <View style={{ alignItems: "center" }}>
              <Text style={{  fontSize: HEIGHT * 0.03, fontWeight: "700", color: theme.color }}>
                110
              </Text>
              <Text style={{ fontSize: HEIGHT * 0.025, color: theme.color}}>
                Followers
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
               style={{  
                fontSize: HEIGHT * 0.03, 
                fontWeight: "700", 
                color: theme.color }}>
                0
              </Text>
              <Text style={{ fontSize: HEIGHT * 0.025, color: theme.color}}>
                Following
              </Text>
            </View>
             
          </View>

          {/*  */}
          <View 
          style={[ 
            styles.flexRow, {
            marginHorizontal: WIDTH * 0.1,
            marginTop: 20,}]}>
            <Pressable onPress={{}}>
              <View style={ styles.buttonGreen}>
                <ShareSvg width= {20} stroke={ACCENT_COLOR} />
                <Text style={{color: ACCENT_COLOR, fontSize: 20, fontWeight: "bold"}}>
                  Share
                </Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={ styles.buttonOrange}>
                <EditSvg width= {20} stroke={"white"} />
                <Text style={{color: "#fff", fontWeight: "bold", paddingLeft: 5, fontSize: 20}}>
                  Edit
                </Text>
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  buttonGreen: {
    flexDirection: "row",
    // marginHorizontal: WIDTH * 0.35,
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: HEIGHT * 0.01,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: ACCENT_COLOR,

  },
  buttonOrange: {
    flexDirection: "row",
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: HEIGHT * 0.01,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: PRIMARY_COLOR,

  },
  flexRow: {
    flexDirection: "row", 
    alignItems: 'center', 
    alignContent: "center", 
    justifyContent: "space-between",
    
  }
})