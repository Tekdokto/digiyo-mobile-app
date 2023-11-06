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
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemeContext from "../../theme/ThemeContext";
import { useContext } from "react";
import { BLOCK_USER, FOLLOW, FOLLOWING, FOLLOW_TOGGLE } from "../../config/urls";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import AwesomeButton from "react-native-really-awesome-button";
import { ActivityIndicator } from "react-native";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../constants/colors";
import styles from "../../constants/styles";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import { Modal } from "react-native";
import MyStatusBar from "../../components/MyStatusBar";
import { ScrollView } from "react-native-gesture-handler";
import FollowersScreen from "../FollowUnfollow/FollowersScreen";
import FollowingScreen from "../FollowUnfollow/FollowingScreen";
import { FlatList } from "react-native";
import VideoTab from "../../components/videoTab";
import { showMessage } from "react-native-flash-message";
import { AuthContext } from "../../context/AuthContext";
import { getBlockedUsers } from "../../redux/actions/auth";

export const Header = (props) => {
  // const { item } = route.params;
  const theme = useContext(ThemeContext);

  const { userInfo, userTokens } = useContext(AuthContext);

  const profile = props.user

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [isBlockLoading, setIsBlockLoading] = useState(false);

  const [settingModal, setSettingModal] = useState(false);

  // const [followCount, setFollowCount] = useState(props.user.follower_count);
  const [followCountState, setFollowCountState] = useState(isFollowing);
   
  const [theBlocks, setBlocks] = useState([]); 

  const isFocused = useIsFocused();

  
  const { t, i18n } = useTranslation();

  const isRtl = i18next.dir() == "rtl";
  
    const [followersData, setFollowersData] = useState([]);
    
    // Assuming you have followersData (an array) and the_id defined elsewhere
    const fols = followersData.some((follower) => follower.user_id === props.user.user_id)
    console.log(fols)
    const [isFollowing, setisFollowing] = useState(fols)

    const isBlocking = theBlocks.some((blocks) => blocks.user_id === props.user.user_id);
    console.log("isblisBlocking",isBlocking)
    const [blockState, setBlockState] = useState(isBlocking);

  // const [followState, setFollowState ] = useState(isFollowing)

  // console.log("state         ", followState)
  // console.log("isFollowing", isFollowing)
  function tr(key) {
    return t(`otherUserProfileScreen:${key}`);
  }

  const shareProfile = () => {
    Share.share({
      message: "V Rock",
    });
    setSettingModal(false);
  };


  const userToken = userTokens

  const auth = userToken
 
  const userId = userInfo.user_id;

  // console.log("first", props);

// isFollowing will be true if the user is following, or false if not


  // console.log("is following this    ",isFollowing)

  const fetchFollowers = async () => {
    const id = userId;
    const config = {
      method: "get",
      url: FOLLOWING,
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    try {
      // setLoading(true)
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => {
          setFollowersData(response.data);
          console.log( "my followings      ",response.data);
        })
        .catch((error) => {
          console.log("followinf error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) { 
      console.log(error);
    }
  };


  useEffect(() => {
    fetchFollowers();
  }, [isFollowing, followCountState, blockState]);


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
    // console.log(config);
    setIsLoading(true);
    try {
      await axios(config)
        .then((response) => {
          // setUser(response.data);
          console.log("works");
          showMessage("success")
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }
    setisFollowing(!isFollowing)
    setIsLoading(false);
    !fols
  };

  // console.log(props);

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
      await axios(config)
        .then((response) => { 
          console.log(" user blockked", response.data);
        })
        .catch((error) => {
          console.log("blockkk error 1111111111111", error);
        });

    } catch (error) {
      console.log(error);
    }
    setBlockState(!blockState)
    setIsBlockLoading(false);
    !isBlocking
  };

 
  const onFetchBlocked = async () => {
    let token = auth;
    console.log("token ---------- ", token);
    // setLoading(true);
    try {
      let res = await getBlockedUsers(token);
      console.log("response -------", res);
      console.log("blocked  result -------", res);
      setBlocks(res);
      // setLoading(false);
    } catch (error) {
      // showError(error.message);
      console.log("profile error -------", error);
    }
    // setLoading(false);
  };
 
  // useEffect(() => {
  //   onFetchProfile();
  // }, []);
  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
      onFetchBlocked();
    }
  }, [isFocused]);



  
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
                  onPress={() => navigation.push("Followers", {item: profile })}
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
                    onPress={() => navigation.push("Following", {item: profile })}
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
                  width={WIDTH * 0.35}
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
                  {/* {isLoading ? (
                    <>
                      <ActivityIndicator color={"white"} />
                    </>
                  ) : ( */}
                    <TouchableOpacity onPress={followUser}>
                        <Text style={{ ...Fonts.Bold18white }}>
                      {fols ?  "following" : "Follow" }</Text> 
                    </TouchableOpacity>
                  {/* )} */}
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
                {isBlockLoading ? (
                  <>
                    <ActivityIndicator />
                  </>
                ) : (

                  <TouchableOpacity onPress={blockUser}>
                      {isBlocking ? (
                    <Text
                      style={{
                        ...Fonts.SemiBold16white,
                        marginHorizontal: Default.fixPadding,
                      }}
                    >
                        Unblock {props.user.username}
                        </Text>
                      ) : (
                    <Text
                      style={{
                        ...Fonts.SemiBold16white,
                        marginHorizontal: Default.fixPadding,
                      }}
                    >
                        Block {props.user.username}
  
                    </Text>
                      )}
                  </TouchableOpacity>
                )}
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
  // console.log("here n ow", theSearchId, previousScreen);
  // const comingFrom = useRoute()
  // console.log("coming from",comingFrom.params?.previousScreen)
  // const navigation = useNavigation()

  const theme = useContext(ThemeContext);

  const { userInfo, userTokens } = useContext(AuthContext);


  const [user, setUser] = useState([]);

  const isFocused = useIsFocused();

  const userToken = userTokens

  const auth = userToken

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

  // const renderItemPosts = ({ item }) => {
  //   const mediaTypes = item.media_items.map((media) => media.type);
  //   const mediasUrls = item.media_items.map((media) => media.url.low);
  //   const imagesUrls = item.media_items.map((media) => media.url);
  //   console.log('----------',imagesUrls[0]);
  //   console.log('----------',mediasUrls[0]);
  //   return (
     
  //       <TouchableOpacity
  //           onPress={() =>
  //             navigation.navigate("userProfilePostScreen", {
  //               postsArray: user.posts,
  //               item: item,
  //             })
  //           }
  //           style={{
  //             flex: 1,
  //             // marginTop: HEIGHT * 0.6,
  //             marginBottom: Default.fixPadding * 2,
  //             marginHorizontal: Default.fixPadding,
  //           }}
  //         >
  //           {mediaTypes == "image" ? (
  //             <Image
  //               source={{ uri: imagesUrls[0] }}
  //               style={{
  //                 resizeMode: "cover",
  //                 width: WIDTH / 3.7,
  //                 height: 123,
  //                 borderRadius: 10,
  //               }}
  //             />
  //           ) : mediaTypes == "video" ? (
  //             <Video
  //               source={{ uri: mediasUrls[0] }}
  //               isLooping={false}
  //               shouldPlay={false}
  //             />
  //           ) : (
  //             <Image
  //               source={require("../../../assets/images/2.jpeg")}
  //               style={{
  //                 // flex: 3,
  //                 resizeMode: "cover",
  //                 alignSelf: "center",
  //                 width: 100,
  //                 height: 100,
  //                 borderRadius: 80,
  //               }}
  //             />
  //           )}
  //           <View
  //             style={{
  //               position: "absolute",
  //               bottom: 0,
  //               right:
  //                 // isRtl ? null :
  //                 0,
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection:
  //                   // isRtl ? "row-reverse" :
  //                   "row",
  //                 alignItems: "center",
  //                 paddingHorizontal: Default.fixPadding * 0.4,
  //               }}
  //             >
  //               <Ionicons name="play" size={18} color={Colors.white} />
  //             </View>
  //           </View>
  //               <Text
  //                 style={{
  //                   color: "white",
  //                   // ...Fonts.SemiBold12white,
  //                   marginHorizontal: Default.fixPadding * 0.2,
  //                 }}
  //               >
  //                  word
  //               </Text>
  //         </TouchableOpacity>
      
      
  //   );
  // };

  const userId = userInfo.authenticated_user.user_id
    
    const [selectedTab, setSelectedTab] = useState("Posts");

  const renderTabContent = () => {
    // if (selectedTab === "Posts") {
      console.log("render posts itemmmmmmmmmmm",user.posts)
      return (
        <VideoTab 
          userId={the_id}
        />
      );
    // } else if (selectedTab === "Followers") {
    //   return <FollowersScreen isHeader={false} userId={the_id} />;
    // } else if (selectedTab === "Following") {
    //   return <FollowingScreen isHeader={false} userId={the_id} />;
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
        <View style={{ }}>
          <Header user={user} />

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
                  fontFamily: "Bold",
                  // color: selectedTab === "Posts" ? "blue" : "black",
                  // backgroundColor:
                  //   selectedTab === "Posts" ? PRIMARY_COLOR : "#ffffff00",
                  paddingVertical: 10,
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

export default OtherUserProfileScreen;
