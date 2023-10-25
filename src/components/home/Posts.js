import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Text, FlatList, Image, Pressable, View, Share } from 'react-native'
import { posts } from '../../Constants'
import BottomIcons from '../BottomIcons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../../constants/sizes' 
import HomeVidComp from './HomeVideos'
import styles from '../../constants/styles' 
import ThemeContext from '../../theme/ThemeContext'
import ReadMore from '@fawazahmed/react-native-read-more'
import { getAllPosts } from '../../redux/actions/auth'
import { showError } from '../../utils/helperFunctions'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'
// import ThemeContext from '../../theme/ThemeContext'

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ResizeMode, Video } from 'expo-av'
import CommentsBottomSheet from '../commentsBottomSheet'



const Posts = ({  }) => {

    const theme = useContext(ThemeContext);
    
    const navigation = useNavigation();

    const user = useSelector(state=>state.auth.userData.token)
  
    const [isLoading, setLoading] = useState(false)
    const [post, setPost] = useState(false)

    const [isVideoReady, setVideoReady] = useState(false);

    const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [isOpen, setOpen ] = useState(false);

  const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false);

  const toggleSheet = () => {
    setOpen(!isOpen);
    setOpenCommentBottomSheet(!openCommentBottomSheet)
    console.log(openCommentBottomSheet)
  }

    const [visibleVideos, setVisibleVideos] = useState([]);
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
      // Iterate through the viewable items and determine which videos are visible
      const newVisibleVideos = post.map((_, index) =>
        viewableItems.some((item) => item.index === index && item.item.media_items[0].type === 'video')
      );
      setVisibleVideos(newVisibleVideos);
    }, [post]);    

    const [likeStates, setLikeStates] = useState([]);
    const [savedStates, setSavedStates] = useState([]);
    const [likes, setLikes] = useState([]);
    const [saved, setSaves] = useState([]);
