import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Switch, Pressable } from "react-native";
// import { Fonts } from "../constants/styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeButton from "react-native-really-awesome-button";
import MyStatusBar from "../../components/MyStatusBar";
import SaveListTab from "../../components/saveListTab";
import VideoTab from "../../components/videoTab";
import { Colors, Default, Fonts } from "../../constants/styles2";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../theme/ThemeContext";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../constants/colors";

import ShareSvg from '../../../assets/icons/share.svg'
import EditSvg from '../../../assets/icons/edit.svg'
import FollowersScreen from "../FollowUnfollow/FollowersScreen";
import FollowingScreen from "../FollowUnfollow/FollowingScreen";
import { useSelector } from "react-redux";
import { myProifile } from "../../redux/actions/auth";
import { showError } from "../../utils/helperFunctions";

const Tab = createMaterialTopTabNavigator();

const MyProfileScreen = () => {

  // const userData = useSelector(state=>state.auth.userData.authenticated_user)
  const user = useSelector(state=>state.auth.userData.token)
  // console.log("userData", userData)
  
  const theme = useContext(ThemeContext)
 
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";

  
  const [isLoading, setLoading] = useState(false)
  const [profile, setProfile] = useState(false)

  // 
   
  const onFetchProfile = async() => { 
    let token = user.token
    console.log("token ---------- " , token)
        try {
          setLoading(true)
          let res = await myProifile(token)
          console.log("response -------", res)
          console.log("profile result -------", res.authenticated_user)
          setProfile(res.authenticated_user)
          setLoading(false)
        } catch (error) {
          showError(error.message)
          console.log("profile error -------", error )
          setLoading(false)
        }
}

useEffect(() => {
  onFetchProfile();
  }, []);


  function tr(key) {
    return t(`profileScreen:${key}`);
  }

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ backgroundColor: theme.backgroundColor }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <View></View>

          <TouchableOpacity
            onPress={() => navigation.push("profileSettingsScreen")}
          >
            <Ionicons name="ellipsis-vertical" size={20} color={theme.color} />
          </TouchableOpacity>
        </View>

        <View
          style={{
          }}
        >
          <Image
            source={require("../../../assets/images/2.jpg")}
            style={{
              // flex: 3,
              resizeMode: "cover",
              alignSelf: "center",
              width: 100,
              height: 100,
              borderRadius: 80,
            }}
          />

          <View
            style={{
              // flex: 7,
              alignItems: "center",
              // alignItems: isRtl ? "flex-end" : "flex-start",
              // marginLeft: isRtl ? 0 : Default.fixPadding * 2,
              // marginRight: isRtl ? Default.fixPadding * 2 : 0,
            }}
          >
            <Text style={{ 
              ...Fonts.SemiBold16white, 
              color: theme.color }}
              >{profile.username}</Text>
            <Text
              style={{
                ...Fonts.Medium12grey,
                marginTop: Default.fixPadding * 0.3,
              }}
            >
              # Dance lover # food lovers
            </Text>

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginTop: Default.fixPadding * 2.5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.push("FollowingScreen")}
                style={{
                  flex: 3.5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding,
                  // marginLeft: isRtl ? Default.fixPadding : 0,
                }}
              >
                <Text style={{ 
                  ...Fonts.SemiBold14white, 
                  color: theme.color }}>{profile.following_count}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14white,
                    color: theme.color,
                    overflow: "hidden",
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  following
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 4,
                  borderLeftWidth: 2,
                  borderLeftColor: Colors.grey,
                  borderRightWidth: 2,
                  borderRightColor: Colors.grey,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.push("FollowersScreen")}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ 
                    ...Fonts.SemiBold14white, 
                    color:theme.color }}>{profile.follower_count}</Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14white,
                      color:theme.color ,
                      overflow: "hidden",
                      marginTop: Default.fixPadding * 0.5,
                    }}
                  >
                    followers
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 2.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ 
                  ...Fonts.SemiBold14white, 
                  color:theme.color  }}>{profile.post_count}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14white,
                    color:theme.color ,
                    overflow: "hidden",
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("post")}
                </Text>
              </View>
            </View>

            {/*  */}
            <View 
            style={[ 
              
              styles.flexRow, {
              // marginHorizontal: WIDTH * 0.1,
              marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
              marginTop: 20,}]}>
              <AwesomeButton 
              height={50}
              // onPressOut={() => navigation.push("editProfileScreen")}
              raiseLevel={1}
              // stretch={true}
                backgroundDarker={Colors.transparent}
                backgroundColor={ACCENT_COLOR}
                // onPressOut={onFetchProfile}
                >
                <View style={ styles.buttonGreen}>
                    <ShareSvg width= {20} stroke={"white"} />
                  <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>
                    Share
                  </Text>
                </View>
              </AwesomeButton>
              <View style={{margin:8}}></View>
              <AwesomeButton 
                  height={50}
                  onPressOut={() => navigation.push("editProfileScreen")}
                  raiseLevel={1}
                  // stretch={true}
                  backgroundDarker={Colors.transparent}
                  backgroundColor={PRIMARY_COLOR}>
                <View  style={ styles.buttonOrange}>
                  <EditSvg width= {20} stroke={"white"} />
                  <Text style={{color: "#fff", fontWeight: "bold", paddingLeft: 5, fontSize: 20}}>
                    Edit
                  </Text>
                </View>
              </AwesomeButton>
            </View>
          </View>
        </View>
        
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: Default.fixPadding * 0.8,
                  borderBottomWidth: 2,
                  borderBottomColor: isFocused
                    ? Colors.primary
                    : Colors.extraDarkGrey,
                }}
              >
                <Text
                  style={{
                    ...(isFocused
                      ? Fonts.SemiBold16primary
                      : Fonts.SemiBold16grey),
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const title1 = isRtl ? tr("post") : tr("following");
  const title2 = tr("followers");
  const title3 = isRtl ? tr("followeing") : tr("post");

  return (
    <>
      <MyStatusBar />
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="post"
        screenOptions={{headerShown: false}}
      >
        <Tab.Screen
          name={isRtl ? "followers" : "post"}
          component={!isRtl ? FollowersScreen : VideoTab}
          options={{
            title: title1,
          }}
          screenOptions={{headerShown: false}}
        />
        <Tab.Screen
          name={"following"}
          component={FollowingScreen}
          options={{
            title: title2,
          }}
        />
        <Tab.Screen
          name={isRtl ? "post" : "followers"}
          component={!isRtl ? VideoTab : FollowersScreen}
          options={{
            title: title3,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

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

