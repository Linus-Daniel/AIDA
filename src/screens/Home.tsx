import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/header'
import OnlineDoctors from '@/components/onlineDoctors'

const Home = () => {
  return (
    <SafeAreaView>
        <OnlineDoctors />
      <ScrollView>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home