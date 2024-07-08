import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { services } from '@/shared'
import ServiceCard from '@/components/serviceCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Services = () => {
  return (
    <SafeAreaView style={{
      flexDirection:"row",
      flexWrap:"wrap",
      gap:25,
      paddingHorizontal:10,
      justifyContent:"center"
   
    }}>
      
      {
        services.map((item,index)=>(
          <ServiceCard key={index} title={item.title} image={item.image} />
        ))
      }
      <Text>Hello world</Text>

    </SafeAreaView>
  )
}

export default Services