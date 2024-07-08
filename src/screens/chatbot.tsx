import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ListRenderItem, Image } from 'react-native';
import axios from 'axios';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  avatar: any; // Update this to a suitable type for your avatar images
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = { text: inputText, sender: 'user', avatar: require('../assets/user.png') };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await getChatGPTResponse(inputText);
      const botMessage: Message = { text: response, sender: 'bot', avatar: require('../assets/ai.png') };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const botMessage: Message = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot', avatar: require('../assets/ai.png') };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    setInputText('');
  };

  const getChatGPTResponse = async (userInput: string): Promise<string> => {
    const apiKey = 'sk-proj-7wIxt86OyaoOKLtswOjAT3BlbkFJFjytdRrEFsHEvtcHylaS';
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userInput }],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log('API response:', response.data); 
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching the response from OpenAI:', error.response ? error.response.data : error.message);
      throw new Error('API request failed');
    }
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={inputText}
        onChangeText={setInputText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: {
    flex: 1,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatBot;
