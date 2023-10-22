
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from "./src/languages/index"; //don't remove this line
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './src/redux/store';

export default function App() {
  return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }} >
            <AppNavigation />
            <FlashMessage
            position={'bottom'}
            titleStyle={{
              // fontFamily:fontFamily.medium,
              // fontSize: textScale(14)
            }}
          />
            {/* <TabNavigation /> */}
            {/* // <View style={styles.container}>
            //   <Text>OKay!</Text>
            //   <HomeScreen />
            //   <SecondScreen />
            //   <StatusBar style="auto" />
            // </View> */}
        </GestureHandlerRootView>
      </Provider>
  );
}
 
