import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'users.db',
  location: 'Azalea',
});

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('User registered successfully');
            // Navigate to the next screen or perform other actions
          } else {
            console.log('Registration failed');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationScreen;