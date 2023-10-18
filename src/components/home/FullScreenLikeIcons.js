import React, { useEffect, useState } from 'react'
import styles from '../../constants/styles'


import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const FullScreenLikeIcons = () => {
    //   const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

//   const onLikePress = () => {
//     const likesToAdd = isLiked ? -1 : 1;
//     setPost({
//       ...post,
//       likes: post.likes + likesToAdd,
//     });
//     setIsLiked(!isLiked);
//   };

//   const getVideoUri = async () => {
//     if (post.videoUri.startsWith('http')) {
//       setVideoUri(post.videoUri);
//       return;
//     }
//     setVideoUri(await Storage.get(post.videoUri));
//   };

//   useEffect(() => {
//     getVideoUri();
//   },[]);

  
  return (
    <View 
    style={styles.uiContainer}
    >
            <View 
            style={styles.rightContainer}
            >
              {/* <Image
                style={styles.profilePicture}
                source={{uri: post.user.imageUri}}
              /> */}

              <TouchableOpacity 
              style={styles.iconContainer}
            //    onPress={onLikePress}
              >
                <AntDesign name={'heart'} size={40} 
                // color={isLiked ? 'red' : 'white'} 
                />
                <Text style={styles.statsLabel}>post.likes</Text>
              </TouchableOpacity>

              <View 
              style={styles.iconContainer}
              >
                <FontAwesome name={'commenting'} size={40} color="#ffffff33" />
                <Text style={styles.statsLabel}>post.comments</Text>
              </View>

              <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>post.shares</Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              {/* <View>
                <Text style={styles.handle}>@username</Text>
                <Text style={styles.description}>description</Text>

                <View style={styles.songRow}>
                  <Entypo name={'beamed-note'} size={24} color="white" />
                  <Text style={styles.songName}>song name</Text>
                </View>
              </View> */}

              {/* <Image
                style={styles.songImage}
                source={{uri: post.song.imageUri}}
              /> */}
            </View>
          </View>
  )
}

export default FullScreenLikeIcons