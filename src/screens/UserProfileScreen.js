import React, { useContext } from 'react'
import { Image, Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native'
import ThemeContext from '../theme/ThemeContext'
import styles from '../constants/styles'
import { HEIGHT, WIDTH } from '../constants/sizes'
import { ACCENT_COLOR } from '../constants/colors'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const UserProfileScreen = ({ route }) => {

  const { item } = route.params
  
  const theme = useContext(ThemeContext)

  const navigate = useNavigation()

  console.log(item)
  return (
    <>
    <StatusBar barStyle={ theme.theme == "dark" ? "light-content" : "dark-content"} />
  <View style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Pressable onPress={() => navigate.goBack()} >
        <View style={{ backgroundColor: theme.background, 
          justifyContent: "flex-start", 
          flexDirection: "row", paddingHorizontal: 20, 
          paddingVertical: 20 }}> 
          <Feather name={"arrow-left"} size={30} />
        </View>
      </Pressable>
      
      {/*  */}
      <View style={{ backgroundColor: theme.background, alignItems: "center" }}>
          <Image  source={ require("../../assets/images/4.jpeg")} style={{ height: 100, width: 100, borderRadius: 60,}} />
        <Text style={{ fontSize: 20, color: theme.color, fontWeight: "700", paddingTop: 10, }}>
            {item.username}
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
        <Pressable onPress={() => navigate.navigate("messageUserScreen", {item: item})}>
          <View style={ styles.buttonGreen}>
            <Text style={{color: ACCENT_COLOR,  fontWeight: "bold"}}>
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

export default UserProfileScreen

