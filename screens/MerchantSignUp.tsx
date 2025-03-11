import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  MerchantSignup: undefined;
  MerchantLogin: undefined;
  MerchantDashboard: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "MerchantSignup">;

const MerchantSignup = () => {
  const navigation = useNavigation<NavigationProp>();

  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const selectProfilePicture = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("Image Picker Response:", response);
  
      const imageUri = response.assets?.[0]?.uri ?? null; // Ensure it's a string or null
  
      if (imageUri) {
        setProfilePic(imageUri);
      } else {
        Alert.alert("Error", "No image selected.");
      }
    });
  };
  

  const handleSignup = async () => {
    if (!storeName || !storeDesc || !email || !password || !profilePic) {
      Alert.alert("Error", "Please fill all fields and select a profile picture.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Upload profile picture to Firebase Storage
      const response = await fetch(profilePic);
      const blob = await response.blob();
      const imageRef = ref(storage, `profile_pictures/${user.uid}.jpg`);
      await uploadBytes(imageRef, blob);
  
      // Get image URL
      const profilePicURL = await getDownloadURL(imageRef);
  
      // Save user details in Firestore
      await setDoc(doc(db, "merchants", user.uid), {
        storeName,
        storeDesc,
        email,
        profilePicURL,
        createdAt: new Date(),
      });
  
      Alert.alert("Success", "Merchant account created!");
      navigation.navigate("MerchantDashboard");
    } catch (error: any) {
      console.error("Error during signup: ", error);
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merchant Sign Up</Text>

      <TouchableOpacity onPress={selectProfilePicture} style={styles.imagePicker}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePickerText}>Select Profile Picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={storeName}
        onChangeText={setStoreName}
      />

      <TextInput
        style={styles.input}
        placeholder="Store Description"
        value={storeDesc}
        onChangeText={setStoreDesc}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("MerchantLogin")}
      >
        <Text style={styles.buttonText}>BACK TO LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#888",
    fontSize: 14,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
  },
});

export default MerchantSignup;
