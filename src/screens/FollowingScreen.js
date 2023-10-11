import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import { Text } from 'react-native-paper'

const FollowingScreen = () => {
  return (
    <>
    <StatusBar barStyle={"light-content"} />
        <SafeAreaView style={{ backgroundColor: "#000" }}>
            <View style={{ backgroundColor: "#fff" }}>
                <Text>
                    FollowingScreen
                </Text>
            </View>
        </SafeAreaView>
    </>
  )
}

export default FollowingScreen