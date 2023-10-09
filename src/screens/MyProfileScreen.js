import React from 'react'
import { StatusBar, View } from 'react-native'
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyProfileScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: "#fff"}}>

        <Text>
            MyProfileScreen
        </Text>
      </SafeAreaView>
    </View>
  )
}

export default MyProfileScreen;