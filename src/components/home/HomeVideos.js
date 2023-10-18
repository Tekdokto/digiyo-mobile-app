import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableWithoutFeedback, } from 'react-native';
 
import styles from '../../constants/styles'; 

import { Video, ResizeMode } from 'expo-av';
// import { useIsFocused } from '@react-navigation/native';

const HomeVidComp = ({ vids, isVisible }) => {  

  const [paused, setPaused] = useState(!isVisible);
 
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync()
      } else {
        videoRef.current.pauseAsync()
      }
    }
  }, [])


  // only play when the video is in view
  useEffect(() => {
    // When the component mounts, autoplay the video
    if (videoRef.current) {
      if (isVisible && !paused ) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isVisible, paused]);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
      setPaused(!isPlaying);
    }
  }
  
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={togglePlayPause}>
        <View style={{ flex: 1 }}>
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
 
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeVidComp;
 