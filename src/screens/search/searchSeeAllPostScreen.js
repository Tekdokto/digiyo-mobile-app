import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, Fonts, Default } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { ms } from "react-native-size-matters/extend";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/MyStatusBar";
import { useContext } from "react";
import ThemeContext from "../../theme/ThemeContext";
import { WIDTH } from "../../constants/sizes";

// const { width } = Dimensions.get("window");

const SearchSeeAllPostScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const theme = useContext(ThemeContext)
  function tr(key) {
    return t(`searchSeeAllScreen:${key}`);
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
  const { headerTitle } = route.params;
  const { post } = route.params;
  
  console.log(" paaaaaaaaaaaaaaaarrrrrrrrrrrr",post )

  // const dataList = [
  //   {
  //     key: "1",
  //     image: require("../assets/images/img1.png"),
  //   },
  //   {
  //     key: "2",
  //     image: require("../assets/images/img2.png"),
  //   },
  //   {
  //     key: "3",
  //     image: require("../assets/images/img3.png"),
  //   },
  //   {
  //     key: "4",
  //     image: require("../assets/images/img4.png"),
  //   },
  //   {
  //     key: "5",
  //     image: require("../assets/images/img5.png"),
  //   },
  //   {
  //     key: "6",
  //     image: require("../assets/images/img6.png"),
  //   },
  //   {
  //     key: "7",
  //     image: require("../assets/images/img7.png"),
  //   },
  //   {
  //     key: "8",
  //     image: require("../assets/images/img8.png"),
  //   },
  //   {
  //     key: "9",
  //     image: require("../assets/images/img9.png"),
  //   },
  //   {
  //     key: "10",
  //     image: require("../assets/images/img10.png"),
  //   },
  //   {
  //     key: "11",
  //     image: require("../assets/images/img11.png"),
  //   },
  //   {
  //     key: "12",
  //     image: require("../assets/images/img12.png"),
  //   },
  //   {
  //     key: "13",
  //     image: require("../assets/images/img13.png"),
  //   },
  //   {
  //     key: "14",
  //     image: require("../assets/images/img14.png"),
  //   },
  //   {
  //     key: "15",
  //     image: require("../assets/images/img15.png"),
  //   },
  //   {
  //     key: "16",
  //     image: require("../assets/images/pic1.png"),
  //   },
  //   {
  //     key: "17",
  //     image: require("../assets/images/pic2.png"),
  //   },
  //   {
  //     key: "18",
  //     image: require("../assets/images/img6.png"),
  //   },
  // ];

  const renderItem = ({ item, index }) => {
    const firstItem = index === 0 || index === 1;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("userVideoScreen", {
            key: "1",
            title: `${tr("unFollow")} Jane Cooper`,
            follow: true,
          })
        }
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: firstItem ? Default.fixPadding : 0,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding,
        }}
      >
        <Image
          source={{uri: item.image}}
          style={{
            resizeMode: "stretch",
            width: WIDTH / 2.35,
            height: 115,
            borderRadius: 10,
          }}
        /> 
        <View style={{ position: "absolute" }}>
          <Ionicons name="play" size={24} color={Colors.white} />
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
          alignItems: "center",
          paddingTop: Default.fixPadding * 1.2,
          paddingBottom: Default.fixPadding,
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
            ...Fonts.SemiBold18white,
            marginHorizontal: Default.fixPadding * 1.2,
          }}
        >
          {headerTitle}
        </Text>
      </View>

      <FlatList
        numColumns={2}
        data={post}
        renderItem={renderItem}
        // keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
      />
    </View>
  );
};

export default SearchSeeAllPostScreen;
