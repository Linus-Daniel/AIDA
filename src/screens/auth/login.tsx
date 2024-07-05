// components/Login.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '../../context/userDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { loadUserDetails } = useContext(UserContext);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post('http://192.168.43.167:8000/login', user);
      console.log(response.data.token);
      const token = response.data.token; // Adjust this according to your response structure
      await AsyncStorage.setItem('userToken', token);
      await loadUserDetails(); // Load user details into context
    } catch (error) {
      if (error.response) {
        Alert.alert('Login failed', error.response.data.message);
        console.log('Error Response:', error.response);
      } else if (error.request) {
        Alert.alert('No response from server');
        console.log('Error Request:', error.request);
      } else {
        Alert.alert('Error', error.message);
        console.log('Error Message:', error.message);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }} className="items-center bg-white h-full">
      <View style={{ height: 350, justifyContent: 'center' }}>
        <Image source={require('../../assets/logo.png')} className="w-56 h-56 rounded-full" />
      </View>
      <View>
        <Text className="text-[#041e42] text-3xl">Welcome Back</Text>
        <Text>Login to continue</Text>
      </View>
      <View className="mb-[70px] mt-5">
        <View className="bg-transparent border-[1px] my-[20px] items-center gap-[5px] flex-row py-[5px] px-1 w-[300px] rounded-md">
          <Ionicons color={"gray"} name="mail" size={24} />
          <TextInput
            style={{ flex: 1 }}
            className="w-[inherit]"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your Email"
          />
        </View>
        <View className="bg-transparent border-[1px] items-center gap-[5px] flex-row w-[300px] py-[5px] px-1 rounded-md">
          <AntIcon size={30} color={"gray"} name="lock1" />
          <TextInput
            className=""
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
          />
        </View>
        <View className="justify-between flex-row mt-[10px]">
          <View>
            <Text>Keep me logged in</Text>
          </View>
          <Text className="text-blue-400 font-bold text-md">Forgot password</Text>
        </View>
      </View>
      <View className="w-full items-center gap-4">
        <TouchableOpacity onPress={handleLogin} className="rounded-md bg-[#F87413] w-[80%] h-[50px] items-center justify-center">
          <Text className="text-white font-bold text-xl">Login</Text>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text className="text-md text-blue-700">Create an account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
