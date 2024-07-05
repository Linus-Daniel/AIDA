import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigation = useNavigation();

  const averageKeyboardHeight = Platform.select({
    ios: 216,
    android: 200,
    default: 0,
  });


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  const handleRegister = () => {
    const url = "http://192.168.43.167:8000/register";
    const user = {
      name: name,
      email: email,
      password: password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.tsxon();
      })
      .then((responseData) => {
        console.log(responseData);
        Alert.alert("Registration successful");
        SetName("");
        SetEmail("");
        SetPassword("");
        navigation.replace("Login");
      })
      .catch((error) => {
        console.error("An error occurred");
        console.error(error);
        Alert.alert("Failed to register");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable onPress={dismissKeyboard} style={{ flex: 1 }} className="items-center bg-white h-full">

      <View
        style={{
          height: 300,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          className="w-56 h-56 rounded-full"
        />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={averageKeyboardHeight / 2}>
        <View>
          <Text className="text-[#041e42] text-3xl">Create an account</Text>
          <Text>Start a Healthy journey with us</Text>
        </View>
        <View className="mb-[70px] mt-5">
          <View className="bg-transparent border-[1px] my-[20px] items-center gap-[5px] flex-row py-[5px] px-1 w-[300px] rounded-md">
            <Ionicons color={"gray"} name="person" size={24} />
            <TextInput
              style={{ flex: 1 }}
              className="w-[inherit]"
              value={name}
              onChangeText={(name) => {
                SetName(name);
              }}
              placeholder="Name"
            />
          </View>
          <View className="bg-transparent border-[1px] my-[20px] items-center gap-[5px] flex-row py-[5px] px-1 w-[300px] rounded-md">
            <Ionicons color={"gray"} name="mail" size={24} />
            <TextInput
              style={{ flex: 1 }}
              className="w-[inherit]"
              value={email}
              onChangeText={(email) => {
                SetEmail(email);
              }}
              placeholder="Email"
              />
          </View>
          <View className="bg-transparent border-[1px] items-center gap-[5px] flex-row w-[300px] py-[5px] px-1 rounded-md">
            <AntIcon size={24} color={"gray"} name="lock1" />
            <TextInput
              className=""
              value={password}
              onChangeText={(password) => {
                SetPassword(password);
              }}
              placeholder="Password"
              />
          </View>
          <View className="justify-between flex-row mt-[10px]">
            <View>
              <Text>Keep me logged in</Text>
            </View>
            <Text className="text-blue-400 font-bold text-md">
              Forgot password
            </Text>
          </View>
        </View>
        <View className="items-center gap-4">
          <TouchableOpacity
            onPress={handleRegister}
            className="rounded-md bg-[#F87413] w-full h-[50px] items-center justify-center"
            >
            <Text className="text-white font-bold text-xl">Sign up</Text>
          </TouchableOpacity>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text className="text-md text-blue-700">Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
            </Pressable>
    </SafeAreaView>
  );
}
