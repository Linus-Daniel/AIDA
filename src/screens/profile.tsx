import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import image from "../assets/onboarding/second.png";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = () => {
    const { width, height } = Dimensions.get('window');

  const navigation = useNavigation();
  const items = [
    {
      title: "Blood Type",
      value: "O+",
    },
    {
      title: "weight",
      value: "64kg",
    },
    {
      title: "Heigh",
      value: "25cm",
    },
    {
      title: "birthday",
      value: "11 Nov 2000",
    },
    {
      title: "sex",
      value: "Male",
    },
    {
      title: "more",
      value: "+",
    },
  ];
  return (
    <ScrollView  style={{backgroundColor:"white"}}>
      <View  style={{marginVertical:20, marginHorizontal:20, padding:4, flexDirection:"row", gap:width/3}}>
        <TouchableOpacity style={{backgroundColor:"#EF873D", paddingHorizontal:10, paddingVertical:5, borderRadius:8}} onPress={() => navigation.goBack()}>
          <Text style={{color:"white", fontSize:15}}>Back</Text>
        </TouchableOpacity>
          <Text style={{color:"#F87413"}}>Profile</Text>
      </View>
      <View style={{ flexDirection: "row", backgroundColor:"#F9F6F4", alignItems: "center", marginHorizontal:10, paddingHorizontal:20, gap:10 }}>
        <Image
          source={image}
          style={{ width: 100, height: 100, borderRadius: 20 }}
        />
        <View style={{}}>
          <Text>Name</Text>
          <Text>Medical ID</Text>
        </View>
      </View>
      <View style={{flexWrap:"wrap", paddingHorizontal:40 , flexDirection:"row", marginTop:40, gap:30 }}>
        {items.map((item, index) =>{ return (
          <View
            style={{
              backgroundColor: "#F9F6F4",
              width: 150,
              height: 150,
              padding: 10,
              alignItems:"center",
              justifyContent:"center",
              borderRadius:20
            }}
            key={index}
          >
            <Text style={{color:"black", fontSize:25}}>{item.title}</Text>
            <Text style={{color:"#9A9896", fontSize:15}}>{item.value}</Text>
          </View>
        )})}
      </View>
    </ScrollView>
  );
};

export default Profile;
