import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Card = (props) => {
  return (
    <View style={{...styles.container, ...props.style}}>{props.children}</View>
  );
}


const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
});

export default Card;