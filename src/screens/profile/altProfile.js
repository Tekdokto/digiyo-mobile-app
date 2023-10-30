import React, { useCallback } from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import VideoTab from '../../components/videoTab'
import { WIDTH } from '../../constants/sizes'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useState } from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { myProifile } from '../../redux/actions/auth'
import ThemeContext from '../../theme/ThemeContext'
import { RefreshControl } from 'react-native-gesture-handler'
import FollowersScreen from '../FollowUnfollow/FollowersScreen'
import FollowingScreen from '../FollowUnfollow/FollowingScreen'
import MyStatusBar from '../../components/MyStatusBar'


const HEADER_HEIGHT = 250

const DATA = [0]
const identity = (v) => v + ''

const Header = () => {

  const user = useSelector(state=>state.auth.userData.token)
  // console.log("userData", userData)
  
  const theme = useContext(ThemeContext)
   
  const [isLoading, setLoading] = useState(false)
  const [profile, setProfile] = useState(false)

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Reload your screen here
    }
  }, [isFocused]);


  // 
   
  const onFetchProfile = async() => { 
    let token = user.token
    console.log("token ---------- " , token)
        try {
          setLoading(true)
          let res = await myProifile(token)
          console.log("response -------", res)
          console.log("profile result -------", res.authenticated_user)
          setProfile(res.authenticated_user)
          setLoading(false)
        } catch (error) {
          showError(error.message)
          console.log("profile error -------", error )
          setLoading(false)
        }
}

useEffect(() => {
  onFetchProfile();
  }, []);

  return (
      <>
      <MyStatusBar />
      <View style={Container.safe} >
          <Image
          style={UserImage.Image}
          resizeMode="contain"
          source={{ uri: profile.avatar}}
        />
        <View>
          <Text style={UserName.Text}>@{profile.username}</Text>
        </View>
        <View style={UserFollowers.View}>
          <View style={UserFollowersText.View}>
            <Text style={UserFollowersTextNumber.Text}>{profile.following_count}</Text>
            <Text style={UserFollowersTextDesc.Text}>Following</Text>
          </View>
          <View style={UserFollowersText.View}>
            <Text style={UserFollowersTextNumber.Text}>{profile.followers_count ?? 0}</Text>
            <Text style={UserFollowersTextDesc.Text}>Followers</Text>
          </View>
          <View style={UserFollowersText.View} >
            <Text style={UserFollowersTextNumber.Text}>{profile.post_count}</Text>
            <Text style={UserFollowersTextDesc.Text}>Posts</Text>
          </View>
        </View>
        <View style={EditProfile.View}>
          <TouchableOpacity style={ButtonEditProfile.TouchableOpacity}>
            <Text>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ButtonFavorites.TouchableOpacity}>
            <FontAwesome name={"home"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text>Tap to add bio</Text>
        </TouchableOpacity>

      </View>
      </>
    )
}


const AltProfile = () => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    onFetchProfile()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
    // wait(2000).then(() => {
    //   setRefreshing(false)
    // })
  }, [])

  const renderItem = useCallback(({ }) => {
    return (
      // <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
      <View>
        <VideoTab />
      </View>
    )
  }, [])

  const renderFollowers = useCallback(({ }) => {
    return (
      // <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
      <View>
        <FollowersScreen />
      </View>
    )
  }, [])

  const renderFollowing = useCallback(({ }) => {
    return (
      // <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
      <View>
        <FollowingScreen />
      </View>
    )
  }, [])
 
  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT} // optional
    >
      <Tabs.Tab name="Posts">
        <Tabs.FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Followers">
        <Tabs.FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          data={DATA}
          renderItem={renderFollowers}
          keyExtractor={identity}
        /> 
      </Tabs.Tab>
      <Tabs.Tab name="Following">
        <Tabs.FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          data={DATA}
          renderItem={renderFollowing}
          keyExtractor={identity}
        />  
      </Tabs.Tab>
    </Tabs.Container>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    // height: HEADER_HEIGHT,
    width: '100%',
    // backgroundColor: '#2196f3',
  },
})

export default AltProfile

export const Container = StyleSheet.create({ 
    safe :{ 
        flex: 1,
        alignItems: "center",
        // backgroundColor: "#ccc",
     }
})

export const UserImage = StyleSheet.create({
    Image:{ 
    alignSelf: "center",
    marginTop: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",}
})
 

export const UserName = StyleSheet.create({
    Text : {
    marginTop: 20,
    fontFamily: "Bold",
    alignSelf: "center",
},
})

export const UserFollowers = StyleSheet.create({
    View: { 
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",}
})
 

export const UserFollowersText = StyleSheet.create({
    View : {
    width: WIDTH * 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}
    })

export const UserFollowersTextNumber = StyleSheet.create({
    Text : {
        color: "#010101",
        fontFamily: "Bold",
        }
    })
 

export const UserFollowersTextDesc = StyleSheet.create({
    Text : {
    // marginTop: 10,  
    color: "#333",
}
    })

export const EditProfile = StyleSheet.create({
    View: { 
    marginTop: 20,
    width: "100%",
    flex: 1 ,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    }
})

export const ButtonEditProfile = StyleSheet.create({
    TouchableOpacity : {
    width: WIDTH * 0.3,
    height: 52,
    flex: 1 ,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // border: solid 1 "#333",
    padding: 15
    ,}
    })

export const ButtonEditProfileText = StyleSheet.create({
    Text: {
    color: "#333",}
    })

export const ButtonFavorites = StyleSheet.create({
    TouchableOpacity: { 
    marginLeft: 10,
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // border: solid 1 #333,
    padding: 15,
}
})

export const ButtonAddBio = StyleSheet.create({
    TouchableOpacity: { 
    marginLeft: 10,
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
}
})

export const ButtonAddBioText = StyleSheet.create({
    Text: { 
    color: "#333",
}
})

 
 