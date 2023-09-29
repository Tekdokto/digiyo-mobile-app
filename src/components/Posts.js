import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { posts } from '../Constants'
import { Text } from 'react-native-paper'
import BottomIcons from './BottomIcons'
import { Video, ResizeMode } from 'expo-av'
import { useNavigation } from '@react-navigation/native'

const Posts = ({  }) => {
    
    const navigation = useNavigation();

    //   const video = React.useRef(null);
    //   const [status, setStatus] = React.useState({});
    const [likeStates, setLikeStates] = useState(posts.map(() => false));
    const [savedStates, setSavedStates] = useState(posts.map(() => false));
    const [likes, setLikes] = useState(posts.map((post) => post.likes));
    const [saved, setSaves] = useState(posts.map((post) => post.saved));


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

 
  return (
    <View>
        <FlatList 
            numColumns={1}
            showsVerticalScrollIndicator= {false}
            data={posts}
            renderItem=
            {({ item, index }) => 
                <View key={item.id} >
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
                                        <Video
                                        source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                                        style={styles.mediaFrame}
                                        useNativeControls={true}
                                        resizeMode={ResizeMode.CONTAIN}
                                        isLooping={true}
                                        isTVSelectable={true} 
                                      />
                                    </View>
                                  
                                // <Text>vid</Text>
                               
                            )
                        }
                    </View>
                    <View style={{marginBottom: 20}}>
                        <BottomIcons 
                        likeLink={() => toggleLike(index)}
                        likeColor={likeStates[index] ? 'red' : '#000'}
                        likeName={!likeStates[index] ? 'heart-o' : 'heart'}
                        like={likes[index]} 
                        chat={item.comments} 
                        saveLink={() => toggleSave(index)}
                        saveName={savedStates[index] ? "md-bookmark" : "md-bookmark-outline"}
                        save={saved[index]} 
                        saveColor={savedStates[index] ? 'blue' : '#000'}
                        share={item.shared} 
                        />
                    </View>
                    <View style={{borderBottomWidth: 0.5, borderBottomColor: "#000", }}></View>
                </View>
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
        height: Dimensions.get('screen').height * 0.51, 
        width: "100%" 
    }
})