import React from 'react'
import { View } from 'react-native'
import FollowingScreen from './FollowingScreen'
import MyStatusBar from '../../components/MyStatusBar'

const Following = (props) => {

  // console.log( "whahhhhhhhhhaaa",props.route.params.item.user_id)
  const id = props.route.params.item.user_id
  return (
    <>
        {/* <View> */}
          {/* <MyStatusBar /> */}
            <FollowingScreen
            userId={id}
            isHeader={true} />
            
        {/* </View> */}
    </>
  )
}

export default Following