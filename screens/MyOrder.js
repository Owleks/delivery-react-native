import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import { SelectedContext } from '../App';
import MenuItem from '../components/MenuItem';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const restaurantId = '5e33068ef2c9aa262c43247d';
const MyOrder = ({ navigation }) => {

  const [items, changeItems] = useState([]);
  const { selected, totalPrice, onChange } = useContext(SelectedContext);

  /* Form */
  const [customerName, changeCustomerName] = useState('');
  const [phoneNumber, changePhoneNumber] = useState('');
  const [address, changeAddress] = useState('');
  const [deliveryTime, changeDeliveryTime] = useState(''); // TODO: add datepicker
  const [comment, changeComment] = useState('');

  /* FORM */

  useEffect(() => {
    fetch(`http://api.besmart.link:3000/menu-item/?restaurantId=${restaurantId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        changeItems(responseJson.filter(item => selected[item._id]));
      });
  }, []);


  const onChangeCount = (item, add) => () => {
    const newValue = selected[item._id] ? selected[item._id] + add : 1;
    let updatedSelected;
    if (newValue > 0) {
      updatedSelected = { ...selected, [item._id]: newValue };
    } else {
      const { [item._id]: removedProp, ...ometedSelected } = selected;
      updatedSelected = ometedSelected;
    }
    onChange({
      selected: updatedSelected,
      totalPrice: totalPrice + add * item.price,
    });
  };

  const makeOrder = () => {
    fetch(`http://api.besmart.link:3000/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId,
        customerName,
        phoneNumber,
        address,
        deliveryTime: new Date(), // TODO: add datepicker
        description: comment,
        items: Object.entries(selected).map(([menuItemId, count]) => ({ menuItemId, count })),
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        onChange({
          selected: [],
          totalPrice: 0,
        });
        navigation.navigate('Menus');
      })
      .catch((e) => console.log(e));
  };

  const isDisabledMakeOrder = !(customerName && phoneNumber && address && deliveryTime && comment && totalPrice > 0);
  return (
    <KeyboardAvoidingView>
      <View style={styles.ordersContainer}>
        <Input label="Your name" value={customerName} onChange={changeCustomerName} />
        <Input label="Phone number" value={phoneNumber} onChange={changePhoneNumber} keyboardType="number-pad" />
        <Input label="Address" value={address} onChange={changeAddress} />
        <Input label="Delivery time" value={deliveryTime} onChange={changeDeliveryTime} />
        <Input label="Comment" value={comment} onChange={changeComment} />
        <Text style={styles.title}>Your order:</Text>
        <FlatList
          keyExtractor={item => item._id}
          data={items}
          renderItem={({ item }) => (
            <MenuItem item={item} onChangeCount={onChangeCount} count={selected[item._id] || 0} />
          )}
        />
      </View>
      <View style={styles.makeOrderContainer}>
        <View style={styles.countContainer}>
          <Text style={styles.totalPrice}>{totalPrice.toString()}</Text>
        </View>
        <TouchableOpacity
          onPress={makeOrder}
          style={[styles.makeOrderBtn, isDisabledMakeOrder && styles.makeOrderBtnDisabled]}
        >
          <Text>Make Order</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  ordersContainer: {
    height: '90%',
  },
  totalPrice: {
    color: 'red',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  countContainer: {
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  makeOrderContainer: {
    flexDirection: 'row',
    height: 30,
  },
  makeOrderBtn: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  makeOrderBtnDisabled: {
    backgroundColor: 'grey',
  },
});

export default MyOrder;
