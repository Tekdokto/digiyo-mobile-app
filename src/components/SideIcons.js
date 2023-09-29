import React from 'react'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'


const SideIconsComp = () => {

    const handlePress = () => {
        console.log("press")
    }
  return (
    <View style={{ flexDirection: "row", position: "absolute",  }}>
        <View style={{ width:60, flex: 1, top: Dimensions.get('screen').height * 0.35 }}>
            <Pressable onPress={handlePress} style={ styles.container } >
                <FontAwesome name={"search"} size={20} />
                <Text style={ styles.text }>
                    Search
                </Text>
            </Pressable>
            <Pressable onPress={handlePress} style={ styles.container } >
                <FontAwesome name={"users"} size={20} />
                <Text style={ styles.text }>Book a private</Text>
            </Pressable>
            <Pressable onPress={handlePress} style={ styles.container } >
                <FontAwesome5 name={"running"} size={20} />
                <Text style={ styles.text }>
                    Challenge Match
                </Text>
            </Pressable>
        </View>
        <View style={{  width: 60, top: Dimensions.get('screen').height * 0.2 }}>
            <Pressable onPress={handlePress} style={ styles.container } >
                <FontAwesome5 name={"shopify"} size={20} />
                <Text style={ styles.text }>
                    Shop
                </Text>
            </Pressable> 
            <Pressable onPress={handlePress} style={ styles.container } >
                <MaterialCommunityIcons name={"message-processing-outline"} size={20} />
                <Text style={ styles.text }>
                    Inbox
                </Text>
            </Pressable> 
            <Pressable onPress={handlePress} style={ styles.container } >
                <Ionicons name={"game-controller-outline"} size={20} />
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
        marginBottom: 10,  
        width: 60, 
        alignItems: "center",
    }
  });