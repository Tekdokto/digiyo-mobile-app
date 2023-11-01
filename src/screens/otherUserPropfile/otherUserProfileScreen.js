import React from "react";
import { useCallback } from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { Default, Fonts, Colors } from "../../constants/styles2";
import {
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeContext from "../../theme/ThemeContext";
import { useContext } from "react";
import { BLOCK_USER, FOLLOW, FOLLOW_TOGGLE } from "../../config/urls";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import AwesomeButton from "react-native-really-awesome-button";
import { ActivityIndicator } from "react-native";
import { ACCENT_COLOR } from "../../constants/colors";
import styles from "../../constants/styles";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import { Modal } from "react-native";
import MyStatusBar from "../../components/MyStatusBar";

export const Header = (props) => {
  // const { item } = route.params;
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [isBlockLoading, setIsBlockLoading] = useState(false);

  const [settingModal, setSettingModal] = useState(false);

  const { t, i18n } = useTranslation();

  const isRtl = i18next.dir() == "rtl";

  function tr(key) {
    return t(`otherUserProfileScreen:${key}`);
  }

  const shareProfile = () => {
    Share.share({
      message: "V Rock",
    });
    setSettingModal(false);
  };

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

  const userToken = useSelector((state) => state.auth.userData.token);

  const auth = extractAuthorization(userToken);
  const userId = useSelector(
    (state) => state.auth.userData.authenticated_user.user_id
  );

  console.log("first", props);

  const followUser = async () => {
    const config = {
      method: "post",
      url: FOLLOW_TOGGLE + "/" + props.user.user_id,
      // + item.author_id,
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    console.log(config);
    setIsLoading(true);
    try {
      await axios(config)
        .then((response) => {
          // setUser(response.data);
          console.log("works");
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  console.log(props);

  const blockUser = async () => {
    console.log("BLOCKK");
    const config = {
      method: "post",
      url: BLOCK_USER + props.user.user_id,
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    console.log(config);

    setIsBlockLoading(true);

    try {
      // setLoading(true)
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => {
          // setUser(response.data);
          console.log(" user blockked".response);
        })
        .catch((error) => {
          console.log("blockkk error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }

    setIsBlockLoading(false);
  };

  // console.log("are there stuff in here",props.user)

  const unblockUser = async () => {
    console.log("UNBLOCKK");
    const config = {
      method: "delete",
      url: BLOCK_USER + props.user.user_id,
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    setIsBlockLoading(true);
    try {
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => {
          // setUser(response.data);
          console.log(" user blockked".response);
        })
        .catch((error) => {
          console.log("blockkk error 1111111111111", error);
        });

      // console.log("---------",res)
    } catch (error) {
      console.log(error);
    }
    setIsBlockLoading(false);
  };

  return (
    <>
      <MyStatusBar />
      <View
        style={{ backgroundColor: theme.theme != "dark" ? "white" : "black" }}
      >
        <View
          style={{
            flexDirection:
              // isRtl ? "row-reverse" :
              "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 2,
            // backgroundColor: theme.theme != "dark" ? "white" : "black"
          }}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons
              name={
                // isRtl ? "chevron-forward-outline" :
                "chevron-back-outline"
              }
              size={25}
              color={theme.color}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSettingModal(true)}>
            <Ionicons
              name={"ellipsis-vertical"}
              size={25}
              color={theme.color}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ backgroundColor: theme.theme != "dark" ? "white" : "black" }}
        >
          <View style={{}}>
            {props.user.avatar != null ? (
              <Image
                source={{ uri: props.user.avatar }}
                style={{
                  // flex: 3,
                  resizeMode: "cover",
                  alignSelf: "center",
                  width: 100,
                  height: 100,
                  borderRadius: 80,
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/images/2.jpeg")}
                style={{
                  // flex: 3,
                  resizeMode: "cover",
                  alignSelf: "center",
                  width: 100,
                  height: 100,
                  borderRadius: 80,
                }}
              />
            )}

            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
                @{props.user.username}
              </Text>
              <Text
                style={{
                  ...Fonts.Medium12grey,
                  color: theme.color,
                  marginTop: Default.fixPadding * 0.3,
                }}
              >
                # Dance lover # food lovers
              </Text>

              <View
                style={{
                  flexDirection:
                    // isRtl ? "row-reverse" :
                    "row",
                  marginTop: Default.fixPadding * 2.5,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.push("userFollowingScreen")}
                  style={{
                    flex: 3.5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight:
                      // isRtl ? 0 :
                      Default.fixPadding,
                    // marginLeft: isRtl ? Default.fixPadding : 0,
                  }}
                >
                  <Text
                    style={{ ...Fonts.SemiBold14white, color: theme.color }}
                  >
                    {props.user.following_count}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14white,
                      color: theme.color,
                      overflow: "hidden",
                      marginTop: Default.fixPadding * 0.5,
                    }}
                  >
                    {tr("followers")}
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
                    onPress={() => navigation.push("followersScreen")}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ ...Fonts.SemiBold14white, color: theme.color }}
                    >
                      {props.user.follower_count}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold14white,
                        color: theme.color,
                        overflow: "hidden",
                        marginTop: Default.fixPadding * 0.5,
                      }}
                    >
                      {tr("following")}
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
                  <Text
                    style={{ ...Fonts.SemiBold14white, color: theme.color }}
                  >
                    {props.user.post_count}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14white,
                      color: theme.color,
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
                  {
                    flexDirection: "row",
                    marginHorizontal: WIDTH * 0.1,
                    marginHorizontal: Default.fixPadding * 2,
                    marginBottom: Default.fixPadding * 2,
                    marginTop: 20,
                  },
                ]}
              >
                <AwesomeButton
                  height={50}
                  width={WIDTH * 0.35}
                  // stretch={true}
                  // disabled={true}
                  raiseLevel={1}
                  borderRadius={10}
                  // borderWidth={null}
                  backgroundDarker={Colors.transparent}
                  backgroundColor={ACCENT_COLOR}
                >
                  <TouchableOpacity
                    onPressOut={() => navigation.push("messageUserScreen")}
                  >
                    <Text style={{ ...Fonts.Bold18white }}>Message</Text>
                  </TouchableOpacity>
                </AwesomeButton>

                <View style={{ margin: 8 }}></View>
                <AwesomeButton
                  height={50}
                  width={WIDTH * 0.3}
                  // stretch={true}
                  // disabled={true}
                  raiseLevel={1}
                  borderRadius={10}
                  // borderWidth={null}
                  backgroundDarker={Colors.transparent}
                  extra={
                    <LinearGradient
                      start={[0, 1]}
                      end={[1, 1]}
                      colors={[Colors.primary, Colors.extraDarkPrimary]}
                      style={{ ...StyleSheet.absoluteFillObject }}
                    />
                  }
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator color={"white"} />
                    </>
                  ) : (
                    <TouchableOpacity onPress={followUser}>
                      <Text style={{ ...Fonts.Bold18white }}>
                        {tr("follow")}
                      </Text>
                    </TouchableOpacity>
                  )}
                </AwesomeButton>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          ></View>
        </View>
      </View>

      {/* MODAL */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={settingModal}
        onRequestClose={() => setSettingModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setSettingModal(false)}
          style={{ flex: 1, backgroundColor: Colors.transparentWhite }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                paddingVertical: Default.fixPadding * 1.2,
                paddingHorizontal: Default.fixPadding,
                width: WIDTH / 2,
                left: isRtl ? null : "20%",
                right: isRtl ? "20%" : null,
                borderRadius: 10,
                backgroundColor: Colors.black,
                ...Default.shadow,
              }}
            >
              <TouchableOpacity
                onPress={shareProfile}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ellipse" size={10} color={Colors.white} />
                <Text
                  style={{
                    ...Fonts.SemiBold16white,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("shareProfile")}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginVertical: Default.fixPadding,
                }}
              >
                <Ionicons name="ellipse" size={10} color={Colors.white} />
                <Text
                  style={{
                    ...Fonts.SemiBold16white,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("report")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ellipse" size={10} color={Colors.white} />
                <TouchableOpacity onPress={blockUser}>
                  <Text
                    style={{
                      ...Fonts.SemiBold16white,
                      marginHorizontal: Default.fixPadding,
                    }}
                  >
                    {tr("block")} {props.user.username}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

// BOTTOM SIDE POST
const OtherUserProfileScreen = ({ navigation, route }) => {
  const { item } = route.params;
  
  const previousScreen = route.params.previousScreen;
  
  const theSearchId = route.params.item.user_id;
  const theUserId = route.params.item;

  // console.log("here n ow", theUserId, previousScreen);
  console.log("here n ow", theSearchId, previousScreen);
  // const comingFrom = useRoute()
  // console.log("coming from",comingFrom.params?.previousScreen)
  // const navigation = useNavigation()

  const theme = useContext(ThemeContext);

  const [user, setUser] = useState([]);

  const isFocused = useIsFocused();

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

  const userToken = useSelector((state) => state.auth.userData.token);

  const auth = extractAuthorization(userToken);

  let the_id =
    previousScreen == "SearchScreen"
      ? theSearchId
      : previousScreen == "SearchSeeAllUsersScreen"
      ? item.user_id
      : previousScreen == "profileScreen"
      ? theUserId.user_id
      : item.author_id;
 

  const fetchUser = async () => {
    const config = {
      method: "get",
      url: FOLLOW + the_id,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };

    console.log(config);
    // console.log("user id",item.author.user_id)
    try {
      // setLoading(true)
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => {
          setUser(response.data);
          console.log("this profile user ",response.data);
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
      fetchUser();
    }
  }, [isFocused]);

  // console.log('make i see ',user.map((id) => id.user_id))

  const headerItem = () => {
    return <Header user={user} />;
  };

  const renderItemPosts = ({ item }) => {
    const mediaTypes = item.media_items.map((media) => media.type);
    const mediasUrls = item.media_items.map((media) => media.url.low);
    const imagesUrls = item.media_items.map((media) => media.url);
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("userProfilePostScreen", {
            postsArray: user.posts,
            item: item,
          })
        }
        style={{
          flex: 1,
          // marginTop: HEIGHT * 0.6,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding,
        }}
      >
        {mediaTypes == "image" ? (
          <Image
            source={{ uri: imagesUrls[0] }}
            style={{
              resizeMode: "cover",
              width: WIDTH / 3.7,
              height: 123,
              borderRadius: 10,
            }}
          />
        ) : mediaTypes == "video" ? (
          <Video
            source={{ uri: mediasUrls[0] }}
            isLooping={false}
            shouldPlay={false}
          />
        ) : (
          <Image
            source={require("../../../assets/images/2.jpeg")}
            style={{
              // flex: 3,
              resizeMode: "cover",
              alignSelf: "center",
              width: 100,
              height: 100,
              borderRadius: 80,
            }}
          />
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right:
              // isRtl ? null :
              0,
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
            <Ionicons name="play" size={18} color={Colors.white} />
            <Text
              style={{
                ...Fonts.SemiBold12white,
                marginHorizontal: Default.fixPadding * 0.2,
              }}
            >
              {item.other}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tabs.Container
      renderHeader={headerItem}
      headerHeight={HEIGHT * 0.4}
      headerContainerStyle={{ top: 0 }}
      containerStyle={{
        backgroundColor: theme.theme != "dark" ? "white" : "black",
      }}
    >
      <Tabs.Tab name="Posts">
        <Tabs.FlatList
          numColumns={3}
          data={user.posts}
          renderItem={renderItemPosts}
          keyExtractor={(item) => item.post_id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: Default.fixPadding * 1.3,
            paddingHorizontal: Default.fixPadding,
            width: WIDTH,
            // alignContent:"flex-start",
            // alignItems: "flex-start",
            // alignItems: "flex-start"
          }}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default OtherUserProfileScreen;
