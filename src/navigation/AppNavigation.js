import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
// import { StyleSheet } from 'react-native';
import SecondScreen from '../screens/Second';
import UserProfileScreen from '../screens/UserProfileScreen';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
// import MyProfileScreen from '../screens/MyProfileScreen';
// import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import FullVideoScreen from '../screens/FullVideoScreen';
import { Image } from 'react-native';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import MyProfileScreen from '../screens/MyProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() { 
return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeScreen' component={HomeTabs} />
      <Stack.Screen name='PostFull' component={FullVideoScreen} />
      <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
      <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} />
      <Stack.Screen name='FollowersScreen' component={FollowersScreen} />
      <Stack.Screen name='FollowingScreen' component={FollowingScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)};


function HomeTabs() {
  return (
      <Tab.Navigator screenOptions={({route}) =>({
        headerShown: false,
        tabBarShowLabel: false,
      })}>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? require('../../assets/icons/house.png') : require('../../assets/icons/house.png')} style={{  }} />
            ),
          }}
        />
        <Tab.Screen
          name='Upload'
          component={SecondScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? require('../../assets/icons/cloud.png') : require('../../assets/icons/cloud.png')} style={{  }} />
            ),
          }}
        />
        <Tab.Screen
          name='Myprofile'
          component={MyProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? require('../../assets/images/2.jpg') : require('../../assets/images/2.jpg')} style={{ borderRadius:40, width:40, height:40 }} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};


// export default AppNavigation;

  