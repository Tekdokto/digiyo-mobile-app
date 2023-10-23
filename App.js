
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from "./src/languages/index"; //don't remove this line
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './src/redux/store';
import { useEffect } from 'react';
import { getData } from './src/utils/helperFunctions';
// import { storeUserData } from './src/redux/actions/appSettings';
import { saveUserData } from './src/redux/reducers/auth';

const { dispatch } = store
export default function App() {

  useEffect(() => {
    initUser()
  }, [])

  const initUser = async () => {
    try {
      let myUserData = await getData('userData')
      console.log("huh ------ huh ?.>>>>>", (myUserData) )
      if (!!myUserData) {
        // storeUserData(myUserData)
        dispatch(saveUserData(JSON.parse(myUserData)))
      }
    } catch (error) {
      console.log("no data found ------- ", error)
    }
  }
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
 
