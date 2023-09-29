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


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='HomeScreen' component={HomeScreen} />
    <Stack.Screen name='SecondScreen' component={SecondScreen} />
    <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
  </Stack.Navigator>
);

const UserProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name='Upload'
          component={UserProfileStack}
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
    </NavigationContainer>
  );
};


export default AppNavigation;

  