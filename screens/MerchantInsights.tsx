import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MerchantInsights extends React.Component {
   render() {
      return (
         <View style = {styles.container}>
            <Text>Merchant Insights</Text>
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
