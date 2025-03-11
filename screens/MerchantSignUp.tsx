// MerchantSignup.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  MerchantLogin: undefined;
  MerchantSignup: undefined;
  MerchantDashboard: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MerchantSignup'>;

const MerchantSignup = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // profilePic should be a local file URI after image selection
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Dummy image picker implementation
  const handleSelectProfilePic = () => {
    // In a real app, integrate an image picker library.
    // For demonstration, we use a placeholder local URI.
    setProfilePic('file:///path/to/local/image.jpg');
  };

  const handleSignUp = async () => {
    try {
      // Create the user in Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      let profilePicUrl = '';
      if (profilePic) {
        // Upload the profile picture to Firebase Storage and retrieve its URL
        const reference = storage().ref(`/profilePictures/${uid}`);
        await reference.putFile(profilePic);
        profilePicUrl = await reference.getDownloadURL();
      }
      // Save merchant details in Firestore
      await firestore().collection('merchants').doc(uid).set({
        name,
        description,
        email,
        profilePicUrl,
        mid: uid, // using uid as merchant id
      });
      navigation.navigate('MerchantDashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merchant Sign Up</Text>
      <TouchableOpacity
        style={styles.profilePicPlaceholder}
        onPress={handleSelectProfilePic}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <Text>Select Profile Picture</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('MerchantLogin')}
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
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default MerchantSignup;
