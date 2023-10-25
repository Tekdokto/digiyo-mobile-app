import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import {Storage} from 'aws-amplify';

// import Video from 'react-native-video';
import styles from '../../constants/styles';

import { Video, ResizeMode } from 'expo-av';


const FullPostComp = ({ vids, isVisible }) => {

  const [paused, setPaused] = useState(!isVisible);
 
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    // When the component mounts, autoplay the video
    if (videoRef.current && !isVideoLoaded) {
      videoRef.current.loadAsync(
        { uri: vids },
        {},
        false // Set to true to autoplay after loading
      ).then(() => {
        setIsVideoLoaded(true);
        setIsPlaying(!paused); // Autoplay after loading
      });
    }
  }, [vids, isVideoLoaded, paused]);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible && !paused ) {
        videoRef.current.playAsync()
      } else {
        videoRef.current.pauseAsync()
      }
    }
  }, [isVisible, paused])

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
    <View style={styles.containerFull}>
      <TouchableWithoutFeedback onPress={togglePlayPause}>
        {/* <View> */}
        <Video
            ref={videoRef}
            style={styles.videoFull}
            onError={(e) => console.log(e)}
            resizeMode={ResizeMode.COVER}
            isLooping={false}
            shouldPlay={paused}
            // onReadyForDisplay={videoReady}
            onPlaybackStatusUpdate={(status) => {
              if (!status.isLoaded) {
                console.error('Video load error:', status.error);
              }
            }}
          />
          
        {/* </View> */}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FullPostComp;
 