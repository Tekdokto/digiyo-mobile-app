import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { JOIN_FOUNDERS } from '../../config/urls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR } from '../../constants/colors';
import ThemeContext from '../../theme/ThemeContext';

const PaymentForm = (props) => {

  const theme = useContext(ThemeContext)
  
  const { userTokens } = useContext(AuthContext)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { createPaymentMethod, confirmPayment } = useStripe();

  const navigate = useNavigation()


  const handlePayment = async () => {

    setError(null)
    setProcessing(true);

    const billingDetails = {
      // email: "props@email.com"
      email: props.email
    };

    if (!createPaymentMethod) {
      console.error('createPaymentMethod not available');
      return;
    }

    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      paymentMethodData: {billingDetails}
      ,
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
      console.log('[error]', error);
    } else {
      console.log('Success from promise', paymentMethod);
      console.log('Success from promise', paymentMethod.id);
      console.log('Success from promise', paymentMethod.billingDetails.email);
      try {

        const config = {
          method: "post",
          url: JOIN_FOUNDERS,
          headers: {
            "Authorization": userTokens,
            "Content-Type": "application/json"
          },
          data: {
            "email" : props.email,
            "intent_id": paymentMethod.id
          },
        }

        axios(config).then((res) => {
          console.log("yep    we in", res.data)
          navigate.replace("LoginScreen")
        }).catch((error) => {
          console.log("bopw    we oitr ", error)
        }) 
      } catch (error) {
        console.log('Error', error);
      } finally {
      }
      setProcessing(false);
    }
  };

  return (
    <View>
      {!success ? (
        <View>
          <Text style={{ fontSize: 24, fontFamily: 'SemiBold', marginBottom: 20 }}>
            {'$29.99'}
          </Text>
          <Text style={{ color: theme.color,fontFamily: 'Regular', fontSize: 16, marginBottom: 20 }}>
            Pre-order and Join Founders Club
          </Text>
          <CardField
            postalCodeEnabled={true}
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: 'black',
              padding: 10,
              height: 50,
            }}
          />

          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <TouchableOpacity
            onPress={handlePayment}
            disabled={processing}
            style={{
              backgroundColor: PRIMARY_COLOR,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {processing ? (
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Processing...</Text>
            ) : (
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Pay</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Congrats, you just joined DigiYo Founders Club, this is the best decision of your life</Text>
      )}
    </View>
  );
};

export default PaymentForm;
