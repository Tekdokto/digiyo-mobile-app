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
import TextComp from "../../components/TextComp";
import { AuthContext } from "../../context/AuthContext";

// const { width } = Dimensions.get("window");

const SearchSeeAllUsersScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const theme = useContext(ThemeContext)

  const { userInfo, userTokens } = useContext(AuthContext); 

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
  
  // console.log(" paaaaaaaaaaaaaaaarrrrrrrrrrrr",post )

  const userId = userInfo.user_id;

  const renderItem = ({ item, index }) => {
    // const firstItem = index === 0 || index === 1;

    return (
      <TouchableOpacity
      onPress={() => {
        // console.log(item.avatar)
        // console.log(item)
        if (item.user_id === userId) {
          navigation.navigate("MyProfileScreen");
        } else {
          navigation.navigate("otherUserProfileScreen", {
            item: item,
            previousScreen: "SearchSeeAllUsersScreen",
          });
        }
      }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding,
        }}
      >
        <TextComp text={item.username} />
        <Image
          source={{uri: item.avatar}}
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
            color={theme.color}
          />
        </TouchableOpacity>
        <TextComp
          text={headerTitle}
          family={"Bold"}
        />
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

export default SearchSeeAllUsersScreen;
