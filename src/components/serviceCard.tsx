import { View, Text, Image } from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ServiceCard = ({title,image}) => {
  return (
    <TouchableOpacity style={{
      alignItems:"center"

    }}>
        <Image source={image} style={{
          width:100,
          height:100
        }} />
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default ServiceCard