import React from "react";
import { Text, View, TouchableOpacity, Dimensions, Modal } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles2";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const LogoutModal = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`logoutModal:${key}`);
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.visible}
      onRequestClose={props.logoutModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.logoutModalClose}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.transparentWhite,
          }}
        >
          <View
            style={{
              padding: Default.fixPadding * 2,
              width: width * 0.9,
              borderRadius: 8,
              backgroundColor: Colors.black,
              ...Default.shadow,
            }}
          >
            <Text style={{ ...Fonts.SemiBold16white, textAlign: "center" }}>
              {tr("areYouSureLogout")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignSelf: isRtl ? "flex-start" : "flex-end",
                marginTop: Default.fixPadding * 2,
              }}
            >
              <TouchableOpacity
                onPress={props.logoutModalClose}
                style={{
                  marginRight: isRtl ? 0 : Default.fixPadding * 2.6,
                  marginLeft: isRtl ? Default.fixPadding * 2.6 : 0,
                }}
              >
                <Text style={{ ...Fonts.SemiBold18grey }}>{tr("cancel")}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={props.logoutClickHandler}>
                <Text style={{ ...Fonts.SemiBold18primary }}>
                  {tr("logout")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;
