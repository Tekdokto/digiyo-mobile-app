import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Default } from "../constants/styles2";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Stars from "react-native-stars";
import AwesomeButton from "react-native-really-awesome-button";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const FoundersClubSuccessModal = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`rateModal:${key}`);
  }
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.visible}
      onRequestClose={props.rateModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.rateModalClose}
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
              paddingVertical: Default.fixPadding * 2.4,
              paddingHorizontal: Default.fixPadding * 4,
              width: width * 0.9,
              borderRadius: 8,
              backgroundColor: Colors.black,
              ...Default.shadow,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <LinearGradient
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                colors={[Colors.primary, Colors.extraDarkPrimary]}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 75,
                  height: 75,
                  borderRadius: 38,
                }}
              >
                <FontAwesome name="thumbs-up" size={42} color={Colors.white} />
              </LinearGradient>

              <Text
                style={{
                  ...Fonts.SemiBold16white,
                  textAlign: "center",
                  marginTop: Default.fixPadding,
                }}
              >
                Hurray
              </Text>
              <Text
                style={{
                  ...Fonts.Medium14grey,
                  textAlign: "center",
                  marginTop: Default.fixPadding * 0.5,
                  marginBottom: Default.fixPadding * 4,
                }}
              >
                You are already a member
              </Text>

              {/* <Stars
                half={false}
                default={4}
                spacing={10}
                count={5}
                fullStar={
                  <FontAwesome name={"star"} size={35} color={Colors.yellow} />
                }
                emptyStar={
                  <FontAwesome
                    name={"star"}
                    size={35}
                    color={Colors.extraLightGrey}
                  />
                }
              /> */}
            </View>

            <View
              style={{
                marginTop: Default.fixPadding * 4,
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 6,
              }}
            >
              {/* <AwesomeButton
                height={50}
                stretch={true}
                raiseLevel={1}
                borderRadius={10}
                borderWidth={null}
                backgroundDarker={Colors.transparent}
                onPressOut={props.rateModalClose}
                extra={
                  <LinearGradient
                    start={[0, 1]}
                    end={[1, 1]}
                    colors={[Colors.primary, Colors.extraDarkPrimary]}
                    style={{ ...StyleSheet.absoluteFillObject }}
                  />
                }
              >
                <Text style={{ ...Fonts.Bold18white }}>{tr("submit")}</Text>
              </AwesomeButton> */}
            </View>
            <TouchableOpacity
              onPress={props.rateModalClose}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ ...Fonts.Medium14grey }}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FoundersClubSuccessModal;
