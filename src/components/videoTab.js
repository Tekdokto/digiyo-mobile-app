import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Default, Colors, Fonts } from "../constants/styles2";
import ThemeContext from "../theme/ThemeContext";
import { useSelector } from "react-redux";
// import { getUserPosts } from "../redux/actions/auth";
import { DELETE_POSTS, ALL_POST } from "../config/urls";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import { ACCENT_COLOR } from "../constants/colors";

const { width } = Dimensions.get("window");

const VideoTab = (props) => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`videoTab:${key}`);
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
      userPosts()
    }
  }, [isFocused]);

  const userToken = useSelector((state) => state.auth.userData.token);

  function extractAuthorization(cookieString) {
    const cookies = cookieString.split(";");
    let authorization = "";

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("Authorization=")) {
        authorization = cookie.substring("Authorization=".length);
        break;
      }
    }

    return authorization;
  }

  const auth = extractAuthorization(userToken);
  const userId = useSelector(
    (state) => state.auth.userData.authenticated_user.user_id
  );

  console.log("-------------", post);

  const userPosts = async () => {

    const id = props.userId ?? userId

    const config = {
      method: "get",
      url: ALL_POST + id,
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    try {
      setLoading(true);
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => {
          setPost(response.data.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   userPosts();
  // }, []);

  // console.log("++++++++++++++",post)

  const renderItem = ({ item, index }) => {
    // const medias = item.media_items.map((media) => media.type)
    const mediaTypes = item.media_items.map((media) => media.type);
    const vidUrls = item.media_items.map((media) => media.url.low);
    const imageUrls = item.media_items.map((media) => media.url);
    // console.log("'''''''''''''''''''", imageUrls);
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            console.log("first");
            // deletePost(item.post_id)

            navigation.push("userProfilePostScreen", {
              item: item,
              postsArray: post,
            });
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding,
          }}
        >
          {mediaTypes == "video" ? (
            <Video
              source={{ uri: vidUrls[0] }}
              style={{
                resizeMode: "stretch",
                width: width / 3.75,
                height: 123,
                borderRadius: 10,
              }}
            />
          ) : mediaTypes == "image" ? (
            <Image
              source={{ uri: imageUrls[0] }}
              style={{
                resizeMode: "stretch",
                width: width / 3.75,
                height: 123,
                borderRadius: 10,
              }}
            />
          ) : (
            <></>
          )}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              // right: isRtl ? null : 0,
            }}
          >
            <View
              style={{
                flexDirection:
                  // isRtl ? "row-reverse" :
                  "row",
                alignItems: "center",
                paddingHorizontal: Default.fixPadding * 0.4,
              }}
            >
              <Ionicons name="heart" size={18} color={ACCENT_COLOR} />
              <Text
                style={{
                  ...Fonts.SemiBold12white,
                  color: theme.color,
                  marginHorizontal: Default.fixPadding * 0.2,
                }}
              >
                {item.totalLikes}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        paddingTop: 30,
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          numColumns={3}
          data={post}
          renderItem={renderItem}
          keyExtractor={(item) => item.post_id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding,
          }}
        />
      )}
    </View>
  );
};

export default VideoTab;
