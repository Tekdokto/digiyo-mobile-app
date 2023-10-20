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

const { width } = Dimensions.get("window");

const PostScreen = ({ navigation, cancel, postUri, imgUrl, isVid }) => {

  const theme = useContext(ThemeContext)

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`postScreen:${key}`);
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

  const [description, setDescription] = useState();

  const [saveGallery, setSaveGallery] = useState(true);
  const switchSaveGallery = () => setSaveGallery((saveGallery) => !saveGallery);

  const [sharePost, setSharePost] = useState(true);
  const switchSharePost = () => setSharePost((sharePost) => !sharePost);

  return (
    <View style={{ flex: 1,  width: WIDTH, backgroundColor: theme.theme == "dark" ? Colors.black : Colors.white }}>
      <MyStatusBar />
      <View
        style={{
          alignSelf: isRtl ? "flex-end" : "flex-start",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={cancel}>
        {/* <TouchableOpacity onPress={() => navigation.pop()}> */}
          <Ionicons
            name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
            size={25}
            color={theme.color}
          />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 1, width: WIDTH,  backgroundColor: Colors.lightGrey, color: Colors.lightGrey  }}></View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
                    <View style={{ width:WIDTH * 0.3,
                        alignSelf: "center",
                        position: "absolute",
                        height:HEIGHT * 0.35,
                        backgroundColor: theme.backgroundColor,
                        // bottom: HEIGHT * 0.2,
                        }}>
                        <Video style={{ flex: 1, borderRadius: 20}}
                            useNativeControls
                            isLooping
                            source={{ uri: postUri }}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={{ width:WIDTH * 0.3, 
                        alignSelf: "center", 
                        position: "absolute",
                        height:HEIGHT * 0.35,  
                        backgroundColor: theme.backgroundColor,
                        // top: 20,
                        }}>
                        <Image source={{ uri: imgUrl }} style={{ flex: 1,
                        borderRadius: 20
                            }} />
                    </View>
                </>
            ) }
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
                marginBottom:20,
                backgroundColor: Colors.lightGrey,
                ...Default.shadow,
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={7}
                value={description}
                textAlignVertical="top"
                onChangeText={setDescription}
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
                ...Default.shadow,
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
        >
          {/* <Image
            source={require("../assets/images/share1.png")}
            style={{
              resizeMode: "cover",
              width: 28,
              height: 28,
              borderRadius: 14,
            }}
          /> */}
          {/* <Image
            source={require("../assets/images/share2.png")}
            style={{
              resizeMode: "cover",
              width: 28,
              height: 28,
              borderRadius: 14,
              marginHorizontal: Default.fixPadding * 1.2,
            }}
          /> */}
        </View>

        <View
          style={{
            marginTop: Default.fixPadding * 6,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <AwesomeButton
            height={50}
            onPressOut={() => navigation.navigate("homeScreen")}
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
            <Text style={{ ...Fonts.Bold18white }}>{tr("post")}</Text>
          </AwesomeButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostScreen;
