import {
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useTranslation } from "react-i18next";
import { Default, Colors, Fonts } from "../constants/styles2";
  
  const { width } = Dimensions.get("window");
  
  const SaveListTab = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`saveListTab:${key}`);
    }
  
    const saveList = [
      {
        key: "1",
        image: require("../../assets/images/background.png"),
        other: "130",
      },
      {
        key: "2",
        image: require("../../assets/images/background.png"),
        other: "100",
      },
      {
        key: "3",
        image: require("../../assets/images/background.png"),
        other: "220",
      },
      {
        key: "4",
        image: require("../../assets/images/background.png"),
        other: "500",
      },
      {
        key: "5",
        image: require("../../assets/images/background.png"),
        other: "800",
      },
    ];
  
    const displayList = route.params?.newSaveList
      ? route.params?.newSaveList
      : saveList;
  
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("userVideoScreen", {
              key: "2",
              itemId: item.key,
              saveListData: displayList,
              follow: false,
            })
          }
          style={{
            overflow: "hidden",
            marginBottom: Default.fixPadding * 2,
            marginRight: Default.fixPadding * 2,
            marginLeft: index % 3 === 0 ? Default.fixPadding * 2 : 0,
          }}
        >
          <Image
            source={item.image}
            style={{
              resizeMode: "cover",
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
      <View style={{ flex: 1, backgroundColor: Colors.black }}>
        {displayList.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="ios-bookmark" size={40} color={Colors.grey} />
            <Text
              style={{ ...Fonts.SemiBold16grey, marginTop: Default.fixPadding }}
            >
              {tr("emptySaveList")}
            </Text>
            <Text
              style={{
                ...Fonts.Regular14grey,
                textAlign: "center",
                marginTop: Default.fixPadding * 0.3,
                marginHorizontal: Default.fixPadding * 6,
              }}
            >
              {tr("description")}
            </Text>
          </View>
        ) : (
          <FlatList
            numColumns={3}
            data={displayList}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: Default.fixPadding * 2,
            }}
          />
        )}
      </View>
    );
  };
  
  export default SaveListTab;
  