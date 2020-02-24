import React, {useContext, useMemo, useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {SelectedContext} from '../App';
const Cart = ({navigation}) => {
  const {selected, totalPrice} = useContext(SelectedContext);
  const countItems = useMemo(()=>Object.values(selected).reduce((sum,i)=>(sum+i), 0),[selected]);
  const onPressCart = useCallback(() =>{
    navigation.navigate('MyOrder')
  },[navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressCart}
    >
      <Text>{totalPrice.toFixed(2).toString()}</Text>
      <Ionicons name='ios-cart' size={25} />
      <View style={styles.count}>
        <Text style={styles.countText}>{countItems.toString()}</Text>
      </View>
    </TouchableOpacity>
  )

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  count: {
    backgroundColor: 'red',
    padding: 5,
    width:20,
    height: 20,
    borderRadius: 10,
    color: 'white',
    justifyContent:'center',
    alignItems: 'center',
    position: 'relative',
    right: 10,
    bottom: 15
  },
  countText: {
    fontSize:10
  }
});

export default Cart;