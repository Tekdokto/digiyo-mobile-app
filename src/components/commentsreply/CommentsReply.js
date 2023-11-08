import React from 'react'
import { View } from 'react-native'
import TextComp from '../TextComp'
import { GET_POSTS_COMMENTS } from '../../config/urls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ThemeContext from '../../theme/ThemeContext';
import { Default, Fonts } from '../../constants/styles2';

const CommentsReply = (props) => {

  const { userTokens } = useContext(AuthContext)
  
  const theme = useContext(ThemeContext)
  
  const [ getReplies, setGetReplies ] = useState([])

  const GenerateUniqueID = () => {
    return Math.floor(Math.random() * Date.now()).toString();
  };

  const onReplyComment = async () => { 
    // console.log(comment);
    console.log("comment");

    const config = {
      method: "get",
    //   data: {
    //     "content": comment,
    //   },
      url: GET_POSTS_COMMENTS + "comment/" + props.id ,
      headers: {
        Authorization: userTokens,
        "Content-Type": "application/json",
      },
    };
    console.log("comment replt post id ---------- ", config);

    // setLoading(true);
    // setComment(null);
    try {
      await axios(config)
        .then((response) => {
          console.log("filteredStatus", response.data.replies);

          console.log("gone 1111111111111", response.data.replies);
        //   setComment(null);
        //   let temp = {
        //     comment: {
        //         comment_i: "308c79ba-00dd-4819-8687-c9ecfac25a62",
        //         content: "Dode",
        //         created_at: "2023-11-07T15:49:17.173Z",
        //         author: {
        //             "user_id": "8de51608-a19e-4bc2-8637-e5e68de241c3",
        //             "username": "Kiva",
        //             "avatar": null,
        //             "is_premium": true
        //         }
        //     },
        //     replies: [
        //         {
        //             comment_id: "f1366acc-38bc-42dd-a2fa-5855316f38f9",
        //             content: "This is so cool",
        //             created_at: "2023-11-08T05:04:35.930Z",
        //             author: {
        //                 user_id: "8de51608-a19e-4bc2-8637-e5e68de241c3",
        //                 username: "Kiva",
        //                 avatar: null,
        //                 is_premium: true
        //             },
        //             total_likes: 0,
        //             replies: []
        //         }
        //     ]
        // };

          setGetReplies(commentsData);
        })
        .catch((error) => {
          console.log("error  1111111111111", error);
        });
    } catch (error) {
      console.log("second error =====  ", error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    onReplyComment()
  },[])

  console.log("first", getReplies)

  const renderItem = ({ item, index }) => {
    // console.log("temsssssssssss",item.comment.content)
    // console.log("temsssssssssss",commentsData.map((replies) => replies))
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: index === 0 ? Default.fixPadding : 0,
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
          <View
            style={{
              alignItems:"flex-start",
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
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium12grey, color: theme.color }}>
                {/* {item.time} */}
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
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}

              {/*  */}
            </View>
            {viewReply && replyToCommentId === item.comment.comment_id ? (
              <View style={{ marginLeft: 20 }}>
                <Text>
                  <CommentsReply
                    id={item.comment.comment_id}
                  />
                </Text>
              </View>
            ) : (
              <>
              </>
            )}
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
    <>
        <View>
        <FlatList
          data={getReplies}
          renderItem={renderItem}
          keyExtractor={(item) => item.comment_id}
          showsVerticalScrollIndicator={false}
        />
            {/* <TextComp text='shogun' /> */}
        </View>
    </>
  )
}

export default CommentsReply