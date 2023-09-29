import React from 'react'
import { View } from 'react-native'
import FontAwesome from '@expo/vector-icons'

const SearchFilter = ({icon, placeholder}) => {
  return (
    <View>
        <FontAwesome name={icon} placeholder={placeholder} />
    </View>
  )
}

export default SearchFilter