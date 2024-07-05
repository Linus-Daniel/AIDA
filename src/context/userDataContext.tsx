// context/userDataContext.tsx
import React, { createContext, useState } from 'react';
import {fetchUserDetails} from '../services/userServices'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const loadUserDetails = async () => {
    try {
      const user = await fetchUserDetails();
      setUserDetails(user);
    } catch (error) {
      console.error('Failed to load user details:', error);
    }
  };

  // useEffect(() => {
  //   const checkTokenAndLoadUser = async () => {
  //     const token = await AsyncStorage.getItem('userToken');
  //     if (token) {
  //       await loadUserDetails();
  //     }
  //   };
  //   checkTokenAndLoadUser();
  // }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, loadUserDetails }}>
      
      {children}
      
    </UserContext.Provider>
  );
};
