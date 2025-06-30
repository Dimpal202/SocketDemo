import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, SafeAreaView } from 'react-native';
import io, { Socket } from 'socket.io-client';


const socket = io('http://192.168.29.133:3000'); // Server address  here i write the url of the local host so 


export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    // Listen to messages from the server
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });



  }, [messages]);
  // useEffect(() => {


  //   return () => {
  //     socket.disconnect(); // Close socket connection when component unmount
  //   };
  // }, [])
  console.log("socket===>", socket);


  const sendMessage = () => {
    // Sending a message
    if (message.trim() !== '') {
      socket.emit('message', message);
      setMessage('');
    }
    else {
      Alert.alert("Enter a msg.")
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "lightgrey" }}>


      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <ScrollView style={{ flex: 1, marginBottom: 16 }}>
          {messages.map((msg, index) => (
            <View key={index} style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0.5, borderColor: "grey", alignSelf: "flex-start", borderTopRightRadius: 5, marginHorizontal: 5, marginVertical: 5 }}>
              <Text style={{ color: "black", fontSize: 15, paddingHorizontal: 20, paddingVertical: 5, }}>{msg}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 8 }}
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View >


    </SafeAreaView >
  );
}