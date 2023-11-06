import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  ListRenderItem,
  FlatList,
  ScrollView,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import VideoTab from "../../components/videoTab";
import { WIDTH } from "../../constants/sizes";
import { Image } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useContext } from "react"; 
import { myProifile } from "../../redux/actions/auth";
import ThemeContext from "../../theme/ThemeContext";
import { RefreshControl } from "react-native-gesture-handler";
import FollowersScreen from "../FollowUnfollow/FollowersScreen";
import FollowingScreen from "../FollowUnfollow/FollowingScreen";
import MyStatusBar from "../../components/MyStatusBar";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Default } from "../../constants/styles2";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../constants/colors";
import TextComp from "../../components/TextComp";
import { Share } from "react-native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const HEADER_HEIGHT = 250;

const DATA = [0];
const identity = (v) => v + "";

const Header = () => {
  const navigation = useNavigation();

  // console.log("userData", userData)
  
  const theme = useContext(ThemeContext);
  
  const { userInfo, userTokens } = useContext(AuthContext);

  const user = userTokens;
  
  console.log("userInfo", userInfo)

  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);

  const isFocused = useIsFocused();

  const onFetchProfile = async () => {
    let token = user;
    console.log("token ---------- ", token);
    setLoading(true);
    try {
      let res = await myProifile(token);
      console.log("response -------", res);
      console.log("profile result -------", res.authenticated_user);
      setProfile(res.authenticated_user);
      // setLoading(false);
    } catch (error) {
      showError(error.message);
      console.log("profile error -------", error);
    }
    setLoading(false);
  };

  console.log("count       ", profile.follower_count);
  // useEffect(() => {
  //   onFetchProfile();
  // }, []);
  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
      onFetchProfile();
    }
  }, [isFocused]);

  //

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: "Check out this awesome post!",
        url: "https://example.com/post/123", // Replace with your post's URL
      });

      if (result.action === Share.ActionType.SHARED) {
        console.log("Shared successfully");
      } else if (result.action === Share.ActionType.DISMISSED) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Sharing error:", error);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: theme.theme == "dark" ? "#000" : "#fff",
        }}
      >
        <MyStatusBar />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <View></View>

          <TouchableOpacity
            onPress={() =>
              navigation.push("profileSettingsScreen", { profile: profile })
            }
          >
            <Ionicons name="ellipsis-vertical" size={20} color={theme.color} />
          </TouchableOpacity>
        </View>

        <View style={Container.safe}>
          {profile.avatar == null ? (
            <Image
              style={UserImage.Image}
              resizeMode="contain"
              source={require("../../../assets/images/2.jpeg")}
            />
          ) : (
            <Image
              style={UserImage.Image}
              resizeMode="contain"
              source={{ uri: profile.avatar }}
            />
          )}
          <View>
            <Text style={[UserName.Text, { color: theme.color }]}>
              @{profile.username}
              {profile.is_premium ? (' verified') : ''}
            </Text>
            {/* {profile.is_premium ? (
                <Ionicons name="ellipsis-vertical" size={20} color={theme.color} />
              ) : (
                <></>
              )} */}
          </View>
          <View style={UserFollowers.View}>
            <TouchableOpacity onPress={() => navigation.push("Following", {item: profile })}>
              <View style={UserFollowersText.View}>
                <Text
                  style={[UserFollowersTextNumber.Text, { color: theme.color }]}
                >
                  {profile.follower_count}
                </Text>
                  <Text
                    style={[UserFollowersTextDesc.Text, { color: theme.color }]}
                  >
                    Following
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("Followers", {item: profile })}>
              <View style={UserFollowersText.View}>
                <Text
                  style={[UserFollowersTextNumber.Text, { color: theme.color }]}
                >
                  {profile.following_count ?? 0}
                </Text>
                <Text
                  style={[UserFollowersTextDesc.Text, { color: theme.color }]}
                >
                  Followers
                </Text>
              </View>
            </TouchableOpacity>
            <View style={UserFollowersText.View}>
              <Text
                style={[UserFollowersTextNumber.Text, { color: theme.color }]}
              >
                {profile.post_count}
              </Text>
              <Text
                style={[UserFollowersTextDesc.Text, { color: theme.color }]}
              >
                Posts
              </Text>
            </View>
          </View>
          <View style={EditProfile.View}>
            <TouchableOpacity
              onPress={() =>
                navigation.push("editProfileScreen", { profile: profile })
              }
              style={ButtonEditProfile.TouchableOpacity}
            >
              <Text>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={shareContent}
              style={ButtonFavorites.TouchableOpacity}
            >
              <Fontisto name={"share-a"} size={20} color={"white"} />
              <TextComp text="  Share" color={"#fff"} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity>
            <Text>Tap to add bio</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};

const MyProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Posts");

  const theme = useContext(ThemeContext);

  const data = [1, 2, 3, 4, 5]; // Sample data for FlatLists

  const renderTabContent = () => {
    // if (selectedTab === "Posts") {
      return <VideoTab  />;
    // } else if (selectedTab === "Followers") {
    //   return <FollowersScreen isHeader={false} />;
    // } else if (selectedTab === "Following") {
    //   return <FollowingScreen />;
    // }
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.theme != "dark" ? "white" : "black",
        }}
      >
        <View style={{ flex: 1 }}>
          <Header />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity onPress={() => setSelectedTab("Posts")}>
              <Text
                style={{
                  paddingHorizontal: 20,
                  // color: selectedTab === "Posts" ? "blue" : "black",
                  // backgroundColor:
                  //   selectedTab === "Posts" ? PRIMARY_COLOR : "#ffffff00",
                  paddingVertical: 10,
                  fontFamily: "Bold"
                }}
              >
                Posts
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setSelectedTab("Followers")}>
              <Text
                style={{
                  paddingHorizontal: 20,
                  color: selectedTab === "Followers" ? "blue" : "black",
                  backgroundColor:
                    selectedTab === "Followers" ? PRIMARY_COLOR : "#ffffff00",
                  paddingVertical: 10,
                }}
              >
                Followers
              </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => setSelectedTab("Following")}>
              <Text
                style={{
                  paddingHorizontal: 20,
                  color: selectedTab === "Following" ? "blue" : "black",
                  backgroundColor:
                    selectedTab === "Following" ? PRIMARY_COLOR : "#ffffff00",
                  paddingVertical: 10,
                }}
              >
                Following
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Render the content of the selected tab */}
          {renderTabContent()}
        </View>
      </ScrollView>
    </>
  );
};

export default MyProfileScreen;

export const Container = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#ccc",
  },
});

export const UserImage = StyleSheet.create({
  Image: {
    alignSelf: "center",
    marginTop: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const UserName = StyleSheet.create({
  Text: {
    marginTop: 20,
    fontFamily: "Regular",
    alignSelf: "center",
  },
});

export const UserFollowers = StyleSheet.create({
  View: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const UserFollowersText = StyleSheet.create({
  View: {
    width: WIDTH * 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const UserFollowersTextNumber = StyleSheet.create({
  Text: {
    color: "#010101",
    fontFamily: "Bold",
  },
});

export const UserFollowersTextDesc = StyleSheet.create({
  Text: {
    // marginTop: 10,
    color: "#333",
  },
});

export const EditProfile = StyleSheet.create({
  View: {
    // width: WIDTH * 0.1,
    marginVertical: 20,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ButtonEditProfile = StyleSheet.create({
  TouchableOpacity: {
    backgroundColor: ACCENT_COLOR,
    borderRadius: 9,
    width: WIDTH * 0.3,
    height: 52,
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // border: solid 1 "#333",
    padding: 15,
  },
});

export const ButtonEditProfileText = StyleSheet.create({
  Text: {
    color: "#333",
    fontFamily: "Regular",
  },
});

export const ButtonFavorites = StyleSheet.create({
  TouchableOpacity: {
    backgroundColor: PRIMARY_COLOR,
    marginRight: 10,
    borderRadius: 9,
    marginLeft: 10,
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // border: solid 1 #333,
    padding: 15,
  },
});

export const ButtonAddBio = StyleSheet.create({
  TouchableOpacity: {
    marginLeft: 10,
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});

export const ButtonAddBioText = StyleSheet.create({
  Text: {
    color: "#333",
    fontFamily: "Regular",
  },
});
