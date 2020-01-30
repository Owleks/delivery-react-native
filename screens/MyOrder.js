import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Text, View, KeyboardAvoidingView, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Input from "../components/Input";
import {SelectedContext} from "../App";
import MenuItem from "../components/MenuItem";
import isDisabled from "react-native-web/dist/modules/AccessibilityUtil/isDisabled";


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const MENU_ITEMS_LIST= [...Array(150).keys()].map((el)=>({
  id:`it${el}`,
  name: `Name${el}`,
  price: getRandomInt(el*10),
  description:'desct super desrt sapld alskd lsk al akdslkdlask lask dlk lask dlask las lks aklasdksa klsa klsadk lask lka sldkasl kl'
}));

const simulateRequest = (ids) => (
  new Promise((resolve => {
    setTimeout(()=>{
      resolve(MENU_ITEMS_LIST.filter(item=>ids.some(id=>item._id===id)));
    }, 1500)
  }))
)
const restaurantId = '5e315ebb189d66a4568479c3';
const MyOrder = ({navigation}) => {

  const [items, changeItems] = useState([]);
  const {selected, totalPrice, onChange} = useContext(SelectedContext);

  /* Form */
  const [name, changeName] = useState('');
  const [phone, changePhone] = useState('');
  const [address, changeAddress] = useState('');
  const [time, changeTime] = useState('');
  const [comment, changeComment] = useState('');

  /* FORM */

  useEffect(()=>{
    fetch(`http://api.besmart.link:3000/menu-item/?restaurantId=${restaurantId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        changeItems(responseJson);
      })
  },[]);


  const onChangeCount = (item, add) => () => {
    const newValue = selected[item._id] ? selected[item._id] + add : 1;
    let updatedSelected;
    if (newValue > 0){
      updatedSelected = {...selected, [item._id]: newValue}
    } else {
      const {[item._id]:removedProp, ...ometedSelected } = selected;
      updatedSelected=ometedSelected;
    }
    onChange({
      selected: updatedSelected ,
      totalPrice: totalPrice + add * item.price
    })
  }

  const makeOrder = () => {
    console.log(JSON.stringify({
      restaurantId,
      description:comment,
      name,
      phone,
      items: [ Object.entries(selected).map(([menuItemId,count])=>({menuItemId,count}))]
    }));
    fetch(`http://api.besmart.link:3000/order`,{
      method: 'POST',
      body: ({
        restaurantId,
        description:comment,
        name,
        phone,
        items: [ Object.entries(selected).map(([menuItemId,count])=>({menuItemId,count}))]
      }
    )})
      .then((response) => response.text())
      .then((responseJson) => {navigation.navigate('Menus')})
      .catch((e)=>console.log(e))

  }

  const isDisabledMakeOrder = !(name&&phone&&address&&time&&comment&&totalPrice>0)
  return(
    <KeyboardAvoidingView>
      <ScrollView style={styles.ordersContainer}>
        <Input
            label="Your name"
            value={name}
            onChange={changeName}
        />
        <Input
            label="Phone number"
            value={phone}
            onChange={changePhone}
            keyboardType="number-pad"
        />
        <Input
          label="Address"
          value={address}
          onChange={changeAddress}
        />
        <Input
          label="Delivery time"
          value={time}
          onChange={changeTime}
        />
        <Input
          label="Comment"
          value={comment}
          onChange={changeComment}
        />
        <Text style={styles.title}>Your order:</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (<MenuItem item={item} onChangeCount={onChangeCount} count={selected[item._id] || 0} />)}
        />
      </ScrollView>
      <View style={styles.makeOrderContainer}>
        <View style={styles.countContainer}>
          <Text style={styles.totalPrice}>{totalPrice.toString()}</Text>
        </View>
        <TouchableOpacity onPress={makeOrder} style={[styles.makeOrderBtn, isDisabledMakeOrder && styles.makeOrderBtnDisabled]}>
          <Text>Make Order</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  ordersContainer: {
    height: '90%'
  },

  totalPrice: {
    color: 'red',
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  countContainer: {
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  makeOrderContainer: {
    flexDirection: 'row',
    height: 30
  },
  makeOrderBtn: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  makeOrderBtnDisabled: {
    backgroundColor: 'grey',
  }
})

export default MyOrder;