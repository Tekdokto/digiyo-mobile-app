import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Audio, Video } from 'expo-av'
import { AutoFocus, Camera, CameraType } from 'expo-camera'
import * as  ImagePicker  from 'expo-image-picker'
import * as  MediaLibrary  from 'expo-media-library'
import React, { useContext, useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import styles from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import ThemeContext from '../../theme/ThemeContext'
import { HEIGHT, WIDTH } from '../../constants/sizes'
import { FadeInDown } from 'react-native-reanimated'
import { posts } from '../../Constants'
import SelectedPreview from './preview'

const CameraScreen = () => {

    const theme = useContext(ThemeContext)

    const navigation = useNavigation()

    const [ hasCameraPermissions, setHasCameraPermissions ] = useState(false)
    const [ hasAudioPermissions, setHasAudioPermissions ] = useState(false)
    const [ hasGalleryPermissions, setHasGalleryPermissions ] = useState(false)

    const [ galleryItems, setGalleryItems ] = useState([])

    const isFocused = useIsFocused()

    const [ cameraRef, setCameraRef ] = useState(null)
    const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back)
    const [ cameraFlash, setCameraFlash ] = useState(Camera.Constants.FlashMode.off)
    const [ isCameraReady, setIsCameraReady ] = useState(false)

    
    const [description, setDescription] = useState('');
    const [previewImageUri, setPreviewImageUri] = useState(null);
    const [newPost, setNewPost] = useState(null);


    // const [type, setType] = useState(0);

    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [videoSource, setVideoSource] = useState(null);
    const [videoFromGallerySource, setVideoFromGallerySource] = useState(null);
    const [pictureSource, setPictureSource] = useState(null);
    const [galleryImageSource, setGalleryImageSource] = useState(null);


    const recordVideo = async () => {
        if (isCameraReady) {
            setIsRecording(true)
            setRecordingDuration(0);

            const timerId = setInterval(() => {
                setRecordingDuration((prevDuration) => prevDuration + 1);
              }, 1000);
            try {
                const options = {maxDuration: 120, quality: Camera.Constants.VideoQuality["480"],}
                const videoRecordPromise = cameraRef.recordAsync(options)
                
                if (videoRecordPromise) {
                    const data = await videoRecordPromise
                    const source = data.uri
                    console.log(source, "videoooooooooooooosssssss")

                    // Stop the timer when recording is complete
                    clearInterval(timerId);

                    setVideoSource(source);
                }
            } catch (error) {
                console.warn(error)
            }

            setIsRecording(false)
        }
    }

    const stopVideo = async () => {
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    const takePicture = async () => {
        if (isCameraReady) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.takePictureAsync(options);
            const source = data.uri;
            console.log(source, "sourcexxxxxxxxxx")
            setPictureSource(source)
            if (source) {
                props.navigation.navigate('Save', { source, imageSource: null, type })
            }
        }
    };

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [16, 9],
            quality: 1,
        })

        // console.log(result.assets, "ressssssssssssssss oooooooooot")

        if (!result.canceled) {
            if (result.assets[0].type == "image") { 
                setVideoFromGallerySource(null)
                setGalleryImageSource(result.assets[0].uri)
            } else if (result.assets[0].type == "video") {
                setVideoFromGallerySource(null)
                setVideoFromGallerySource(result.assets[0].uri)
            }
        }
    }

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermissions(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ 
                    sortBy: ["creationTime"], 
                    mediaType: ["video", "photo"] })

                setGalleryItems(userGalleryMedia.assets)
            }
        })()
    }, [])

    // console.log(galleryItems)

    if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
        return (
            <>
                <View>
                    <Text>Permission denied</Text>
                </View>
            </>
        )
    }

    // save post 
 
    const handlePost = async () => {
        // Create a new post object with the description and the previewImageUri
        const newPost = {
          id: posts.length + 1, // You should generate a unique ID
          time: new Date().getTime(), // You can use a timestamp
          username: 'newguy', // Replace with the actual username
          post: description,
          profilePic: require('../../../assets/images/2.jpg'),
          content: {
            type: 'image',
            source: { uri: pictureSource },
          },
          likes: 0,
          comments: 0,
          saved: 0,
          shared: 0,
          followers: 0,
          following: 0,
        };
      
        // Add the new post to your posts data
        // const updatedPosts = [...posts, newPost];
      
        // You can update your posts state or context here
        setNewPost(newPost);
      
        // Reset the description and previewImageUri state
        setDescription('');
        // setPreviewImageUri(pictureSource);
        console.log("worddddddddddddddddsssssssssss")
        console.log(newPost)
      
        // You can navigate to the home screen or perform any other actions
        if (newPost) {
            await navigation.replace('HomeScreen', { item: newPost });
            console.log("worssssssss---------")
          } else {
            console.log("error")
          }
          
        // navigation.navigate('HomeScreen');
      };

      
  return (
  <>
    <View style={styles.container}>
       

            { isFocused ? 
                <Camera 
                    autoFocus={AutoFocus.on}
                    ref={ ref => setCameraRef(ref)}
                    style={styles.camera}  
                    ratio='16:9'
                    type={cameraType}
                    flashMode={cameraFlash}
                    onCameraReady={() => setIsCameraReady(true)}
                />
                : null 
            }

            {/* Side barsss */}

            {/* LEFT */}
            <View style={styles.sideContainerLeft}>
                {isRecording ? (
                <Text style={styles.recordingDurationText}>
                {recordingDuration}
                </Text>
                ) : (
                <Text style={{}}>
                {/* 0:00 */}
                </Text>

                )
            }
            </View>

            {/* RIGHT */}
            <View style={styles.sideContainer}>
            
                <TouchableOpacity 
                    onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back) }>
                    <Feather name='refresh-ccw' size={25} color={"white"} />
                </TouchableOpacity>
                    <View style={{marginTop: 28}}></View>
                <TouchableOpacity 
                    onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off) }>
                    <Feather name='zap' size={25} color={"white"} />
                </TouchableOpacity>
            </View>

            {/* BOTTOM STUFF */}
            <View style={styles.bottomContainer}>
                <View style={{flex:1 }}></View>
                <View style={styles.recordBtnContainer}>
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onPress={() => takePicture()}
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopVideo()}
                        style={styles.recordBtn} />
                </View>
                <View style={{flex: 1 }}>
                    <TouchableOpacity style={styles.galleryButton}
                        onPress={() => pickFromGallery()}
                    >
                        {galleryItems[0] == undefined ?
                            <>
                                <View style={{backgroundColor: "white"}}></View>
                            </>
                            :
                            <>
                                <Image style={styles.galleryImage} source={{ uri: galleryItems[0].uri }} />
                            </>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        

        { videoSource || pictureSource || galleryImageSource || videoFromGallerySource != null ? 
        (
            <>
                <View style={{flex: 1,  height:HEIGHT,backgroundColor: theme.backgroundColor, position: "absolute" }}>
                    {videoFromGallerySource && ( 
                        <SelectedPreview 
                            cancel={() => setVideoFromGallerySource(null)} 
                            handlePost={handlePost}    
                            videoUrl={videoFromGallerySource}
                            isVid={true}
                        />
                    )}
                    {videoSource && (
                        <SelectedPreview 
                            cancel={() => setVideoSource(null)} 
                            handlePost={handlePost}    
                            videoUrl={videoSource}
                            isVid={true}
                        />
                    )}
                    {pictureSource && ( 
                        <SelectedPreview 
                            cancel={() => setPictureSource(null)} 
                            handlePost={handlePost}    
                            imageUrl={pictureSource}
                            isVid={false}
                        />
                    )}
                    {galleryImageSource && (
                        <SelectedPreview 
                            cancel={() => setGalleryImageSource(null)} 
                            handlePost={handlePost}    
                            imageUrl={galleryImageSource}
                            isVid={false}
                        />
                    )}

                </View>
            </>
        ) : (
            null
        )

        }
    </View>
  </>
  )
}

export default CameraScreen