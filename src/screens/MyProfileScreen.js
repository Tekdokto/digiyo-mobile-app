import React, { useContext, useState } from 'react'
import { Image } from 'react-native';
import { Switch } from 'react-native';
import { StatusBar, View, Text } from 'react-native'
import { EventRegister } from 'react-native-event-listeners';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import ThemeContext from '../theme/ThemeContext';
import { HEIGHT, WIDTH } from '../constants/sizes';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

const MyProfileScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext)
  const [darkMode, setDarkMode ] = useState(false)
  return (
    <>
        <StatusBar barStyle={"dark-content"} />
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
          <View style={{ backgroundColor: theme.background, 
            justifyContent: "flex-end", 
            flexDirection: "row", paddingHorizontal: 20, 
            paddingVertical: 20 }}>
            {/* <Image  source={ require("../../assets/icons/arrow-back.png")} /> */}
            <Switch 
              value={darkMode}
              thumbColor="#ff0000"
              trackColor={{ false: "#767577", 
              true: "#81b0ff" }}
              onValueChange={(value) => {
                setDarkMode(value)
                EventRegister.emit("ChangeTheme", value)
              }}
            />
          </View>
          
          {/*  */}
          <View style={{ backgroundColor: theme.background, alignItems: "center" }}>
              <Image  source={ require("../../assets/images/4.jpeg")} style={{ height: 100, width: 100, borderRadius: 60,}} />
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
                Posts
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
               style={{  
                fontSize: HEIGHT * 0.03, 
                fontWeight: "700", 
                color: theme.color }}>
                110
              </Text>
              <Text style={{ fontSize: HEIGHT * 0.025, color: theme.color}}>
                Posts
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text 
              style={{  
                fontSize: HEIGHT * 0.03, 
                fontWeight: "700", 
                color: theme.color }}>
                110
              </Text>
              <Text style={{ fontSize: HEIGHT * 0.025, color: theme.color}}>
                Posts
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
                <Text style={{color: "#0AFB05",  fontWeight: "bold"}}>
                  Message
                </Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={ styles.buttonOrange}>
                <Text style={{color: "#fff", fontWeight: "bold"}}>
                  Follow
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
    // marginHorizontal: WIDTH * 0.35,
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: HEIGHT * 0.01,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: "#0AFB05",

  },
  buttonOrange: {
    backgroundColor: "#FF4500",
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: HEIGHT * 0.01,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: "#FF4500",

  },
  flexRow: {
    flexDirection: "row", 
    alignItems: 'center', 
    alignContent: "center", 
    justifyContent: "space-between",
    
  }
})