import React, { useState, useContext } from 'react';
import { View,Switch, Text, TextInput, TouchableOpacity, Pressable, Alert, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const { loadUserDetails } = useContext(UserContext);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.43.167:8000/login', user);
      const token = response.data.token; 
      // await AsyncStorage.setItem('userToken', token);
      if (keepLoggedIn) {
        await AsyncStorage.setItem('userToken', token);
      } else {
        // Clear any existing stored token
        await AsyncStorage.removeItem('userToken');
      }
      await loadUserDetails(); 
      setLoading(false);
      navigation.navigate('BottomTab');
    } catch (error) {
      setLoading(false);
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 350, justifyContent: 'center' }}>
            <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200, borderRadius: 100 }} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#041e42', fontSize: 24 }}>Welcome Back</Text>
            <Text>Login to continue</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', borderWidth: 1, marginBottom: 20, borderColor: '#ccc', width: 300, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
              <Ionicons color={'gray'} name="mail" size={24} />
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your Email"
                keyboardType="email-address"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', borderWidth: 1, marginBottom: 20, borderColor: '#ccc', width: 300, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
              <AntIcon size={24} color={'gray'} name="lock1" />
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Switch
                  value={keepLoggedIn}
                  onValueChange={setKeepLoggedIn}
                />
                <Text>Keep me logged in</Text>
              </View>
              <Text style={{ color: 'blue', fontWeight: 'bold' }}>Forgot password</Text>
            </View>
            </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleLogin}
              style={{ backgroundColor: email && password ? '#F87413' : '#ccc', width: '80%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
              disabled={!email || !password || loading}
            >
              {loading ? <ActivityIndicator size="large" color="white" /> : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Login</Text>}
            </TouchableOpacity>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={{ marginTop: 10, color: 'blue' }}>Create an account</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
