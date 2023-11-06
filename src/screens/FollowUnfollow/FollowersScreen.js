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
import { FOLLOW } from "../../config/urls";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";


const FollowersScreen = (props, { isHeader }) => {

  const theme = useContext(ThemeContext);

  const navigation = useNavigation()

  const { userInfo, userTokens } = useContext(AuthContext);

   
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`followersScreen:${key}`);
  }

  // const backAction = () => {
  // navigation.pop();
  //   return true;
  // };
  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  const [followersData, setFollowersData] = useState([]);
 
  const userToken = userTokens;

  const auth = userToken
  const userId = userInfo

  console.log('pros',props)

  const fetchFollowers = async () => {
    const id = props.userId ?? userId;
    const config = {
      method: "get",
      url: FOLLOW + id + "/followers",
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
          setFollowersData(response.data);
          console.log(response.data);
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
    const newItem = followersData.map((val) => {
      if (val.key === item.key) {
        return { ...val, follow: !val.follow };
      } else {
        return val;
      }
    });
    setFollowersData(newItem);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <FollowingAndFollowersCard
          image={item.image}
          name={item.username}
          followers={item.followers}
          follow={item.follow}
          onClickHandler={() => onSelectItem(item)}
        />
      </>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <MyStatusBar />
      {/* {isHeader == true ? ( */}
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity
            onPress={
              // {
                () => navigation.pop()
              // }
            }
          >
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
            {tr("followers")}
          </Text>
        </View>
      {/* ) : (
        <></>
      )} */}

      <FlatList
        data={followersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Default.fixPadding * 1.3,
        }}
      />
    </View>
  );
};

export default FollowersScreen;
