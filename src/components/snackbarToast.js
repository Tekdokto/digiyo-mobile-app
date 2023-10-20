import React from "react";
import { Text, Dimensions } from "react-native";
import { Snackbar } from "react-native-paper";
import { Colors, Fonts, Default } from "../constants/styles2";

const { width } = Dimensions.get("window");

const SnackbarToast = (props) => {
  return (
    <Snackbar
      width={width * 0.9}
      height={20}
      visible={props.visible}
      onDismiss={props.onDismiss}
      duration={1000}
      wrapperStyle={{
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Default.fixPadding * 2,
      }}
      style={{
        backgroundColor: Colors.white,
      }}
    >
      <Text style={{ ...Fonts.SemiBold14black, textAlign: "center" }}>
        {props.title}
      </Text>
    </Snackbar>
  );
};

export default SnackbarToast;
