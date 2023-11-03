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
import { Colors, Default, Fonts } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
// import ToggleSwitch from "toggle-switch-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AwesomeButton from "react-native-really-awesome-button";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/MyStatusBar";
import { WIDTH, HEIGHT } from "../../constants/sizes";
import ThemeContext from "../../theme/ThemeContext";
import { Video } from "expo-av";
import { createPosts } from "../../redux/actions/auth";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";

import mime from "react-native-mime-types";

import { CREATE_POSTS } from "../../config/urls";
import { showError } from "../../utils/helperFunctions";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

const PostScreen = ({ navigation, cancel, postUri, imgUrl, isVid }) => {
  
  const { userInfo, userTokens } = useContext(AuthContext);

  const theme = useContext(ThemeContext);

  const navigate = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`postScreen:${key}`);
  }

  const backAction = () => {
    // navigation.pop();
    cancel
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", cancel);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", cancel);
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const [saveGallery, setSaveGallery] = useState(true);
  // const switchSaveGallery = () => setSaveGallery((saveGallery) => !saveGallery);

  // const [sharePost, setSharePost] = useState(true);
  // const switchSharePost = () => setSharePost((sharePost) => !sharePost);

  const userToken = userTokens

  const auth = userToken;

  const filePath = postUri ?? imgUrl;

  // Extract the file name from the path
  const fileName = filePath.split("/").pop();

  // Use 'react-native-mime-types' to get the MIME type based on the file extension
  const fileType = mime.lookup(fileName);

  // Create a file object with the extracted values

  // video
  const onPostVideo = async () => {

    if (title == '' || description == '') {
      showError("Fields cannot be empty")
    } else {
      const formdata = new FormData();
      formdata.append("caption", title);
      formdata.append("content", description);
      formdata.append("media", {
        uri: filePath, // Replace with the URI of your file
        type: fileType, // Adjust the type according to your file type
        name: fileName, // Provide a file name
      });

      const config = {
        method: "post",
        url: CREATE_POSTS,
        data: formdata,
        headers: {
          Authorization: auth,
          "Content-Type": "multipart/form-data", // This will set the correct 'Content-Type' header
        },
      };

      // console.log("--------------- types ........", formdata)

      try {
        setIsLoading(true);
        await axios(config)
          .then((response) => {
            // console.log("filteredStatus", response.data);
            // setLoading(false)
            showMessage(response.data.status);
            if (response.data.status == "success") {
              navigate.replace("HomeScreen");
            }
          })
          .catch((error) => {
            console.log("error 1111111111111", auth);
            console.log("error 1111111111111", error);
          });
        setIsLoading(false);
      } catch (error) {
        console.log("second error =====  ", error);
        setIsLoading(false);
      }
    }
    
  };

  // image
  const onPostImage = async () => {

    if (title == '' || description == '') {
      showError("Fields cannot be empty")
    } else {

      const formdata = new FormData();
      formdata.append("caption", title);
      formdata.append("content", description);
      formdata.append("media", {
        uri: filePath, // Replace with the URI of your file
        type: fileType, // Adjust the type according to your file type
        name: fileName, // Provide a file name
      });
  
      const config = {
        method: "post",
        url: CREATE_POSTS,
        data: formdata,
        headers: {
          Authorization: auth,
          "Content-Type": "multipart/form-data", // This will set the correct 'Content-Type' header
        },
      };
  
      // console.log("--------------- types ........", formdata)
      try {
        setIsLoading(true);
        await axios(config)
          .then((response) => {
            // console.log("filteredStatus", response.data);
            showMessage(response.data.status);
            if (response.data.status == "success") {
              navigate.replace("HomeScreen");
            }
          })
          .catch((error) => {
            console.log("error 1111111111111", auth);
            console.log("error 1111111111111", error);
          });
        setIsLoading(false);
        showError(error);
      } catch (error) {
        console.log("second error =====  ", error);
        setIsLoading(false);
      }
    }
    
  };

  return (
    <>
    <MyStatusBar />
      <View
        style={{
          // flex: 1,
          top: 0,
          bottom: 0,
          height: HEIGHT,
          width: WIDTH,
          backgroundColor: theme.theme == "dark" ? Colors.black : Colors.white,
        }}
      >
        {/* <MyStatusBar /> */}
        <View
          style={{
            alignSelf: isRtl ? "flex-end" : "flex-start",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={cancel}
          >
            {/* <TouchableOpacity onPress={() => navigation.pop()}> */}
            <Ionicons
              name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
              size={25}
              color={theme.color}
            />
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 1,

            width: WIDTH,
            backgroundColor: Colors.lightGrey,
            color: Colors.lightGrey,
          }}
        ></View>

        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding * 1.2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <View style={{ flex: 3.3 }}>
              {isVid ? (
                <>
                  <View
                    style={{
                      width: WIDTH * 0.3,
                      alignSelf: "center",
                      position: "absolute",
                      height: HEIGHT * 0.35,
                      backgroundColor: theme.backgroundColor,
                      // bottom: HEIGHT * 0.2,
                    }}
                  >
                    <Video
                      style={{ flex: 1, borderRadius: 20 }}
                      useNativeControls
                      isLooping
                      source={{ uri: postUri }}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      width: WIDTH * 0.3,
                      alignSelf: "center",
                      position: "absolute",
                      height: HEIGHT * 0.35,
                      backgroundColor: theme.backgroundColor,
                      // top: 20,
                    }}
                  >
                    <Image
                      source={{ uri: imgUrl }}
                      style={{ flex: 1, borderRadius: 20 }}
                    />
                  </View>
                </>
              )}
            </View>
            <View
              style={{
                flex: 6.7,
                paddingLeft: isRtl ? 0 : Default.fixPadding * 2,
                paddingRight: isRtl ? Default.fixPadding * 2 : 0,
              }}
            >
              <View
                style={{
                  paddingVertical: Default.fixPadding * 1.2,
                  paddingHorizontal: Default.fixPadding,
                  height: 40,
                  borderRadius: 8,
                  marginBottom: 20,
                  backgroundColor: Colors.lightGrey,
                  // ...Default.shadow,
                }}
              >
                <TextInput
                  multiline={true}
                  numberOfLines={7}
                  value={title}
                  textAlignVertical="top"
                  onChangeText={setTitle}
                  placeholder={"Title"}
                  placeholderTextColor={Colors.grey}
                  selectionColor={Colors.primary}
                  style={{
                    ...Fonts.Medium14white,
                    textAlign: isRtl ? "right" : "left",
                  }}
                />
              </View>
              <View
                style={{
                  paddingVertical: Default.fixPadding * 1.2,
                  paddingHorizontal: Default.fixPadding,
                  height: 140,
                  borderRadius: 8,
                  backgroundColor: Colors.lightGrey,
                  // ...Default.shadow,
                }}
              >
                <TextInput
                  multiline={true}
                  numberOfLines={7}
                  value={description}
                  textAlignVertical="top"
                  onChangeText={setDescription}
                  placeholder={tr("describeVideo")}
                  placeholderTextColor={Colors.grey}
                  selectionColor={Colors.primary}
                  style={{
                    ...Fonts.Medium14white,
                    textAlign: isRtl ? "right" : "left",
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: Default.fixPadding * 2.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {/* <Text style={{ ...Fonts.Medium16grey }}>{tr("saveGallery")}</Text> */}
            {/* <ToggleSwitch
              size="medium"
              isOn={saveGallery}
              onColor={Colors.primary}
              offColor={Colors.lightGrey}
              onToggle={switchSaveGallery}
            /> */}
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {/* <Text style={{ ...Fonts.Medium16grey }}>{tr("sharePost")}</Text> */}
            {/* <ToggleSwitch
              size="medium"
              isOn={sharePost}
              onColor={Colors.primary}
              offColor={Colors.lightGrey}
              onToggle={switchSharePost}
            /> */}
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding * 0.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          ></View>

          <View
            style={{
              bottom: 0,
              // top:120,
              height: HEIGHT,
              position: "relative",
              marginTop: Default.fixPadding * 6,
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {/* Post vid */}
            {postUri ? (
              <AwesomeButton
                height={50}
                onPressOut={onPostVideo}
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
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{ ...Fonts.Bold18white }}>post</Text>
                )}
              </AwesomeButton>
            ) : (
              <AwesomeButton
                height={50}
                onPressOut={onPostImage}
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
                {isLoading ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text style={{ ...Fonts.Bold18white }}>post</Text>
                  // <Text style={{ ...Fonts.Bold18white }}>{tr("post image")}</Text>
                )}
              </AwesomeButton>
            )}
          </View>
        {/* </ScrollView> */}
      </View>
    </>
  );
};

export default PostScreen;
