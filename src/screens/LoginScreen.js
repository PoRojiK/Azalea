import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'userdb.db', createFromLocation: 1 });

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            alert('Login successful');
            // Navigate to the home screen or another authenticated screen
          } else {
            alert('Login failed');
          }
        }
      );
    });
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;