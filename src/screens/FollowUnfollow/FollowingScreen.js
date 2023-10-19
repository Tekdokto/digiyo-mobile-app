import {
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Default, Fonts } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import FollowingAndFollowersCard from "../../components/followingAndFollowersCard";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/MyStatusBar";

const FollowingScreen = ({ navigation, isHeader }) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`followingScreen:${key}`);
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

  const followingList = [
    {
      key: "1",
      image: require("../../../assets/images/rect2.png"),
      name: "Wade Warren",
      followers: "3907",
      follow: true,
    },
    {
      key: "2",
      image: require("../../../assets/images/rect.png"),
      name: "Esther Howard",
      followers: "3907",
      follow: true,
    },
    {
      key: "3",
      image: require("../../../assets/images/rect.png"),
      name: "Leslie Alexander",
      followers: "3907",
      follow: true,
    },
    {
      key: "4",
      image: require("../../../assets/images/rect1.png"),
      name: "Robert Fox",
      followers: "3907",
      follow: true,
    },
    {
      key: "5",
      image: require("../../../assets/images/rect2.png"),
      name: "Albert Flores",
      followers: "3907",
      follow: false,
    },
    {
      key: "6",
      image: require("../../../assets/images/rect.png"),
      name: "Floyd Miles",
      followers: "3907",
      follow: true,
    },
    {
      key: "7",
      image: require("../../../assets/images/rect1.png"),
      name: "Courtney Henry",
      followers: "3907",
      follow: true,
    },
    {
      key: "8",
      image: require("../../../assets/images/rect2.png"),
      name: "Arlene McCoy",
      followers: "3907",
      follow: true,
    },
    {
      key: "9",
      image: require("../../../assets/images/rect1.png"),
      name: "Kathryn Murphy",
      followers: "3907",
      follow: true,
    },
    {
      key: "10",
      image: require("../../../assets/images/rect.png"),
      name: "Courtney Henry",
      followers: "3907",
      follow: true,
    },
    {
      key: "11",
      image: require("../../../assets/images/rect.png"),
      name: "Cameron Williamson",
      followers: "3907",
      follow: true,
    },
    {
      key: "12",
      image: require("../../../assets/images/rect1.png"),
      name: "Guy Hawkins",
      followers: "3907",
      follow: true,
    },
    {
      key: "13",
      image: require(".../../../assets/images/rect.png"),
      name: "Jacob Jones",
      followers: "3907",
      follow: true,
    },
  ];

  const [followingData, setFollowingData] = useState(followingList);

  const onSelectItem = (item) => {
    const newItem = followingData.map((val) => {
      if (val.key === item.key) {
        return { ...val, follow: !val.follow };
      } else {
        return val;
      }
    });
    setFollowingData(newItem);
  };

  const renderItem = ({ item }) => {
    return (
      <FollowingAndFollowersCard
        image={item.image}
        name={item.name}
        followers={item.followers}
        follow={item.follow}
        onClickHandler={() => onSelectItem(item)}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <MyStatusBar />
      {isHeader == true ? (
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
          {tr("following")}
        </Text>
      </View>

      ) : (
        <></>
      )
      }

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
