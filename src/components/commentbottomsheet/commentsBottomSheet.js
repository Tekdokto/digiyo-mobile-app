import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-native-btr";
import { Colors, Fonts, Default } from "../../constants/styles2";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../theme/ThemeContext";
import axios from "axios";
import { GET_POSTS_COMMENTS } from "../../config/urls";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CommentsReply from "../commentsreply/CommentsReply";
import TextComp from "../TextComp";

const { height } = Dimensions.get("window");

const CommentsBottomSheet = (props) => {

  const { userInfo, userTokens } = useContext(AuthContext);

  const theme = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`commentsBottomSheet:${key}`);
  }

  const [comment, setComment] = useState();
  const [theRep, setTheRep] = useState();
  const [isLoading, setLoading] = useState(false);

  // const [commentsData, setCommentsData] = useState(commentsList);
  // const [replysData, setReplysData] = useState([]);

  const [replyToCommentId, setReplyToCommentId] = useState();
  const [reply, setReply] = useState(false);
  const [viewReply, setViewReply] = useState(false);

  const onSelectItem = (item) => {
    const newItem = commentsData.map((val) => {
      if (val.comment.comment_id === item.comment.comment_id) {
        return { ...val, like: !val.like };
      } else {
        return val;
      }
    });

    console.log("liked comment         ",item.comment.comment_id)
    onLikeComment(item.comment.comment_id)
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

  const userToken = userTokens
  const auth = userToken

  // const commentsList = [
  //   {
  //     comment_id: GenerateUniqueID(),
  //     // "parent_id": null,
  //     content: "comment",
  //     user_id: GenerateUniqueID(),
  //     post_id: GenerateUniqueID(),
  //     created_at: "2023-10-13T17:28:58.715Z",
  //     updated_at: "2023-10-13T17:28:58.715Z",
  //     replies: [
  //       {
  //         comment_id: GenerateUniqueID(),
  //         // "parent_id": null,
  //         content: "the reply",
  //         user_id: GenerateUniqueID(),
  //         post_id: GenerateUniqueID(),
  //         created_at: "2023-10-13T17:28:58.715Z",
  //         updated_at: "2023-10-13T17:28:58.715Z",
  //       },
  //     ]
  //   },
  //   {
  //     comment_id: GenerateUniqueID(),
  //     // "parent_id": null,
  //     content: "comment 2",
  //     user_id: GenerateUniqueID(),
  //     post_id: GenerateUniqueID(),
  //     created_at: "2023-10-13T17:28:58.715Z",
  //     updated_at: "2023-10-13T17:28:58.715Z",
  //     replies: [
  //       // {
  //       //   comment_id: GenerateUniqueID(),
  //       //   // "parent_id": null,
  //       //   content: "the reply",
  //       //   user_id: GenerateUniqueID(),
  //       //   post_id: GenerateUniqueID(),
  //       //   created_at: "2023-10-13T17:28:58.715Z",
  //       //   updated_at: "2023-10-13T17:28:58.715Z",
  //       // },
  //     ]
  //   },
  // ]

  
  const [commentsData, setCommentsData] = useState([]);
  const [commentUser, setCommentUser] = useState();
  // const [commentsData, setCommentsData] = useState(commentsList);
  // const data = commentsData.map((data) => data)
  // console.log("repliesssss  ------ 2", data )

  const onLikeComment = async (comment_id) => { 
    console.log("like comment", comment_id)
    const config = {
      method: "post",
      data: {
        "content": comment,
      },
      url: GET_POSTS_COMMENTS + "comment/" + comment_id + "/togglelike",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    };
    console.log("commientr like post id ---------- ", config);

    setLoading(true);
    // setComment(null);
    try {
      await axios(config)
        .then((response) => {
          console.log("filteredStatus", response.data);

          // console.log("gone 1111111111111", response);
          // setComment(null);
            
        })
        .catch((error) => {
          console.log("error  1111111111111", error);
        });
    } catch (error) {
      console.log("second error =====  ", error);
    }
    setLoading(false);
  };

  const onComment = async (post_id) => { 
    console.log(comment);
    console.log("commentUser" ,commentUser);
    console.log("comment");

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
    console.log("post id ---------- ", config);

    setLoading(true);
    setComment(null);
    try {
      await axios(config)
        .then((response) => {
          console.log("filteredStatus", response.data);

          console.log("gone 1111111111111", response);
          setComment(null);
          let temp = {
            comment: {
              comment_id: GenerateUniqueID(),
              // "parent_id": null,
              content: comment,
              user_id: GenerateUniqueID(),
              post_id: GenerateUniqueID(),
              created_at: "2023-10-13T17:28:58.715Z",
              updated_at: "2023-10-13T17:28:58.715Z",
              author:{
                username: commentUser
              }
            }
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

  // REPLY COMMENT
  const onReplyComment = async (post_id, comment_id) => {
    console.log("hereeeeeee")
    console.log(GET_POSTS_COMMENTS + post_id + "/reply/" + comment_id,)
    setReply(false);

    const config = {
      method: "post",
      data: {
        "content": theRep,
      },
      url: GET_POSTS_COMMENTS + post_id + "/reply/" + comment_id,
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    };    
    // setCommentsData([...data, newReply]);

    console.log("config daaaaaaaaaaaaaaaataaaaaaaaaa", config)
    // console.log("new daaaaaaaaaaaaaaaataaaaaaaaaa",...replysData)
    setLoading(true);
    try {
      await axios(config)
        .then((response) => {
          console.log("filteredStatus", response.data);

          console.log("gone 1111111111111", response.status);
          // const newReply = {
          //   comment_id: GenerateUniqueID(),
          //   content: theRep,
          //   user_id: GenerateUniqueID(),
          //   post_id: post_id, // Set post_id as the same post being replied to
          //   created_at: "2023-10-13T17:28:58.715Z",
          //   updated_at: "2023-10-13T17:28:58.715Z",
          //   replies: []
          // };
          //         const updatedComments = commentsData.map((comment) => {
          //         if (comment.comment_id === comment_id) {
          //           return {
          //             ...comment,
          //             replies: comment.replies ? [...comment.replies, newReply] : [newReply],
          //           };
          //         }
          //         return comment;
          //       });
            
          //       setCommentsData(updatedComments);       
        })
        .catch((error) => {
          console.log("error  1111111111111", error);
        });
    } catch (error) {
      console.log("second error =====  ", error);
    }

    setLoading(false);

    // Reset the reply text
    setTheRep("");
 
  };

  // const onReplyComment = async (post_id, comment_id) => {
  //   setReply(false);

  //   const config = {
  //     method: "post",
  //     data: {
  //       "content": comment,
  //     },
  //     url: GET_POSTS_COMMENTS + post_id + "/reply/" + comment_id,
  //     headers: {
  //       Authorization: userToken,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   // console.log("post id ---------- ", config);
     
  //   // setReplysData([...replysData, temp]);

  //   console.log("new daaaaaaaaaaaaaaaataaaaaaaaaa",...replysData)
  //   setLoading(true);
  //   try {
  //     await axios(config)
  //       .then((response) => {
  //         console.log("filteredStatus", response.data);

  //         console.log("gone 1111111111111", response.status);
  //         const newReply = {
  //           comment_id: GenerateUniqueID(),
  //           content: theRep,
  //           user_id: GenerateUniqueID(),
  //           post_id: post_id, // Set post_id as the same post being replied to
  //           created_at: "2023-10-13T17:28:58.715Z",
  //           updated_at: "2023-10-13T17:28:58.715Z",
  //           replies: []
  //         };
      
  //         // Find the comment being replied to and add the reply to it
  //         const updatedComments = commentsData.map((comment) => {
  //           if (comment.comment_id === comment_id) {
  //             return {
  //               ...comment,
  //               replies: comment.replies ? [...comment.replies, newReply] : [newReply],
  //             };
  //           }
  //           return comment;
  //         });
      
  //         setCommentsData(updatedComments);
          
  //       })
  //       .catch((error) => {
  //         console.log("error  1111111111111", error);
  //       });
  //   } catch (error) {
  //     console.log("second error =====  ", error);
  //   }

  //   setLoading(false);

  //   // Reset the reply text
  //   setTheRep("");

  //   // You can keep the rest of the logic you have commented out for handling network requests
  // };

  // FETCH COMMENTS
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
          // console.log("fetched comment", response.data);
          // setLoading(false)
          setCommentsData(response.data);
        })
        .catch((error) => {});
    } catch (error) {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (props.visible) {
      onFetchComments(props.post_id);
    }
    // console.log(onFetchComments())
  }, [props.visible, props.post_id, reply]);

  const setFalse = () => {
    setViewReply(false)
  }

  const renderItem = ({ item, index }) => {
    // console.log("temsssssssssss",item.comment.content)
    // console.log("temsssssssssss",commentsData.map((replies) => replies))
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
            <Text style={{ ...Fonts.Medium14primary }}>{item.comment.author.username}</Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium14white,
                color: theme.color,
                overflow: "hidden",
              }}
            >
              {item.comment.content}
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
              <TouchableOpacity
                onPress={() => {
                  setReply(true);
                  console.log(item.comment.comment_id);
                  setReplyToCommentId(item.comment.comment_id);
                }}
              >
                <Text
                  style={{
                    ...Fonts.Medium12grey,
                    marginHorizontal: Default.fixPadding * 2.7,
                  }}
                >
                  {tr("reply")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setViewReply(!viewReply);
                  console.log(item.comment.comment_id);
                  setReplyToCommentId(item.comment.comment_id);
                }}
              >
                <Text
                  style={{
                    ...Fonts.Medium12grey,
                    marginHorizontal: Default.fixPadding * 2.7,
                  }}
                >
                  view replies
                </Text>
              </TouchableOpacity>

              {/*  */}
            </View>
            {/* {viewReply && replyToCommentId === item.comment.comment_id ? (
              <View style={{ marginLeft: 20, height: 300, position: "absolute" }}>
                <Text>
                  <CommentsReply
                    id={item.comment.comment_id}
                  />
                </Text>
              </View>
            ) : 
              null
              } */}
            {/* <View style={{ marginLeft: 20 }}>
            <Text>
              {item.replies &&
                item.replies.map((reply, replyIndex) => (
                  <Text key={replyIndex}>{reply.content}{'\n'}</Text>
                ))}
            </Text>
            </View> */}
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
          <TextComp text= {item.total_likes} size={12}
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
        setReply(false);
        setReplyToCommentId(null);
        setViewReply(false)
      }}
      onBackdropPress={() => {
        props.closeCommentBottomSheet();
        setComment(null);
        setReply(false);
        setReplyToCommentId(null);
        setViewReply(false)
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
        {viewReply && replyToCommentId ? (
          <View style={{height: 320}}>
            
            <CommentsReply id={replyToCommentId}
              close={setFalse}
            />
          </View>
    ) : null}

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
                  value={reply ? theRep : comment}
                  onChangeText={reply ? setTheRep : setComment}
                  placeholder={reply ? "Reply" : "comment"}
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
              onPress={() => {
                if (reply) {
                  console.log("replying")
                  console.log("replying", replyToCommentId)
                  console.log("replying postid", props.post_id)
                  onReplyComment(
                    props.post_id,
                    // commentsData.map((data) => data.comment_id)
                    replyToCommentId
                  );
                } else {
                  // console.log()
                  const user = commentsData.map((user) => user.comment.author.username)
                  setCommentUser(user)
                  onComment(
                    props.post_id,
                    
                    );
                }
                // reply ?
                // :
              }}
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
                    source={require("../../../assets/icons/send.png")}
                    style={{ width: 20, height: 20, resizeMode: "contain" }}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CommentsBottomSheet;
