// import {
//   DarkTheme,
//   DefaultTheme,
//   NavigationContainer,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React, { useContext, useEffect, useState } from "react";
// import HomeScreen from "../screens/home/HomeScreen";
// // import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
// import FullVideoScreen from "../screens/home/FullVideoScreen";
// import { Image, StyleSheet } from "react-native";
// import FollowersScreen from "../screens/FollowUnfollow/FollowersScreen";
// import FollowingScreen from "../screens/FollowUnfollow/FollowingScreen";
// import MyProfileScreen from "../screens/profile/MyProfileScreen";
// import { EventRegister } from "react-native-event-listeners";
// import ThemeContext from "../theme/ThemeContext";
// import theme from "../theme/theme";
// import { View } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// import UploadSvg from "../../assets/icons/upload.svg";
// import HomeSvg from "../../assets/icons/home1.svg";
// import { HEIGHT } from "../constants/sizes";
// import CameraScreen from "../screens/camera";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import LoginScreen from "../screens/auth/LoginScreen";
// import SignupScreen from "../screens/auth/SignupScreen";
// import ForgotPassworScreen from "../screens/auth/ForgotPassword";
// import OTPScreen from "../screens/auth/OTP";
// import FoundersScreen from "../screens/auth/Founders";
// import NewPasswordScreen from "../screens/auth/NewPassword";
// import MessageUserScreen from "../screens/messageUserScreen/MessageUserScreen";
// import SearchScreen from "../screens/search/SearchScreen";
// import Inbox from "../screens/Inbox";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import SecondScreen from "../screens/Second";
// import EditProfileScreen from "../screens/profile/EditProfileScreen";
// import ProfileSettingsScreen from "../screens/profile/profileSettingsScreen";
// import OtherUserProfileScreen from "../screens/otherUserPropfile/otherUserProfileScreen";
// import { Default, Colors } from "../constants/styles2";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import MessagesScreen from "../screens/messages";
// import Conversations from "../components/Conversations";
// import { useSelector } from "react-redux";
// import UserProfilePostScreen from "../screens/userProfilePostScreen/UserProfilePostScreen";
// import { myProifile } from "../redux/actions/auth";
// import { showError } from "../utils/helperFunctions";
// import AltProfile from "../screens/profile/altProfile";
// import { PRIMARY_COLOR } from "../constants/colors";
// import EditProfileBioScreen from "../screens/profile/EditProfileBioScreen";
// import SearchSeeAllUsersScreen from "../screens/search/searchSeeAllUsersScreen";
// import SearchSeeAllPostScreen from "../screens/search/searchSeeAllPostScreen";
// import BlockListScreen from "../screens/profile/BlockedList";
 
// // const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const ScreenTabs = createNativeStackNavigator();
// // APP DRAWER
// const Drawer = createDrawerNavigator();

// export default function AppNavigation() {
//   const [darkMode, setDarkMode] = useState(false);
//   const userData = useSelector((state) => state.auth.userData.token);

//   // console.log("userData", userData)

//   useEffect(() => {
//     // Load the dark mode state from AsyncStorage when the component mounts
//     const loadDarkMode = async () => {
//       try {
//         const storedDarkMode = await AsyncStorage.getItem("darkMode");
//         if (storedDarkMode !== null) {
//           setDarkMode(storedDarkMode === "true"); // Convert the stored value to a boolean
//         }
//       } catch (error) {
//         console.error("Error loading dark mode:", error);
//       }
//     };

//     loadDarkMode();
//   }, []);

//   useEffect(() => {
//     const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
//       setDarkMode(data);
//       console.log(darkMode);
//     });
//     return () => {
//       EventRegister.removeAllListeners(listener);
//     };
//   }, [darkMode]);

//   //
//   return (
//     <ThemeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
//       <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
//         {/* <DrawerGroup /> */}
//         {userData ? <AllScreenTabs /> : <AuthScreens />}
//       </NavigationContainer>
//     </ThemeContext.Provider>
//   );
// }

