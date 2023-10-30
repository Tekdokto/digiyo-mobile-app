import React, { useContext, useEffect } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

// import BottomSheets from './BottomSheets'
// import ThemeContext from '../theme/ThemeContext'
import ShareSvg from '../../assets/icons/share.svg'
import HeartSvg from '../../assets/icons/heart.svg' 
import ChatSvg from '../../assets/icons/chat-round.svg'
import BookmarkSvg from '../../assets/icons/bookmark.svg'
import styles from '../constants/styles'
import ThemeContext from '../theme/ThemeContext'

const BottomIcons = ({ like, likeColor, likeName, likeLink, chat, chatLink, save, saveLink, saveColor, saveName, share, shareLink, }) => {

    const theme = useContext(ThemeContext)
    let themeColorsLight = theme.theme == "dark" ? "white" : "#000"
    //   let themeColorsDark = theme.theme == "dark" ? "silver" : "silver"
    let size = 20
    
        useEffect(() => {
    
        }, [likeColor])
        

  return (
    <View style={{ flex: 1, }}>
        <View style={{ flexDirection: "row", alignItems: "center",   }}>
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={likeLink}>
                <Image source={likeName} style={{width:20, height:20, resizeMode: "contain" }} />
                {/* <HeartSvg fill={likeColor} width={size} stroke={themeColorsLight} height={size} /> */}
                <Text style={[ styles.iconText, { color: theme.color }]}>{like}</Text>
            </Pressable>
             
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={chatLink}>
                {/* <Image source={require("../../assets/icons/chat-round.png")}  /> */}
                <ChatSvg fill={"none"} width={size} stroke={themeColorsLight} height={size} />
                <Text style={[ styles.iconText, { color: theme.color }]}>{chat}</Text>
            </Pressable>
             
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={saveLink}>
                {/* <Image source={saveName}  /> */}
                <BookmarkSvg fill={"none"} width={size} stroke={themeColorsLight} height={size} />
                <Text style={[ styles.iconText, { color: theme.color }]}>{save}</Text>
            </Pressable>
            
            <Pressable style={{ flex: 1, alignItems: "center" }} onPress={shareLink}>
                {/* <Image style={{   }} source={require("../../assets/icons/share.png")}  /> */}
                <ShareSvg fill={"none"} width={size} stroke={themeColorsLight} height={size} />
                <Text style={[ styles.iconText, { color: theme.color }]}>{share}</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default BottomIcons;

