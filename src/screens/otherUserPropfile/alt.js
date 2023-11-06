// import {
//     Text,
//     View,
//     Dimensions,
//     Image,
//     BackHandler,
//     TouchableOpacity,
//     FlatList,
//     Modal,
//     Share,
//     StyleSheet,
//     ActivityIndicator,
//     Pressable,
//   } from "react-native";
//   import React, { useState, useEffect, useContext } from "react";
//   import styles, { Colors, Default, Fonts } from "../../constants/styles2";
//   import Ionicons from "react-native-vector-icons/Ionicons";
//   import { LinearGradient } from "expo-linear-gradient";
//   import AwesomeButton from "react-native-really-awesome-button";
//   import { useTranslation } from "react-i18next";
//   import MyStatusBar from "../../components/MyStatusBar";
//   import ThemeContext from "../../theme/ThemeContext";
//   import { ACCENT_COLOR, PRIMARY_COLOR } from "../../constants/colors";
//   import { WIDTH } from "../../constants/sizes";
//   import { useSelector } from "react-redux";
//   import { useIsFocused, useNavigation } from "@react-navigation/native";
//   import { BLOCK_USER, FOLLOW, FOLLOW_TOGGLE } from "../../config/urls";
//   import axios from "axios";
//   import { Video } from "expo-av";
  
//   const OtherUserProfileScreen = ({ navigation, route }) => {
//     const { item } = route.params;
//     // console.log("item =======", item)
  
//     const theme = useContext(ThemeContext);
  
//     const [user, setUser] = useState([]);
  
//     const { t, i18n } = useTranslation();
  
//     const isRtl = i18n.dir() == "rtl";
  
//     function tr(key) {
//       return t(`otherUserProfileScreen:${key}`);
//     }
  
//     const backAction = () => {
//       navigation.pop();
//       return true;
//     };
//     useEffect(() => {
//       BackHandler.addEventListener("hardwareBackPress", backAction);
  
//       return () =>
//         BackHandler.removeEventListener("hardwareBackPress", backAction);
//     }, []);
  
//     const [isLoading, setIsLoading] = useState(false);
//     const [isBlockLoading, setIsBlockLoading] = useState(false);
  
//     const [settingModal, setSettingModal] = useState(false);
//     const shareProfile = () => {
//       Share.share({
//         message: "V Rock",
//       });
//       setSettingModal(false);
//     };
  
//     const isFocused = useIsFocused();
  
//     const navigate = useNavigation();
  
//     // console.log(item);
  
//     function extractAuthorization(cookieString) {
//       const cookies = cookieString.split(";");
//       let authorization = "";
  
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.startsWith("Authorization=")) {
//           authorization = cookie.substring("Authorization=".length);
//           break;
//         }
//       }
  
//       return authorization;
//     }
  
//     const userToken = useSelector((state) => state.auth.userData.token);
  
//     const auth = extractAuthorization(userToken);
//     const userId = userInfo.authenticated_user.user_id;

  
//     // console.log(auth)
  
//     const followUser = async () => {
//       const config = {
//         method: "post",
//         url: FOLLOW_TOGGLE+"/" + item.author_id,
//         // data: formdata,
//         headers: {
//           Authorization: auth,
//           "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//         },
//       };
//       console.log(config)
//       setIsLoading(true)
//       try {
//         await axios(config)
//           .then((response) => {
//             // setUser(response.data);
//             console.log("wors");
//           })
//           .catch((error) => {
//             console.log("error 1111111111111", error);
//           });
  
//         // console.log("---------",res)
//         // setLoading(false)
//       } catch (error) {
//         console.log(error);
//       }
//       setIsLoading(false)
//     };
  
  
//     const blockUser = async () => {
  
//       console.log("BLOCKK")
//       const config = {
//         method: "post",
//         url: BLOCK_USER + user.user_id,
//         // data: formdata,
//         headers: {
//           Authorization: auth,
//           "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//         },
//       };
//       console.log(config)
  
//       setIsBlockLoading(true)
  
//       try {
//         // setLoading(true)
//         // let res = getUserPosts(auth,  userId)
//         await axios(config)
//           .then((response) => {
//             // setUser(response.data);
//             console.log(' user blockked'.response);
//           })
//           .catch((error) => {
//             console.log("blockkk error 1111111111111", error);
//           });
  
//         // console.log("---------",res)
//         // setLoading(false)
//       } catch (error) {
//         console.log(error);
//       }
  
//       setIsBlockLoading(false)
//     };
  
  
//     const unblockUser = async () => {
  
//       console.log("UNBLOCKK")
//       const config = {
//         method: "delete",
//         url: BLOCK_USER + user.user_id,
//         // data: formdata,
//         headers: {
//           Authorization: auth,
//           "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//         },
//       };
//       setIsBlockLoading(true)
//       try {
//         // let res = getUserPosts(auth,  userId)
//         await axios(config)
//           .then((response) => {
//             // setUser(response.data);
//             console.log(' user blockked'.response);
//           })
//           .catch((error) => {
//             console.log("blockkk error 1111111111111", error);
//           });
  
//         // console.log("---------",res)
//       } catch (error) {
//         console.log(error);
//       }
//       setIsBlockLoading(false)
//     };
  
    
//     const fetchUser = async () => {
//       const config = {
//         method: "get",
//         url: FOLLOW + item.author_id,
//         // data: formdata,
//         headers: {
//           Authorization: auth,
//           "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//         },
//       };
//       try {
//         // setLoading(true)
//         // let res = getUserPosts(auth,  userId)
//         await axios(config)
//           .then((response) => {
//             setUser(response.data);
//             // console.log("this profile user ",response.data);
//           })
//           .catch((error) => {
//             console.log("error 1111111111111", error);
//           });
  
//         // console.log("---------",res)
//         // setLoading(false)
//       } catch (error) {
//         console.log(error);
//       }
//     };
    
//     useEffect(() => {
//       if (isFocused) {
//         // Reload your screen here
//       fetchUser();
//       }
//     }, [isFocused]);
  
  
//     const renderItem = ({ item }) => {
//       const mediaTypes = item.media_items.map((media) => media.type);
//       const mediasUrls = item.media_items.map((media) => media.url.low);
//       const imagesUrls = item.media_items.map((media) => media.url);
//       // console.log(mediasUrls[0]);
//       return (
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("userProfilePostScreen", {
//               postsArray: user.posts,
//               item: item,
//               // key: "1",
//               // title: `${tr("unFollow")} Jane Cooper `,
//               // follow: true,
//             })
//           }
//           style={{
//             flex: 1,
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
//               right: isRtl ? null : 0,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: isRtl ? "row-reverse" : "row",
//                 alignItems: "center",
//                 paddingHorizontal: Default.fixPadding * 0.4,
//               }}
//             >
//               <Ionicons name="play" size={18} color={Colors.white} />
//               <Text
//                 style={{
//                   ...Fonts.SemiBold12white,
//                   marginHorizontal: Default.fixPadding * 0.2,
//                 }}
//               >
//                 {item.other}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       );
//     };
  
//     return (
//       <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
//         <MyStatusBar />
//         <View
//           style={{
//             flexDirection: isRtl ? "row-reverse" : "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingVertical: Default.fixPadding * 1.2,
//             paddingHorizontal: Default.fixPadding * 2,
//           }}
//         >
//           <TouchableOpacity onPress={() => navigation.pop()}>
//             <Ionicons
//               name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
//               size={25}
//               color={theme.color}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setSettingModal(true)}>
//             <Ionicons name={"ellipsis-vertical"} size={25} color={theme.color} />
//           </TouchableOpacity>
//         </View>
//         <View style={{ backgroundColor: theme.backgroundColor }}>
//           <View style={{}}>
//             {item.author.avatar != null ? (
//               <Image
//                 source={{uri: item.author.avatar}}
//                 style={{
//                   // flex: 3,
//                   resizeMode: "cover",
//                   alignSelf: "center",
//                   width: 100,
//                   height: 100,
//                   borderRadius: 80,
//                 }}
//               />
//             ) : (
  
//               <Image
//                 source={require("../../../assets/images/2.jpeg")}
//                 style={{
//                   // flex: 3,
//                   resizeMode: "cover",
//                   alignSelf: "center",
//                   width: 100,
//                   height: 100,
//                   borderRadius: 80,
//                 }}
//               />
//             )
//             }
  
//             <View
//               style={{
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
//                 {user.username}
//               </Text>
//               <Text
//                 style={{
//                   ...Fonts.Medium12grey,
//                   color: theme.color,
//                   marginTop: Default.fixPadding * 0.3,
//                 }}
//               >
//                 # Dance lover # food lovers
//               </Text>
  
//               <View
//                 style={{
//                   flexDirection: isRtl ? "row-reverse" : "row",
//                   marginTop: Default.fixPadding * 2.5,
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => navigation.push("userFollowingScreen")}
//                   style={{
//                     flex: 3.5,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginRight: isRtl ? 0 : Default.fixPadding,
//                     // marginLeft: isRtl ? Default.fixPadding : 0,
//                   }}
//                 >
//                   <Text style={{ ...Fonts.SemiBold14white, color: theme.color }}>
//                     {user.following_count}
//                   </Text>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       ...Fonts.SemiBold14white,
//                       color: theme.color,
//                       overflow: "hidden",
//                       marginTop: Default.fixPadding * 0.5,
//                     }}
//                   >
//                     {tr("following")}
//                   </Text>
//                 </TouchableOpacity>
//                 <View
//                   style={{
//                     flex: 4,
//                     borderLeftWidth: 2,
//                     borderLeftColor: Colors.grey,
//                     borderRightWidth: 2,
//                     borderRightColor: Colors.grey,
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => navigation.push("followersScreen")}
//                     style={{ justifyContent: "center", alignItems: "center" }}
//                   >
//                     <Text
//                       style={{ ...Fonts.SemiBold14white, color: theme.color }}
//                     >
//                       {user.follower_count}
//                     </Text>
//                     <Text
//                       numberOfLines={1}
//                       style={{
//                         ...Fonts.SemiBold14white,
//                         color: theme.color,
//                         overflow: "hidden",
//                         marginTop: Default.fixPadding * 0.5,
//                       }}
//                     >
//                       {tr("followers")}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={{
//                     flex: 2.5,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text style={{ ...Fonts.SemiBold14white, color: theme.color }}>
//                     {user.post_count}
//                   </Text>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       ...Fonts.SemiBold14white,
//                       color: theme.color,
//                       overflow: "hidden",
//                       marginTop: Default.fixPadding * 0.5,
//                     }}
//                   >
//                     {tr("post")}
//                   </Text>
//                 </View>
//               </View>
  
//               {/*  */}
//               <View
//                 style={[
//                   {
//                     flexDirection: "row",
//                     marginHorizontal: WIDTH * 0.1,
//                     marginHorizontal: Default.fixPadding * 2,
//                     marginBottom: Default.fixPadding * 2,
//                     marginTop: 20,
//                   },
//                 ]}
//               >
//                 <AwesomeButton
//                   height={50}
//                   width={WIDTH * 0.3}
//                   onPressOut={() => navigation.push("messageUserScreen")}
//                   raiseLevel={1}
//                   borderRadius={10}
//                   backgroundDarker={Colors.transparent}
//                   backgroundColor={ACCENT_COLOR}
//                 >
//                   <View style={styles.buttonGreen}>
//                     <Text
//                       style={{ color: "white", fontSize: 20, fontFamily: "Bold" }}
//                     >
//                       Message
//                     </Text>
//                   </View>
//                 </AwesomeButton>
//                 <View style={{ margin: 8 }}></View>
//                 <AwesomeButton
//                   height={50}
//                   width={WIDTH * 0.3}
//                   // stretch={true}
//                   // disabled={true}
//                   raiseLevel={1}
//                   borderRadius={10}
//                   // borderWidth={null}
//                   backgroundDarker={Colors.transparent}
//                   extra={
//                     <LinearGradient
//                       start={[0, 1]}
//                       end={[1, 1]}
//                       colors={[Colors.primary, Colors.extraDarkPrimary]}
//                       style={{ ...StyleSheet.absoluteFillObject }}
//                     />
//                   }
//                 >
//                   {isLoading ? (
//                     <>
//                       <ActivityIndicator color={"white"} />
//                     </>
//                   ) : (
  
//                     <TouchableOpacity onPress={followUser}>
//                     <Text style={{ ...Fonts.Bold18white }}>{tr("follow")}</Text>
//                     </TouchableOpacity>
//                   ) }
//                 </AwesomeButton>
//               </View>
//             </View>
//           </View>
  
//           <View
//             style={{
//               flexDirection: "row",
//             }}
//           ></View>
//         </View>
  
//         <View
//           style={{
//             marginTop: Default.fixPadding * 2,
//             marginBottom: Default.fixPadding * 1.2,
//             marginHorizontal: Default.fixPadding * 2,
//           }}
//         ></View>
  
//         <FlatList
//           numColumns={3}
//           data={user.posts}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.post_id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingTop: Default.fixPadding * 1.3,
//             paddingHorizontal: Default.fixPadding,
//           }}
//         />
  
//         <Modal
//           transparent={true}
//           animationType="fade"
//           visible={settingModal}
//           onRequestClose={() => setSettingModal(false)}
//         >
//           <TouchableOpacity
//             activeOpacity={1}
//             onPressOut={() => setSettingModal(false)}
//             style={{ flex: 1, backgroundColor: Colors.transparentWhite }}
//           >
//             <View
//               style={{
//                 alignItems: "center",
//                 marginTop: Default.fixPadding * 1.5,
//               }}
//             >
//               <View
//                 style={{
//                   paddingVertical: Default.fixPadding * 1.2,
//                   paddingHorizontal: Default.fixPadding,
//                   width: WIDTH / 2,
//                   left: isRtl ? null : "20%",
//                   right: isRtl ? "20%" : null,
//                   borderRadius: 10,
//                   backgroundColor: Colors.black,
//                   ...Default.shadow,
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={shareProfile}
//                   style={{
//                     flexDirection: isRtl ? "row-reverse" : "row",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Ionicons name="ellipse" size={10} color={Colors.white} />
//                   <Text
//                     style={{
//                       ...Fonts.SemiBold16white,
//                       marginHorizontal: Default.fixPadding,
//                     }}
//                   >
//                     {tr("shareProfile")}
//                   </Text>
//                 </TouchableOpacity>
  
//                 <View
//                   style={{
//                     flexDirection: isRtl ? "row-reverse" : "row",
//                     alignItems: "center",
//                     marginVertical: Default.fixPadding,
//                   }}
//                 >
//                   <Ionicons name="ellipse" size={10} color={Colors.white} />
//                   <Text
//                     style={{
//                       ...Fonts.SemiBold16white,
//                       marginHorizontal: Default.fixPadding,
//                     }}
//                   >
//                     {tr("report")}
//                   </Text>
//                 </View>
  
//                 <View
//                   style={{
//                     flexDirection: isRtl ? "row-reverse" : "row",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Ionicons name="ellipse" size={10} color={Colors.white} />
//                   <TouchableOpacity onPress={unblockUser}>
//                     <Text
//                       style={{
//                         ...Fonts.SemiBold16white,
//                         marginHorizontal: Default.fixPadding,
//                       }}
//                     >
//                       {tr("block")} {user.username}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </View>
//     );
//   };
  
//   // export default OtherUserProfileScreen;
  
//   import React, { useCallback } from "react";
// import { View, StyleSheet, ListRenderItem } from "react-native";
// import { Tabs } from "react-native-collapsible-tab-view";
// import VideoTab from "../../components/videoTab";
// import { WIDTH } from "../../constants/sizes";
// import { Image } from "react-native";
// import { Text } from "react-native";
// import { TouchableOpacity } from "react-native";
// import { Fontisto } from "@expo/vector-icons";
// import { useEffect } from "react";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { useState } from "react";
// import { useContext } from "react";
// import { useSelector } from "react-redux";
// import { myProifile } from "../../redux/actions/auth";
// import ThemeContext from "../../theme/ThemeContext";
// import { RefreshControl } from "react-native-gesture-handler";
// import FollowersScreen from "../FollowUnfollow/FollowersScreen";
// import FollowingScreen from "../FollowUnfollow/FollowingScreen";
// import MyStatusBar from "../../components/MyStatusBar";

// import Ionicons from "react-native-vector-icons/Ionicons";
// import { Default } from "../../constants/styles2";
// import { ACCENT_COLOR, PRIMARY_COLOR } from "../../constants/colors";
// import TextComp from "../../components/TextComp";
// import { Share } from "react-native";
// import { ActivityIndicator } from "react-native";

// const HEADER_HEIGHT = 250;

// const DATA = [0];
// const identity = (v) => v + "";

// const Header = () => {
//   const navigation = useNavigation();

//   const user = useSelector((state) => state.auth.userData.token);
//   // console.log("userData", userData)

//   const theme = useContext(ThemeContext);

//   const [isLoading, setLoading] = useState(false);
//   const [profile, setProfile] = useState(false);

//   const isFocused = useIsFocused();

 

//   const onFetchProfile = async () => {
//     let token = user.token;
//     console.log("token ---------- ", token);
//     setLoading(true);
//     try {
//       let res = await myProifile(token);
//       console.log("response -------", res);
//       console.log("profile result -------", res.authenticated_user);
//       setProfile(res.authenticated_user);
//       // setLoading(false);
//     } catch (error) {
//       showError(error.message);
//       console.log("profile error -------", error);
//     }
//     setLoading(false);
//   };

//   console.log("count       ",profile.follower_count)
//   // useEffect(() => {
//   //   onFetchProfile();
//   // }, []);
//    useEffect(() => {
//     if (isFocused) {
//       // Reload your screen here
//       onFetchProfile();
//     }
//   }, [isFocused]);

//   //

//   const shareContent = async () => {
//     try {
//       const result = await Share.share({
//         message: "Check out this awesome post!",
//         url: "https://example.com/post/123", // Replace with your post's URL
//       });

//       if (result.action === Share.ActionType.SHARED) {
//         console.log("Shared successfully");
//       } else if (result.action === Share.ActionType.DISMISSED) {
//         console.log("Share dismissed");
//       }
//     } catch (error) {
//       console.error("Sharing error:", error);
//     }
//   };

//   return (
//     <>
//       <View
//         style={{
//           backgroundColor: theme.theme == "dark" ? "#000" : "#fff",
//         }}
//       >
//         <MyStatusBar />
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginTop: Default.fixPadding * 1.2,
//             marginHorizontal: Default.fixPadding * 2,
//           }}
//         >
//           <View></View>

//           <TouchableOpacity
//             onPress={() => navigation.push("profileSettingsScreen", {profile: profile})}
//           >
//             <Ionicons name="ellipsis-vertical" size={20} color={theme.color} />
//           </TouchableOpacity>
//         </View>

//         <View style={Container.safe}>
//           {profile.avatar == null ? (
             
//             <Image
//               style={UserImage.Image}
//               resizeMode="contain"
//               source={require("../../../assets/images/2.jpeg")}
//             /> 
//           ) : (

//             <Image
//               style={UserImage.Image}
//               resizeMode="contain"
//               source={{ uri: profile.avatar }}
//             />
//            )
//           } 
//           <View>
//             <Text style={[UserName.Text, {color:theme.color} ]}>@{profile.username}</Text>
//           </View>
//           <View style={UserFollowers.View}>
//             <View style={UserFollowersText.View}>
//               <Text
//                 style={[UserFollowersTextNumber.Text, { color: theme.color }]}
//               >
//                 {profile.follower_count}
//               </Text>
//               <Text
//                 style={[UserFollowersTextDesc.Text, { color: theme.color }]}
//               >
//                 Following
//               </Text>
//             </View>
//             <View style={UserFollowersText.View}>
//               <Text
//                 style={[UserFollowersTextNumber.Text, { color: theme.color }]}
//               >
//                 {profile.following_count ?? 0}
//               </Text>
//               <Text
//                 style={[UserFollowersTextDesc.Text, { color: theme.color }]}
//               >
//                 Followers
//               </Text>
//             </View>
//             <View style={UserFollowersText.View}>
//               <Text
//                 style={[UserFollowersTextNumber.Text, { color: theme.color }]}
//               >
//                 {profile.post_count}
//               </Text>
//               <Text
//                 style={[UserFollowersTextDesc.Text, { color: theme.color }]}
//               >
//                 Posts
//               </Text>
//             </View>
//           </View>
//           <View style={EditProfile.View}>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.push("editProfileScreen", { profile: profile })
//               }
//               style={ButtonEditProfile.TouchableOpacity}
//             >
//               <Text>Edit profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={shareContent}
//               style={ButtonFavorites.TouchableOpacity}
//             >
//               <Fontisto name={"share-a"} size={20} color={"white"} />
//               <TextComp text="  Share" color={"#fff"} />
//             </TouchableOpacity>
//           </View>
//           {/* <TouchableOpacity>
//             <Text>Tap to add bio</Text>
//           </TouchableOpacity> */}
//         </View>
//       </View>
//     </>
//   );
// };

// const MyProfileScreen = () => {
//   const [refreshing, setRefreshing] = useState(false);

//   const theme = useContext(ThemeContext);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     // onFetchProfile();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//     // wait(2000).then(() => {
//     //   setRefreshing(false);
//     // });
//   }, []);

//   const renderItem = useCallback(({}) => {
//     return (
//       // <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
//       <View>
//         <VideoTab />
//       </View>
//     );
//   }, []);

//   const renderFollowers = useCallback(({}) => {
//     return (
//       // <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
//       <View>
//         <FollowersScreen />
//       </View>
//     );
//   }, []);

//   const renderFollowing = useCallback(({}) => {
//     return (
//       // <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
//       <View>
//         <FollowingScreen />
//       </View>
//     );
//   }, []);

//   return (
//     <Tabs.Container
//       renderHeader={Header}
//       headerHeight={HEADER_HEIGHT} // optional
//       headerContainerStyle={{
//         backgroundColor: ACCENT_COLOR, 
//       }}
//       containerStyle={{
//         backgroundColor: theme.backgroundColor, 
//       }}
//     >
//       <Tabs.Tab
//        name={"Posts"}
//        labelStyle={{color: "#fff"}}
//        >
//         <Tabs.FlatList
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           data={DATA}
//           renderItem={renderItem}
//           keyExtractor={identity}
//         />
//       </Tabs.Tab>
//       <Tabs.Tab name="Followers">
//         <Tabs.FlatList
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           data={DATA}
//           renderItem={renderFollowers}
//           keyExtractor={identity}
//         />
//       </Tabs.Tab>
//       <Tabs.Tab name="Following">
//         <Tabs.FlatList
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           data={DATA}
//           renderItem={renderFollowing}
//           keyExtractor={identity}
//         />
//       </Tabs.Tab>
//     </Tabs.Container>
//   );
// };

// export default MyProfileScreen;

// export const Container = StyleSheet.create({
//   safe: {
//     flex: 1,
//     alignItems: "center",
//     // backgroundColor: "#ccc",
//   },
// });

// export const UserImage = StyleSheet.create({
//   Image: {
//     alignSelf: "center",
//     marginTop: 15,
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: "#E5E5E5",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export const UserName = StyleSheet.create({
//   Text: {
//     marginTop: 20,
//     fontFamily: "Regular",
//     alignSelf: "center",
//   },
// });

// export const UserFollowers = StyleSheet.create({
//   View: {
//     marginTop: 20,
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
// });

// export const UserFollowersText = StyleSheet.create({
//   View: {
//     width: WIDTH * 0.3,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export const UserFollowersTextNumber = StyleSheet.create({
//   Text: {
//     color: "#010101",
//     fontFamily: "Bold",
//   },
// });

// export const UserFollowersTextDesc = StyleSheet.create({
//   Text: {
//     // marginTop: 10,
//     color: "#333",
//   },
// });

// export const EditProfile = StyleSheet.create({
//   View: {
//     // width: WIDTH * 0.1,
//     marginVertical: 20,
//     width: "100%",
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export const ButtonEditProfile = StyleSheet.create({
//   TouchableOpacity: {
//     backgroundColor: ACCENT_COLOR,
//     borderRadius: 9,
//     width: WIDTH * 0.3,
//     height: 52,
//     marginLeft: 10,
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     // border: solid 1 "#333",
//     padding: 15,
//   },
// });

// export const ButtonEditProfileText = StyleSheet.create({
//   Text: {
//     color: "#333",
//     fontFamily: "Regular",
//   },
// });

// export const ButtonFavorites = StyleSheet.create({
//   TouchableOpacity: {
//     backgroundColor: PRIMARY_COLOR,
//     marginRight: 10,
//     borderRadius: 9,
//     marginLeft: 10,
//     flex: 1,
//     height: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     // border: solid 1 #333,
//     padding: 15,
//   },
// });

// export const ButtonAddBio = StyleSheet.create({
//   TouchableOpacity: {
//     marginLeft: 10,
//     flex: 1,
//     height: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 15,
//   },
// });

// export const ButtonAddBioText = StyleSheet.create({
//   Text: {
//     color: "#333",
//     fontFamily: "Regular",
//   },
// });


// import React from "react";
// import { useCallback } from "react";
// import { Tabs } from "react-native-collapsible-tab-view";
// import { Default, Fonts, Colors } from "../../constants/styles2";
// import {
//   Image,
//   Share,
//   Text,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from "react-native";
// import {
//   useIsFocused,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import ThemeContext from "../../theme/ThemeContext";
// import { useContext } from "react";
// import { BLOCK_USER, FOLLOW, FOLLOW_TOGGLE } from "../../config/urls";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";
// import { HEIGHT, WIDTH } from "../../constants/sizes";
// import AwesomeButton from "react-native-really-awesome-button";
// import { ActivityIndicator } from "react-native";
// import { ACCENT_COLOR } from "../../constants/colors";
// import styles from "../../constants/styles";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import { Video } from "expo-av";
// import { Modal } from "react-native";
// import MyStatusBar from "../../components/MyStatusBar";

// export const Header = (props) => {
//   // const { item } = route.params;
//   const theme = useContext(ThemeContext);
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);

//   const [isBlockLoading, setIsBlockLoading] = useState(false);

//   const [settingModal, setSettingModal] = useState(false);

//   const { t, i18n } = useTranslation();

//   const isRtl = i18next.dir() == "rtl";

//   function tr(key) {
//     return t(`otherUserProfileScreen:${key}`);
//   }

//   const shareProfile = () => {
//     Share.share({
//       message: "V Rock",
//     });
//     setSettingModal(false);
//   };

//   function extractAuthorization(cookieString) {
//     const cookies = cookieString.split(";");
//     let authorization = "";

//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith("Authorization=")) {
//         authorization = cookie.substring("Authorization=".length);
//         break;
//       }
//     }

//     return authorization;
//   }

//   const userToken = useSelector((state) => state.auth.userData.token);

//   const auth = extractAuthorization(userToken);
//   const userId = userInfo.authenticated_user.user_id;

//   console.log("first", props);

//   const followUser = async () => {
//     const config = {
//       method: "post",
//       url: FOLLOW_TOGGLE + "/" + props.user.user_id,
//       // + item.author_id,
//       // data: formdata,
//       headers: {
//         Authorization: auth,
//         "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//       },
//     };
//     console.log(config);
//     setIsLoading(true);
//     try {
//       await axios(config)
//         .then((response) => {
//           // setUser(response.data);
//           console.log("works");
//         })
//         .catch((error) => {
//           console.log("error 1111111111111", error);
//         });

//       // console.log("---------",res)
//       // setLoading(false)
//     } catch (error) {
//       console.log(error);
//     }
//     setIsLoading(false);
//   };

//   console.log(props);

//   const blockUser = async () => {
//     console.log("BLOCKK");
//     const config = {
//       method: "post",
//       url: BLOCK_USER + props.user.user_id,
//       // data: formdata,
//       headers: {
//         Authorization: auth,
//         "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//       },
//     };
//     console.log(config);

//     setIsBlockLoading(true);

//     try {
//       // setLoading(true)
//       // let res = getUserPosts(auth,  userId)
//       await axios(config)
//         .then((response) => {
//           // setUser(response.data);
//           console.log(" user blockked".response);
//         })
//         .catch((error) => {
//           console.log("blockkk error 1111111111111", error);
//         });

//       // console.log("---------",res)
//       // setLoading(false)
//     } catch (error) {
//       console.log(error);
//     }

//     setIsBlockLoading(false);
//   };

//   // console.log("are there stuff in here",props.user)

//   const unblockUser = async () => {
//     console.log("UNBLOCKK");
//     const config = {
//       method: "delete",
//       url: BLOCK_USER + props.user.user_id,
//       // data: formdata,
//       headers: {
//         Authorization: auth,
//         "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//       },
//     };
//     setIsBlockLoading(true);
//     try {
//       // let res = getUserPosts(auth,  userId)
//       await axios(config)
//         .then((response) => {
//           // setUser(response.data);
//           console.log(" user blockked".response);
//         })
//         .catch((error) => {
//           console.log("blockkk error 1111111111111", error);
//         });

//       // console.log("---------",res)
//     } catch (error) {
//       console.log(error);
//     }
//     setIsBlockLoading(false);
//   };

//   return (
//     <>
//       <MyStatusBar />
//       <View
//         style={{ backgroundColor: theme.theme != "dark" ? "white" : "black" }}
//       >
//         <View
//           style={{
//             flexDirection:
//               // isRtl ? "row-reverse" :
//               "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingVertical: Default.fixPadding * 1.2,
//             paddingHorizontal: Default.fixPadding * 2,
//             // backgroundColor: theme.theme != "dark" ? "white" : "black"
//           }}
//         >
//           <TouchableOpacity onPress={() => navigation.pop()}>
//             <Ionicons
//               name={
//                 // isRtl ? "chevron-forward-outline" :
//                 "chevron-back-outline"
//               }
//               size={25}
//               color={theme.color}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setSettingModal(true)}>
//             <Ionicons
//               name={"ellipsis-vertical"}
//               size={25}
//               color={theme.color}
//             />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{ backgroundColor: theme.theme != "dark" ? "white" : "black" }}
//         >
//           <View style={{}}>
//             {props.user.avatar != null ? (
//               <Image
//                 source={{ uri: props.user.avatar }}
//                 style={{
//                   // flex: 3,
//                   resizeMode: "cover",
//                   alignSelf: "center",
//                   width: 100,
//                   height: 100,
//                   borderRadius: 80,
//                 }}
//               />
//             ) : (
//               <Image
//                 source={require("../../../assets/images/2.jpeg")}
//                 style={{
//                   // flex: 3,
//                   resizeMode: "cover",
//                   alignSelf: "center",
//                   width: 100,
//                   height: 100,
//                   borderRadius: 80,
//                 }}
//               />
//             )}

//             <View
//               style={{
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
//                 @{props.user.username}
//               </Text>
//               <Text
//                 style={{
//                   ...Fonts.Medium12grey,
//                   color: theme.color,
//                   marginTop: Default.fixPadding * 0.3,
//                 }}
//               >
//                 # Dance lover # food lovers
//               </Text>

//               <View
//                 style={{
//                   flexDirection:
//                     // isRtl ? "row-reverse" :
//                     "row",
//                   marginTop: Default.fixPadding * 2.5,
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => navigation.push("userFollowingScreen")}
//                   style={{
//                     flex: 3.5,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginRight:
//                       // isRtl ? 0 :
//                       Default.fixPadding,
//                     // marginLeft: isRtl ? Default.fixPadding : 0,
//                   }}
//                 >
//                   <Text
//                     style={{ ...Fonts.SemiBold14white, color: theme.color }}
//                   >
//                     {props.user.following_count}
//                   </Text>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       ...Fonts.SemiBold14white,
//                       color: theme.color,
//                       overflow: "hidden",
//                       marginTop: Default.fixPadding * 0.5,
//                     }}
//                   >
//                     {tr("followers")}
//                   </Text>
//                 </TouchableOpacity>
//                 <View
//                   style={{
//                     flex: 4,
//                     borderLeftWidth: 2,
//                     borderLeftColor: Colors.grey,
//                     borderRightWidth: 2,
//                     borderRightColor: Colors.grey,
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => navigation.push("followersScreen")}
//                     style={{ justifyContent: "center", alignItems: "center" }}
//                   >
//                     <Text
//                       style={{ ...Fonts.SemiBold14white, color: theme.color }}
//                     >
//                       {props.user.follower_count}
//                     </Text>
//                     <Text
//                       numberOfLines={1}
//                       style={{
//                         ...Fonts.SemiBold14white,
//                         color: theme.color,
//                         overflow: "hidden",
//                         marginTop: Default.fixPadding * 0.5,
//                       }}
//                     >
//                       {tr("following")}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={{
//                     flex: 2.5,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text
//                     style={{ ...Fonts.SemiBold14white, color: theme.color }}
//                   >
//                     {props.user.post_count}
//                   </Text>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       ...Fonts.SemiBold14white,
//                       color: theme.color,
//                       overflow: "hidden",
//                       marginTop: Default.fixPadding * 0.5,
//                     }}
//                   >
//                     {tr("post")}
//                   </Text>
//                 </View>
//               </View>

//               {/*  */}
//               <View
//                 style={[
//                   {
//                     flexDirection: "row",
//                     marginHorizontal: WIDTH * 0.1,
//                     marginHorizontal: Default.fixPadding * 2,
//                     marginBottom: Default.fixPadding * 2,
//                     marginTop: 20,
//                   },
//                 ]}
//               >
//                 <AwesomeButton
//                   height={50}
//                   width={WIDTH * 0.35}
//                   // stretch={true}
//                   // disabled={true}
//                   raiseLevel={1}
//                   borderRadius={10}
//                   // borderWidth={null}
//                   backgroundDarker={Colors.transparent}
//                   backgroundColor={ACCENT_COLOR}
//                 >
//                   <TouchableOpacity
//                     onPressOut={() => navigation.push("messageUserScreen")}
//                   >
//                     <Text style={{ ...Fonts.Bold18white }}>Message</Text>
//                   </TouchableOpacity>
//                 </AwesomeButton>

//                 <View style={{ margin: 8 }}></View>
//                 <AwesomeButton
//                   height={50}
//                   width={WIDTH * 0.3}
//                   // stretch={true}
//                   // disabled={true}
//                   raiseLevel={1}
//                   borderRadius={10}
//                   // borderWidth={null}
//                   backgroundDarker={Colors.transparent}
//                   extra={
//                     <LinearGradient
//                       start={[0, 1]}
//                       end={[1, 1]}
//                       colors={[Colors.primary, Colors.extraDarkPrimary]}
//                       style={{ ...StyleSheet.absoluteFillObject }}
//                     />
//                   }
//                 >
//                   {isLoading ? (
//                     <>
//                       <ActivityIndicator color={"white"} />
//                     </>
//                   ) : (
//                     <TouchableOpacity onPress={followUser}>
//                       <Text style={{ ...Fonts.Bold18white }}>
//                         {tr("follow")}
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                 </AwesomeButton>
//               </View>
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//             }}
//           ></View>
//         </View>
//       </View>

//       {/* MODAL */}
//       <Modal
//         transparent={true}
//         animationType="fade"
//         visible={settingModal}
//         onRequestClose={() => setSettingModal(false)}
//       >
//         <TouchableOpacity
//           activeOpacity={1}
//           onPressOut={() => setSettingModal(false)}
//           style={{ flex: 1, backgroundColor: Colors.transparentWhite }}
//         >
//           <View
//             style={{
//               alignItems: "center",
//               marginTop: Default.fixPadding * 1.5,
//             }}
//           >
//             <View
//               style={{
//                 paddingVertical: Default.fixPadding * 1.2,
//                 paddingHorizontal: Default.fixPadding,
//                 width: WIDTH / 2,
//                 left: isRtl ? null : "20%",
//                 right: isRtl ? "20%" : null,
//                 borderRadius: 10,
//                 backgroundColor: Colors.black,
//                 ...Default.shadow,
//               }}
//             >
//               <TouchableOpacity
//                 onPress={shareProfile}
//                 style={{
//                   flexDirection: isRtl ? "row-reverse" : "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <Ionicons name="ellipse" size={10} color={Colors.white} />
//                 <Text
//                   style={{
//                     ...Fonts.SemiBold16white,
//                     marginHorizontal: Default.fixPadding,
//                   }}
//                 >
//                   {tr("shareProfile")}
//                 </Text>
//               </TouchableOpacity>

//               <View
//                 style={{
//                   flexDirection: isRtl ? "row-reverse" : "row",
//                   alignItems: "center",
//                   marginVertical: Default.fixPadding,
//                 }}
//               >
//                 <Ionicons name="ellipse" size={10} color={Colors.white} />
//                 <Text
//                   style={{
//                     ...Fonts.SemiBold16white,
//                     marginHorizontal: Default.fixPadding,
//                   }}
//                 >
//                   {tr("report")}
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flexDirection: isRtl ? "row-reverse" : "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <Ionicons name="ellipse" size={10} color={Colors.white} />
//                 <TouchableOpacity onPress={blockUser}>
//                   <Text
//                     style={{
//                       ...Fonts.SemiBold16white,
//                       marginHorizontal: Default.fixPadding,
//                     }}
//                   >
//                     {tr("block")} {props.user.username}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </>
//   );
// };

// // BOTTOM SIDE POST
// const OtherUserProfileScreen = ({ navigation, route }) => {
//   const { item } = route.params;
  
//   const previousScreen = route.params.previousScreen;
  
//   const theSearchId = route.params.item.user_id;
//   const theUserId = route.params.item;

//   // console.log("here n ow", theUserId, previousScreen);
//   console.log("here n ow", theSearchId, previousScreen);
//   // const comingFrom = useRoute()
//   // console.log("coming from",comingFrom.params?.previousScreen)
//   // const navigation = useNavigation()

//   const theme = useContext(ThemeContext);

//   const [user, setUser] = useState([]);

//   const isFocused = useIsFocused();

//   function extractAuthorization(cookieString) {
//     const cookies = cookieString.split(";");
//     let authorization = "";

//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith("Authorization=")) {
//         authorization = cookie.substring("Authorization=".length);
//         break;
//       }
//     }

//     return authorization;
//   }

//   const userToken = useSelector((state) => state.auth.userData.token);

//   const auth = extractAuthorization(userToken);

//   let the_id =
//     previousScreen == "SearchScreen"
//       ? theSearchId
//       : previousScreen == "SearchSeeAllUsersScreen"
//       ? item.user_id
//       : previousScreen == "profileScreen"
//       ? theUserId.user_id
//       : item.author_id;
 

//   const fetchUser = async () => {
//     const config = {
//       method: "get",
//       url: FOLLOW + the_id,
//       headers: {
//         Authorization: auth,
//         "Content-Type": "application/json", // This will set the correct 'Content-Type' header
//       },
//     };

//     console.log(config);
//     // console.log("user id",item.author.user_id)
//     try {
//       // setLoading(true)
//       // let res = getUserPosts(auth,  userId)
//       await axios(config)
//         .then((response) => {
//           setUser(response.data);
//           console.log("this profile user ",response.data);
//         })
//         .catch((error) => {
//           console.log("error 1111111111111", error);
//         });

//       // console.log("---------",res)
//       // setLoading(false)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (isFocused) {
//       // Reload your screen here
//       fetchUser();
//     }
//   }, [isFocused]);

//   // console.log('make i see ',user.map((id) => id.user_id))

//   const headerItem = () => {
//     return <Header user={user} />;
//   };

//   const renderItemPosts = ({ item }) => {
//     const mediaTypes = item.media_items.map((media) => media.type);
//     const mediasUrls = item.media_items.map((media) => media.url.low);
//     const imagesUrls = item.media_items.map((media) => media.url);
//     // console.log(item);
//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate("userProfilePostScreen", {
//             postsArray: user.posts,
//             item: item,
//           })
//         }
//         style={{
//           flex: 1,
//           // marginTop: HEIGHT * 0.6,
//           marginBottom: Default.fixPadding * 2,
//           marginHorizontal: Default.fixPadding,
//         }}
//       >
//         {mediaTypes == "image" ? (
//           <Image
//             source={{ uri: imagesUrls[0] }}
//             style={{
//               resizeMode: "cover",
//               width: WIDTH / 3.7,
//               height: 123,
//               borderRadius: 10,
//             }}
//           />
//         ) : mediaTypes == "video" ? (
//           <Video
//             source={{ uri: mediasUrls[0] }}
//             isLooping={false}
//             shouldPlay={false}
//           />
//         ) : (
//           <Image
//             source={require("../../../assets/images/2.jpeg")}
//             style={{
//               // flex: 3,
//               resizeMode: "cover",
//               alignSelf: "center",
//               width: 100,
//               height: 100,
//               borderRadius: 80,
//             }}
//           />
//         )}
//         <View
//           style={{
//             position: "absolute",
//             bottom: 0,
//             right:
//               // isRtl ? null :
//               0,
//           }}
//         >
//           <View
//             style={{
//               flexDirection:
//                 // isRtl ? "row-reverse" :
//                 "row",
//               alignItems: "center",
//               paddingHorizontal: Default.fixPadding * 0.4,
//             }}
//           >
//             <Ionicons name="play" size={18} color={Colors.white} />
//             <Text
//               style={{
//                 ...Fonts.SemiBold12white,
//                 marginHorizontal: Default.fixPadding * 0.2,
//               }}
//             >
//               {item.other}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <Tabs.Container
//       renderHeader={headerItem}
//       headerHeight={HEIGHT * 0.4}
//       headerContainerStyle={{ top: 0 }}
//       containerStyle={{
//         backgroundColor: theme.theme != "dark" ? "white" : "black",
//       }}
//     >
//       <Tabs.Tab name="Posts">
//         <Tabs.FlatList
//           numColumns={3}
//           data={user.posts}
//           renderItem={renderItemPosts}
//           keyExtractor={(item) => item.post_id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingTop: Default.fixPadding * 1.3,
//             paddingHorizontal: Default.fixPadding,
//             width: WIDTH,
//             // alignContent:"flex-start",
//             // alignItems: "flex-start",
//             // alignItems: "flex-start"
//           }}
//         />
//       </Tabs.Tab>
//     </Tabs.Container>
//   );
// };

// export default OtherUserProfileScreen;
