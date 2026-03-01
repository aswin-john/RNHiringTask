import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { account } from './src/config/appwrite';

const App = () => {
  const [status, setStatus] = useState('Not Tested');

  const testAppwrite = async () => {
    setStatus('Testing...');
    try {
      // Create a temporary anonymous session to test connectivity
      await account.createAnonymousSession();
      setStatus('Success! Connected to Appwrite.');
      // Clean it up immediately
      await account.deleteSession('current');
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appwrite Connection Test</Text>
      <Text style={styles.status}>{status}</Text>
      <Button title="Test Connection" onPress={testAppwrite} color="#4623C5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  status: {
    fontSize: 16,
    marginBottom: 40,
    color: '#10B981',
    textAlign: 'center',
  },
});

export default App;
