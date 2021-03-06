import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Card from "../components/Card";

const Menus = ({navigation}) => {

  const [menus, changeMenus] = useState([])

useEffect(() => {
  fetch(`http://api.besmart.link:3000/menu/?restaurantId=5e33068ef2c9aa262c43247d`)
    .then((response) => response.json())
    .then((responseJson) => {
      changeMenus(responseJson);
    })
} ,[])

  const onSelectMenu = (id) => {
    const {name} = menus.find(menu=>menu._id === id);
    navigation.navigate({
      routeName: 'ConcreteMenu',
      params: { id, name }
    })
  }
  console.log(menus);
return (
  <View>
    {
        <FlatList
          data={menus}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectMenu(item._id)}
            >
              <Card style={styles.card}>
                <Image
                  style={styles.menuImage}
                  source={{uri: `https://owleks-delivery-app.s3.eu-central-1.amazonaws.com/${item.image}`}}
                />
                <Text>{item.name}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
    }
  </View>
);
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical:10,
    alignItems: 'center'
  },
  menuImage: {
    height: 200,
    width: '100%'
  }
});


export default Menus;