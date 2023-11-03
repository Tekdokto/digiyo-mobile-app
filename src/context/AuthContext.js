import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { showError } from "../utils/helperFunctions";
import { showMessage } from "react-native-flash-message";
import { userLogin } from "../redux/actions/auth";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ userTokens, setUserTokens ] = useState(null)

    const login = async({email, password}) => {
        setIsLoading(true)
        let data  = {
            email:email, 
            password:password
        }
        // console.log("empty =-=-= emsopidosn ", data)
        if (data.password != "" && data.email != "" ) {
            try {
                let res = await userLogin(data)
                console.log(" login ---------- -========", res.data)
                showMessage("successful")
            } catch (error) {
                showError(error.message)
                // console.log("signup error -------", error )
            }
        } 
        else {
            showError("fields must not be empty")
            }
        setUserTokens('workitout')
        AsyncStorage.setItem('userTokens', 'workitout')
        setIsLoading(false)
    }
    
    const logout = () => {
        setIsLoading(true)
        setUserTokens(null)
        AsyncStorage.removeItem('userTokens')
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let token = await AsyncStorage.getItem('userTokens')
            setUserTokens(token)
            setIsLoading(false)
        } catch (error) {
            console.log("usertokens errrrrrrprrrrrrrooo ", error)
        }
    }

    useEffect(() => {
        isLoggedIn()
    },[])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userTokens }}>
            {children}
        </AuthContext.Provider>
    )
}