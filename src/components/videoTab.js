import {
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons"; 
  import { useTranslation } from "react-i18next";
import { Default, Colors, Fonts } from "../constants/styles2";
import ThemeContext from "../theme/ThemeContext";
import { useSelector } from "react-redux";
import { getUserPosts } from "../redux/actions/auth";
import { DELETE_POSTS, GET_USERS_POSTS } from "../config/urls";
import axios from "axios";
import { ActivityIndicator } from "react-native";
  
  const { width } = Dimensions.get("window");
  
  const VideoTab = ({ navigation }) => {

    const theme = useContext(ThemeContext)
    const { t, i18n } = useTranslation();

    
    const [isLoading, setLoading] = useState(false)
    const [post, setPost] = useState()
  
    const isRtl = i18n.dir() == "rtl";
  
    function tr(key) {
      return t(`videoTab:${key}`);
    }
  
    const videoList = [
      {
        key: "1",
        image: require("../../assets/images/background.png"),
        other: "130",
      },
      {
        key: "2",
        image: require("../../assets/images/background.png"),
        other: "120",
      },
      {
        key: "3",
        image: require("../../assets/images/background.png"),
        other: "100",
      },
      {
        key: "4",
        image: require("../../assets/images/background.png"),
        other: "220",
      },
      {
        key: "5",
        image: require("../../assets/images/background.png"),
        other: "130",
      },
      {
        key: "6",
        image: require("../../assets/images/background.png"),
        other: "520",
      },
      {
        key: "7",
        image: require("../../assets/images/background.png"),
        other: "110",
      },
      {
        key: "8",
        image: require("../../assets/images/background.png"),
        other: "500",
      },
      {
        key: "9",
        image: require("../../assets/images/background.png"),
        other: "800",
      },
      {
        key: "10",
        image: require("../../assets/images/background.png"),
        other: "140",
      },
      {
        key: "11",
        image: require("../../assets/images/background.png"),
        other: "180",
      },
      {
        key: "12",
        image: require("../../assets/images/background.png"),
        other: "610",
      },
    //   {
    //     key: "13",
    //     image: require("../assets/images/pic10.png"),
    //     other: "340",
    //   },
    //   {
    //     key: "14",
    //     image: require("../assets/images/pic12.png"),
    //     other: "310",
    //   },
    //   {
    //     key: "15",
    //     image: require("../assets/images/pic11.png"),
    //     other: "150",
    //   },
    ];
    
    const userToken = useSelector(state=>state.auth.userData.token)
  

    function extractAuthorization(cookieString) {
      const cookies = cookieString.split(';');
      let authorization = '';
    
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('Authorization=')) {
          authorization = cookie.substring('Authorization='.length);
          break;
        }
      }
    
      return authorization;
    }
    
    const auth = extractAuthorization(userToken)
    const userId = useSelector(state=>state.auth.userData.authenticated_user.user_id)

    // console.log(auth)

    const userPosts = async () => {

      const config = {
        method: "get",
        url: GET_USERS_POSTS+userId,
        // data: formdata,
        headers: {
          'Authorization': auth,
          "Content-Type": "multipart/form-data", // This will set the correct 'Content-Type' header
        }
      };
      try {
        setLoading(true)
        // let res = getUserPosts(auth,  userId)
        await axios(config).then(
          (response) => {
            setPost(response.data.data)
            console.log(response.data)
          }
      ).catch((error) => {
        console.log("error 1111111111111",error)
      } )
      
      // console.log("---------",res)
      setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      userPosts()
    }, [])
  

    // const deletePost = async (post_id) => {

    //   const config = {
    //     method: "delete",
    //     url: DELETE_POSTS+post_id,
    //     // data: formdata,
    //     headers: {
    //       'Authorization': auth,
    //       "Content-Type": "multipart/form-data", // This will set the correct 'Content-Type' header
    //     }
    //   };
    //   try {
    //     setLoading(true)
    //     // let res = getUserPosts(auth,  userId)
    //     await axios(config).then(
    //       (response) => {
    //         setPost(response.data.data)
    //         console.log("dddddddddddddddeeeeeeeeelllllllllleeeeeeeete",response.data)
    //       }
    //   ).catch((error) => {
    //     console.log("error 1111111111111",error)
    //   } )
      
    //   // console.log("---------",res)
    //   setLoading(false)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // console.log("++++++++++++++",post)
    
    const renderItem = ({ item, index }) => {
      // const medias = item.media_items.map((media) => media.type)
      // console.log("'''''''''''''''''''", item)
      return (
        <TouchableOpacity
          onPress={
            deletePost(item.post_id)
          
            // navigation.navigate("userVideoScreen", {
            //   key: "1",
            //   title: tr("deleteVideo"),
            //   follow: false,
            // })
          }
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Image
            source={{uri: item.image}}
            style={{
              resizeMode: "stretch",
              width: width / 3.75,
              height: 123,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: isRtl ? null : 0,
            }}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                paddingHorizontal: Default.fixPadding * 0.4,
              }}
            >
              <Ionicons name="play" size={18} color={"black"} />
              <Text
                style={{
                  ...Fonts.SemiBold12white,  color:theme.color ,
                  marginHorizontal: Default.fixPadding * 0.2,
                }}
              >
                {item.totalLikes}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            numColumns={2}
            data={post}
            renderItem={renderItem}
            keyExtractor={(item) => item.post_id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: Default.fixPadding * 2,
              paddingHorizontal: Default.fixPadding,
            }}
          />

        )
        }
      </View>
    );
  };
  
  export default VideoTab;
   