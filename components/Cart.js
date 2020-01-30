import React, {useContext, useMemo, useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet} from "react-native";
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
      <Text>{totalPrice.toString()}</Text>
      <Ionicons name='ios-cart' size={25} />
      <Text>{countItems.toString()}</Text>
    </TouchableOpacity>
  )

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  }
});

export default Cart;