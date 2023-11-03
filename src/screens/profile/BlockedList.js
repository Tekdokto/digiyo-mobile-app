import React from 'react'
import MyStatusBar from '../../components/MyStatusBar'
import { useIsFocused } from '@react-navigation/native';
import { showError } from '../../utils/helperFunctions';
import { useContext } from 'react';
import { useState } from 'react';
import ThemeContext from '../../theme/ThemeContext';
import { useEffect } from 'react';
import { getBlockedUsers } from '../../redux/actions/auth';
import BlockListCard from '../../components/BlockedListCard';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { Colors, Default, Fonts } from '../../constants/styles2';
import { Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import TextComp from '../../components/TextComp';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const BlockListScreen = ({ navigation, isHeader }) => {

  const { userInfo, userTokens } = useContext(AuthContext);

    const user = userTokens;
    console.log("userData", user)
  
    const theme = useContext(ThemeContext);
  
    const [isLoading, setLoading] = useState(false);
    const [profile, setProfile] = useState([]); 
  
    const isFocused = useIsFocused();
  
    const onFetchBlocked = async () => {
      let token = user;
      console.log("token ---------- ", token);
      setLoading(true);
      try {
        let res = await getBlockedUsers(token);
        console.log("response -------", res);
        console.log("blocked  result -------", res);
        setProfile(res);
        // setLoading(false);
      } catch (error) {
        showError(error.message);
        console.log("profile error -------", error);
      }
      setLoading(false);
    };
   
    // useEffect(() => {
    //   onFetchProfile();
    // }, []);
    useEffect(() => {
      if (isFocused) {
        // Reload your screen here
        onFetchBlocked();
      }
    }, [isFocused]);
  
    
  const onSelectItem = (item) => {
    const newItem = profile.map((val) => {
        console.log('valen         ',item)
      if (val.user_id === item.user_id) {
        return { ...val, follow: !val.follow };
      } else {
        return val;
      }
    });
    setProfile(newItem);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <BlockListCard
          image={item.image}
          name={item.username}
        //   followers={item.followers}
          follow={item.follow}
          onClickHandler={() => onSelectItem(item)}
        />
      </>
    );
  };
  return (
    <>
        <MyStatusBar />
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      {/* <MyStatusBar /> */}
      {/* {isHeader == true ? ( */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <TouchableOpacity onPress={() =>
             navigation.pop()
            }>
            <Ionicons
              name={"chevron-back-outline"}
              size={25}
              color={theme.color}
            />
          </TouchableOpacity>
          <TextComp
            family={"SemiBold"}
            text={"BlockedList"}
          />
        </View>

      {/* ) : (
        <></>
      )} */}
      {isLoading ? (
        <>
            <ActivityIndicator />
        </>
      ) : (
        <>
            {profile != [] ? (
            <>
                <FlatList
                    data={profile}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                    paddingTop: Default.fixPadding * 1.3,
                    }}
                />
            </>
            ) : (
                <>
                    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <TextComp text='no blocked user' family={"Bold"} size={20} />
                    </View>
                </>
                )}
        </>
      ) }
    </View>
    </>
  )
}

export default BlockListScreen