import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FullPostComp from '../components/FullPostComp'
import { posts } from '../Constants'
import { FlatList, Image, View, Text, Dimensions, StatusBar} from 'react-native'
import styles from '../constants/styles'
import { HEIGHT } from '../constants/sizes'
import FullScreenLikeIcons from '../components/FullScreenLikeIcons'
import { useIsFocused } from '@react-navigation/native'

const FullVideoScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    const { item } = route.params;

    // console.log(item)
    const postsArray = posts;
    const currentIndex = postsArray.findIndex((postItem) => postItem.id === item.id);
    console.log(currentIndex)
    console.log(postsArray)

    const [visibleVideos, setVisibleVideos] = useState(
        postsArray.map(() => true)
      );
    onViewableItemsChanged = useCallback(({ viewableItems }) => {
        const visibleVideoIndices = viewableItems.filter((item) => item.item.content.type === 'video').map((item) => item.index)
        
        const newVisibleVideos = postsArray.map((_, index) => visibleVideoIndices.includes(index))

        setVisibleVideos(newVisibleVideos)
    }, [])

    console.log(visibleVideos)

  return (
    <>
        <StatusBar barStyle={"light-content"} />
         <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <View style={{  }}>
                <FlatList
                    data={postsArray}
                    showsVerticalScrollIndicator={false}
                    // pagingEnabled
                    keyExtractor={(item) => item.id.toString()}
                    snapToInterval={Dimensions.get("window").height}
                    snapToAlignment={'start'}
                    decelerationRate={"fast"}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 60}}
                    renderItem={({ item, index }) => (
                    <View style={{  }}>
                        
                        {
                        item.content.type == "image" ? 
                            (
                                <Image source={item.content.source} 
                                    style={ styles.mediaFullFrame } 
                                    />
                            ) : (
                                <View> 
                                <FullPostComp isVisible={visibleVideos[index] && isFocused} vids={item.content.source} />
                                </View>
                            )
                        }
                        <FullScreenLikeIcons /> 
                    </View>
                    )}
                    initialScrollIndex={currentIndex}
                />
        </View>
         </SafeAreaView>
    </>
  )
}

export default FullVideoScreen