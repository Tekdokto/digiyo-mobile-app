import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableWithoutFeedback, } from 'react-native';
 
import styles from '../../constants/styles'; 

import { Video, ResizeMode } from 'expo-av';
// import { useIsFocused } from '@react-navigation/native';
 
const HomeVidComp = ({ vids, isVisible, videoReady }) => {
  const [paused, setPaused] = useState(!isVisible);
  const [isPlaying, setIsPlaying] = useState(false); // Start paused
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    // Load the video when the component mounts
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
    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, []);

  // Play or pause the video when it becomes visible or not
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible && !paused) {
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
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={togglePlayPause}>
        <View style={{ flex: 1 }}>
          <Video
            ref={videoRef}
            style={styles.video}
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}; 

export default HomeVidComp;
 