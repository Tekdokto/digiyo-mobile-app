import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { PRIMARY_COLOR } from '../../constants/colors';

import Logo from '../../../assets/icons/logo-black.svg'
import ThemeContext from '../../theme/ThemeContext';
import JoinFoundersPaymentScreen from '../foundersclubscreen/JoinFoundersClubPayment/joinFoundersPaymentScreen';
import { JOIN_FOUNDERS } from '../../config/urls';
import axios from 'axios';


export default function FoundersScreen({ route }) {

    const { item } = route.params
    const navigation = useNavigation();

    const [ open, setOpen ] = useState(false)
    
    const theme = useContext(ThemeContext)
    
    
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
                    style={{flex: 1, top: HEIGHT* 0.45, alignItems:"center"}}
                    >
                        <Animated.Text 
                            entering={FadeInUp.duration(1000).springify()} 
                            style={{ color:theme.color, fontWeight:"bold", fontSize:25}}
                            >
                                 Join Founders Club (Optional)
                        </Animated.Text>
                    </View>

                    {/* form */}
                    <View 
                    style={{flex:1, alignItems:"center"}}
                    >
                         
                       
                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>

                            <TouchableOpacity onPress={() => navigation.push("joinFoundersPaymentScreen", {item: item})
                            }
                            style={[ ]}
                            > 
                                <Text 
                                style={{fontSize: 20, fontWeight:"bold", color:"white", textAlign:"center"}}
                                >Join</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.delay(600).duration(1000).springify()} 
                            style={{ marginVertical:20, flexDirection:"row", justifyContent:"center"}}
                            >

                            <Text>Or </Text>
                             
                        </Animated.View>

                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>

                            <TouchableOpacity onPress={() => navigation.push("LoginScreen")}
                            style={[ ]}
                            >
                                <Text 
                                style={{fontSize: 20, fontWeight:"bold", color:"white", textAlign:"center"}}
                                >Continue to Login</Text>
                            </TouchableOpacity>
                        </Animated.View>

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