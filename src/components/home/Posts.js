import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, FlatList, Image, Pressable, View, Share } from "react-native";
import BottomIcons from "../BottomIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import HomeVidComp from "./HomeVideos";
import styles from "../../constants/styles";
import ThemeContext from "../../theme/ThemeContext";
import ReadMore from "@fawazahmed/react-native-read-more";
import { getAllPosts } from "../../redux/actions/auth";
import { showError } from "../../utils/helperFunctions";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ACCENT_COLOR } from "../../constants/colors";
import { RefreshControl } from "react-native";
import CommentsBottomSheet from "../commentsBottomSheet";

import * as Sharing from 'expo-sharing'

const Posts = ({}) => {
  const theme = useContext(ThemeContext);

  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.userData.token);

  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState(false);
  const [isVideoReady, setVideoReady] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [isOpen, setOpen] = useState(false);
  const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false);
  const [openedPostId, setOpenedPostId] = useState(null); // Track the opened post's post_id

  const toggleSheet = (post_id) => {
    if (openedPostId === post_id) {
      // If the same post is clicked again, close the CommentsBottomSheet
      setOpenCommentBottomSheet(false);
      setOpenedPostId(null);
    } else {
      // If a different post is clicked, open the CommentsBottomSheet for that post
      setOpenedPostId(post_id);
      setOpenCommentBottomSheet(true);
    }
  };

  const [visibleVideos, setVisibleVideos] = useState([]);
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      // Iterate through the viewable items and determine which videos are visible
      const newVisibleVideos = post.map((_, index) =>
        viewableItems.some(
          (item) =>
            item.index === index && item.item.media_items[0].type === "video"
        )
      );
      setVisibleVideos(newVisibleVideos);
    },
    [post]
  );

  const [likeStates, setLikeStates] = useState([]);
  const [savedStates, setSavedStates] = useState([]);
  const [likes, setLikes] = useState([]);
  const [saved, setSaves] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onFetchPosts();
    setRefreshing(false);
  }, []);

  const onFetchPosts = async () => {
    let token = user.token;
    try {
      setLoading(true);
      let res = await getAllPosts(token);
      setPost(res.data);
      setLikeStates(res.data.map(() => false));
      setVisibleVideos(res.data.map(() => true));
      setLikes(res.data.map((item) => item.totalLikes));
      setSaves(res.data.map((item) => item.totalSaves));
      setLoading(false);
    } catch (error) {
      showError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    onFetchPosts();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
    }
  }, [isFocused]);

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome post!',
        url: 'https://example.com/post/123', // Replace with your post's URL
      });
  
      if (result.action === Share.ActionType.SHARED) {
        console.log('Shared successfully');
      } else if (result.action === Share.ActionType.DISMISSED) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Sharing error:', error);
    }
  };
  

  const toggleLike = (index) => {
    const newLikeStates = [...likeStates];
    newLikeStates[index] = !newLikeStates[index];
    setLikeStates(newLikeStates);

    const newLikes = [...likes];
    if (newLikeStates[index]) {
      newLikes[index] += 1; // Increment likes
    } else {
      newLikes[index] -= 1; // Decrease likes if not liked
    }
    setLikes(newLikes);
  };

  const toggleSave = (index) => {
    const newSavedState = [...savedStates];
    newSavedState[index] = !newSavedState[index];
    setSavedStates(newSavedState);

    const newSaves = [...saved];
    if (newSavedState[index]) {
      newSaves[index] += 1; // Increment saves
    } else {
      newSaves[index] -= 1; // Decrease saves if not saved
    }
    setSaves(newSaves);
  };

  const onShare = async (url) => {
    try {
      const result = await Share.share({
        message: "Sending " + url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with " + result.activityType);
        } else {
          console.log("Shared only");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            top: 300,
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ backgroundColor: theme.background }}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          data={post}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
          renderItem={({ item, index }) => {
            const mediaTypes = item.media_items.map((media) => media.type);
            const mediasUrls = item.media_items.map((media) => media.url.low);
            const imagesUrls = item.media_items.map((media) => media.url);

            // console.log(item.post_id)
            return (
              <>
                <Pressable
                  onPress={() =>
                    navigation.navigate("PostFull", {
                      item: item,
                      selectedIndex: index,
                      postsArray: post,
                    })
                  }
                >
                  <View
                    key={item.post_id}
                    style={{ marginHorizontal: WIDTH * 0.17 }}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("otherUserProfileScreen" , { item: item } )
                      }
                      style={{ marginBottom: 10 }}
                    >
                      <View
                        style={{
                          marginTop: 20,
                          flexDirection: "row",
                          alignContent: "center",
                        }}
                      >
                        {item.author.avatar == null ? (
                          <FontAwesome
                            name="user-circle-o"
                            size={30}
                            color={ACCENT_COLOR}
                          />
                        ) : (
                          <>
                            <Image
                              source={{ uri: item.author.avatar }}
                              style={{
                                borderRadius: 30,
                                width: 30,
                                height: 30,
                              }}
                            />
                          </>
                        )}
                        <View
                          style={{
                            flex: 1,
                            marginLeft: 20,
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "SemiBold",
                              fontSize: 20,
                              color: theme.color,
                            }}
                          >
                            {item.author.username}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                    <View style={{ marginBottom: 4 }}>
                      <ReadMore
                        numberOfLines={1}
                        seeLessText="hide"
                        seeMoreText="read more"
                        style={{ fontFamily: "Regular", color: theme.color }}
                      >
                        {item.caption ?? ""}
                      </ReadMore>
                    </View>
                    <View style={{ marginBottom: 4 }}>
                      <ReadMore
                        numberOfLines={1}
                        seeLessText="hide"
                        seeMoreText="read more"
                        style={{ fontFamily: "Regular", color: theme.color }}
                      >
                        {item.content ?? ""}
                      </ReadMore>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                      {mediaTypes == "video" ? (
                        <View>
                          <HomeVidComp
                            vids={mediasUrls[0]}
                            isVisible={visibleVideos[index] && isFocused}
                          />
                        </View>
                      ) : mediaTypes == "image" ? (
                        isLoading ? (
                          <ActivityIndicator />
                        ) : (
                          <Image
                            source={{ uri: imagesUrls[0] }}
                            style={styles.mediaFrame}
                          />
                        )
                      ) : (
                        <Text style={{ fontFamily: "Regular" }}>
                          Unsupported media type
                        </Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <BottomIcons
                        likeLink={() => toggleLike(index)}
                        likeColor={likeStates[index] ? "red" : "none"}
                        likeName={
                          !likeStates[index]
                            ? require("../../../assets/icons/heart.png")
                            : require("../../../assets/icons/heart-fill.png")
                        }
                        like={likes[index]}
                        chat={item.totalComments}
                        chatLink={() => toggleSheet(item.post_id)}
                        saveLink={() => toggleSave(index)}
                        saveName={
                          savedStates[index]
                            ? require("../../../assets/icons/bookmark-fill.png")
                            : require("../../../assets/icons/bookmark.png")
                        }
                        save={saved[index]}
                        saveColor={savedStates[index] ? "blue" : "#000"}
                        shareLink={shareContent}
                      /> 
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#000",
                      }}
                    ></View>
                  </View>
                </Pressable>
              </>
            );
          }}
          />
          )}
          <CommentsBottomSheet
            post_id={openedPostId}
            visible={openCommentBottomSheet} 
            closeCommentBottomSheet={() => setOpenCommentBottomSheet(false)}
          />
    </View>
  );
};

export default Posts;
