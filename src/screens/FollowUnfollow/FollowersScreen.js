import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const FollowersScreen = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ backgroundColor: "#000"}}>
        <View style={{ backgroundColor: "#fff" }}>
            <Text>
            FollowersScreen
            </Text>
        </View>
      </SafeAreaView>
    </>
  )
}

export default FollowersScreen