// // AUTH SCREENS
// function AuthScreens() {
//   return (
//     <ScreenTabs.Navigator
//       initialRouteName="LoginScreen"
//       screenOptions={{ headerShown: false }}
//     >
//       <ScreenTabs.Screen name="HomeScreen" component={HomeTabs} />
//       <ScreenTabs.Screen name="LoginScreen" component={LoginScreen} />
//       <ScreenTabs.Screen name="SignupScreen" component={SignupScreen} />
//       <ScreenTabs.Screen name="FoundersScreen" component={FoundersScreen} />
//       <ScreenTabs.Screen name="OTPScreen" component={OTPScreen} />
//       <ScreenTabs.Screen
//         name="ForgotPasswordScreen"
//         component={ForgotPassworScreen}
//       />
//       <ScreenTabs.Screen
//         name="NewPasswordScreen"
//         component={NewPasswordScreen}
//       />
//     </ScreenTabs.Navigator>
//   );
// }

// function AllScreenTabs() {
//   return (
//     <ScreenTabs.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={{ headerShown: false }}
//     >
//       <ScreenTabs.Screen name="HomeScreen" component={HomeTabs} />
//       <ScreenTabs.Screen name="PostFull" component={FullVideoScreen} />
//       <ScreenTabs.Screen name="altPro" component={AltProfile} />
//       <ScreenTabs.Screen name="MyProfileScreen" component={MyProfileScreen} />
//       <ScreenTabs.Screen name="FollowersScreen" component={FollowersScreen} />
//       <ScreenTabs.Screen name="FollowingScreen" component={FollowingScreen} />
//       <ScreenTabs.Screen name="CameraScreen" component={CameraScreen} />
//       <ScreenTabs.Screen
//         name="messageUserScreen"
//         component={MessageUserScreen}
//       />
//       <ScreenTabs.Screen name="messagesScreen" component={MessagesScreen} />
//       <ScreenTabs.Screen name="conversations" component={Conversations} />
//       <ScreenTabs.Screen name="Inbox" component={Inbox} />
//       <ScreenTabs.Screen name="SearchScreen" component={SearchScreen} />
//       <ScreenTabs.Screen
//         name="searchSeeAllUsersScreen"
//         component={SearchSeeAllUsersScreen}
//       />
//       <ScreenTabs.Screen
//         name="searchSeeAllPostScreen"
//         component={SearchSeeAllPostScreen}
//       />
//       <ScreenTabs.Screen
//         name="editProfileScreen"
//         component={EditProfileScreen}
//       />
//       <ScreenTabs.Screen
//         name="profileSettingsScreen"
//         component={ProfileSettingsScreen}
//       />
//       <ScreenTabs.Screen
//         name="editProfileBioScreen"
//         component={EditProfileBioScreen}
//       />
//       <ScreenTabs.Screen
//         name="otherUserProfileScreen"
//         component={OtherUserProfileScreen}
//       />
//       <ScreenTabs.Screen
//         name="userProfilePostScreen"
//         component={UserProfilePostScreen}
//       />
//       <ScreenTabs.Screen
//         name="blockListScreen"
//         component={BlockListScreen}
//       />
//     </ScreenTabs.Navigator>
//   );
// }

// // tabgroup == hometabs

// function HomeTabs() {
//   const theme = useContext(ThemeContext);
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarIcon: ({ focused, color, size }) => menuIcons(route, focused),
//         tabBarStyle: {
//           height: HEIGHT * 0.08,
//           paddingVertical: HEIGHT * 0.01,
//           margin: 0,
//           backgroundColor: theme.theme == "dark" ? "#000" : "white",
//         },
//         tabBarItemStyle: {
//           marginVertical: 10,
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen
//         name="Upload"
//         component={CameraScreen}
//         options={{
//           tabBarStyle: {
//             display: "none",
//           },
//           // tabBarButton: (props) => <CustomTabBarButton {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name="Myprofile"
//         component={MyProfileScreen}
//         // options={{
//         //   tabBarIcon: ({ focused }) => (
//         //     <Image source={focused ? require('../../assets/images/2.jpeg') : require('../../assets/images/2.jpeg')} style={{ borderRadius:40, width:40, height:40 }} />
//         //   ),
//         // }}
//       />
//     </Tab.Navigator>
//   );
// }

// const menuIcons = (route, focused) => {
//   const theme = useContext(ThemeContext);

