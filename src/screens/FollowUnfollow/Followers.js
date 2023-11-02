import React from 'react'
import { View } from 'react-native'
import FollowersScreen from './FollowersScreen'

const Followers = () => {
  return (
    <>
        <View>
            <FollowersScreen 
            isHeader={true} />
        </View>
    </>
  )
}

export default Followers