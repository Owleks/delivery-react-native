import React, {useEffect, useState, useContext} from 'react';
import {FlatList, View} from 'react-native';
import MenuItem from "../components/MenuItem";

import {SelectedContext} from "../App";

const ConcterMenu = ({navigation}) => {

  const [items, changeItems] = useState([]);
  const {selected, totalPrice, onChange} = useContext(SelectedContext);

  useEffect(()=>{
    const id = navigation.getParam('id')

    fetch(`http://api.besmart.link:3000/menu-item/?menuId=${id}`)
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