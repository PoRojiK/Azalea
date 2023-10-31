import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://m924545m.beget.tech/register.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Регистрация успешна
        Alert.alert('Success', 'Registration successful!');
      } else {
        // Ошибка при регистрации
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      // Обработка ошибок сети или других ошибок
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again later.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Введите имя пользователя"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Введите вашу почту"
        secureTextEntry
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Введите ваш пароль"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;