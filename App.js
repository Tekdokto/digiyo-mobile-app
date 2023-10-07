// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
// import HomeScreen from './src/screens/HomeScreen';
// import SecondScreen from './src/screens/Second';
// import TabNavigation from './src/navigation/TabNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <PaperProvider>
        <AppNavigation />
        {/* <TabNavigation /> */}
        {/* // <View style={styles.container}>
        //   <Text>OKay!</Text>
        //   <HomeScreen />
        //   <SecondScreen />
        //   <StatusBar style="auto" />
        // </View> */}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
