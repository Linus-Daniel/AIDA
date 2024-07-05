import { View, Text, Image, Pressable } from 'react-native'
import React,{useContext} from 'react'
import image from "../assets/user.png"
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"

const Header = () => {
  // function UserProfile() {
  //   const { userDetails } = useContext(UserContext);
  
  //   return (
  //     <View>
  //       {userDetails ? (
  //         <>
  //           <Text>Name: {userDetails.name}</Text>
  //           <Text>Email: {userDetails.email}</Text>
  //         </>
  //       ) : (
  //         <Text>No user details found</Text>
  //       )}
  //     </View>
  //   );
  // }
  



    const navigation= useNavigation()
  return (
    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:"#F9F6F4", justifyContent:"space-between", paddingHorizontal:20, paddingVertical:10}}>
      <Pressable onPress={()=>navigation.navigate("Profile")}>

      <Image source={image} style={{height:50,width:50, borderRadius:50}} />
      </Pressable>

      <Pressable>


        <Icon size={26} name='search-outline'/>
      </Pressable>
      {/* <UserProfile /> */}

    </View>
  )
}

export default Header