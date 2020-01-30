import React from 'react';
import {View, TouchableWithoutFeedback, Text } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const IconButton = ({iconName, onPress, style, disabled}) => {
  return(
      <TouchableWithoutFeedback disabled={disabled}   onPress={onPress}>
          <View style={style}>
            <Ionicons name={iconName} size={15} />
            <Text> </Text>
        </View>
      </TouchableWithoutFeedback>
  )
}

export default IconButton;