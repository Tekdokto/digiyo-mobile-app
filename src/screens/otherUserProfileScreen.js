import {
  Text,
  View,
  Dimensions,
  Image,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Modal,
  Share,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles, { Colors, Default, Fonts } from "../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import AwesomeButton from "react-native-really-awesome-button";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../components/MyStatusBar";
import ThemeContext from "../theme/ThemeContext";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../constants/colors";
import { WIDTH } from "../constants/sizes";

const { width } = Dimensions.get("window");

const OtherUserProfileScreen = ({ navigation }) => {

  const theme = useContext(ThemeContext)

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`otherUserProfileScreen:${key}`);
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

  const [settingModal, setSettingModal] = useState(false);
  const shareProfile = () => {
    Share.share({
      message: "V Rock",
    });
    setSettingModal(false);
  };

  const videoList = [
    {
      key: "1",
      image: require("../../assets/images/2.jpg"),
      other: "130",
    },
    {
      key: "2",
      image: require("../../assets/images/2.jpg"),
      other: "120",
    },
    {
      key: "3",
      image: require("../../assets/images/1.jpeg"),
      other: "100",
    },
    {
      key: "4",
      image: require("../../assets/images/2.jpg"),
      other: "220",
    },
    {
      key: "5",
      image: require("../../assets/images/rect1.png"),
      other: "130",
    },
    {
      key: "6",
      image: require("../../assets/images/rect.png"),
      other: "520",
    },
    {
      key: "7",
      image: require("../../assets/images/rect2.png"),
      other: "110",
    },
    {
      key: "8",
      image: require("../../assets/images/rect1.png"),
      other: "500",
    },
    {
      key: "9",
      image: require("../../assets/images/rect2.png"),
      other: "800",
    },
    {
      key: "10",
      image: require("../../assets/images/rect1.png"),
      other: "140",
    },
    {
      key: "11",
      image: require("../../assets/images/rect.png"),
      other: "180",
    },
    {
      key: "12",
      image: require("../../assets/images/rect1.png"),
      other: "610",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("userVideoScreen", {
            key: "1",
            title: `${tr("unFollow")} Jane Cooper `,
            follow: true,
          })
        }
        style={{
          flex: 1,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding,
        }}
      >
        <Image
          source={item.image}
          style={{
            resizeMode: "cover",
            width: width / 3.7,
            height: 123,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: isRtl ? null : 0,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              paddingHorizontal: Default.fixPadding * 0.4,
            }}
          >
            <Ionicons name="play" size={18} color={Colors.white} />
            <Text
              style={{
                ...Fonts.SemiBold12white,
                marginHorizontal: Default.fixPadding * 0.2,
              }}
            >
              {item.other}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons
            name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
            size={25}
            color={theme.color}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSettingModal(true)}>
          <Ionicons name={"ellipsis-vertical"} size={25} color={theme.color} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: theme.backgroundColor }}> 
        <View
          style={{
          }}
        >
          <Image
            source={require("../../assets/images/2.jpg")}
            style={{
              // flex: 3,
              resizeMode: "cover",
              alignSelf: "center",
              width: 100,
              height: 100,
              borderRadius: 80,
            }}
          />

          <View
            style={{ 
              alignItems: "center", 
            }}
          >
            <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>Bessie Cooper</Text>
            <Text
              style={{
                ...Fonts.Medium12grey, color: theme.color,
                marginTop: Default.fixPadding * 0.3,
              }}
            >
              # Dance lover # food lovers
            </Text>

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginTop: Default.fixPadding * 2.5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.push("userFollowingScreen")}
                style={{
                  flex: 3.5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isRtl ? 0 : Default.fixPadding,
                  // marginLeft: isRtl ? Default.fixPadding : 0,
                }}
              >
                <Text style={{ ...Fonts.SemiBold14white, color: theme.color }}>456</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14white,
                    color: theme.color,
                    overflow: "hidden",
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("following")}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 4,
                  borderLeftWidth: 2,
                  borderLeftColor: Colors.grey,
                  borderRightWidth: 2,
                  borderRightColor: Colors.grey,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.push("followersScreen")}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ ...Fonts.SemiBold14white, color:theme.color }}>36</Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14white,
                      color:theme.color ,
                      overflow: "hidden",
                      marginTop: Default.fixPadding * 0.5,
                    }}
                  >
                    {tr("followers")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 2.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...Fonts.SemiBold14white, color:theme.color  }}>156</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14white,
                    color:theme.color ,
                    overflow: "hidden",
                    marginTop: Default.fixPadding * 0.5,
                  }}
                >
                  {tr("post")}
                </Text>
              </View>
            </View>

            {/*  */}
            <View 
            style={[{ flexDirection: "row",
              marginHorizontal: WIDTH * 0.1,
              marginHorizontal: Default.fixPadding * 2,
              marginBottom: Default.fixPadding * 2,
              marginTop: 20,}]}>
              <AwesomeButton 
                height={50}
                width={WIDTH * 0.3}
                onPressOut={() => navigation.push("messageUserScreen")}
                raiseLevel={1}
                borderRadius={10}
                backgroundDarker={Colors.transparent}
                backgroundColor={ACCENT_COLOR}
                >
                <View style={ styles.buttonGreen}>
                  <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>
                    Message
                  </Text>
                </View>
              </AwesomeButton>
              <View style={{margin:8}}></View>
              <AwesomeButton
                height={50}
                width={WIDTH * 0.3}
                // stretch={true}
                // disabled={true}
                raiseLevel={1}
                borderRadius={10}
                // borderWidth={null}
                backgroundDarker={Colors.transparent}
                extra={
                      <LinearGradient
                        start={[0, 1]}
                        end={[1, 1]}
                        colors={[Colors.primary, Colors.extraDarkPrimary]}
                        style={{ ...StyleSheet.absoluteFillObject, }}
                      />
                    }
                  >
                <Text style={{ ...Fonts.Bold18white }}>{tr("follow")}</Text>
              </AwesomeButton>
            </View>
          </View>
        </View>
        
        <View
          style={{
            flexDirection: "row",
          }}
        > 
        </View>
      </View>

      <View
        style={{
          marginTop: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 1.2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        
      </View>

      <FlatList
        numColumns={3}
        data={videoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Default.fixPadding * 1.3,
          paddingHorizontal: Default.fixPadding,
        }}
      />

      <Modal
        transparent={true}
        animationType="fade"
        visible={settingModal}
        onRequestClose={() => setSettingModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setSettingModal(false)}
          style={{ flex: 1, backgroundColor: Colors.transparentWhite }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                paddingVertical: Default.fixPadding * 1.2,
                paddingHorizontal: Default.fixPadding,
                width: width / 2,
                left: isRtl ? null : "20%",
                right: isRtl ? "20%" : null,
                borderRadius: 10,
                backgroundColor: Colors.black,
                ...Default.shadow,
              }}
            >
              <TouchableOpacity
                onPress={shareProfile}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ellipse" size={10} color={Colors.white} />
                <Text
                  style={{
                    ...Fonts.SemiBold16white,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("shareProfile")}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginVertical: Default.fixPadding,
                }}
              >
                <Ionicons name="ellipse" size={10} color={Colors.white} />
                <Text
                  style={{
                    ...Fonts.SemiBold16white,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("report")}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ellipse" size={10} color={Colors.white} />
                <Text
                  style={{
                    ...Fonts.SemiBold16white,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  {tr("block")}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default OtherUserProfileScreen;
