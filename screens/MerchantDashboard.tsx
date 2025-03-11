// MerchantDashboard.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('MerchantLogin');
      });
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
