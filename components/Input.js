import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

 const Input = (props) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...props.style}}
        onChangeText={props.onChange}
        value={props.value}
      />
    </View>

  );
}


const styles = StyleSheet.create({
  label:{
    marginVertical: 8
  },
  input:{
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default Input;