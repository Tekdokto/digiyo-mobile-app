import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { PRIMARY_COLOR } from '../../constants/colors';

import Logo from '../../../assets/icons/logo-black.svg'
import LogoWhite from '../../../assets/icons/logo.svg'
import ThemeContext from '../../theme/ThemeContext';
import { resendOTP, resetPassword } from '../../redux/actions/auth';
import { showError } from '../../utils/helperFunctions';
import TextInputComp from '../../components/TextInputComp';
import TextComp from '../../components/TextComp';


export default function ForgotPasswordScreen() {
    const navigation = useNavigation();

    const theme = useContext(ThemeContext)

    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const onForgotpass = async() => {
        // const checkValid = isValidData()
        // console.log("first")

        // if (checkValid) {
            setLoading(true)
            let data  = {
                email:email
            }
            console.log("empty =-=-= emsopidosn ", data)
            if (data.email != "" ) {
                
                try {
                    let res = await resendOTP(data)
                    console.log("response -------", data)
                    console.log("response result -------", res)
                    // setLoading(false)
                    console.log(" ---------- -========", res.data)
                    // console.log(" ---------- -========", res.data.email)
                    // showMessage(res.status)
                    navigation.push("NewPasswordScreen", { item: email })
                } catch (error) {
                    showError(error.message)
                    console.log("signup error -------", error )
                    console.log("signup error data -------", data )
                    setLoading(false)
                }
            }
            else {
                showError("fields must not be empty")
                setLoading(false)
             }
        // }
        // navigation.navigate("OTPScreen", {item: "safyulurzu@gufum.com"})
    }


  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
    >
        <View style={{ flex: 1, backgroundColor:theme.backgroundColor, height:HEIGHT, width:WIDTH,}}>
            <StatusBar style="light" />
            {/* <Image style={{height:HEIGHT, width:WIDTH, position:"absolute"}} source={require('../../../assets/images/background.png')} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                {/* lights */}
                <View style={{
                    justifyContent:"space-around",
                    alignItems: "center",
                    top: HEIGHT * 0.2,
                    width: WIDTH, 
                    // height: HEIGHT * 0.1,
                    position:"absolute"
            }}>
                    <Animated.View 
                        entering={FadeInUp.delay(200).duration(1000).springify()} 
                        // source={require('../../../assets/icons/logo-black.png')} 
                        // style={{ width:"50%",}}
                    >
                        { theme.theme != "dark" ? <Logo  height={100} width={290} />
                        : <LogoWhite  height={100} width={290} />}
                    </Animated.View> 
                </View>

                {/* title and form */}
                <View style={{flex: 1, justifyContent:"space-around", height:HEIGHT, width:WIDTH,}}>
                    
                    {/* title */}
                    <View 
                    style={{flex: 1, top: HEIGHT* 0.4, alignItems:"center"}}
                    >
                        <Animated.Text 
                            entering={FadeInUp.duration(1000).springify()} 
                            style={{ color:theme.color, fontFamily:"Regular", fontSize:20}}
                            >
                                Reset Password
                        </Animated.Text>
                    </View>

                    {/* form */}
                    <View 
                    style={{flex:1, alignItems:"center"}}
                    >
                        <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={styles.input}
                            >

                            <TextInputComp
                                value={email}
                                placeholder="email"
                                onChangeText={(value) => setEmail(value)}
                            />
                        </Animated.View>
                       
                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>

                            <TouchableOpacity onPress={onForgotpass}
                            style={[ ]}
                            >
                                {loading ? (
                                    <ActivityIndicator color={"white"} />
                                ) 
                                :
                                (

                                <Text 
                                    style={{fontSize: 20, fontFamily: "Bold", color:"white", textAlign:"center"}}
                                >Continue</Text>
                                )
                                }
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.delay(600).duration(1000).springify()} 
                            style={{ marginTop:20, flexDirection:"row", justifyContent:"center"}}
                            >

                            <TextComp text='Already have an account?' />
                            <TouchableOpacity onPress={()=> navigation.push('SignupScreen')}>
                                <TextComp text=' Sign in' />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles= StyleSheet.create({
    input: {
        width:WIDTH * 0.9, 
        marginVertical: 5, 
        backgroundColor:"#00000010", 
        borderRadius:10, 
        padding: 20
    }
})