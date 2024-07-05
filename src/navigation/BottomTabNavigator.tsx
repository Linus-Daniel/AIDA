import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Services from "../screens/services"
import Messages from "../screens/messages"
import TopNav from "./TabBarNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntIcon from "@expo/vector-icons/AntDesign";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Services') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Articles') {
            iconName = focused ? 'book' : 'book-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Messages') {
            return <AntIcon name="message1" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
      />
      <BottomTab.Screen
        name="Services"
        component={Services}
      />
      <BottomTab.Screen
        name="Articles"
        component={TopNav}
      />
      <BottomTab.Screen
        name="Messages"
        component={Messages}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
