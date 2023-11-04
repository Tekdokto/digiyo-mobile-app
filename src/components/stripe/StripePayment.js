import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../config/urls';

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { createPaymentMethod, confirmPayment } = useConfirmPayment();

  // const fetchPaymentIntentClientSecret = async () => {
  //   const response = await fetch('http://localhost:3200/checkout/payment', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       currency: 'usd',
  //     }),
  //   });
  //   const {clientSecret} = await response.json();

  //   return clientSecret;
  // };

  const handlePayment = async () => {
    setProcessing(true);
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    if (!createPaymentMethod) {
      console.error('createPaymentMethod not available');
      return;
    }
    const clientSecret = { 
        amount: 1099,
        currency: 'usd',
        payment_method_types: ['card'],
    }
    // const clientSecret = await fetchPaymentIntentClientSecret();


    const { paymentMethod, error } = await createPaymentMethod( clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {billingDetails}
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
      console.log('[error]', error);
    } else {
      try {
        const response = await axios.post('http://localhost:3200/checkout/payment', {
          amount: 1000,
          paymentMethodId: paymentMethod.id,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <View>
      {!success ? (
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            {'$29.99'}
          </Text>
          <Text style={{ color: '#66ff66', fontSize: 18, marginBottom: 20 }}>
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
              backgroundColor: '#66ff66',
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
