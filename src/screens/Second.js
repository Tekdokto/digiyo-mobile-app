import React from 'react'
import { StatusBar, Text } from 'react-native'
import {  } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SecondScreen = () => {
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

export default SecondScreen