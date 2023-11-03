import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
// import { showError } from "../utils/helperFunctions";
// import { showMessage } from "react-native-flash-message";
// import { userLogin } from "../redux/actions/auth";
import axios from "axios";
import { LOGIN_API } from "../config/urls";
import {} from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isSuccessFul, setSuccessFul] = useState("");
  const [userTokens, setUserTokens] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    let data = {
      email,
      password,
    };
    // console.log("empty =-=-= emsopidosn ", data)
    axios
      .post(LOGIN_API, { email, password })
      .then((res) => {
        console.log("res                ", res.data);
        console.log("res                ", res.data.data.token);
        setUserInfo(res.data.data);
        setUserTokens(res.data.data.token);
        AsyncStorage.setItem("userInfo", JSON.stringify(res.data.data));
        AsyncStorage.setItem("userTokens", res.data.data.token);
        setSuccessFul("Logged in");
      })
      .catch((e) => {
        setError("failed");
        console.log("e                ", e, LOGIN_API, data);
      });
    setError("");
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserTokens(null);
    AsyncStorage.removeItem("userTokens");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("userTokens");
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserTokens(token);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("usertokens errrrrrrprrrrrrrooo ", error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [isError]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userTokens,
        isError,
        isSuccessFul,
        userInfo,
        userTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
