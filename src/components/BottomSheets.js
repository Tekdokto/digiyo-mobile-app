import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const BottomSheets = gestureHandlerRootHOC(() => {
  return (
    // <View style={styles.bottomSheetContainer} />
    <View style={styles.bottomSheetContainer}>
        <Text>
            wordings ssssssss
        </Text>
    </View>
  )
})


export default BottomSheets;
 
const styles = StyleSheet.create({
    bottomSheetContainer: {
        // height: ScreenHeight,
        width: '100%',
        backgroundColor: 'white',
        // position: 'absolute',
        // top: ScreenHeight,
    }
})

