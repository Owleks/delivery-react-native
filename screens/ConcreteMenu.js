import React, {useEffect, useState, useContext} from 'react';
import {FlatList, View} from 'react-native';
import MenuItem from "../components/MenuItem";

import {SelectedContext} from "../App";


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const MENU_ITEMS_LIST= [...Array(150).keys()].map((el)=>({
  id:`it${el}`,
  name: `Name${el}`,
  price: getRandomInt(el*10),
  description:'desct super desrt sapld alskd lsk al akdslkdlask lask dlk lask dlask las lks aklasdksa klsa klsadk lask lka sldkasl kl'
}));

const simulateRequest = (id) => (
  new Promise((resolve => {
    setTimeout(()=>{resolve(MENU_ITEMS_LIST)}, 1500)
  }))
)

const ConcterMenu = ({navigation}) => {

  const [items, changeItems] = useState([]);
  const {selected, totalPrice, onChange} = useContext(SelectedContext);

  useEffect(()=>{
    const id = navigation.getParam('id')

    fetch(`http://api.besmart.link:3000/menu-item/?menuId=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        changeItems(responseJson);
      })

    //TODO: REQUEWST TO GET all ITEMS
    // simulateRequest(id).then(newItems=>{
    //   changeItems(newItems)
    // });
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

  return(
    <View>
      <FlatList
        keyExtractor={item => item._id}
        data={items}
      renderItem={({ item }) => (<MenuItem item={item} onChangeCount={onChangeCount} count={selected[item._id] || 0} />)}
      />
    </View>
  )
}

ConcterMenu.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name', 'Menu'),
});
export default ConcterMenu;