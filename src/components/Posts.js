import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View, Share } from 'react-native'
import { posts } from '../Constants'
import { Text } from 'react-native-paper'
import BottomIcons from './BottomIcons'
import { Video, ResizeMode } from 'expo-av'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../constants/sizes' 
import HomeVidComp from './HomeVideos'



const Posts = ({ toggleSheet }) => {
    
    const navigation = useNavigation();

    const [visibleVideos, setVisibleVideos] = useState(
        posts.map(() => false)
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
        <FlatList  style={{ backgroundColor: "white", }}
            numColumns={1}
            showsVerticalScrollIndicator= {false}
            data={posts}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{itemVisiblePercentThreshold: 60}}
            renderItem=
            {({ item, index }) => 
                <Pressable onPress={()=> navigation.navigate("PostFull", { item } )}>
                    <View key={item.id}  style={{ marginHorizontal: WIDTH *0.17 }} >
                        <View  style={{marginTop: 20, flexDirection: "row"}}>
                            <Pressable  
                                onPress={() => navigation.navigate("UserProfileScreen")}
                                style={{ marginBottom: 10 }}>
                                <Image 
                                    source={item.profilePic} 
                                    style={{ width: 50, height: 50, borderRadius:60 }} />
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate("UserProfileScreen")} style={{ marginLeft: 10, marginTop: 10, alignItems: "center" }}>
                                <Text style={{fontWeight: "bold", fontSize: 20}}>{item.username}</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Text>{ item.post }</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            {item.content.type == "image" ? 
                                (
                                // <Text>image</Text>
                                <Image source={item.content.source} 
                                    style={ styles.mediaFrame } />
                                ) : (
                                    <View> 
                                    <HomeVidComp vids={item.content.source} isVisible={visibleVideos[index] && isFocused} />
                                    </View>
                                )
                            }
                        </View>
                        <View style={{marginBottom: 20}}>
                            <BottomIcons 
                            likeLink={() => toggleLike(index)}
                            likeColor={likeStates[index] ? 'red' : '#000'}
                            likeName={!likeStates[index] ? require("../../assets/icons/heart.png") : require("../../assets/icons/heart-fill.png")}
                            like={likes[index]} 
                            chat={item.comments} 
                            chatLink={toggleSheet}
                            saveLink={() => toggleSave(index)}
                            saveName={savedStates[index] ? require("../../assets/icons/bookmark-fill.png") : require("../../assets/icons/bookmark.png")}
                            save={saved[index]} 
                            saveColor={savedStates[index] ? 'blue' : '#000'}
                            shareLink={() => onShare(item.image)}
                            share={item.shared} 
                            />
                        </View>
                        <View style={{borderBottomWidth: 0.5, borderBottomColor: "#000", }}></View>
                        
                    </View>
                </Pressable>
            }
        >
        </FlatList>
    </View>
  )
}

export default Posts;

const styles = StyleSheet.create({
    mediaFrame: { 
        borderRadius: 20, 
        height: HEIGHT * 0.51, 
        width: "100%" 
    }
})