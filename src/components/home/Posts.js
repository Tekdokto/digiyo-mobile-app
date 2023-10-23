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



const Posts = ({ toggleSheet }) => {

    const theme = useContext(ThemeContext);
    
    const navigation = useNavigation();

    const user = useSelector(state=>state.auth.userData.token)
  
    const [isLoading, setLoading] = useState(false)
    const [post, setPost] = useState(false)

    const [isVideoReady, setVideoReady] = useState(false);
    const [visibleVideos, setVisibleVideos] = useState(
        posts.map(() => true)
      );
    onViewableItemsChanged = useCallback(({ viewableItems }) => {
        const visibleVideoIndices = viewableItems.filter((item) => item.item.content.type === 'video').map((item) => item.index)
        
        const newVisibleVideos = posts.map((_, index) => visibleVideoIndices.includes(index))

        setVisibleVideos(newVisibleVideos)
    }, [])    
 
    const [likeStates, setLikeStates] = useState(posts.map(() => false));
    const [savedStates, setSavedStates] = useState(posts.map(() => false));
    const [likes, setLikes] = useState(posts.map((post) => post.likes));
    const [saved, setSaves] = useState(posts.map((post) => post.saved));

  
  const onFetchPosts = async() => { 
    let token = user.token
    // console.log("token ---------- " , token)
        try {
          setLoading(true)
          let res = await getAllPosts(token)
        //   console.log("posts -------", res)
        //   console.log("posts result -------", res)
        // const gotit = res.data
          setPost(res)
        //   console.log("first", post)
        //   console.log("mapongind qqqqqqqqqqqqqqqqq ",post.map((item) => item.content))
          setLoading(false)
        } catch (error) {
          showError(error.message)
          console.log("post error -------", error )
          setLoading(false)
        }
}
useEffect(() => {
  onFetchPosts();
  }, []);


    
    const isFocused = useIsFocused();


    const toggleLike = (index) => {
    const newLikeStates = [...likeStates];
    newLikeStates[index] = !newLikeStates[index];
    setLikeStates(newLikeStates); 

    const newLikes = [...likes];
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
        {isLoading ?
            (<>
                <View style={{ flex: 1, top: 300, alignContent: "center", alignItems: "center", flexDirection: "column"}}>
                    {/* <Text style={{ }}>Loadsiing</Text> */}
                    <ActivityIndicator />
                </View>
            </>)
            :
            (

            <FlatList  style={{ backgroundColor: theme.background, }}
                numColumns={1}
                showsVerticalScrollIndicator= {false}
                data={post.data}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{itemVisiblePercentThreshold: 60}}
                renderItem=
                {
                    ({ item, index }) => {
                    // console.log( "stuff ---= ",item.content)
                    const medias = item.media_items.map((media) => media.type)
                    const mediasUrl = item.media_items.map((media) => media.url.low)
                    // console.log("medias ===== here == media types ",mediasUrl) 
                    return (  
                        <Pressable onPress={()=> navigation.navigate("PostFull", { item } )}>
                            <View key={item.post_id}  style={{ marginHorizontal: WIDTH *0.17 }} >
                                <View  style={{marginTop: 20, flexDirection: "row", alignContent: "center", }}>
                                    <Pressable  
                                        onPress={() => navigation.navigate("otherUserProfileScreen")}
                                        style={{ marginBottom: 10 }}>
                                            {}
                                            <FontAwesome
                                                name="user-circle-o"
                                                size={30}
                                                color={"blue"}
                                            />
                                        {/* <Image 
                                            source={item.profilePic} 
                                            style={{ width: 50, height: 50, borderRadius:60 }} /> */}
                                    </Pressable>
                                    <Pressable onPress={() => navigation.navigate("otherUserProfileScreen", { item: item })} style={{ marginLeft: 10, marginTop: 10, alignItems: "center" }}>
                                    <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-start"}}>
                                        <Text style={{fontWeight: "bold", fontSize: 20, color: theme.color}}>username</Text>
                                        {/* <Text style={{fontWeight: "400", fontSize: 10, color: theme.color}}>{item.time} hr ago</Text> */}
                                    </View>
                                    </Pressable>
                                </View>
                                <View style={{ marginBottom: 4}}>
                                    <ReadMore numberOfLines={1}
                                        seeLessText='hide'
                                        seeMoreText='read more'
                                    style={{
                                        fontWeight: "400", 
                                        color: theme.color
                                        }}>
                                            { item.Caption }
                                    </ReadMore>
                                </View>
                                <View style={{ marginBottom: 4}}>
                                    <ReadMore numberOfLines={1}
                                        seeLessText='hide'
                                        seeMoreText='read more'
                                    style={{
                                        fontWeight: "400", 
                                        color: theme.color
                                        }}>
                                            { item.content }
                                    </ReadMore>
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    {
                                    
                                    medias == "video" 
                                    ? 
                                        ( 
                                        // <Text>image</Text>
                                        // 
                                            <>
                                            { isVideoReady ? ( 
                                                <View>  
                                                    <HomeVidComp vids={mediasUrl}  
                                                    videoReady={setVideoReady(true)}

                                                    isVisible={visibleVideos[index] && isFocused} 
                                                    />
                                            </View>) :
                                                (
                                                    <ActivityIndicator />
                                                )
                                        }
                                            </>
                                        ) : (
                                            <>
                                            <Image source={{url: mediasUrl}} 
                                            style={ styles.mediaFrame } /> 
                                            </>
                                        )
                                    }
                                </View>
                                <View style={{marginBottom: 20}}>
                                    <BottomIcons 
                                    likeLink={() => toggleLike(index)}
                                    likeColor={likeStates[index] ? 'red' : 'none'}
                                    likeName={!likeStates[index] ? require("../../../assets/icons/heart.png") : require("../../../assets/icons/heart-fill.png")}
                                    like={likes[index]} 
                                    chat={item.comments} 
                                    chatLink={toggleSheet}
                                    saveLink={() => toggleSave(index)}
                                    saveName={savedStates[index] ? require("../../../assets/icons/bookmark-fill.png") : require("../../../assets/icons/bookmark.png")}
                                    save={saved[index]} 
                                    saveColor={savedStates[index] ? 'blue' : '#000'}
                                    // shareLink={() => onShare(item.image)}
                                    // share={item.shared} 
                                    />
                                </View>
                                <View style={{borderBottomWidth: 0.5, borderBottomColor: "#000", }}></View>
                                
                            </View>
                        </Pressable> 
                        )
                    }
                }
            >
            </FlatList>
            )
}
    </View>
  )
}

export default Posts;
