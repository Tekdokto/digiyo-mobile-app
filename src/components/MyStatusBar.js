import React from "react";
import { StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import { Colors } from "../constants/styles";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = () => {
  return (
    <View style={[styles.statusBar, { 
        // backgroundColor: Colors.black 
        }]}>
      <SafeAreaView>
        <StatusBar
          translucent
        //   backgroundColor={Colors.black}
          barStyle="light-content"
        />
      </SafeAreaView>
    </View>
  );
};

export default MyStatusBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
