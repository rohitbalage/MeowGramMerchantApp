// MerchantDashboard.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';  // Import Firebase Authentication methods
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';  // Import the correct type

// Import the auth instance from firebase.ts
import { auth } from '../firebase';  // Adjust the import path if necessary

type RootStackParamList = {
  MerchantLogin: undefined;
  MerchantSignup: undefined;
  MerchantDashboard: undefined;
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'MerchantDashboard'
>;

const MerchantDashboard = () => {
  const navigation = useNavigation<NavigationProp>();  // Use the NavigationProp here

  const handleLogout = async () => {
    try {
      // Sign out the user using the imported auth instance
      await signOut(auth);
      navigation.navigate('MerchantLogin');  // Navigate to the login screen
    } catch (error) {
      console.error('Error signing out: ', error);  // Handle sign-out errors
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merchant Dashboard</Text>
      <Text>Welcome, Merchant! This is your dashboard. (Under Construction)</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});

export default MerchantDashboard;
