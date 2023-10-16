import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import { PRIMARY_COLOR } from "../../constants/colors";


const cameraRatio = 9 / 16
const styles = StyleSheet.create({

    // homepost container
    container: {
        flex: 1,
    },  
    camera: {
        flex:1,
        backgroundColor: "black",
        width: WIDTH,
        height: HEIGHT
        // aspectRatio:  WIDTH * 0.8  / HEIGHT,
    },
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        marginBottom: 10
    },
    recordBtnContainer: {
        flex:1,
        marginHorizontal: 30,
    },
    recordBtn: {
        borderWidth: 2,
        padding: 10,
        borderColor: "#fff",
        backgroundColor: "gray",
        borderRadius: 70,
        height: 50,
        width: 50,
        alignSelf: "center",
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 10,
        overflow: "hidden",
        width: 50,
        height: 50,
    },
    galleryImage: {
        borderRadius: 10,
        overflow: "hidden",
        width: 50,
        height: 50,
    },
    sideContainer: {
        position: "absolute",
        top: 40,
        marginHorizontal: 20,
        right: 0,
    },
    sideContainerLeft: {
        position: "absolute",
        top: 40,
        marginHorizontal: 20,
        left: 0,
    },
    previewVideo: {
        width: WIDTH,
        height: HEIGHT,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: "white",
    },
    recordingDurationText: {
        padding: 10,
        color: "white",
        fontSize: 20
    },
    input: {
        width:WIDTH * 0.9, 
        marginVertical: 5, 
        backgroundColor:"#00000010", 
        borderRadius:10, 
        padding: 20
    }
  });

  export default styles;