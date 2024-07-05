import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome5"
const ChatScreen = ({ route }) => {
  const { chat } = route.params;
  const [messages, setMessages] = useState(chat.messages);
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation()

  // Dummy data for participants (replace with actual data)
  const participants = chat.participants.filter(participant => participant.name !== 'Linus Vandu Daniel');

  // Function to send a new message
  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      sender_name: "Linus Vandu Daniel", // Assuming current user sends the message
      timestamp_ms: Date.now(),
      content: inputText,
      is_geoblocked_for_viewer: false,
    };

    // Update the messages state by prepending the new message
    setMessages([newMessage, ...messages]); // New message at the top
    setInputText('');
  };

  // Render each message in the FlatList
  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender_name === "Linus Vandu Daniel"; // Assuming Linus is the current user
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.messageTimestamp}>{new Date(item.timestamp_ms).toLocaleTimeString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.participantsContainer}>
        {participants.map((participant, index) => (
          <View key={index} style={styles.participant}>
            <TouchableOpacity onPress={navigation.goBack}>

            <FontAwesome name="chevron-left" size={25} />
            </TouchableOpacity>
            <Image source={participant.profile_picture} style={styles.participantImage} />
            <Text style={styles.participantName}>{participant.name}</Text>
          </View>
        ))}
      </View>
      <FlatList
        data={messages.reverse()} // Reverse the order of messages
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted // Start from the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical:10,
    gap:10,
  },
  participantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  participantName: {
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#808080',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 150,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChatScreen;
