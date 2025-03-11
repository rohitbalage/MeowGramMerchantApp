// MerchantLogin.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import Firebase Authentication methods
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';  // Import the correct type
import { auth } from '../firebase';  // Import the auth instance from firebase.ts

type RootStackParamList = {
  MerchantLogin: undefined;
  MerchantSignup: undefined;
  MerchantDashboard: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MerchantLogin'>;

const MerchantLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Sign in using the imported auth instance
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MerchantDashboard');  // Navigate to dashboard after successful login
    } catch (err: any) {
      setError(err.message);  // Display error if login fails
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merchant Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('MerchantSignup')}
      />
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: { color: 'red', marginBottom: 10 },
});

export default MerchantLogin;
