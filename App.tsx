// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import MerchantLogin from './screens/MerchantLogin';
import MerchantSignup from './screens/MerchantSignUp';
import MerchantDashboard from './screens/MerchantDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MerchantLogin">
        <Stack.Screen
          name="MerchantLogin"
          component={MerchantLogin}
          options={{ headerTitle: 'Merchant Login' }}
        />
        <Stack.Screen
          name="MerchantSignup"
          component={MerchantSignup}
          options={{ headerTitle: 'Merchant Sign Up' }}
        />
        <Stack.Screen
          name="MerchantDashboard"
          component={MerchantDashboard}
          options={{ headerTitle: 'Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
