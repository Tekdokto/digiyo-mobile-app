import {
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React, { useContext } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons"; 
  import { useTranslation } from "react-i18next";
import { Default, Colors, Fonts } from "../constants/styles2";
import ThemeContext from "../theme/ThemeContext";
  
  const { width } = Dimensions.get("window");
  
  const VideoTab = ({ navigation }) => {

    const theme = useContext(ThemeContext)
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`videoTab:${key}`);
    }
  
    const videoList = [
      {
        key: "1",
        image: require("../../assets/images/background.png"),
        other: "130",
      },
      {
        key: "2",
        image: require("../../assets/images/background.png"),
        other: "120",
      },
      {
        key: "3",
        image: require("../../assets/images/background.png"),
        other: "100",
      },
      {
        key: "4",
        image: require("../../assets/images/background.png"),
        other: "220",
      },
      {
        key: "5",
        image: require("../../assets/images/background.png"),
        other: "130",
      },
      {
        key: "6",
        image: require("../../assets/images/background.png"),
        other: "520",
      },
      {
        key: "7",
        image: require("../../assets/images/background.png"),
        other: "110",
      },
      {
        key: "8",
        image: require("../../assets/images/background.png"),
        other: "500",
      },
      {
        key: "9",
        image: require("../../assets/images/background.png"),
        other: "800",
      },
      {
        key: "10",
        image: require("../../assets/images/background.png"),
        other: "140",
      },
      {
        key: "11",
        image: require("../../assets/images/background.png"),
        other: "180",
      },
      {
        key: "12",
        image: require("../../assets/images/background.png"),
        other: "610",
      },
    //   {
    //     key: "13",
    //     image: require("../assets/images/pic10.png"),
    //     other: "340",
    //   },
    //   {
    //     key: "14",
    //     image: require("../assets/images/pic12.png"),
    //     other: "310",
    //   },
    //   {
    //     key: "15",
    //     image: require("../assets/images/pic11.png"),
    //     other: "150",
    //   },
    ];
  
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("userVideoScreen", {
              key: "1",
              title: tr("deleteVideo"),
              follow: false,
            })
          }
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Image
            source={item.image}
            style={{
              resizeMode: "stretch",
              width: width / 3.75,
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
                  ...Fonts.SemiBold12white,  color:theme.color ,
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
        <FlatList
          numColumns={3}
          data={videoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: Default.fixPadding * 2,
            paddingHorizontal: Default.fixPadding,
          }}
        />
      </View>
    );
  };
  
  export default VideoTab;
  