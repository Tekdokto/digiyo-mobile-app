import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { PRIMARY_COLOR } from '../../constants/colors';

import Logo from '../../../assets/icons/logo-black.svg'
import ThemeContext from '../../theme/ThemeContext';
import { resendOTP, resetPassword } from '../../redux/actions/auth';
import { showError } from '../../utils/helperFunctions';
import { ActivityIndicator } from 'react-native-paper';


export default function NewPasswordScreen({ route }) {
    const navigation = useNavigation();

    const { item } = route.params

    // console.log("_______item", item)
    // console.log("route", route)

    const theme = useContext(ThemeContext)

    // const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(59);

    const onForgotpass = async() => {
        // const checkValid = isValidData()
        // console.log("first")

        // if (checkValid) {
            setLoading(true)
            let data  = {
                "otp":otp,
                "email":item,
                "password":password
            }
            console.log("empty =-=-= emsopidosn ", data)
            if (data.email != "" ) {
                
                try {
                    let res = await resetPassword(data)
                    console.log("response -------", data)
                    console.log("response result -------", res)
                    // setLoading(false)
                    console.log(" ---------- -========", res.data)
                    // console.log(" ---------- -========", res.data.email)
                    // showMessage(res.status)
                    navigation.push("Logincreen", 
                    // { item: email }
                    )
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

    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timer > 0) setTimer(timer - 1)
        }, 1000);
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [timer])

    const resendCode = async() => {
        setTimer(59)
        console.log("tap ------ 202")
        console.log(item)
        let data = { 
            email: item,
        }

        try {
            let res = await resendOTP(data)
            console.log(res)
            showMessage(res)
            // showError(res)
            // showMessage(res)
        } catch (error) {
            showError(error)
        }
    }

    const onReset = async() => {
            setLoading(true)
            let data  = {
                "otp":otp,
                "email":item,
                "password":password
            }
            console.log("empty =-=-= emsopidosn ", data)
            if (data.otp != "" && data.password != "" ) {
                
                try {
                    let res = await resetPassword(data)
                    console.log("response -------", data)
                    console.log("response result -------", res)
                    // setLoading(false)
                    console.log(" ---------- -========", res.data)
                    // console.log(" ---------- -========", res.data.email)
                    // showMessage(res.status)
                    navigation.replace("LoginScreen", 
                    // { item: email }
                    )
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
        <View style={{ flex: 1, backgroundColor:"white", height:HEIGHT, width:WIDTH,}}>
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
                        <Logo  height={100} width={290} />
                    </Animated.View> 
                </View>

                {/* title and form */}
                <View style={{flex: 1, justifyContent:"space-around", height:HEIGHT, width:WIDTH,}}>
                    
                    {/* title */}
                    <View 
                    style={{flex: 1, top: HEIGHT* 0.4, marginHorizontal: WIDTH * 0.2, alignItems:"center"}}
                    >
                        <Animated.Text 
                            entering={FadeInUp.duration(1000).springify()} 
                            style={{ color:theme.color, fontFamily: "Regular", textAlign: "center", fontSize:20}}
                            >
                                OTP has been sent to your email address
                        </Animated.Text>
                    </View>

                    {/* form */}
                    <View 
                    style={{flex:1, alignItems:"center"}}
                    >
                        {/* <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={styles.input}
                            >

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'gray'}
                            />
                        </Animated.View> */}
                        
                         <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={styles.input}
                            >

                            <TextInput
                                placeholder="OTP"
                                placeholderTextColor={'gray'}
                                onChangeText={setOtp}
                            />
                        </Animated.View>
                       
                        <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={styles.input}
                            >

                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor={'gray'}
                                onChangeText={setPassword}
                            />
                        </Animated.View>
                       
                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>
                                {loading ? (
                                    <ActivityIndicator />
                                ) : (
                                <TouchableOpacity onPress={onReset}
                                style={[ ]}
                                >
                                    <Text 
                                    style={{fontSize: 20, fontFamily: "Bold", color:"white", textAlign:"center"}}
                                    >Continue</Text>
                                </TouchableOpacity>

                                )
                                }
                        </Animated.View>

                        <Text style={{ marginHorizontal: 20, marginVertical: 30,}}>

                            {timer > 0 ?
                                
                                 <Pressable
                                    onPress={{}} 
                                >
                                    <Text style={{   flexDirection: "row", color: theme.color}}>Resend code in: {timer}</Text>
                                    
                                </Pressable>
                                :
                                <Pressable
                                    onPress={resendCode} 
                                >
                                    <Text style={{  flexDirection: "row", color: theme.color}}>Resend code</Text>
                                    
                                </Pressable>
                            }
                        </Text>
                        {/* <Animated.View 
                            entering={FadeInDown.delay(600).duration(1000).springify()} 
                            style={{ marginTop:20, flexDirection:"row", justifyContent:"center"}}
                            >

                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={()=> navigation.push('SignupScreen')}>
                                <Text 
                                // style="text-sky-600"
                                >Sign in</Text>
                            </TouchableOpacity>
                        </Animated.View> */}
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