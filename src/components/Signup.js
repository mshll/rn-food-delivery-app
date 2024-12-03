import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomStatusBar from './CustomStatusBar';
import Button from './Button';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Text style={styles.title}>ZestZoom</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor={'#797b89'} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={'#797b89'}
        />
        <View style={{ flex: 1 }} />
        <View style={{ width: '80%' }}>
          <Button title="Signup" bgColor="#f7ffae" color="#1b1d21" />
        </View>
      </View>
    </CustomStatusBar>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#d3e8d6',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#797b89',
    backgroundColor: '#222429',
    color: '#d3e8d6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
