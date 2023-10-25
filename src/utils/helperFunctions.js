import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { API_BASE_URL } from '../config/urls';


export const storeData = async (key, value) => {
    try {
        var jsonValue = value
        if (typeof (value) !== 'string') {
            jsonValue = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        return e
    }
};


export const getData = async (key) => {
    try {
        const res = await AsyncStorage.getItem(key);
        return res != null ? typeof (res) !== 'string' ? JSON.parse(res) : res : null;
    } catch (e) {
        return e
        // error reading value
    }
};

export const showError = (message) =>{
    showMessage({
        type: 'danger',
        icon:"danger",
        message,
        duration: 2500
    })
}

export const showSucess = (message) =>{
    showMessage({
        type: 'success',
        icon:"success",
        message,
        duration: 2500
    })
}  


export async function fetchPublishableKey(paymentMethod) {
    try {
        
      const response = await fetch(`${API_BASE_URL}/stripe-key?paymentMethod=${paymentMethod}`);
  
      const { publishableKey } = await response.json();
  
      return publishableKey;
    } catch (e) {
      console.warn('Unable to fetch publishable key. Is your server running?');
      Alert.alert('Error', 'Unable to fetch publishable key. Is your server running?');
      return null;
    }
  }
  