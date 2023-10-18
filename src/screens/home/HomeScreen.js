import React, { useContext, useState } from 'react'
import {  Pressable, StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../components/home/Header';
import SideIconsComp from '../../components/home/SideIcons';
import Posts from '../../components/home/Posts';
import BottomSheets from '../../components/BottomSheets';
import { Gesture,  GestureHandlerRootView } from 'react-native-gesture-handler';
import { BACKDROP_COLOR, } from '../../constants/colors';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { HEIGHT, OVERDRAG, } from '../../constants/sizes';
import ThemeContext from '../../theme/ThemeContext';
// import ThemeContext from '../../theme/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


const HomeScreen = () => {
  const theme = useContext(ThemeContext);

  const offSet = useSharedValue(0);
  const [isOpen, setOpen ] = useState(false);

  const handlePress = () => {
    console.log("click")
  }

  const toggleSheet = () => {
    setOpen(!isOpen);
  }

  // const pan = Gesture.Pan().onChange((event) => {
  //   offSet.value += event.changeY
  // })

  // const translateY = useAnimatedStyle(() => ({
  //   transform: [{ translateY: offSet.value }]
  // }))

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex:1, backgroundColor: theme.backgroundColor }}>
          <View style={{ backgroundColor: "white"}}>
            <HeaderComp headerLogo={"DigiYo"} menu={"menu"} onPressed={handlePress} />
          </View>

              <View style={{ flex: 1, }}>
                <View>
                  <Posts toggleSheet={toggleSheet} />
                </View>
              {/* side icons */}
                <SideIconsComp />
                { isOpen && (
                  <>
                  <AnimatedPressable 
                    style={styles.backdrop} onPress={toggleSheet} 
                    entering={FadeIn}
                    exiting={FadeOut}  
                  />
                    {/* <GestureDetector gesture={pan}> */}
                      <Animated.View 
                        style={ [ styles.sheet, 
                          // translateY 
                        ] }
                        entering={SlideInDown.springify().damping(15)}
                        exiting={SlideOutDown}
                      >
                            <BottomSheets />
                      </Animated.View>
                    {/* </GestureDetector> */}
                  
                  
                  </>
                )
                }

              </View> 
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      width: '100%',
      height: 200,
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent: 'center',
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: HEIGHT * 0.5,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
})