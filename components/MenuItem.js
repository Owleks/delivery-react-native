import React, {memo} from 'react';
import Card from "./Card";
import {Image, StyleSheet, Text, View} from "react-native";
import IconButton from "./IconButton";
const MenuItem = ({item, onChangeCount, count}) => {
  return (
    <Card style={styles.card}>
      <Image
        style={styles.image}
        source={{uri: `https://picsum.photos/200?random=${item.id}`}}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: {item.price}</Text>
          <View style={styles.countContainer}>
            <IconButton disabled={!count} onPress={onChangeCount(item, -1)} style={styles.countBtn} iconName='ios-remove' />
            <Text style={styles.count}>{count.toString()}</Text>
            <IconButton onPress={onChangeCount(item, 1)} style={styles.countBtn}  iconName='ios-add' />

          </View>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical:10,
    alignItems: 'center',
    flexDirection:'row'
  },
  image: {
    width: '35%',
    height: '100%'
  },
  info: {
    paddingLeft: 5,
    width: '65%'
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    fontStyle: 'italic',
  },
  priceContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center'
  },
  countBtn: {
    width: 40,
    paddingHorizontal:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  count: {
    width:20
  }
})

export default (MenuItem);