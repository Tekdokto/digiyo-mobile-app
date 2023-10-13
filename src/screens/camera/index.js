import { useIsFocused } from '@react-navigation/native'
import { Audio } from 'expo-av'
import { Camera, CameraType } from 'expo-camera'
import * as  ImagePicker  from 'expo-image-picker'
import * as  MediaLibrary  from 'expo-media-library'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styles from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

const CameraScreen = () => {

    const [ hasCameraPermissions, setHasCameraPermissions ] = useState(false)
    const [ hasAudioPermissions, setHasAudioPermissions ] = useState(false)
    const [ hasGalleryPermissions, setHasGalleryPermissions ] = useState(false)

    const [ galleryItems, setGalleryItems ] = useState([])

    const isFocused = useIsFocused()

    const [ cameraRef, setCameraRef ] = useState(null)
    const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back)
    const [ cameraFlash, setCameraFlash ] = useState(Camera.Constants.FlashMode.off)
    const [ isCameraReady, setIsCameraReady ] = useState(false)

    const recordVideo = async () => {
        if (isCameraReady) {
            try {
                const options = {maxDuration: 60, quality: Camera.Constants.VideoQuality["480"]}
                const videoRecordPromise = cameraRef.recordAsync(options)
                if (videoRecordPromise) {
                    const data = await videoRecordPromise
                    const source = data.uri
                    console.log(galleryItems)
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [16, 9],
            quality: 1,
        })

        if (!result.canceled) {
            
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
  return (
  <>
    <View style={styles.container}>
        { isFocused ? 
            <Camera 
                ref={ ref => setCameraRef(ref)}
                style={styles.camera}  
                ratio='16:9'
                type={cameraType}
                flashMode={cameraFlash}
                onCameraReady={() => setIsCameraReady(true)}
            />
            : null 
        }

        <View style={styles.sideContainer}>
            <TouchableOpacity onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back) }>
                <Feather name='refresh-ccw' size={20} color={"white"} />
            </TouchableOpacity>
                <View style={{margin: 8}}></View>
            <TouchableOpacity onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off) }>
                <Feather name='zap' size={20} color={"white"} />
            </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
            <View style={{flex:1 }}></View>
            <View style={styles.recordBtnContainer}>
                <TouchableOpacity
                    disabled={!isCameraReady}
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
    </View>
  </>
  )
}

export default CameraScreen