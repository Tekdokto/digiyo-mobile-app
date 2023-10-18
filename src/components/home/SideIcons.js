import React, { useContext } from 'react'
// import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, Image, Pressable, StyleSheet, View } from 'react-native' 
import ThemeContext from '../../theme/ThemeContext'
import { HEIGHT } from '../../constants/sizes'
import GameSvg  from '../../../assets/icons/console.svg' 
import ShopSvg  from '../../../assets/icons/shop.svg' 
import ChatSvg  from '../../../assets/icons/chat.svg' 
import PeopleSvg  from '../../../assets/icons/people.svg' 
import SearchSvg  from '../../../assets/icons/search.svg' 
import GroupSvg  from '../../../assets/icons/group.svg' 
import { useNavigation } from '@react-navigation/native'
// import { Iconify } from 'react-native-iconify'


const SideIconsComp = () => {

    const handlePress = () => {
        console.log("press")
    }

    const navigation = useNavigation()

    const theme = useContext(ThemeContext);
  let icon;
  let themeColorsLight = theme.theme == "dark" ? "white" : "black"
  let themeColorsDark = theme.theme == "dark" ? "white" : "none"
  const size = 25

  return (
    <View style={{ flexDirection: "row", position: "absolute",  }}>
        <View style={{ width:60, flex: 1, top: HEIGHT * 0.4 }}>
            <Pressable onPress={() => navigation.push("SearchScreen")} style={ styles.container } >
                {/* <Image source={require("../../assets/icons/search.png")} size={20} /> */}
                <SearchSvg fill={"none"} width={size} stroke={themeColorsLight} height={size} />
                <Text style={ [{color: theme.color }, styles.text] }>
                    Search
                </Text>
            </Pressable>
            <Pressable onPress={handlePress} style={ styles.container } >
                {/* <Image source={require("../../assets/icons/group.png")} size={20} /> */}
                <GroupSvg fill={"none"} width={size} stroke={themeColorsLight} height={size} />
                <Text style={ [{color: theme.color }, styles.text] }>Book a private</Text>
            </Pressable>
            <Pressable onPress={handlePress} style={ styles.container } >
                <PeopleSvg fill={themeColorsLight} width={size} stroke={themeColorsLight} height={size} />
                {/* <Iconify icon="mdi:heart" size={24} color="#900" /> */}
                {/* <Image source={require("../../assets/icons/run.png")}  /> */}
                <Text style={ [{color: theme.color }, styles.text] }>
                    Challenge Match
                </Text>
            </Pressable>
        </View>

        {/* right */}
        <View style={{  width: 60, top: HEIGHT * 0.15 }}>
            <Pressable onPress={handlePress} style={ styles.container } >
                {/* <Image source={require("../../assets/icons/shop.png")} size={20} /> */}
                <ShopSvg fill={"none"} width={size} stroke={themeColorsLight} height={size} />
                <Text style={ [{color: theme.color }, styles.text] }>
                    Shop
                </Text>
            </Pressable> 
            <Pressable onPress={() => navigation.navigate("Inbox")} style={ styles.container } >
                {/* <Image source={require("../../assets/icons/chat.png")} size={20} /> */}
                <ChatSvg fill={themeColorsDark} width={size} stroke={themeColorsLight} height={size} />
                <Text style={ [{color: theme.color }, styles.text] }>
                    Inbox
                </Text>
            </Pressable> 
            <Pressable onPress={handlePress} style={ styles.container } >
                {/* <Image source={require("../../assets/icons/console.png")} size={20} /> */}
                <GameSvg fill={themeColorsDark} width={size} stroke={themeColorsLight} height={size} />
                <Text style={ [{color: theme.color }, styles.text] }>
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