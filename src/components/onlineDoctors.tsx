import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import { chats } from "@/utils/dummy";

const OnlineDoctors = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const handleParticipantPress = (chat) => {
    // Navigate to Chat Screen with chat data
    navigation.navigate('Chat', { chat });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", }}>
      <View>
        <Header />
        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10, marginTop: 20 }}>
          Emergency Consultancy with your Recommended Doctors
        </Text>
      </View>
      
      
      <ScrollView horizontal  style={{ marginVertical: 5}}
        horizontal>
        {chats.map((chat, index) => {
          const otherParticipant = chat.participants.find(participant => participant.name !== 'Linus Vandu Daniel');
          return (
            <Pressable
              onPress={() => handleParticipantPress(chat)}
              key={index}
            style={{
              
              alignItems: "center",
              position: "relative",
              marginHorizontal: 10,
            }}
            ><View>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
                source={otherParticipant?.profile_picture } // Assuming item.image is a URI or require() path
              />
            </View>
            <Text  style={{marginBottom:5}}>{otherParticipant?.name}</Text>
            <View style={{ position: "absolute", right: 0, top: 3, backgroundColor: "green", width: 10, height: 10, borderRadius: 5 }} />
         
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineDoctors;
