import {
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors, Default, Fonts } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import FollowingAndFollowersCard from "../../components/followingAndFollowersCard";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/MyStatusBar";
import ThemeContext from "../../theme/ThemeContext";
import { FOLLOW, FOLLOW_TOGGLE } from "../../config/urls";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";


const FollowingScreen = (props,{ isHeader }) => {

  const theme = useContext(ThemeContext);

  const { userInfo, userTokens } = useContext(AuthContext);

  const navigation = useNavigation()

  const { t, i18n } = useTranslation();
console.log("first propds gagidn ", props)
  const isRtl = i18n.dir() == "rtl";

  const navigate = useNavigation()

  const [isLoading, setIsLoading ] = useState()

  function tr(key) {
    return t(`followingScreen:${key}`);
  }

  // const backAction = () => {
  //   navigation.pop();
  //   return true;
  // };
  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  const [followingData, setFollowingData] = useState([]);

  const userToken = userTokens;

  const auth = userToken
  const userId = userInfo;

  // console.log(auth)

  const fetchFollowers = async () => {
    const id = props.userId ?? userId
    const config = {
      method: "get",
      url: FOLLOW + id + "/followings",
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data", // This will set the correct 'Content-Type' header
      },
    };
    try {
      // setLoading(true)
      // let res = getUserPosts(auth,  userId)
      await axios(config)
        .then((response) => {
          setFollowingData(response.data);
          console.log("followinggggggg  ",response.data);
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, []);

  const onSelectItem = (item) => {
    const newItem = followingData.map((val) => {
      if (val.user_id === item.user_id) {
        return { ...val, follow: !val.follow };
      } else {
        return val;
      }
    });
    setFollowingData(newItem);
  };

  
  const followUser = async (id) => {
    const config = {
      method: "post",
      url: FOLLOW_TOGGLE+"/" + id ,
      // + item.author_id,
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json", // This will set the correct 'Content-Type' header
      },
    };
    console.log(config)
    setIsLoading(true)
    try {
      await axios(config)
        .then((response) => {
          // setUser(response.data);
          console.log("works");
        })
        .catch((error) => {
          console.log("error 1111111111111", error);
        });

      // console.log("---------",res)
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  };


  const renderItem = ({ item }) => {
    return (
      <FollowingAndFollowersCard
        image={item.avatar}
        name={item.username}
        // followers={item.followers}
        follow={item.follow}
        onClickHandler={() => {
          onSelectItem(item)
          followUser(item.user_id)
        }}
        navTo={() => navigate.navigate("otherUserProfileScreen", {
          item: item,
          previousScreen: "profileScreen",
        }) }
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      {/* {isHeader == true ? ( */}
        <>
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
            <TouchableOpacity onPress={
              // {
              () => navigation.goBack()
              // }
              }>
              <Ionicons
                name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
                size={25}
                color={theme.color}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...Fonts.SemiBold18white,
                color: theme.color,
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            >
              {tr("following")}
            </Text>
          </View>
        </>
      {/* // ) : (
      //   <></>
      // )} */}

      <FlatList
        data={followingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Default.fixPadding,
        }}
      />
    </View>
  );
};

export default FollowingScreen;
