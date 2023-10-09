import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { Text } from 'react-native-paper'

const UserProfileScreen = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Text>
          My profile not
        </Text>
      </SafeAreaView>
    </>
  )
}

export default UserProfileScreen