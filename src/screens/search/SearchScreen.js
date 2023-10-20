import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { Colors, Default, Fonts } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/MyStatusBar";
import ThemeContext from "../../theme/ThemeContext";
import { Pressable } from "react-native";

const { width } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {

  const theme = useContext(ThemeContext)
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`searchScreen:${key}`);
  }

  const [search, setSearch] = useState();

  const happyBirthdayList = [
    {
      key: "1",
      image: require("../../../assets/images/1.jpeg"),
    },
    {
      key: "2",
      image: require("../../../assets/images/3.jpg"),
    },
  ];

  const trendingList = [
    {
      key: "1",
      image: require("../../../assets/images/3.jpg"),
    },
    {
      key: "2",
      image: require("../../../assets/images/2.jpg"),
    },
  ];

  const funnyList = [
    {
      key: "1",
      image: require("../../../assets/images/3.jpg"),
    },
    {
      key: "2",
      image: require("../../../assets/images/3.jpg"),
    },
  ];

  const popularList = [
    {
      key: "1",
      image: require("../../../assets/images/2.jpg"),
    },
    {
      key: "2",
      image: require("../../../assets/images/3.jpg"),
    },
  ];

  const emotionalList = [
    {
      key: "1",
      image: require("../../../assets/images/3.jpg"),
    },
    {
      key: "2",
      image: require("../../../assets/images/3.jpg"),
    },
  ];

  const christmasList = [
    {
      key: "1",
      image: require("../../../assets/images/2.jpg"),
    },
    {
      key: "2",
      image: require("../../../assets/images/3.jpg"),
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
            resizeMode: "cover",
            width: width / 2.35,
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
              <Text style={{ ...Fonts.SemiBold16white, color:theme.color }}>
                # {tr("birthday")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("birthday"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey,  color:theme.color  }}>{tr("seeAll")}</Text>
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
              <Text style={{ ...Fonts.SemiBold16white,  color:theme.color  }}>
                # {tr("trending")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("trending"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color:theme.color  }}>{tr("seeAll")}</Text>
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
              <Text style={{ ...Fonts.SemiBold16white,  color:theme.color  }}># {tr("funny")}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("funny"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color:theme.color  }}>{tr("seeAll")}</Text>
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
              <Text style={{ ...Fonts.SemiBold16white, color:theme.color  }}>
                # {tr("popular")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("popular"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color:theme.color  }}>{tr("seeAll")}</Text>
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
              <Text style={{ ...Fonts.SemiBold16white, color:theme.color  }}>
                # {tr("emotional")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("emotional"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color:theme.color  }}>{tr("seeAll")}</Text>
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
              <Text style={{ ...Fonts.SemiBold16white, color:theme.color  }}>
                # {tr("christmas")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllScreen", {
                    headerTitle: tr("christmas"),
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color:theme.color  }}>{tr("seeAll")}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
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
        <Pressable>
          <Text>back</Text>
        </Pressable>
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
            ...Fonts.Regular14white, color:theme.color ,
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
