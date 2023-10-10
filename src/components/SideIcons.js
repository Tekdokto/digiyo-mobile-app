import React from 'react'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { HEIGHT } from '../constants/sizes'


const SideIconsComp = () => {

    const handlePress = () => {
        console.log("press")
    }
  return (
    <View style={{ flexDirection: "row", position: "absolute",  }}>
        <View style={{ width:60, flex: 1, top: HEIGHT * 0.4 }}>
            <Pressable onPress={handlePress} style={ styles.container } >
                <Image source={require("../../assets/icons/search.png")} size={20} />
                <Text style={ styles.text }>
                    Search
                </Text>
            </Pressable>
            <Pressable onPress={handlePress} style={ styles.container } >
                <Image source={require("../../assets/icons/group.png")} size={20} />
                <Text style={ styles.text }>Book a private</Text>
            </Pressable>
            <Pressable onPress={handlePress} style={ styles.container } >
                <Image source={require("../../assets/icons/run.png")}  />
                <Text style={ styles.text }>
                    Challenge Match
                </Text>
            </Pressable>
        </View>
        <View style={{  width: 60, top: HEIGHT * 0.15 }}>
            <Pressable onPress={handlePress} style={ styles.container } >
                <Image source={require("../../assets/icons/shop.png")} size={20} />
                <Text style={ styles.text }>
                    Shop
                </Text>
            </Pressable> 
            <Pressable onPress={handlePress} style={ styles.container } >
                <Image source={require("../../assets/icons/chat.png")} size={20} />
                <Text style={ styles.text }>
                    Inbox
                </Text>
            </Pressable> 
            <Pressable onPress={handlePress} style={ styles.container } >
                <Image source={require("../../assets/icons/console.png")} size={20} />
                <Text style={ styles.text }>
                    Gaming
                </Text>
            </Pressable> 
        </View>
    </View>
  )
}

export default SideIconsComp;

const styles = StyleSheet.create({
    text: {
        fontSize: 12, 
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        marginBottom: 30,  
        width: 60, 
        alignItems: "center",
    }
  });