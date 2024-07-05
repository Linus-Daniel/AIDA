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
import { chats } from "../utils/dummy";

const Messages = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const handleParticipantPress = (chat) => {
    // Navigate to Chat Screen with chat data
    navigation.navigate('Chat', { chat });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Header />
        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10, marginTop: 20 }}>
          Emergency Consultancy with your Recommended Doctors
        </Text>
      </View>
      {/* <ScrollView
        style={{ marginBottom: 10 }}
        horizontal
      >
        {prevChats.map((item, index) => (
          <Pressable
            key={index}
            style={{
              paddingBottom: 30,
              alignItems: "center",
              position: "relative",
              marginHorizontal: 10,
            }}
            onPress={() => navigateToChat(index, item.name)}
          >
            <View>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
                source={item.image } // Assuming item.image is a URI or require() path
              />
            </View>
            <Text>{item.name}</Text>
            <View style={{ position: "absolute", right: 0, top: 3, backgroundColor: "green", width: 10, height: 10, borderRadius: 5 }} />
          </Pressable>
        ))}
      </ScrollView> */}

      <ScrollView style={{ marginBottom: 10, paddingHorizontal: 10 }}>
        <View>
        <ScrollView>
        {chats.map((chat, index) => {
          const otherParticipant = chat.participants.find(participant => participant.name !== 'Linus Vandu Daniel');
          return (
            <Pressable
              key={index}
              onPress={() => handleParticipantPress(chat)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16, 
                borderBottomWidth: 1,
                borderBottomColor: '#E5E7EB',
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={otherParticipant.profile_picture} // Use actual profile picture source
              />
              <Text style={{ marginLeft: 12, fontSize: 18 }}>{otherParticipant.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
