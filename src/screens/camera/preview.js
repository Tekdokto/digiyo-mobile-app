import React, { useContext,   } from 'react'
import styles from './style'
import { HEIGHT, WIDTH } from '../../constants/sizes'
import ThemeContext from '../../theme/ThemeContext'
import { Image, Pressable, StatusBar, Text, TextInput, View } from 'react-native'
import { Video } from 'expo-av'

const SelectedPreview = ({ imageUrl, videoUrl, isVid, cancel, handlePost }) => {

    const theme = useContext(ThemeContext)

    const bg = theme.theme == "dark" ? "black" : "white"
    const bar = theme.theme == "dark" ? "dark-content" : "light-content"
    const txtCol = theme.theme == "dark" ? "white" : "black" 

  return (
    <>
        <StatusBar barStyle={bar} />
        <View style={[styles.previewVideo, {backgroundColor: bg}]} >
            <View style={{ 
                flexDirection: "row", flex: 1,
                justifyContent: "space-between",
                position: "absolute",
                zIndex: 1, top: 40,
                width: WIDTH * 0.9
                }}>

                <Pressable onPress={cancel}
                        style={{left: 30,  borderRadius: 10, paddingHorizontal: 14, paddingVertical:5, backgroundColor: "#ccc",}}
                        >
                            <Text style={{color: "black",    
                        fontSize: HEIGHT * 0.025,  }}> 
                                Cancel
                            </Text>
                </Pressable>
                
                <Pressable onPress={handlePost}
                style={{ borderRadius: 10, paddingHorizontal: 14, paddingVertical:5, backgroundColor: "#ccc",}}
                        >
                            <Text style={{ color: "black", 
                        fontSize: HEIGHT * 0.025, }}> 
                                Post
                            </Text>
                </Pressable>
            </View>
            
            {/* Title */}
            <View
                style={[ {
                        top: HEIGHT *0.15,
                        alignSelf: "center",
                    }]}>
                <Text style={{ fontFamily: "Bold", fontSize: 20, color: theme.color }}>Title</Text>
                <View 
                    >
                    <TextInput
                        style={[
                            styles.input,
                            {
                                color: txtCol
                            }
                            
                        ]}
                        placeholder="Post Title"
                        placeholderTextColor={'gray'} 
                        inputMode='text'
                        // multiline={false}
                        keyboardType='default'
                        maxLength={50}
                    />
                </View>
            </View>

            {/* Des */}
            <View
                style={[ {
                        top: HEIGHT *0.15,
                        alignSelf: "center",
                    }]}>
                <Text style={{ fontFamily: "Bold", fontSize: 20, color: theme.color }}>Description</Text>
                <View 
                    >
                    <TextInput
                        style={[
                            styles.input,
                            {
                                color: txtCol
                            }
                         ]}
                        placeholder="Post Description"
                        placeholderTextColor={'gray'} 
                        inputMode='text'
                        numberOfLines={3}
                        multiline={true}
                        keyboardType='default'
                        maxLength={100}
                    />
                </View>
            </View>
            { isVid ? (
                <>
                    <View style={{ width:WIDTH * 0.9, 
                        alignSelf: "center", 
                        position: "absolute",
                        height:HEIGHT * 0.4,  
                        backgroundColor: theme.backgroundColor,
                        bottom: HEIGHT * 0.2,
                        }}>
                        <Video style={{ flex: 1, borderRadius: 20}}
                            useNativeControls
                            isLooping
                            source={{ uri: videoUrl }}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={{ width:WIDTH * 0.9, 
                        alignSelf: "center", 
                        position: "absolute",
                        height:HEIGHT * 0.35,  
                        backgroundColor: theme.backgroundColor,
                        bottom: 80,
                        }}>
                        <Image source={{ uri: imageUrl }} style={{ flex: 1,
                        borderRadius: 20
                            }} />
                    </View>
                </>
            ) }

        </View>
    </>
  )
}

export default SelectedPreview