import React, { useContext, useState } from 'react'
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import ThemeContext from '../../../theme/ThemeContext'
// import styles from '../../../constants/styles'
// import { HEIGHT, WIDTH } from '../../../constants/sizes' 
import { Feather, Ionicons } from '@expo/vector-icons'
import { HEIGHT, WIDTH } from '../../constants/sizes'
import ThemeContext from '../../theme/ThemeContext'
// import { useNavigation } from '@react-navigation/native'

import StartChat from '../../../assets/icons/startchat.svg'
import ChatIcon from '../../../assets/icons/sendicon.svg'
import { staticMessages } from '../../Constants'
import { useNavigation } from '@react-navigation/native'


const MessageUserScreen = ({ route }) => {

  // const { item } = route.params
  
  const [message, setMessage] = useState(staticMessages)

  const handleCommentSend = () => {
    if (message.length == 0) {
        return;
    }
    setMessage('')
    // sendMessage(chatIdInst, message)
}
  
  const theme = useContext(ThemeContext)

  const navigate = useNavigation()

//   console.log(item)
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
      { message.length == 0 ? (
        <>
            <View style={{ backgroundColor: theme.background, alignItems: "center" }}>
                <Image  source={ require("../../../assets/images/4.jpeg")} style={{ height: 100, width: 100, borderRadius: 60,}} />
                <Text style={{ fontSize: 20, color: theme.color, fontWeight: "700", paddingTop: 10, }}>
                    df
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
            <View style={{ 
                alignItems: "center", 
            top: HEIGHT * 0.5, 
            flex:1, 
            left: 0, 
            right: 0, position: "absolute", zIndex: -1, height: HEIGHT}}>
                <StartChat width={140} />
            </View>
        </>
        ) : (
            <></>
        )
      }

      <View style={ styles2.container}>
        <View style={styles2.containerInput}>
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder='send Message...'
                style={styles2.input}
            />
            <TouchableOpacity onPress={() => handleCommentSend()}>
                <ChatIcon />
                {/* <Ionicons name="arrow-up-circle" size={34} color={'crimson'} /> */}
            </TouchableOpacity>
        </View >
      </View>
    </SafeAreaView>
  </View>
</>
  )
}

export default MessageUserScreen

const styles2 = StyleSheet.create({
    container: {
        // justifyContent: 'flex-end',
        backgroundColor: "lightgrey",
        marginHorizontal: 10,
        borderRadius: 40,
        width: WIDTH *0.95,
        flex: 1,
        position: "absolute",
        bottom: 0,
        left: 0, 
        right: 0

    },
    containerInput: {
        padding: 10,
        flexDirection: 'row',

    },
    input: {
        backgroundColor: 'lightgrey',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
})