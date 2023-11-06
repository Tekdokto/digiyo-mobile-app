import React from 'react'
import { View } from 'react-native'
import FollowersScreen from './FollowersScreen'

const Followers = (props) => {
  const id = props.route.params.item.user_id
  console.log(id)
  return (
    <>
        {/* <View> */}
            <FollowersScreen 
            userId={id}
            isHeader={true} />
        {/* </View> */}
    </>
  )
}

export default Followers