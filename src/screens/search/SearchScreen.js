import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors, Default, Fonts } from "../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ms } from "react-native-size-matters/extend";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../../components/myStatusBar";

const { width } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`searchScreen:${key}`);
  }

  const [search, setSearch] = useState();

  const happyBirthdayList = [
    {
      key: "1",
      image: require("../assets/images/pic1.png"),
    },
    {
      key: "2",
      image: require("../assets/images/pic2.png"),
    },
  ];

  const trendingList = [
    {
      key: "1",
      image: require("../assets/images/pic3.png"),
    },
    {
      key: "2",
      image: require("../assets/images/pic4.png"),
    },
  ];

  const funnyList = [
    {
      key: "1",
      image: require("../assets/images/pic5.png"),
    },
    {
      key: "2",
      image: require("../assets/images/pic6.png"),
    },
  ];

  const popularList = [
    {
      key: "1",
      image: require("../assets/images/pic7.png"),
    },
    {
      key: "2",
      image: require("../assets/images/pic8.png"),
    },
  ];

  const emotionalList = [
    {
      key: "1",
      image: require("../assets/images/pic9.png"),
    },
    {
      key: "2",
      image: require("../assets/images/pic10.png"),
    },
  ];

  const christmasList = [
    {
      key: "1",
      image: require("../assets/images/pic11.png"),
    },
    {
      key: "2",
      image: require("../assets/images/pic12.png"),
    },
  ];
  const renderItem = ({ item, index }) => {
    const firstItem = index === 0;
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
          marginBottom: Default.fixPadding * 2,
          marginLeft: firstItem ? Default.fixPadding * 2 : 0,
          marginRight: Default.fixPadding * 2,
        }}
      >
        <Image
          source={item.image}
          style={{
            resizeMode: "contain",
            width: width / 2.35,
            height: ms(115),
            borderRadius: 10,
          }}
        />
        <View style={{ position: "absolute" }}>
          <Ionicons name="play" size={24} color={Colors.white} />
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <FlatList
          numColumns={2}
          data={happyBirthdayList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginTop: Default.fixPadding * 1.2,
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white }}>
                # {tr("birthday")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("birthday"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <FlatList
          numColumns={2}
          data={trendingList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white }}>
                # {tr("trending")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("trending"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <FlatList
          numColumns={2}
          data={funnyList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white }}># {tr("funny")}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("funny"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <FlatList
          numColumns={2}
          data={popularList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white }}>
                # {tr("popular")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("popular"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <FlatList
          numColumns={2}
          data={emotionalList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white }}>
                # {tr("emotional")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("emotional"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <FlatList
          numColumns={2}
          data={christmasList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <Text style={{ ...Fonts.SemiBold16white }}>
                # {tr("christmas")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("christmas"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.2,
          marginHorizontal: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.extraDarkGrey,
          ...Default.shadow,
        }}
      >
        <Ionicons
          name="search-outline"
          color={Colors.grey}
          size={18}
          style={{
            flex: 0.7,
          }}
        />
        <TextInput
          value={search}
          autoFocus={true}
          onChangeText={setSearch}
          placeholder={tr("search")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            ...Fonts.Regular14white,
            flex: 9.3,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding,
          }}
        />
      </View>

      <FlatList
        ListHeaderComponent={<ListHeaderComponent />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchScreen;
