import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../constants/sizes";


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
        top: 60,
        marginHorizontal: 20,
        right: 0,
    }
  });

  export default styles;