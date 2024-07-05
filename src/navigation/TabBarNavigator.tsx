import React from 'react';
import { View } from 'react-native';
import TopArticles from '../screens/Articles/toparticles';
import NewArticles from '../screens/Articles/newarticles';
import Header from '../components/header';
import AllArticles from '../screens/Articles/allarticles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "transparent" },
        tabBarIndicatorStyle: { backgroundColor: 'tomato' }, // Indicator color
        tabBarActiveTintColor: 'tomato', // Active tab label color
        tabBarInactiveTintColor: 'gray', // Inactive tab label color
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <TopTab.Screen name='Top Articles' component={TopArticles} />
      <TopTab.Screen name='New' component={NewArticles} />
      <TopTab.Screen name='All' component={AllArticles} />
    </TopTab.Navigator>
  );
}

function ArticleScreen() {
  return (
    
    <SafeAreaView style={{ flex: 1}}>
      <Header />
      <TopTabs />
    </SafeAreaView>
  );
}

export default ArticleScreen;
