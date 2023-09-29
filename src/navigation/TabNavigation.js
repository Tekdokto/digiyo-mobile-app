import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
// import { Image } from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name={focused ? "home-sharp" : "home-outline"} size={20} />
                        ),
                      }}
                >
                </Tab.Screen>
                <Tab.Screen 
                name="Upload" 
                component={UserProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather name={focused ? "upload-cloud" : "upload-cloud"} size={20} />
                    ),
                  }}
                >
                    {/* <FontAwesome name={"bell-o"} /> */}
                </Tab.Screen>
                <Tab.Screen 
                    name="Myprofile" 
                    component={MyProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                         <FontAwesome name={focused ? "bell" : "bell-o"} size={20} />
                        // <Image
                        //     source={focused ? require('./images/my_profile_active.png') : require('./images/my_profile_inactive.png')}
                        //     style={{ width: 24, height: 24 }}
                        // />
                        ),
                    }}
                >
                    {/* <Image /> */}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigation;