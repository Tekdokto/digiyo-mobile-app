import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import { Colors, Fonts, Default } from "../constants/styles2";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { DELETE_POSTS } from "../config/urls";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


const MenuBottomSheet = (props) => {

  const { userInfo, userTokens } = useContext(AuthContext);

  const { t, i18n } = useTranslation();

  const navigate = useNavigation()

  const [loading, setIsLoading ] = useState(false)

  // console.log("ower 000000000", props.isPostOwner)
  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`menuBottomSheet:${key}`);
  }

  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
    }
  }, [isFocused]);

  const auth = userTokens

    const deletePost = async () => {

      setIsLoading(true)
      console.log("log delete  =   ")
      const config = {
        method: "delete",
        url: DELETE_POSTS+props.post_id,
        // data: formdata,
        headers: {
          'Authorization': auth,
          "Content-Type": "application/json", // This will set the correct 'Content-Type' header
        }
      };
      console.log(config)
      try {
        // setLoading(true)
        // let res = getUserPosts(auth,  userId)
        await axios(config).then(
          (response) => {
            // setPost(response.data.data)
            console.log("dddddddddddddddeeeeeeeeelllllllllleeeeeeeete",response.data)
          }
      ).catch((error) => {
        console.log("error 1111111111111",error)
      } )
      
      // console.log("---------",res)
      setIsLoading(false)
      navigate.goBack()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={() => props.closeMenuBottomSheet()}
      onBackdropPress={() => props.closeMenuBottomSheet()}
    >
      <View
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingVertical: Default.fixPadding * 2.5,
          paddingHorizontal: Default.fixPadding * 2,
          backgroundColor: Colors.black,
          ...Default.shadow,
        }}
      >
        {/* <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 28,
              height: 28,
              borderRadius: 19,
              backgroundColor: Colors.white,
            }}
          >
            <Ionicons
              name="bookmark-outline"
              size={15}
              color={Colors.primary}
            />
          </View>
          <Text
            style={{
              ...Fonts.Medium16white,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("saveVideo")}
          </Text>
        </View> */}

        {/* <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginVertical: Default.fixPadding * 2,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 28,
              height: 28,
              borderRadius: 19,
              backgroundColor: Colors.white,
            }}
          >
            <AntDesign name="download" size={15} color={Colors.primary} />
          </View>
          <Text
            style={{
              ...Fonts.Medium16white,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("downloadVideo")}
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 28,
              height: 28,
              borderRadius: 19,
              backgroundColor: Colors.white,
            }}
          >
            <AntDesign name="deleteuser" size={15} color={Colors.primary} />
          </View>
          <Text
            style={{
              ...Fonts.Medium16white,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {props.title}
          </Text>
        </View>


        {/*  */}
        {props.isPostOwner ? (
          <>
          <Pressable
            onPress={deletePost}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 28,
                  height: 28,
                  borderRadius: 19,
                  backgroundColor: Colors.white,
                }}
              >
                <AntDesign name="deleteuser" size={15} color={Colors.primary} />
              </View>
              <Text
                style={{
                  ...Fonts.Medium16white,
                  marginHorizontal: Default.fixPadding * 1.5,
                }}
              >
                delete post {loading ? (<ActivityIndicator color={"#FFF"} /> ) : (<></>)}
              </Text>
            </View>
          </Pressable>
          </>

        ) : (
          <></>
        )}
      </View>
    </BottomSheet>
  );
};

export default MenuBottomSheet;
