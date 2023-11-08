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
import { Default, Fonts, Colors } from '../../constants/styles2';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, Image } from 'react-native';

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
          console.log("filteredStatus", response.data);

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

          setGetReplies(response.data.replies);
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
    console.log("temsssssssssss",item.content)
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
        
          <TextComp text={item.content} />
        
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