import React, { useContext } from "react";
// import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, Image, Pressable, StyleSheet, View } from "react-native";
import ThemeContext from "../../theme/ThemeContext";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import GameSvg from "../../../assets/icons/console.svg";
import ShopSvg from "../../../assets/icons/shop.svg";
import ChatSvg from "../../../assets/icons/chat.svg";
import PeopleSvg from "../../../assets/icons/people.svg";
import SearchSvg from "../../../assets/icons/search.svg";
import GroupSvg from "../../../assets/icons/group.svg";
import { useNavigation } from "@react-navigation/native";
import { ACCENT_COLOR, PRIMARY_COLOR } from "../../constants/colors";
// import { Iconify } from 'react-native-iconify'

const SideIconsComp = () => {
  const handlePress = () => {
    console.log("press");
  };

  const navigation = useNavigation();

  const theme = useContext(ThemeContext);
  let icon;
  let themeColorsLight = theme.theme == "dark" ? "white" : "black";
  let themeColorsDark = theme.theme == "dark" ? "white" : "white";
  const size = 20;

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        width: WIDTH,
        justifyContent: "space-between",
        position: "absolute",
      }}
    >
      {/* LEFT */}
      <View style={[styles.position, { marginLeft: 10 }]}>
        <Pressable
          onPress={() => navigation.push("SearchScreen")}
          style={styles.container}
        >
          <View style={styles.cirlce}>
            {/* <Image source={require("../../assets/icons/search.png")} size={20} /> */}
            <SearchSvg
              fill={"none"}
              width={size}
              stroke={themeColorsLight}
              height={size}
            />
          </View>
          <Text style={[{ color: theme.color }, styles.text]}>Search</Text>
        </Pressable>
        <Pressable onPress={handlePress} style={styles.container}>
          <View style={styles.cirlce}>
            <GroupSvg
              fill={"none"}
              width={size}
              stroke={themeColorsLight}
              height={size}
            />
          </View>
          {/* <Image source={require("../../assets/icons/group.png")} size={20} /> */}
          <Text style={[{ color: theme.color }, styles.text]}>
            Book a private
          </Text>
        </Pressable>
        <Pressable onPress={handlePress} style={styles.container}>
          <View style={styles.cirlce}>
            <PeopleSvg
              fill={themeColorsLight}
              width={size}
              stroke={themeColorsLight}
              height={size}
            />
          </View>
          {/* <Iconify icon="mdi:heart" size={24} color="#900" /> */}
          {/* <Image source={require("../../assets/icons/run.png")}  /> */}
          <Text style={[{ color: theme.color }, styles.text]}>
            Teams
          </Text>
        </Pressable>
      </View>

      {/* right */}
      <View style={[styles.position, , { marginRight: 10 }]}>
        <Pressable onPress={handlePress} style={styles.container}>
          <View style={styles.cirlce}>
            <ShopSvg
              fill={"none"}
              width={size}
              stroke={themeColorsLight}
              height={size}
            />
          </View>
          {/* <Image source={require("../../assets/icons/shop.png")} size={20} /> */}
          <Text style={[{ color: theme.color }, styles.text]}>Shop</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("conversations")}
          style={styles.container}
        >
          <View style={styles.cirlce}>
            <ChatSvg
              fill={themeColorsDark}
              width={size}
              stroke={themeColorsLight}
              height={size}
            />
          </View>
          {/* <Image source={require("../../assets/icons/chat.png")} size={20} /> */}
          <Text style={[{ color: theme.color }, styles.text]}>Inbox</Text>
        </Pressable>
        <Pressable onPress={handlePress} style={styles.container}>
          <View style={styles.cirlce}>
            <GameSvg
              fill={themeColorsDark}
              width={size}
              stroke={themeColorsLight}
              height={size}
            />
          </View>
          {/* <Image source={require("../../assets/icons/console.png")} size={20} /> */}
          <Text style={[{ color: theme.color }, styles.text]}>Challenge Match</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SideIconsComp;

const styles = StyleSheet.create({
  position: {
    width: 60,
    top: HEIGHT * 0.3,
    height: HEIGHT * 0.34,
    backgroundColor: PRIMARY_COLOR + "20",
    borderRadius: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    fontFamily: "Bold",
    textAlign: "center",
  },
  container: {
    // marginBottom: 30,
    borderRadius: 50,
    color: ACCENT_COLOR,
    width: 60,
    alignItems: "center",
  },
  cirlce: { borderRadius: 40, backgroundColor: ACCENT_COLOR, padding: 10 },
});
