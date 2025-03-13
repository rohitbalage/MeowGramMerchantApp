import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { signOut } from 'firebase/auth';  // Import Firebase Authentication methods

export default class MerchantPosts extends React.Component {
   render() {
      return (
         <View style = {styles.container}>
            <Text>Mechant Upload Screen</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
