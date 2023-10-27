import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-native-btr";
import { Colors, Fonts, Default } from "../constants/styles2";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import ThemeContext from "../theme/ThemeContext";
import axios from "axios";
import { GET_POSTS_COMMENTS } from "../config/urls";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

const { height } = Dimensions.get("window");

const CommentsBottomSheet = (props) => {
  const theme = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`commentsBottomSheet:${key}`);
  }

  const [comment, setComment] = useState();
  const [isLoading, setLoading] = useState(false);

  const [commentsData, setCommentsData] = useState([]);

  const onSelectItem = (item) => {
    const newItem = commentsData.map((val) => {
      if (val.key === item.comment_id) {
        return { ...val, like: !val.like };
      } else {
        return val;
      }
    });
    setCommentsData(newItem);
  };

  // Function to Generate a Unique ID for array elements
  const GenerateUniqueID = () => {
    return Math.floor(Math.random() * Date.now()).toString();
  };

  // const InputRef = useRef()
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
    }
  }, [isFocused]);

  const userToken = useSelector((state) => state.auth.userData.token);

  function extractAuthorization(cookieString) {
    const cookies = cookieString.split(";");
    let authorization = "";

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("Authorization=")) {
        authorization = cookie.substring("Authorization=".length);
        break;
      }
    }

    return authorization;
  }

  const auth = extractAuthorization(userToken);

  const onComment = async (post_id) => {
    console.log(comment);
    // console.log("comment")
    // console.log(...commentsData, temp)
    // InputRef.current.clear();

    const id = props.post_id
    const config = {
      method: "post",
      data: {
        "content": comment,
      },
      url: GET_POSTS_COMMENTS + post_id + "/comment",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    };
    console.log(
      "post id ---------- ",
      config
    );
    
    setLoading(true);
    try {
      await axios(config)
        .then((response) => {
          console.log("filteredStatus", response.data);
          
          // console.log("gone 1111111111111", response);
          setComment(null);
          let temp = {
            comment_id: GenerateUniqueID(),
            // "parent_id": null,
            content: comment,
            user_id: GenerateUniqueID(),
            post_id: GenerateUniqueID(),
            created_at: "2023-10-13T17:28:58.715Z",
            updated_at: "2023-10-13T17:28:58.715Z",
          };
      
          setCommentsData([...commentsData, temp]);
        })
        .catch((error) => {
          console.log("error  1111111111111", error);
        });
    } catch (error) {
      console.log("second error =====  ", error);
    }
    setLoading(false);
  };

  const onFetchComments = async (post_id) => { 
    const config = {
      method: "get",
      url: GET_POSTS_COMMENTS + post_id + "/comment",
      // data: formdata,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    };
    // console.log( "----------woahhhh",config);

    try {
      // setLoading(true);
      await axios(config)
        .then((response) => {
          // console.log("filteredStatus", response.data);
          // setLoading(false)
          setCommentsData(response.data);
        })
        .catch((error) => { 
        }); 
    } catch (error) { 
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (props.visible) {
      onFetchComments(props.post_id);
    }
    // console.log(onFetchComments())
  }, [props.visible, props.post_id]);

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
            <Text style={{ ...Fonts.Medium14primary }}>{item.name}</Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14white,
                color: theme.color,
                overflow: "hidden",
              }}
            >
              {item.content}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium12grey, color: theme.color }}>
                {item.time}
              </Text>
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
            ...Fonts.Bold18white,
            color: theme.color,
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
          keyExtractor={(item) => item.comment_id}
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
                {/* <FontAwesome
                name="smile-o"
                color={Colors.primary}
                size={24}
                style={{
                  flex: 1,
                }}
              /> */}
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
                {/* <Entypo
                name="attachment"
                color={Colors.black}
                size={20}
                style={{
                  flex: 1,
                  marginRight: isRtl ? 0 : Default.fixPadding,
                  marginLeft: isRtl ? Default.fixPadding : 0,
                }}
              /> */}
                {/* <FontAwesome
                name="microphone"
                color={Colors.black}
                size={20}
                style={{
                  flex: 0.7,
                }}
              /> */}
              </View>
            </LinearGradient>
          </View>

          {isLoading ? (
            <>
              <ActivityIndicator />
            </>
          ) : (

            <TouchableOpacity
              onPress={ () => onComment(props.post_id)}
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
                    style={{ width: 20, height: 20, resizeMode: "contain" }}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) }
        </View>
      </View>
    </BottomSheet>
  );
};

export default CommentsBottomSheet;
