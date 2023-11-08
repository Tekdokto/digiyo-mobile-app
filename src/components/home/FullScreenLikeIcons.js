import React, { useEffect, useState } from 'react'
// import styles from '../../constants/styles'


// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Colors, Fonts, Default } from "../../constants/styles2";
// import Animated from 'react-native-reanimated';

const FullScreenLikeIcons = (props) => {
   
  const { t, i18n } = useTranslation();

  function tr(key) {
    return t(`forYouAndFollowingVideo:${key}`);
  }

  const isRtl = i18n.dir() == "rtl";

  return (
    <>
      <View
        style={{
          top: 0,
          bottom: 0,
          position: "absolute",
          justifyContent: "center",
          alignSelf: isRtl ? "flex-start" : "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: Default.fixPadding * 0.8,
            marginRight: isRtl ? 0 : Default.fixPadding * 2,
            marginLeft: isRtl ? Default.fixPadding * 2 : 0,
            borderRadius: 30,
            backgroundColor: Colors.transparentWhite,
          }}
        >
          <TouchableOpacity
            onPress={props.toggle}
          >

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: Colors.darkGrey,
            }}
          >
            <FontAwesome name={'heart'} size={20} color={props.color} />
          </View>
          <Text
            style={{
              ...Fonts.SemiBold14white,
              textAlign: "center",
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            {props.likes}
          </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.openCommentBottomSheetHandler()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: Colors.darkGrey,
            }}
          >
            <Ionicons name="chatbox-ellipses" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.SemiBold14white,
              textAlign: "center",
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            {props.comments}
          </Text>

          <TouchableOpacity
            onPress={props.shareVideo}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: Colors.darkGrey,
            }}
          >
            <FontAwesome name="share" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.SemiBold14white,
              textAlign: "center",
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            {/* {props.} */}
          </Text>

          <TouchableOpacity
            onPress={() => props.openMenuBottomSheetHandler()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: Colors.darkGrey,
            }}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>


      {/*  */}
      <View
        style={{
          position: "absolute",
          flexDirection: isRtl ? "row-reverse" : "row",
          bottom: Default.fixPadding * 4,
        }}
      >
        <View
          style={{
            flex: 8.5,
            marginLeft: isRtl ? 0 : Default.fixPadding * 2.5,
            marginRight: isRtl ? Default.fixPadding * 2.5 : 0,
          }}
        >
          {/* <TouchableOpacity
            onPress={() => props.profileClickHandler()}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Image
              source={props.image}
              style={{
                width: 55,
                height: 55,
                borderRadius: 28,
                borderWidth: 1,
                borderColor: Colors.white,
              }}
            />
            <View style={{ marginHorizontal: Default.fixPadding }}>
              <Text style={{ ...Fonts.SemiBold16white }}>{props.name}</Text>
              <Text style={{ ...Fonts.Bold14primary }}>{tr("follow")}</Text>
            </View>
          </TouchableOpacity> */}
          <View style={{ alignItems: isRtl ? "flex-end" : "flex-start" }}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold14white,
                overflow: "hidden",
                marginTop: Default.fixPadding,
              }}
            >
              {props.other}
            </Text>
            {/* <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <FontAwesome name="music" size={16} color={Colors.white} />
              <Text
                style={{
                  ...Fonts.Medium12white,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                {props.songName}
              </Text>
            </View> */}
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => props.musicHandler()}
          style={{
            flex: 1.5,
            justifyContent: "flex-end",
            alignItems: isRtl ? "flex-start" : "flex-end",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Animated.Image
            source={require("../assets/images/music.png")}
            style={[styles.musicDisc, musicDiscAnimation]}
          />
        </TouchableOpacity> */}
      </View>
    </>
  )
}

export default FullScreenLikeIcons