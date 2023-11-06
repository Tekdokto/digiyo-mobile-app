import {
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Share,
  Switch,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors, Default, Fonts } from "../../constants/styles2";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
// import LogoutModal from "../components/logoutModal";
// import RateModal from "../components/rateModal";
import { useTranslation } from "react-i18next";
import RateModal from "../../components/rateModal";
import LogoutModal from "../../components/logoutModal";
import MyStatusBar from "../../components/MyStatusBar";
import ThemeContext from "../../theme/ThemeContext";
import { EventRegister } from "react-native-event-listeners";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HEIGHT } from "../../constants/sizes";  
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import FoundersClubSuccessModal from "../../components/foundersClubSuccessModal";
// import MyStatusBar from "../components/myStatusBar";


const ProfileSettingsScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const { profile } = route.params

  const { logout } = useContext(AuthContext)

  console.log("route des",profile.is_premium)

  const navigate = useNavigation()

  const isRtl = i18n.dir() == "rtl";

  const theme = useContext(ThemeContext)

  const [darkMode, setDarkMode ] = useState(false)

  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode === 'true')
        }
      } catch (error) {
        console.log('error dark mode', error)
      }
    }

    loadDarkMode()
  }, [])


  function tr(key) {
    return t(`profileSettingsScreen:${key}`);
  }

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const shareMessage = () => {
    Share.share({
      message: "V Rock",
    });
  };

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const [openRateModal, setOpenRateModal] = useState(false);

  const [openFoundersModal, setOpenFoundersModal] = useState(false);

  const profileSettingList = [
    {
      key: "1",
      title: tr("notification"),
      navigateTo: "notificationSettingScreen",
    },
    {
      key: "2",
      title: "Edit Bio",
      navigateTo: "editProfileBioScreen",
    },
    // {
    //   key: "3",
    //   title: "Edit bio",
    // },
    {
      key: "4",
      title: tr("blockList"),
      navigateTo: "blockListScreen",
    },
    {
      key: "5",
      title: "Join Founders Club",
      navigateTo: "joinFoundersPaymentScreen",
    },
    {
      key: "6",
      title: tr("rate"),
    },
    {
      key: "7",
      title: tr("about"),
      navigateTo: "aboutScreen",
    },
  ];

  const renderItem = ({ item, index }) => {
    const firstItem = index === 0;
    const email = profile.email
    console.log("i want email", )
    return (
      <View
        style={{
          borderTopWidth: firstItem ? null : 1,
          borderTopColor: firstItem ? null : Colors.extraDarkGrey,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (index == 2) {
              // return shareMessage();
              navigation.navigate(item.navigateTo, {profile: profile});
            } 
            if (index == 3) {
              // return shareMessage();
              if (profile.is_premium) {
                setOpenFoundersModal(true)
              } else {
                navigation.navigate(item.navigateTo, {item: email});
              }
            } 
            else
             if (index === profileSettingList.length - 2) {
              return setOpenRateModal(true);
            } else {
              navigation.navigate(item.navigateTo, {profile: profile});
            }
          }}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: Default.fixPadding * 2,
            paddingBottom: Default.fixPadding * 2,
            paddingTop: firstItem
              ? Default.fixPadding * 1.3
              : Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Medium16white, color: theme.color }}>{item.title}</Text>
          <Ionicons
            name={isRtl ? "chevron-back-outline" : "chevron-forward"}
            size={20}
            color={theme.color}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons
            name={isRtl ? "chevron-forward-outline" : "chevron-back-outline"}
            size={25}
            color={theme.color}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.SemiBold18white, color: theme.color,
            marginHorizontal: Default.fixPadding * 1.2,
          }}
        >
          {tr("profileSettings")}
        </Text>
      </View>

      <FlatList
        data={profileSettingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
      <View 
        style={{ 
            position: "absolute", 
          bottom: HEIGHT * 0.15, 
          left:0, 
          right: 0, 
          flex: 1, 
          alignItems: "center" }}>
        <Switch
          value={darkMode} 
          onValueChange={(value) => {
            setDarkMode(value)
            EventRegister.emit("ChangeTheme", value)
            AsyncStorage.setItem('darkMode', value.toString())
          }}
        />
        <Text style={{ color: theme.color, marginTop: 10 }}>
          Switch Modes
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setOpenLogoutModal(true)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "center",
          alignItems: "center",
          padding: Default.fixPadding * 1.8,
          backgroundColor: Colors.red,
        }}
      >
        <AntDesign name="logout" size={25} color={theme.color} />
        <Text
          style={{
            ...Fonts.SemiBold18white, color: theme.color,
            marginHorizontal: Default.fixPadding,
          }}
        >
          {tr("logout")}
        </Text>
      </TouchableOpacity>

      <LogoutModal
        visible={openLogoutModal}
        logoutModalClose={() => setOpenLogoutModal(false)}
        logoutClickHandler={ () => logout()
        //   async () => {
        //   setOpenLogoutModal(false);
        //   await AsyncStorage.removeItem('userData').then((res) => {
        //     dispatch(saveUserData())
        //   })
        //   console.log(userId)
        //   navigate.replace("LoginScreen");
        // }
      }
      />

      <RateModal
        visible={openRateModal}
        rateModalClose={() => setOpenRateModal(false)}
      />
      <FoundersClubSuccessModal
        visible={openFoundersModal}
        rateModalClose={() => setOpenFoundersModal(false)}
      />
    </View>
  );
};

export default ProfileSettingsScreen;
