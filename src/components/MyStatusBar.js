import React, { useContext } from "react";
import { StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import { Colors } from "../constants/styles";
import ThemeContext from "../theme/ThemeContext";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = () => {

    const theme = useContext(ThemeContext)
  return (
    <View style={[styles.statusBar, { 
        backgroundColor: theme.dark ? "#fff" : "#000" 
        }]}>
      <SafeAreaView>
        <StatusBar
          translucent
        //   backgroundColor={Colors.black}
          barStyle= {theme.dark ? "dark-content" : "light-content"}
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
