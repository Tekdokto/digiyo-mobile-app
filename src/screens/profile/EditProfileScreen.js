import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    BackHandler,
    TouchableOpacity,
    ScrollView,
    TextInput,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
//   import { } from "../constants/styles";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { BottomSheet } from "react-native-btr";
  import * as ImagePicker from "expo-image-picker";
  import { Camera } from "expo-camera";
  import { LinearGradient } from "expo-linear-gradient";
  import AwesomeButton from "react-native-really-awesome-button";
  import { useTranslation } from "react-i18next";
import CameraModule from "../../components/cameraModule";
import { Colors, Default, Fonts  } from "../../constants/styles2";
import MyStatusBar from "../../components/MyStatusBar";
import SnackbarToast from "../../components/snackbarToast";
import ThemeContext from "../../theme/ThemeContext";
import { USER } from "../../config/urls";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
//   import MyStatusBar from "../components/myStatusBar";
  
  const { height } = Dimensions.get("window");
  
  const EditProfileScreen = ({ navigation }) => {

    const theme = useContext(ThemeContext)

    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`editProfileScreen:${key}`);
    }
    const backAction = () => {
      navigation.pop();
      return true;
    };
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
  
    const [name, setName] = useState("Bessie Cooper");
    const [email, setEmail] = useState("Bessiecooper@mail.com");
    const [number, setNumber] = useState("1234567890");
    const [bio, setBio] = useState(
      "Lorem ipsum dolor sit amen, consectetur advising elite. Velit sed malesuada urna ut elitpellentesque.  "
    );
  
    const [uploadImage, setUploadImage] = useState(false);
    const toggleCloseUploadImage = () => {
      setUploadImage(!uploadImage);
    };
  
    const [pickedImage, setPickedImage] = useState();
    const [removeImage, setRemoveImage] = useState(false);
  
    const [removeImageToast, setRemoveImageToast] = useState(false);
    const onDismissRemoveImage = () => setRemoveImageToast(false);
  
    const galleryHandler = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
        toggleCloseUploadImage();
      }
    };
  
    const [cameraNotGranted, setCameraNotGranted] = useState(false);
    const onDismissCameraNotGranted = () => setCameraNotGranted(false);
  
    const [camera, setShowCamera] = useState(false);
  
    const cameraHandler = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setShowCamera(true);
      } else {
        setCameraNotGranted(true);
      }
    };

    const navigate = useNavigation();

    // console.log(item);
  
    function extractAuthorization(cookieString) {
      const cookies = cookieString.split(";");
      let authorization = "";
  
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("Authorization=")) {
          authorization = cookie.substring("Authorization=".length);
          break;
        }
      }
  
      return authorization;
    }
  
    const userToken = useSelector((state) => state.auth.userData.token);
  
    const auth = extractAuthorization(userToken);
    const userId = useSelector(
      (state) => state.auth.userData.authenticated_user.user_id
    );
  
    // console.log(auth)
  
    const fetchUser = async () => {

      const formData = new FormData()
      
          formData.append("username", username,)
          formData.append("email", email,)
          formData.append("media", {
            uri: filePath,
            type: fileType,
            name: fileName,
          },)
      const config = {
        method: "put",
        url: USER,
        data: {
          formData
          
        },
        headers: {
          Authorization: auth,
          "Content-Type": "multipart/form-data",
        }, 
      };
      try {
        // setLoading(true)
        // let res = getUserPosts(auth,  userId)
        await axios(config)
          .then((response) => {
            setUser(response.data);
            // console.log(response.data);
          })
          .catch((error) => {
            console.log("error 1111111111111", error);
          });
  
        // console.log("---------",res)
        // setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);
  
  
  

    return (
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <MyStatusBar />
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons
              name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.SemiBold18white, color: theme.color,
              marginHorizontal: Default.fixPadding * 1.2,
            }}
          >
            {tr("editProfile")}
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: Default.fixPadding * 1.3,
            }}
          >
            {!pickedImage ? (
              <View>
                {removeImage ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: Colors.lightGrey,
                      ...styles.image,
                    }}
                  >
                    <Ionicons name="person" size={45} color={theme.color} />
                  </View>
                ) : (
                  <Image
                    source={require("../../../assets/images/2.jpg")}
                    style={{
                      resizeMode: "stretch",
                      ...styles.image,
                    }}
                  />
                )}
              </View>
            ) : (
              <Image
                source={{ uri: pickedImage }}
                style={{
                  alignSelf: "center",
                  ...styles.image,
                }}
              />
            )}
          </View>
  
          <TouchableOpacity
            onPress={() => toggleCloseUploadImage()}
            style={styles.cameraWhiteCircle}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: Colors.primary,
              }}
            >
              <Ionicons name="camera-sharp" size={18} color={Colors.white} />
            </View>
          </TouchableOpacity>
  
          <View
            style={{
              marginTop: Default.fixPadding * 1.2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.Medium14grey }}>{tr("name")}</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={tr("enterName")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>{tr("email")}</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={tr("enterEmail")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>{tr("mobile")}</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={number}
                maxLength={10}
                keyboardType="number-pad"
                onChangeText={setNumber}
                placeholder={tr("enterMobile")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
  
            <Text style={{ ...Fonts.Medium14grey }}>{tr("bio")}</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={bio}
                multiline={true}
                numberOfLines={7}
                textAlignVertical="top"
                onChangeText={setBio}
                placeholder={tr("enterBio")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                  height: height / 5,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            margin: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
            progress
            height={50}
            progressLoadingTime={1000}
            onPress={(next) => {
              setTimeout(() => {
                next();
                navigation.pop();
              }, 1000);
            }}
            raiseLevel={1}
            stretch={true}
            borderRadius={10}
            borderWidth={null}
            backgroundDarker={Colors.transparent}
            extra={
              <LinearGradient
                start={[0, 1]}
                end={[1, 1]}
                colors={[Colors.primary, Colors.extraDarkPrimary]}
                style={{ ...StyleSheet.absoluteFillObject }}
              />
            }
          >
            <Text style={{ ...Fonts.Bold18white }}>{tr("update")}</Text>
          </AwesomeButton>
        </View>
  
        <BottomSheet
          visible={uploadImage}
          onBackButtonPress={toggleCloseUploadImage}
          onBackdropPress={toggleCloseUploadImage}
        >
          <View style={styles.bottomSheetMain}>
            <Text
              style={{
                ...Fonts.SemiBold18white,
                textAlign: "center",
                marginTop: Default.fixPadding * 1.6,
                marginBottom: Default.fixPadding * 2,
              }}
            >
              {tr("changeProfile")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginHorizontal: Default.fixPadding * 3,
              }}
            >
              <TouchableOpacity
                onPress={cameraHandler}
                style={{
                  alignItems: "center",
                }}
              >
                <View style={[Default.shadow, styles.circle]}>
                  <Ionicons name="camera" size={25} color={Colors.blue} />
                </View>
                <Text
                  style={{
                    ...Fonts.Medium16white,
                    marginVertical: Default.fixPadding,
                  }}
                >
                  {tr("camera")}
                </Text>
              </TouchableOpacity>
              {camera && (
                <CameraModule
                  showModal={camera}
                  setShowCamera={() => setShowCamera(false)}
                  setPickedImage={(result) => setPickedImage(result.uri)}
                  toggleCloseUploadImage={() => toggleCloseUploadImage()}
                />
              )}
  
              <TouchableOpacity
                onPress={galleryHandler}
                style={{
                  alignItems: "center",
                }}
              >
                <View style={[Default.shadow, styles.circle]}>
                  <Ionicons name="image" size={25} color={Colors.green} />
                </View>
                <Text
                  style={{
                    ...Fonts.Medium16white,
                    marginVertical: Default.fixPadding,
                  }}
                >
                  {tr("gallery")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleCloseUploadImage();
                  setRemoveImageToast(!removeImageToast);
                  setRemoveImage(true);
                  setPickedImage(null);
                }}
                style={{
                  alignItems: "center",
                }}
              >
                <View style={[Default.shadow, styles.circle]}>
                  <Ionicons name="trash" size={25} color={Colors.lightRed} />
                </View>
                <Text
                  style={{
                    ...Fonts.Medium16white,
                    marginVertical: Default.fixPadding,
                  }}
                >
                  {tr("remove")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <SnackbarToast
            visible={cameraNotGranted}
            onDismiss={onDismissCameraNotGranted}
            title={tr("deny")}
          />
        </BottomSheet>
  
        <SnackbarToast
          visible={removeImageToast}
          onDismiss={onDismissRemoveImage}
          title={tr("removeImage")}
        />
      </View>
    );
  };
  
  export default EditProfileScreen;
  
  const styles = StyleSheet.create({
    image: {
      width: 140,
      height: 140,
      borderRadius: 80,
    },
    bottomSheetMain: {
      paddingVertical: Default.fixPadding * 2,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      backgroundColor: Colors.black,
      ...Default.shadow,
    },
    circle: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: Colors.white,
    },
    cameraWhiteCircle: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      bottom: "3%",
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: Colors.white,
    },
    textInputCard: {
      marginTop: Default.fixPadding * 0.8,
      paddingVertical: Default.fixPadding * 1.2,
      paddingHorizontal: Default.fixPadding,
      marginBottom: Default.fixPadding * 2,
      borderRadius: 8,
      backgroundColor: Colors.extraDarkGrey,
      ...Default.shadow,
    },
  });
  