// console.log(post.data.map((item) => {console.log(item)}))
  
  const onFetchPosts = async() => { 
    let token = user.token 
    // console.log("token ---------- " , token)
        try {
          setLoading(true)
          let res = await getAllPosts(token)
          setPost(res.data)
          console.log(res.data.map((item) => {console.log( " all likes ...,,,,,,,,,",item.totalLikes)}))
          setLikeStates(res.data.map(() => false)) 
          setVisibleVideos(res.data.map(() => true)) 
          setLikes(res.data.map((item) => { 
            item.totalLikes
            console.log("...,,,,,,,,,",item.totalLikes)
        })) 
        //   setSaves(res.data.map((item) => {
        //     console.log("...,,,,,,,,,",item)
        // }))
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

    const isFocused = useIsFocused();
    
    const toggleLike = (index) => {
      // const newPost = [...post]

      const newLikeStates = [...likeStates];
      newLikeStates[index] = !newLikeStates[index];
      setLikeStates(newLikeStates); 

    const newLikes = [...post];
        if (newLikeStates[index]) {
        // Increment likes
        newLikes[index] += 1;
        } else { 
        // Decrease likes if not liked
        newLikes[index] -= 1;
        } 
        setLikes(newLikes);
    };

    const toggleSave = (index) => {
        const newSavedState = [...savedStates];
        newSavedState[index] = !newSavedState[index];
        setSavedStates(newSavedState)

        // increment decrement
        const newSave = [...saved];
        if (newSavedState[index]) {

            newSave[index] += 1;
        } else {
            newSave[index] -= 1;
        }

        setSaves(newSave)
    }

    // SHARE
    const onShare = async ( url ) => {
        try {
            const result = await Share.share({
                message: ("Sending "+ url ),
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with ' + result.activityType)
                } else {
                    console.log('Shared only')
                } 
            } else if (result.action === Share.dismissedAction) {
                console.log('disssssssssed')
            }
        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
    }

 
    return (
        <View>
          {isLoading ? (
            <View style={{ flex: 1, top: 300, alignContent: "center", alignItems: "center", flexDirection: "column" }}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              style={{ backgroundColor: theme.background }}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              data={post}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
              renderItem={({ item, index }) => {
                const mediaTypes = item.media_items.map((media) => media.type);
                const mediasUrls = item.media_items.map((media) => media.url.low);
                const imagesUrls = item.media_items.map((media) => media.url);
                // console.log("vides  ----------",mediasUrls[0])
//                 const filteredData = post.data.filter(item => item.media_items && item.media_items[0] && item.media_items[0].type === "video");

// // console.log("just vids",filteredData.map((media) => {
// //     media
// // }));
      
                return (
                  <>
                    <Pressable onPress={() => navigation.navigate("PostFull", { item: item, selectedIndex: index, postsArray: post, })}>
                      <View key={item.post_id} style={{ marginHorizontal: WIDTH * 0.17 }}>
                        <View style={{ marginTop: 20, flexDirection: "row", alignContent: "center" }}>
                          <Pressable onPress={() => navigation.navigate("otherUserProfileScreen")} style={{ marginBottom: 10 }}>
                            {mediaTypes.includes("image") ? (
                              <FontAwesome
                                name="user-circle-o"
                                size={30}
                                color={"blue"}
                              />
                            ) : null}
                          </Pressable>
                          <Pressable onPress={() => navigation.navigate("otherUserProfileScreen", { item: item })} style={{ marginLeft: 10, marginTop: 10, alignItems: "center" }}>
                            <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
                              <Text style={{ fontWeight: "bold", fontSize: 20, color: theme.color }}>
                                username
                              </Text>
                            </View>
                          </Pressable>
                        </View>
                        <View style={{ marginBottom: 4 }}>
                          <ReadMore
                            numberOfLines={1}
                            seeLessText="hide"
                            seeMoreText="read more"
                            style={{
                              fontWeight: "400",
                              color: theme.color
                            }}>
                            {item.caption}
                          </ReadMore>
                        </View>
                        <View style={{ marginBottom: 4 }}>
                          <ReadMore
                            numberOfLines={1}
                            seeLessText="hide"
                            seeMoreText="read more"
                            style={{
                              fontWeight: "400",
                              color: theme.color
                            }}>
                            {item.content}
                          </ReadMore>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                          {mediaTypes == "video" ? (
                          //   isVideoReady ? (
                              <View> 
                                <HomeVidComp
                                  vids={mediasUrls[0]}
                                  isVisible={visibleVideos[index] && isFocused}
                                /> 
                              </View> 
                          ) : mediaTypes == "image" ? (
                            isLoading ? (
                              <ActivityIndicator />
                            ) : (
                              <Image source={{ uri: imagesUrls[0]  }} style={styles.mediaFrame} />
                            )
                          ) : (
                            <Text>Unsupported media type</Text>
                          )}
                        </View>
                        <View style={{ marginBottom: 20 }}>
                          <BottomIcons
                            likeLink={() => toggleLike(index)}
                            likeColor={likeStates[index] ? 'red' : 'none'}
                            likeName={!likeStates[index] ? require("../../../assets/icons/heart.png") : require("../../../assets/icons/heart-fill.png")}
                            like={item.totalLikes}
                            chat={item.totalComments} 
                            chatLink={toggleSheet}
                            saveLink={() => toggleSave(index)}
                            saveName={savedStates[index] ? require("../../../assets/icons/bookmark-fill.png") : require("../../../assets/icons/bookmark.png")}
                            save={"0"} 
                            saveColor={savedStates[index] ? 'blue' : '#000'}
                          />
                        </View>
                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#000" }}></View>
                      </View>
                    </Pressable>

                    <CommentsBottomSheet
                    postId={item.post_id}
                    visible={openCommentBottomSheet}
                    closeCommentBottomSheet={() => setOpenCommentBottomSheet(false)}
                  />
                  </>
                );
              }}>
            </FlatList>
          )}
        </View>
      );
      
}

export default Posts;
