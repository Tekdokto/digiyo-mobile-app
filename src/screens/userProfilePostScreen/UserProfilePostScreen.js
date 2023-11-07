import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FullPostComp from '../../components/home/FullPostComp' 
import { FlatList, Image, View, Text, Dimensions, StatusBar, Share} from 'react-native'
import styles from '../../constants/styles'
import { HEIGHT } from '../../constants/sizes'
import FullScreenLikeIcons from '../../components/home/FullScreenLikeIcons'
import { useIsFocused } from '@react-navigation/native'
import CommentsBottomSheet from '../../components/commentbottomsheet/commentsBottomSheet'
import MenuBottomSheet from '../../components/menuBottomSheet'
import { useTranslation } from 'react-i18next'  
// import { showError } from '../../utils/helperFunctions'
import { CREATE_POSTS } from '../../config/urls'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'


const UserProfilePostScreen = ({ navigation, route }) => {

  const { userInfo, userTokens } = useContext(AuthContext);

  const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false);
  const [openMenuBottomSheet, setOpenMenuBottomSheet] = useState(false);

  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();
  const { postsArray, selectedIndex, item } = route.params; // Array of posts and selected index
  
  const currentIndex = postsArray.findIndex((postItem) => postItem.post_id === item.post_id);
    // console.log("----ccc iiiiindsz-----",currentIndex)
    console.log("arayyyyyyyyyy ",postsArray) 

    const [postId, getPostId] = useState();
  
  let likeStatus = postsArray.map((likes) => likes.user_has_liked); 
  let theLikes = postsArray.map((likes) => likes.totalLikes);
  
    const [likeStates, setLikeStates] = useState(likeStatus);
  // const [savedStates, setSavedStates] = useState([]);
  const [likes, setLikes] = useState(theLikes);
  // const [saved, setSaves] = useState([]);
  // getPostId(postsArray.map((postId) => postId.post_id))

    const userData = userInfo.authenticated_user.user_id
    console.log("data- - - - - ", userData)
    const [visibleVideos, setVisibleVideos] = useState(
        postsArray.map(() => true)
      );
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        const visibleVideoIndices = viewableItems.filter((item) => item.item.media_items[0].type === 'video').map((item) => item.index)
        
        const newVisibleVideos = postsArray.map((_, index) => visibleVideoIndices.includes(index))

        setVisibleVideos(newVisibleVideos)
    }, [])

    // console.log(visibleVideos)

    const [openedPostId, setOpenedPostId] = useState(null); // Track the opened post's post_id

  const toggleSheet = (post_id) => {
    if (openedPostId === post_id) {
      // If the same post is clicked again, close the CommentsBottomSheet
      setOpenCommentBottomSheet(false);
      setOpenedPostId(null);
    } else {
      // If a different post is clicked, open the CommentsBottomSheet for that post
      setOpenedPostId(post_id);
      setOpenCommentBottomSheet(true);
    }
  };

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

    
  const user = userTokens
    
  const toggleLike = async (index) => {
    console.log("like") 
    console.log("like");
  let token = user;
  const newLikeStates = [...likeStates];
  newLikeStates[index] = !newLikeStates[index];
  setLikeStates(newLikeStates);

  const newLikes = [...likes];
  if (newLikeStates[index]) {
    newLikes[index] += 1; // Increment likes
  } else {
    newLikes[index] -= 1; // Decrement likes if already liked
  }
  setLikes(newLikes);
    const config = {
      method: "post",
      url: CREATE_POSTS + "/" + postId[index] + "/like",
      headers: {
        Authorization: token,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    console.log(config) 
    try { 
      // setLoading(true);
      // let res = getUserPosts(auth,  userId)
       await axios(config)
        .then((response) => { 
          // setPost(response.data.data);
          console.log(" liked ??????",response.data);
        })
        .catch((error) => {
          console.log("likes error 1111111111111", error);
        }); 
 
      // console.log("---------",res)
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }

  };

  const toggleUnLike = async (index) => {
    
    let token = user;
  const newLikeStates = [...likeStates];
  newLikeStates[index] = !newLikeStates[index];
  setLikeStates(newLikeStates);

  const newLikes = [...likes];
  if (newLikeStates[index]) {
    newLikes[index] += 1; // Increment likes
  } else {
    newLikes[index] -= 1; // Decrement likes if not liked
  }
  setLikes(newLikes);
    // setLoading(true);
    
    const config = { 
      method: "delete", 
      url: CREATE_POSTS + "/" + postId[index] +"/like",
      headers: {
        Authorization: token,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    try {
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => { 
          // setPost(response.data.data);
          console.log(" unlikeded ??????",response.data);
        })
        .catch((error) => {
          console.log("likeds error 1111111111111", error);
        }); 

      // console.log("---------",res)
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
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
                       let owner = item.author_id === userData ? true : false
                       console.log('post - - - r - -',item.author_id, owner)
                      const mediaItems = item.media_items || []; // Ensure media_items is an array
                      const mediaTypes = mediaItems.map((media) => media.type);
                      const mediasUrls = mediaItems.map((media) => media.url.low ); // Ensure a default value for the URL
                      const imagesUrls = mediaItems.map((media) => media.url || ''); // Ensure a default value for the URL
                      const newVid = mediasUrls
                    //   console.log("current vid", newVid) 
                    //   console.log("current img", imagesUrls[0])  
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
                          color={!likeStates[index] ? "white" : "red" }
                          toggle={() => {
                            console.log("has liseds ",item)
                            if (likeStates[index] == true) {
                              toggleUnLike(index) 
                            } else { 
                              toggleLike(index)
                            } 
                            } 
                          }
                          likes={likes[index]}
                          comments
                            shareVideo={shareContent}
                            openCommentBottomSheetHandler={() =>{
                               setOpenCommentBottomSheet(true)
                               toggleSheet(item.post_id)
                              }}
                            openMenuBottomSheetHandler={() => setOpenMenuBottomSheet(true)}
                          />
                           <CommentsBottomSheet
                              post_id={openedPostId}
                              visible={openCommentBottomSheet}
                              closeCommentBottomSheet={() => setOpenCommentBottomSheet(false)}
                            />

                            <MenuBottomSheet
                              post_id={item.post_id}
                              isPostOwner={owner}
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

export default UserProfilePostScreen