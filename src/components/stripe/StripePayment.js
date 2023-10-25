import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { Button } from 'react-native';
import { View } from 'react-native';

function PaymentScreen() {
  // ...
  
  const {confirmPayment, loading} = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {clientSecret} = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
      
      if (!card) {
        return;
      }
    const billingDetails = {
        email: 'jenny.rosen@example.com',
      };
      
    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      });
      if (error) {
        console.log('Payment confirmation error', error);
      } else if (paymentIntent) {
        console.log('Success from promise', paymentIntent);
      }
      
  };


  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}

export default PaymentScreen;