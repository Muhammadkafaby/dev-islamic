import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

const AssistantScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_OPENAI_KEY`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage.text }],
        }),
      });
      const data = await res.json();
      const botText = data.choices?.[0]?.message?.content || 'Tidak ada jawaban';
      setMessages((prev) => [...prev, { id: Date.now().toString(), from: 'bot', text: botText }]);
    } catch (e) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), from: 'bot', text: 'Error retrieving answer' }]);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.bubble, item.from === 'user' ? styles.user : styles.bot]}>
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Tulis pertanyaan..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputRow: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#e5e7eb' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12 },
  sendButton: { backgroundColor: '#10b981', paddingHorizontal: 16, justifyContent: 'center', marginLeft: 8, borderRadius: 8 },
  sendText: { color: '#fff' },
  bubble: { padding: 8, borderRadius: 8, marginBottom: 8, maxWidth: '80%' },
  user: { alignSelf: 'flex-end', backgroundColor: '#ecfdf5' },
  bot: { alignSelf: 'flex-start', backgroundColor: '#d1fae5' },
  bubbleText: { color: '#374151' },
});

export default AssistantScreen;
