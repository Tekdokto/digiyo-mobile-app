import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FullPostComp from '../../components/home/FullPostComp'
import { FlatList, Image, View, Text, Dimensions, StatusBar, Share} from 'react-native'
import styles from '../../constants/styles'
import FullScreenLikeIcons from '../../components/home/FullScreenLikeIcons'
import { useIsFocused } from '@react-navigation/native'
import CommentsBottomSheet from '../../components/commentsBottomSheet'
import MenuBottomSheet from '../../components/menuBottomSheet'
import { useTranslation } from 'react-i18next'

import * as Sharing from 'expo-sharing'

const FullVideoScreen = ({ navigation, route }) => {

  const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false);
  const [openMenuBottomSheet, setOpenMenuBottomSheet] = useState(false);

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
    const shareContent = async () => {
      try {
        const result = await Share.share({ 
          message: 'Check out this awesome post!',
          url: 'https://example.com/post/123', // Replace with your post's URL
        });
    
        if (result.action === Share.ActionType.SHARED) {
          console.log('Shared successfully');
        } else if (result.action === Share.ActionType.DISMISSED) {
          console.log('Share dismissed');
        }
      } catch (error) {
        console.error('Sharing error:', error);
      }
    };
    

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
                      const mediasUrls = mediaItems.map((media) => media.url.low ); // Ensure a default value for the URL
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
                              vids={ newVid[0]
                                // newVid.map((vid) => {
                                // console.log("this ------------- ", vid)
                                // return (vid)
                                // }) 
                                } />
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
                          shareVideo={shareContent}
                            openCommentBottomSheetHandler={() => setOpenCommentBottomSheet(true)}
                            openMenuBottomSheetHandler={() => setOpenMenuBottomSheet(true)}
                          />
                           <CommentsBottomSheet
                              visible={openCommentBottomSheet}
                              closeCommentBottomSheet={() => setOpenCommentBottomSheet(false)}
                            />

                            <MenuBottomSheet
                              visible={openMenuBottomSheet}
                              closeMenuBottomSheet={() => setOpenMenuBottomSheet(false)}
                              title={`"unfollow" Jane Cooper`}
                            />
                        </View>
                      );
                    }}
                    initialScrollIndex={currentIndex}
                    getItemLayout={(data, index) => ({
                      length: Dimensions.get('window').height,
                      offset: Dimensions.get('window').height * index,
                      index,
                    })}
                />
        </View>
         </SafeAreaView>
    </>
  )
}

export default FullVideoScreen