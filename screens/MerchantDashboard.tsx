// MerchantDashboard.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';  // Import Firebase Authentication methods
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';  // Import the correct type
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import the auth instance from firebase.ts
import { auth } from '../firebase';  // Adjust the import path if necessary
import MerchantAboutus from './MerchantAboutus';
import MerchantInsights from './MerchantInsights';
import MerchantUplodContent from './MerchantUploadContent';
import MerchantPosts from './MerchantPosts';

const Tab = createBottomTabNavigator();

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

    <Tab.Navigator screenOptions={{
      animation: 'fade',
    }}>
      <Tab.Screen name="Contents" component={MerchantUplodContent} />
      <Tab.Screen name="Home" component={MerchantAboutus} />
      <Tab.Screen name="Posts" component={MerchantPosts} />
      <Tab.Screen name="Insights" component={MerchantInsights} />
    </Tab.Navigator>

    // <View style={styles.container}>
    //   <Text style={styles.title}>Merchant Dashboard</Text>
    //   <Text>Welcome, Merchant! This is your dashboard. (Under Construction)</Text>
    //   <Button title="Login" onPress={handleLogout} />
    // </View>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 16,
    fontFamily: 'Georgia',
    fontWeight: 300,
  },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});

export default MerchantDashboard;
