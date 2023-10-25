import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FullPostComp from '../../components/home/FullPostComp'
import { posts } from '../../Constants'
import { FlatList, Image, View, Text, Dimensions, StatusBar} from 'react-native'
import styles from '../../constants/styles'
import { HEIGHT } from '../../constants/sizes'
import FullScreenLikeIcons from '../../components/home/FullScreenLikeIcons'
import { useIsFocused } from '@react-navigation/native'
import CommentsBottomSheet from '../../components/commentsBottomSheet'
import MenuBottomSheet from '../../components/menuBottomSheet'
import { useTranslation } from 'react-i18next'
import { getAllPosts } from '../../redux/actions/auth'
import { useSelector } from 'react-redux'
import { showError } from '../../utils/helperFunctions'

const FullVideoScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();
  const { postsArray, selectedIndex, item } = route.params; // Array of posts and selected index
  
  const currentIndex = postsArray.findIndex((postItem) => postItem.post_id === item.post_id);
    console.log("----ccc iiiiindsz-----",currentIndex)
    console.log(postsArray) 

    const [visibleVideos, setVisibleVideos] = useState(
        postsArray.map(() => true)
      );
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        const visibleVideoIndices = viewableItems.filter((item) => item.item.media_items[0].type === 'video').map((item) => item.index)
        
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
                    keyExtractor={(item) => item.post_id}
                    snapToInterval={Dimensions.get("window").height}
                    snapToAlignment={'start'}
                    decelerationRate={"fast"}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 60}}
                    renderItem={({ item, index }) => {
                      const mediaItems = item.media_items || []; // Ensure media_items is an array
                      const mediaTypes = mediaItems.map((media) => media.type);
                      const mediasUrls = mediaItems.map((media) => media.url.low || ''); // Ensure a default value for the URL
                      const imagesUrls = mediaItems.map((media) => media.url || ''); // Ensure a default value for the URL
                      const newVid = mediasUrls
                      console.log("current vid", newVid) 
                      console.log("current img", imagesUrls[0])  
                      return ( 
                        <View style={{}}>
                          {mediaTypes.includes('image') ? (
                            <Image source={{ uri: imagesUrls[0] }} style={styles.mediaFullFrame} />
                          ) : mediaTypes.includes('video') ? (
                            <View> 
                              <FullPostComp 
                              isVisible={visibleVideos[index] && isFocused} 
                              vids={
                                newVid.map((vid) => {
                                console.log("this ------------- ", vid)
                                return (vid)
                                })} />
                            </View>
                          ) : (
                            <>
                            <View style={styles.mediaFullFrame}>
                              <Text style={{}}>
                                error
                              </Text>
                            </View>
                            </>
                          )}
                          {/* {mediaTypes == 'image' ? (
                            <Image source={{ uri: imagesUrls[0] }} style={styles.mediaFullFrame} />
                          ) : mediaTypes == 'video' ? (
                            <View>
                              <FullPostComp isVisible={visibleVideos[index] && isFocused} vids={newVid} />
                            </View>
                          ) : (
                            <></>
                          )} */}
                          <FullScreenLikeIcons
                            // openCommentBottomSheetHandler={() => setOpenCommentBottomSheet(true)}
                            // openMenuBottomSheetHandler={() => setOpenMenuBottomSheet(true)}
                          />
                        </View>
                      );
                    }}
                    initialScrollIndex={currentIndex}
                />
        </View>
         </SafeAreaView>
    </>
  )
}

export default FullVideoScreen