import React, { useContext } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '@/context/userDataContext'; // Adjust the context import path as needed
import userImage from '../assets/user.png'; // Correct the image import path

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { userDetails } = useContext(UserContext);
  const navigation = useNavigation();



  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F6F4', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Image source={userImage} style={{ height: 50, width: 50, borderRadius: 50 }} />
      </Pressable>

      <Pressable>
        <Icon size={26} name='search-outline' />
      </Pressable>
    </View>
  );
};

export default Header;
