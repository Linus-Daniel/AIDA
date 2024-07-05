import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/onboarding/onboarding";
import Home from "../screens/Home";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/profile";
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import ChatScreen from "../screens/chat";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="BottomTab">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Onboarding"
          component={Onboarding}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTab"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={ChatScreen}
        />
        </Stack.Navigator>
  );
};

export default StackNavigator;
