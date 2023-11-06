import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors, Default, Fonts } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/MyStatusBar";
import ThemeContext from "../../theme/ThemeContext";
import { SEARCH } from "../../config/urls";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { HEIGHT, WIDTH } from "../../constants/sizes";

import { AntDesign } from "@expo/vector-icons";
import { Video } from "expo-av";
import { AuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {

  const theme = useContext(ThemeContext);

  const { userInfo, userTokens } = useContext(AuthContext);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`searchScreen:${key}`);
  }

  const [search, setSearch] = useState();
  const [searchRes, setSearchRes] = useState([]);
  const [loading, setLoading] = useState([]);

  const navigate = useNavigation();

  // console.log(item);

  const userToken = userTokens;

  const auth = userToken

  const userId = userInfo.authenticated_user.user_id;

  // console.log(auth)

  const onSearch = async () => {
    console.log("-------------", search);
    setLoading(true);
    const config = {
      method: "post",
      url: SEARCH,
      data: {
        query: search,
      },
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    try {
      await axios(config)
        .then((response) => {
          // setSearch(response.data);
          console.log(response.data);
          setSearchRes(response.data.data);
          console.log("this posts", response.data.data.posts);
          // console.log(response.data.data.users.data.posts);
          // console.log(response.data.data.users.profileS);
          // console.log(response.data.data.users);
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    onSearch();
  }, [search]);

  const renderPostItem = ({ item, index }) => {
    // const firstItem = index === 0;
    const mediaType = item.media_items.map((data) => {
      console.log("first", data.type);
      return data.type;
    });
    const vidUrl = item.media_items.map((data) => {
      console.log("first", data.url.low);
      return data.url.low;
    });
    const imageUrl = item.media_items.map((data) => {
      console.log("first", data.url);
      return data.url;
    });
    console.log(item.avatar);
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
          marginLeft: Default.fixPadding * 2,
          marginRight: Default.fixPadding * 2,
        }}
      >
        {mediaType === "video" ? (
          <Video
            source={{ uri: vidUrl[0] }}
            style={{
              resizeMode: "cover",
              width: width / 2.35,
              height: 115,
              borderRadius: 10,
            }}
          />
        ) : mediaType === "image" ? (
          <Image
            source={{ uri: imageUrl }}
            style={{
              resizeMode: "cover",
              width: width / 2.35,
              height: 115,
              borderRadius: 10,
            }}
          />
        ) : (
          <></>
        )}
        {/* <View style={{ position: "absolute" }}>
          <Ionicons name="play" size={24} color={Colors.white} />
        </View> */}
      </TouchableOpacity>
    );
  };
  const renderUsersItem = ({ item, index }) => {
    // const firstItem = index === 0;

    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item.avatar)
          console.log( "item",item, "user id", userId)
          if (item.user_id === userId) {
            navigation.navigate("MyProfileScreen");
          } else {
            navigation.navigate("otherUserProfileScreen", {
              item: item,
              previousScreen: "SearchScreen",
            });
          }
        }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: Default.fixPadding * 2,
          marginLeft:
            // firstItem ? Default.fixPadding * 2 :
            0,
          marginRight: Default.fixPadding * 2,
        }}
      >
        {item.avatar == null ? (
          <Image
            source={ require("../../../assets/images/2.jpeg")}
            style={{
              resizeMode: "cover",
              width: width / 2.35,
              height: 115,
              borderRadius: 10,
            }}
          />
        ) : (
          <Image
            source={{ uri: item.avatar }}
            style={{
              resizeMode: "cover",
              width: width / 2.35,
              height: 115,
              borderRadius: 10,
            }}
          />
        )}
        {/* <View style={{ position: "absolute" }}>
          <Ionicons name="play" size={24} color={Colors.white} />
        </View> */}
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <FlatList
          numColumns={2}
          data={searchRes.posts.slice(0, 2)}
          renderItem={renderPostItem}
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
              <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
                # {tr("Posts")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllPostScreen", {
                    headerTitle: "posts",
                    post: searchRes.post,
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color: theme.color }}>
                  {tr("seeAll")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* <FlatList
          numColumns={2}
          data={searchRes.profiles.slice(0, 2)}
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
              <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
                # {tr("Profiles")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("seeAllProfiles", {
                    headerTitle: tr("trending"),
                    profileS: iitem,
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color: theme.color }}>
                  {tr("seeAll")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        /> */}

        {/* <FlatList
          numColumns={2}
          data={searchRes.teams.slice(0, 2)}
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
              <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
                # {tr("Teams")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("seeAllTeams", {
                    headerTitle: tr("funny"),
                    teams: item,
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color: theme.color }}>
                  {tr("seeAll")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        /> */}

        <FlatList
          numColumns={2}
          data={searchRes.users.slice(0, 2)}
          renderItem={renderUsersItem}
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
              <Text style={{ ...Fonts.SemiBold16white, color: theme.color }}>
                # {tr("Users")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("searchSeeAllUsersScreen", {
                    headerTitle: "Users",
                    post: searchRes.users,
                  })
                }
              >
                <Text style={{ ...Fonts.Medium14grey, color: theme.color }}>
                  {tr("seeAll")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* <FlatList
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
        /> */}

        {/* <FlatList
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
        /> */}
      </>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <MyStatusBar />
      <View
        style={{
          // flex:1,
          // width: WIDTH * 0.9,
          height: HEIGHT * 0.1,
          // backgroundColor: "#000",
          flexDirection:
            //  isRtl ? "row-reverse" :
            "row",
          alignItems: "center",
          alignContent: "center",
          // paddingVertical: Default.fixPadding * 1.2,
          // paddingHorizontal: Default.fixPadding * 1.5,
          marginVertical: 0,
          marginHorizontal: 15,
          // borderRadius: 10,
          // backgroundColor: Colors.extraDarkGrey,
          // ...Default.shadow,
        }}
      >
        {/* <Pressable >
            <AntDesign name="left" size={25} />
          </Pressable> */}
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            width: WIDTH * 0.8,
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 1.2,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: "#00000020",
            // ...Default.shadow,
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
              color: theme.color,
              flex: 9.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding,
            }}
          />
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          loading ? (
            <>
              <ActivityIndicator />
            </>
          ) : (
            <ListHeaderComponent />
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchScreen;
