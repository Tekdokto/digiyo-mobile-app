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
import { Colors, Default, Fonts  } from "../../constants/styles2";
import MyStatusBar from "../../components/MyStatusBar";
import SnackbarToast from "../../components/snackbarToast";
import ThemeContext from "../../theme/ThemeContext";
import { BIO, USER } from "../../config/urls";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

import mime from 'react-native-mime-types'
import { ActivityIndicator } from "react-native-paper";
import { Pressable } from "react-native";
import { myProifile } from "../../redux/actions/auth";
import { showError } from "../../utils/helperFunctions";
import { AuthContext } from "../../context/AuthContext";
import { ToastAndroid } from "react-native";
//   import MyStatusBar from "../components/myStatusBar";
  
  const { height } = Dimensions.get("window");
  
  const EditProfileBioScreen = ({ navigation, route }) => {

    // const { profile } = route.params.profile
    
    // console.log("profile -------------",profile)

    const theme = useContext(ThemeContext)

    const { userInfo, userTokens } = useContext(AuthContext);

    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";

    const isFocused = useIsFocused();
  
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
  
    const [isLoading, setLoading] = useState(false);

    const [profile, setProfile] = useState([]);

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState(''); 
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [size, setSize] = useState('');
    const [guardian, setGuardian] = useState('');
    const [dob, setDob] = useState('');
    // const [number, setNumber] = useState("1234567890");
    // const [bio, setBio] = useState(
    //   "Lorem ipsum dolor sit amen, consectetur advising elite. Velit sed malesuada urna ut elitpellentesque.  "
    // );
  
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
  
    // const [camera, setShowCamera] = useState(false);
  
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
  
    // function extractAuthorization(cookieString) {
    //   const cookies = cookieString.split(";");
    //   let authorization = "";
  
    //   for (let i = 0; i < cookies.length; i++) {
    //     const cookie = cookies[i].trim();
    //     if (cookie.startsWith("Authorization=")) {
    //       authorization = cookie.substring("Authorization=".length);
    //       break;
    //     }
    //   }
  
    //   return authorization;
    // }
  
    const userToken = userTokens
  
    const auth = userToken;
    const userId = userInfo.authenticated_user.user_id;

    const showToast = (msg) => {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    };
    // console.log(auth)
    
    const onUpdate = async () => { 
      console.log("first")
      setLoading(true)
        const config = {
          method: "put",
          url: BIO,
          data: {
            "fname": fName,
            "lname": lName,
            "bio": bio,
            "country": country,
            "state": state,
            "city": city,
            "height": height,
            "weight": weight,
            "size": size,
            "guardian": guardian,
            "dob": dob,
          },
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          }, 
        };
        try {
          // let res = getUserPosts(auth,  userId)
          await axios(config)
            .then((response) => {
              // setUser(response.data);
              console.log(response.data);
              showToast("Successful")
            })
            .catch((error) => {
              console.log("error 1111111111111", error);
            });
            // console.log("---------",res)
          } catch (error) {
          showToast("Faled")
          console.log(error);
        }
    
      setLoading(false)
    };

    const user = userTokens
    
  const onFetchProfile = async () => {
    let token = user;
    console.log("token ---------- ", token);
    setLoading(true);
    try {
      let res = await myProifile(token);
      // console.log("response -------", res.profile);
      console.log("profile result -------", res.authenticated_user.profile);
      setProfile(res.authenticated_user.profile);
      setFName(res.authenticated_user.profile.fname);
      setLName(res.authenticated_user.profile.lname); 
      setBio(res.authenticated_user.profile.bio);
      setCountry(res.authenticated_user.profile.country);
      setState(res.authenticated_user.profile.state);
      setCity(res.authenticated_user.profile.city);
      setHeight(res.authenticated_user.profile.height);
      setWeight(res.authenticated_user.profile.weight);
      setSize(res.authenticated_user.profile.size);
      setGuardian(res.authenticated_user.profile.guardian);
      setDob(res.authenticated_user.profile.dob);
      // setLoading(false);
    } catch (error) {
      // showError(error.message);
      console.log("profile error -------", error);
    }
    setLoading(false);
  };
 
  
  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
      onFetchProfile();
    }
  }, [isFocused]);


    useEffect(() => {
      // fetchUser();
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
              name={"chevron-back-outline"}
              size={25}
              color={theme.color}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.SemiBold18white, color: theme.color,
              marginHorizontal: Default.fixPadding * 1.2,
            }}
          >
            Edit Bio
          </Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false}>
           
          <View
            style={{
              marginTop: 15,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <Text style={{ ...Fonts.Medium14grey }}>First name</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={fName}
                onChangeText={setFName}
                placeholder={"First name"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Last name</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={lName}
                onChangeText={setLName}
                placeholder={"Last name"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            
            <Text style={{ ...Fonts.Medium14grey }}>Bio</Text>
            <View style={{ 
              marginTop: Default.fixPadding * 0.8,
              paddingVertical: Default.fixPadding * 1.2,
              paddingHorizontal: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
              borderRadius: 8,
              backgroundColor: Colors.extraDarkGrey,
              // ...Default.shadow,
             }}>
              <TextInput
              multiline={true}
              numberOfLines={8}
                value={bio}
                onChangeText={setBio}
                placeholder={"country"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  alignContent: "flex-start",
                  color: "white",
                  textAlign: "left",
                  fontFamily: "SemiBold"
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Country</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={country}
                onChangeText={setCountry}
                placeholder={"country"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>State</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={state}
                onChangeText={setState}
                placeholder={"state"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>City</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder={"city"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Height</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={height}
                onChangeText={setHeight}
                placeholder={"height"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Weight</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                placeholder={"weight"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Size</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={size}
                onChangeText={setSize}
                placeholder={"size"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Guardian</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={guardian}
                onChangeText={setGuardian}
                placeholder={"guardian"}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            <Text style={{ ...Fonts.Medium14grey }}>Date of Birth</Text>
            <View style={{ ...styles.textInputCard }}>
              <TextInput
                value={dob}
                onChangeText={setDob}
                placeholder={'date of birth'}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                style={{
                  ...Fonts.Medium16white,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>
            {/* <Text style={{ ...Fonts.Medium14grey }}>{tr("mobile")}</Text>
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
            </View> */}
   
          </View>
        </ScrollView>
        <View
          style={{
            margin: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
            // progress
            // height={50}
            // progressLoadingTime={1000}
            onPress={() => onUpdate()
          }
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
             {/* {isLoading ? (
            <>
              <ActivityIndicator color="white" />
            </>
          ) : (
            <> */}
              {/* <Pressable>  */}
              {isLoading ? (
                <>
                  <ActivityIndicator color="white" />
                </>
              ) : (

                <Text style={{ ...Fonts.Bold18white }}>{tr("update")}</Text>
              )}
              {/* </Pressable> */}
            {/* </>
          )} */}
          </AwesomeButton>
          
        </View>
  
        {/* <BottomSheet
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
        </BottomSheet> */}
  
        {/* <SnackbarToast
          visible={removeImageToast}
          onDismiss={onDismissRemoveImage}
          title={tr("removeImage")}
        /> */}
      </View>
    );
  };
  
  export default EditProfileBioScreen;
  
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
      // ...Default.shadow,
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
      // ...Default.shadow,
    },
  });
  