import React from 'react'
import { View } from 'react-native'
import TextComp from '../TextComp'
import { GET_POSTS_COMMENTS } from '../../config/urls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const CommentsReply = (props) => {

    const { userTokens } = useContext(AuthContext)
    
    const [ commentsData, setCommentsData ] = useState([])
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
    // setLoading(false);
  };

  useEffect(() => {
    onReplyComment()
  },[])

  console.log("first", commentsData)

  return (
    <>
        <View>
            <TextComp text='shogun' />
        </View>
    </>
  )
}

export default CommentsReply