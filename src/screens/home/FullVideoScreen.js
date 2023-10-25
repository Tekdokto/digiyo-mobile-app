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

const FullVideoScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    const { item } = route.params;

    const { t, i18n } = useTranslation();

  function tr(key) {
    return t(`forYouAndFollowingVideo:${key}`);
  }

    const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false);
    const [openMenuBottomSheet, setOpenMenuBottomSheet] = useState(false);
    
    const [isLoading, setLoading] = useState(false)
    const [post, setPost] = useState(false)
    
    const user = useSelector(state=>state.auth.userData.token)
  

  
    
  const onFetchPosts = async() => { 
    let token = user.token
    // console.log("token ---------- " , token)
        try {
          setLoading(true)
          let res = await getAllPosts(token)
          setPost(res.data)
          console.log(res.data)
          setLoading(false)
        } catch (error) {
          showError(error.message)
          // console.log("post error -------", error )
          setLoading(false)
        }
}
useEffect(() => {
  onFetchPosts();
  }, []);


    // console.log(item)
    const postsArray = post;
    const currentIndex = postsArray.findIndex((postItem) => postItem.id === item.post_id);
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
                        <FullScreenLikeIcons 
                            openCommentBottomSheetHandler={() => setOpenCommentBottomSheet(true)}
                            // shareVideo={shareVideo}
                            openMenuBottomSheetHandler={() => setOpenMenuBottomSheet(true)}
                        /> 
                    </View>
                    )}
                    initialScrollIndex={currentIndex}
                />
        </View>
        <CommentsBottomSheet
          visible={openCommentBottomSheet}
          closeCommentBottomSheet={() => setOpenCommentBottomSheet(false)}
        />

        <MenuBottomSheet
          visible={openMenuBottomSheet}
          closeMenuBottomSheet={() => setOpenMenuBottomSheet(false)}
          title={`${tr("unfollow")} Jane Cooper`}
        />
         </SafeAreaView>
    </>
  )
}

export default FullVideoScreen