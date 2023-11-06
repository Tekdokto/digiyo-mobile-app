import { View, Pressable, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../../constants/colors';

import Logo from '../../../assets/icons/logo-black.svg'
import LogoWhite from '../../../assets/icons/logo.svg'
import ThemeContext from '../../theme/ThemeContext';
import OTPTextView from 'react-native-otp-textinput';
import TextComp from '../../components/TextComp';
import { showError } from '../../utils/helperFunctions';
import { showMessage } from 'react-native-flash-message';
import { resendOTP, verifyAccout } from '../../redux/actions/auth';


export default function OTPScreen( route ) {

    const { item } = route.route.params

    const navigation = useNavigation();

    // console.log(data.data)
    // console.log(item)
    // console.log(route.route.params)
    // console.log(route)

    const theme = useContext(ThemeContext)

    const [otpInput, setOtpInput] = useState("");
    
    const [timer, setTimer] = useState(59);

    const [isLoading, setLoading] = useState(false)

    const input = useRef(null)

    const handleCellTextChange = async (text, i) => {

    };

    
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

    // const onResendCode = () =>{
    // }
    
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
    
    const onVerify = async() => {
        console.log(otpInput)
        console.log(item) 
        console.log("tap ------ 202")
        setLoading(true)
        let data = { 
            "otp": otpInput,
            "email": item,
        }

        try {
            let res = await verifyAccout(data)
            console.log(res)
            // showMessage(res)
            // showError(res)
            // showMessage(res)
            navigation.navigate("FoundersScreen", {item: item})
        } catch (error) {
            console.log(error.message)
            showError(error.message)
        }
        setLoading(false)
    }
    

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
    >
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor, height:HEIGHT, width:WIDTH,}}>
            <StatusBar style={ theme.theme=="dark" ? "light" : "dark"} />
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
                        { theme.theme == "dark" ? <LogoWhite height={100} width={200} /> : <Logo  height={100} width={290} />}
                    </Animated.View> 
                </View>

                {/* title and form */}
                <View style={{flex: 1, justifyContent:"space-around", height:HEIGHT, width:WIDTH,}}>
                    
                    {/* title */}
                    <View 
                    style={{flex: 1, top: HEIGHT* 0.43, alignItems:"center"}}
                    >
                        <Animated.Text 
                            entering={FadeInUp.duration(1000).springify()} 
                            style={{ color:theme.color, fontWeight:"bold", fontSize:20}}
                            >
                                Enter OTP sent to email
                        </Animated.Text>
                    </View>

                    {/* form */}
                    <View 
                    style={{flex:1, alignItems:"center"}}
                    >
                        <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={{ marginHorizontal: 30, marginVertical: 10, }}
                            >
                            <OTPTextView
                                // style={[styles.textInputContainer,{color: theme.color}]}
                                ref={input}
                                textInputStyle={{borderRadius: 10, 
                                    borderWidth: 2,  
                                    backgroundColor: ACCENT_COLOR,
                                    borderColor: ACCENT_COLOR, 
                                    // borderBlockColor: ACCENT_COLOR
                                }}
                                handleTextChange={setOtpInput}
                                handleCellTextChange={handleCellTextChange}
                                inputCount={6}
                                keyboardType="numeric"
                                autoFocus
                                // tintColor={colors.whiteColor}
                                // offTintColor={colors.whiteColorOpacity40}

                            />
                            
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
                        
                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>
                                {isLoading ? (
                                    <>
                                        <ActivityIndicator color={"white"} />
                                    </>
                                ) : (
                                    <TouchableOpacity onPress={onVerify}
                                    style={[ ]}
                                    >
                                        <Text 
                                        style={{fontSize: 20, fontWeight:"bold", color:"white", textAlign:"center"}}
                                        >Continue</Text>
                                    </TouchableOpacity>
                                ) }
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
        backgroundColor:"#000000", 
        borderRadius:10, 
        padding: 20
    },
    headerStyle: {
        fontSize: 24,
        // fontFamily: fontFamily.medium,

    },
    descStyle: {
        fontSize: 14,
        // fontFamily: fontFamily.regular,
        color: ACCENT_COLOR,
        marginTop: 8,
        marginBottom: 52
    },
    textInputContainer: {
        backgroundColor: "#ccc",
        // width: WIDTH *0.4,
        borderBottomWidth: 0,
        borderRadius: 8,
        color: "white"

    },
    resendCodeStyle: {
        fontSize: 14,
        // fontFamily: fontFamily.regular,
        marginTop: 8,
        marginBottom: 16
    }
})

// define your styles 