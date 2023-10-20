import React from "react";
import { Text, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import { Colors, Fonts, Default } from "../constants/styles2";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

const MenuBottomSheet = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`menuBottomSheet:${key}`);
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
        </View>

        <View
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
        </View>

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
      </View>
    </BottomSheet>
  );
};

export default MenuBottomSheet;
