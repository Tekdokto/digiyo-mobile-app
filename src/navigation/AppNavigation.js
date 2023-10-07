import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
// import { StyleSheet } from 'react-native';
import SecondScreen from '../screens/Second';
import UserProfileScreen from '../screens/UserProfileScreen';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MyProfileScreen from '../screens/MyProfileScreen';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import FullVideoScreen from '../screens/FullVideoScreen';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() { 
return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeScreen' component={HomeTabs} />
      <Stack.Screen name='PostFull' component={FullVideoScreen} />
      <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
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
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name='Upload'
          component={SecondScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name={focused ? 'upload-cloud' : 'upload-cloud'} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name='Myprofile'
          component={UserProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome name={focused ? 'bell' : 'bell-o'} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};


// export default AppNavigation;

  