//   const user = useSelector((state) => state.auth.userData.token);

//   const [isLoading, setLoading] = useState(false);
//   const [profile, setProfile] = useState(false);

//   const onFetchProfile = async () => {
//     let token = user.token;
//     // console.log("token ---------- ", token);
//     try {
//       setLoading(true);
//       let res = await myProifile(token);
//       // console.log("response -------", res);
//       // console.log("profile result -------", res.authenticated_user);
//       setProfile(res.authenticated_user);
//       setLoading(false);
//     } catch (error) {
//       showError(error.message);
//       // console.log("profile error -------", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     onFetchProfile();
//   }, []);

//   // console.log("fiiiiiiiiiilllllllllleeeeeeeeeeeee",profile)
//   let icon;
//   let themeColorsLight = theme.theme == "dark" ? "white" : "black";
//   let themeColorsDark = theme.theme == "dark" ? "#727272" : "#727272";
//   let size = 30;
//   if (route.name == "Home") {
//     icon = focused ? (
//       <HomeSvg
//         fill={themeColorsLight}
//         width={size}
//         stroke={themeColorsLight}
//         height={size}
//       />
//     ) : (
//       <HomeSvg
//         width={size}
//         height={size}
//         fill={themeColorsDark}
//         stroke={themeColorsDark}
//       />
//     );
//   } else if (route.name == "Upload") {
//     icon = focused ? (
//       <UploadSvg stroke={"white"} width={size} height={size} />
//     ) : (
//       <View
//         style={{
//           backgroundColor: PRIMARY_COLOR + "20",
//           borderRadius: 50,
//           padding: 10,
//           position: "absolute",
//           bottom: -10,
//           alignSelf: "center",
//         }}
//       >
//         <View
//           style={{
//             backgroundColor: PRIMARY_COLOR,
//             borderRadius: 50,
//             padding: 10,
//           }}
//         >
//           <UploadSvg stroke={"white"} width={size} height={size} />
//         </View>
//       </View>
//     );
//   } else if (route.name == "Myprofile") {
//     icon = focused ? (
//       <>
//         {profile.avatar == null ? (
//           <Image
//             source={require("../../assets/images/2.jpeg")}
//             style={{ borderRadius: 40, width: 30, height: 30 }}
//           />
//         ) : (
//           <Image
//             source={{ uri: profile.avatar }}
//             style={{ borderRadius: 40, width: 30, height: 30 }}
//           />
//         )}
//       </>
//     ) : (
//       <>
//         {profile.avatar == null ? (
//           <Image
//             source={require("../../assets/images/2.jpeg")}
//             style={{ borderRadius: 40, width: 30, height: 30 }}
//           />
//         ) : (
//           <Image
//             source={{ uri: profile.avatar }}
//             style={{ borderRadius: 40, width: 30, height: 30 }}
//           />
//         )}
//       </>
//     );
//   }

//   // let buttonClass = focused ? 'white' : "";
//   return <View style={{}}>{icon}</View>;
// };
// // export default AppNavigation;

// function DrawerGroup() {
//   return (
//     <Drawer.Navigator screenOptions={{ headerShown: false }}>
//       <Drawer.Screen name="AllScreenTabs" component={AllScreenTabs} />
//       <Drawer.Screen name="SecondSCreen" component={SecondScreen} />
//     </Drawer.Navigator>
//   );
// }

// const CustomTabBarButton = ({ children, onPress }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={{
//       justifyContent: "center",
//       alignItems: "center",
//       overflow: "hidden",
//       height: 66,
//       width: 66,
//       borderRadius: 33,
//       bottom: Default.fixPadding * 3.3,
//     }}
//   >
//     <View
//       style={{
//         width: 66,
//         height: 32,
//         backgroundColor: Colors.transparent,
//       }}
//     />
//     <View
//       style={{
//         width: 66,
//         height: 34,
//         backgroundColor: Colors.black,
//       }}
//     />
//     <View style={styles.circle}>{children}</View>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   circle: {
//     position: "absolute",
//     height: 54,
//     width: 54,
//     borderRadius: 27,
//     backgroundColor: Colors.primary,
//   },
// });
