import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { BottomSheet } from "react-native-btr";
import { Colors, Fonts, Default } from "../constants/styles2";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import ThemeContext from "../theme/ThemeContext";

const { height } = Dimensions.get("window");

const CommentsBottomSheet = (props) => {

  const theme = useContext(ThemeContext)
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`commentsBottomSheet:${key}`);
  }

  const [comment, setComment] = useState();
  const commentsList = [
    {
      key: "1",
      image: require("../../assets/images/1.jpeg"),
      name: "Wade Warren",
      comment: "#Jancooper so good man 👌😍",
      time: "2 min",
      like: true,
    },
    {
      key: "2",
      image: require("../../assets/images/4.jpeg"),
      name: "Leslie Alexander",
      comment: "#Jancooper so good man 👌😍",
      time: "2 min",
      like: false,
    },
    {
      key: "3",
      image: require("../../assets/images/1.jpeg"),
      name: "Albert Flores",
      comment: "#Jancooper so good man 👌😍",
      time: "2 min",
      like: false,
    },
    {
      key: "4",
      image: require("../../assets/images/1.jpeg"),
      name: "Floyd Miles",
      comment: "#Jancooper so good man 👌😍",
      time: "2 min",
      like: false,
    },
    {
      key: "5",
      image: require("../../assets/images/2.jpg"),
      name: "Arlene McCoy",
      comment: "#Jancooper so good man 👌😍",
      time: "2 min",
      like: false,
    },
  ];

  const [commentsData, setCommentsData] = useState(commentsList);

  const onSelectItem = (item) => {
    const newItem = commentsData.map((val) => {
      if (val.key === item.key) {
        return { ...val, like: !val.like };
      } else {
        return val;
      }
    });
    setCommentsData(newItem);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginTop: index === 0 ? Default.fixPadding : 0,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
          <View
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding * 0.8,
            }}
          >
            <Text style={{ ...Fonts.Medium14primary, }}>{item.name}</Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Medium14white, overflow: "hidden" }}
            >
              {item.comment}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium12grey,  color:theme.color  }}>{item.time}</Text>
              <Text
                style={{
                  ...Fonts.Medium12grey,
                  marginHorizontal: Default.fixPadding * 2.7,
                }}
              >
                {tr("reply")}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onSelectItem(item)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: isRtl ? "flex-start" : "flex-end",
          }}
        >
          <FontAwesome
            name="heart"
            size={16}
            color={item.like ? Colors.primary : Colors.grey}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={() => {
        props.closeCommentBottomSheet();
        setComment(null);
      }}
      onBackdropPress={() => {
        props.closeCommentBottomSheet();
        setComment(null);
      }}
    >
      <View
        style={{
          height: height / 1.5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: theme.theme == "dark" ? Colors.black : Colors.white,
          ...Default.shadow,
        }}
      >
        <Text
          style={{
            ...Fonts.Bold18white, color: theme.color,
            textAlign: "center",
            marginTop: Default.fixPadding * 1.3,
            marginBottom: Default.fixPadding,
          }}
        >
          {tr("comments")}
        </Text>
        <FlatList
          data={commentsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding,
            marginBottom: Default.fixPadding * 2,
          }}
        >
          <View style={{ flex: 8.5 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[Colors.primary, Colors.extraDarkPrimary]}
              style={{
                marginLeft: isRtl ? Default.fixPadding : Default.fixPadding * 2,
                marginRight: isRtl
                  ? Default.fixPadding * 2
                  : Default.fixPadding,
                borderRadius: 20,
                ...Default.shadow,
              }}
            >
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: Default.fixPadding * 1.2,
                  paddingHorizontal: Default.fixPadding * 0.9,
                  margin: Default.fixPadding * 0.1,
                  borderRadius: 20,
                  backgroundColor: Colors.white,
                }}
              >
                <FontAwesome
                  name="smile-o"
                  color={Colors.primary}
                  size={24}
                  style={{
                    flex: 1,
                  }}
                />
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  placeholder={tr("comment")}
                  placeholderTextColor={Colors.grey}
                  selectionColor={Colors.primary}
                  style={{
                    ...Fonts.Medium16black,
                    flex: 7.3,
                    textAlign: isRtl ? "right" : "left",
                    marginHorizontal: Default.fixPadding * 1.2,
                  }}
                />
                <Entypo
                  name="attachment"
                  color={Colors.black}
                  size={20}
                  style={{
                    flex: 1,
                    marginRight: isRtl ? 0 : Default.fixPadding,
                    marginLeft: isRtl ? Default.fixPadding : 0,
                  }}
                />
                <FontAwesome
                  name="microphone"
                  color={Colors.black}
                  size={20}
                  style={{
                    flex: 0.7,
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          <TouchableOpacity
            onPress={() => setComment(null)}
            style={{
              flex: 1.5,
              marginRight: isRtl ? 0 : Default.fixPadding * 2,
              marginLeft: isRtl ? Default.fixPadding * 2 : 0,
            }}
          >
            <LinearGradient
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              colors={[Colors.primary, Colors.extraDarkPrimary]}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 54,
                height: 54,
                borderRadius: 27,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: Default.fixPadding * 0.1,
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: Colors.white,
                }}
              >
                <Image
                  source={require("../../assets/icons/send.png")}
                  style={{ width: 27, height: 27, resizeMode: "contain" }}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default CommentsBottomSheet;
