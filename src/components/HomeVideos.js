import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import {Storage} from 'aws-amplify';

// import Video from 'react-native-video';
import styles from '../constants/styles';

import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Fontisto from 'react-native-vector-icons/Fontisto';
import { Video, ResizeMode } from 'expo-av';

const HomeVidComp = ({ vids }) => {
  // const [post, setPost] = useState(props.post);
  // const [isLiked, setIsLiked] = useState(false);
  // const [videoUri, setVideoUri] = useState('');

  const [paused, setPaused] = useState(true);

  const onPlayPausePress = () => {
    setPaused(!paused);
    console.log(paused)
  };

  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    // When the component mounts, autoplay the video
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  }

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
           <Video
              // source={{uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-llea-8725-311975ea9616/processed_720.mp4'}}
              source={ vids }
              // source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
              ref={videoRef}
              style={styles.video}
              onError={(e) => console.log(e)}
              // useNativeControls={true}
              resizeMode={ResizeMode.COVER}
              isLooping={false}
              shouldPlay={paused} // Set to true to start playing automatically
              onPlaybackStatusUpdate={(status) => {
                if (!status.isLoaded) {
                  console.error('Video load error:', status.error);
                }
              }} 
            /> 

          <View style={styles.uiContainer}>
            {/* <View style={styles.rightContainer}>
              <Image
                style={styles.profilePicture}
                source={{uri: post.user.imageUri}}
              />

              <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
                <AntDesign name={'heart'} size={40} color={isLiked ? 'red' : 'white'} />
                <Text style={styles.statsLabel}>{post.likes}</Text>
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                <FontAwesome name={'commenting'} size={40} color="white" />
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </View>

              <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View>
            </View> */}

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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeVidComp;
 