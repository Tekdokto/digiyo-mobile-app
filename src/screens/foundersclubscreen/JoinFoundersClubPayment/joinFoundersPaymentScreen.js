import React from 'react'
import PaymentScreen from '../../../components/stripe/StripePayment'
import { StripeProvider } from '@stripe/stripe-react-native'

const JoinFoundersPaymentScreen = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <PaymentScreen />
    </StripeProvider>
  )
}

export default JoinFoundersPaymentScreen