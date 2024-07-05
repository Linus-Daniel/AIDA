// services/userService.tsx
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Retrieved token:', token); // Debug log to check token
    if (token) {
      const response = await axios.get('http://192.168.43.167:8000/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('User Details:', response.data); // Debug log to check response
      return response.data;
    } else {
      throw new Error('No token found');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
