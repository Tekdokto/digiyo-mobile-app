import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import { HEIGHT, WIDTH } from '../../constants/sizes';
import { PRIMARY_COLOR } from '../../constants/colors';

import Logo from '../../../assets/icons/logo-black.svg'

import TextInputComp from '../../components/TextInputComp';
import TextComp from '../../components/TextComp';

import validator from '../../utils/validations';
import { showError } from '../../utils/helperFunctions';
import { userSignup } from '../../redux/actions/auth';


export default function SignupScreen() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureText, setSecureText] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const isValidData= () =>{
        const error = validator({
            userName,
            // fullName,
            email,
            password
        })
        if(error){
            showError(error)
            return false
        }
        return true
    }

    const onPressSignup = async() => {
        const checkValid = isValidData()

        if (checkValid) {
            setLoading(true)
            let data  = {
                userName:userName,
                // fullName:fullName,
                email:email,
                password:password
            }
            try {
                let res = await userSignup(data)
                console.log("response -------", data)
                setLoading(false)
                // navigation.navigate("OTPScreen" { data: res.data})
            } catch (error) {
                console.log("signup error -------", error )
                console.log("signup error data -------", data )
                setLoading(false)
            }
        }
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
                    >
                        <Logo  height={100} width={290} />
                    </Animated.View> 
                </View>

                {/* title and form */}
                <View style={{flex: 1, justifyContent:"space-around", height:HEIGHT, width:WIDTH,}}>
                    
                    {/* title */}
                    <View 
                    style={{flex: 1, alignItems:"center"}}
                    >
                        <Animated.Text 
                            entering={FadeInUp.duration(1000).springify()} 
                            style={{ color:"white", fontWeight:"bold", fontSize:40}}
                            >
                                <TextComp>
                                    SignUp
                                </TextComp>
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
                                value={userName}
                                placeholder={strings.USERNAME}
                                onChangeText={(value) => setUserName(value)}
                            />
                            {/* <TextInput
                                placeholder="username"
                                placeholderTextColor={'gray'}
                            /> */}
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={styles.input}
                            >
                            <TextInputComp
                                value={userName}
                                placeholder={strings.USERNAME}
                                onChangeText={(value) => setEmail(value)}
                            />
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.delay(200).duration(1000).springify()} 
                            style={styles.input}
                            >                            
                            <TextInputComp
                                value={password}
                                placeholder={strings.PASSWORD}
                                onChangeText={(value) => setPassword(value)}
                                secureTextEntry={secureText}
                                secureText={secureText ? strings.SHOW : strings.HIDE}
                                onPressSecure={() => setSecureText(!secureText)}
                            />
                        </Animated.View>

                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>

                            <TouchableOpacity onPress={onPressSignup}
                            style={[ ]}
                            >
                                <Text 
                                style={{fontSize: 20, fontWeight:"bold", color:"white", textAlign:"center"}}
                                >SignUp</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.delay(600).duration(1000).springify()} 
                            style={{ marginTop:20, flexDirection:"row", justifyContent:"center"}}
                            >

                            <TextComp>Don't have an account? </TextComp>
                            <TouchableOpacity onPress={()=> navigation.push('LoginScreen')}>
                                <TextComp 
                                // style="text-sky-600"
                                >Login</TextComp>
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