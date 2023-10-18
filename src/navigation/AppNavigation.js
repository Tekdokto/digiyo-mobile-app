import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import HomeScreen from '../screens/home/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen'; 
// import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import FullVideoScreen from '../screens/home/FullVideoScreen';
import { Image } from 'react-native';
import FollowersScreen from '../screens/FollowUnfollow/FollowersScreen';
import FollowingScreen from '../screens/FollowUnfollow/FollowingScreen';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import { EventRegister } from 'react-native-event-listeners';
import ThemeContext from '../theme/ThemeContext';
import theme from '../theme/theme';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UploadSvg  from '../../assets/icons/upload.svg'
import HomeSvg  from '../../assets/icons/home1.svg' 
import { HEIGHT } from '../constants/sizes';
import CameraScreen from '../screens/camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPassworScreen from '../screens/auth/ForgotPassword';
import OTPScreen from '../screens/auth/OTP';
import FoundersScreen from '../screens/auth/Founders';
import NewPasswordScreen from '../screens/auth/NewPassword';
import MessageUserScreen from '../screens/MessageUserScreen';
import SearchScreen from '../screens/search/SearchScreen';
import Inbox from '../screens/Inbox';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() { 

  const [ darkMode, setDarkMode ] = useState(false)

  useEffect(() => {
    // Load the dark mode state from AsyncStorage when the component mounts
    const loadDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode === 'true'); // Convert the stored value to a boolean
        }
      } catch (error) {
        console.error('Error loading dark mode:', error);
      }
    };

    loadDarkMode();
  }, []);


  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data)
      console.log(darkMode)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])

  // 
return (
  <ThemeContext.Provider value={darkMode === true ? theme.dark : theme.light }>
    <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeScreen' component={HomeTabs} />
        <Stack.Screen name='PostFull' component={FullVideoScreen} />
        <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
        <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} />
        <Stack.Screen name='FollowersScreen' component={FollowersScreen} />
        <Stack.Screen name='FollowingScreen' component={FollowingScreen} />
        <Stack.Screen name='CameraScreen' component={CameraScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='OTPScreen' component={OTPScreen} />
        <Stack.Screen name='ForgotPasswordScreen' component={ForgotPassworScreen} />
        <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen} />
        <Stack.Screen name='FoundersScreen' component={FoundersScreen} />
        <Stack.Screen name='messageUserScreen' component={MessageUserScreen} />
        <Stack.Screen name='Inbox' component={Inbox} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeContext.Provider>
)};


function HomeTabs() {

  const theme = useContext(ThemeContext);
  return (
      <Tab.Navigator screenOptions={({route}) =>({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => menuIcons(route, focused),
        tabBarStyle: {
          height: HEIGHT * 0.08,
          paddingVertical: HEIGHT*0.01,
          margin: 0,
          backgroundColor: theme.theme == "dark" ? "#000" : "white"
        },
        tabBarItemStyle: {
          marginVertical: 10
        }
      })}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
         
        />
        <Tab.Screen
          name='Upload'
          component={CameraScreen}
          
        />
        <Tab.Screen
          name='Myprofile'
          component={MyProfileScreen}
          // options={{
          //   tabBarIcon: ({ focused }) => (
          //     <Image source={focused ? require('../../assets/images/2.jpg') : require('../../assets/images/2.jpg')} style={{ borderRadius:40, width:40, height:40 }} />
          //   ),
          // }}
        />
      </Tab.Navigator>
  );
};

const menuIcons = (route, focused) => {
  const theme = useContext(ThemeContext);
  let icon;
  let themeColorsLight = theme.theme == "dark" ? "white" : "black"
  let themeColorsDark = theme.theme == "dark" ? "silver" : "silver"
  let size = 30
  if (route.name == 'Home') {
    icon = focused ? <HomeSvg fill={themeColorsLight} width={size} stroke={themeColorsLight} height={size} /> : <HomeSvg width={size} height={size} fill={themeColorsDark} stroke={themeColorsDark} />
  } else if (route.name == 'Upload') {
    icon = focused ? <UploadSvg stroke={themeColorsLight} width={size} height={size} /> : <UploadSvg stroke={themeColorsDark} width={size} height={size} />
  } else if (route.name == 'Myprofile') {
    icon = focused ? <Image source={require('../../assets/images/2.jpg')} style={{ borderRadius:40, width:30, height:30 }} /> : <Image source={require('../../assets/images/2.jpg')} style={{ borderRadius:40, width:30, height:30 }} />
  }

  // let buttonClass = focused ? 'white' : "";
  return (
    <View style={{ }}>
      {icon}
    </View>
  )
}
// export default AppNavigation;

  