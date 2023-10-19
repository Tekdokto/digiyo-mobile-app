
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from "./src/languages/index"; //don't remove this line

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
        <AppNavigation />
        {/* <TabNavigation /> */}
        {/* // <View style={styles.container}>
        //   <Text>OKay!</Text>
        //   <HomeScreen />
        //   <SecondScreen />
        //   <StatusBar style="auto" />
        // </View> */}
    </GestureHandlerRootView>
  );
}
 
