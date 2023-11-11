import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {s} from 'react-native-wind';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase({
  name: 'users.db',
  location: 'Azalea',
});

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigationLogin = useNavigation();

  const handleLogin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password.toString()],
        (tx, results) => {
          if (results.rows.length > 0) {
            console.log('Вход выполнен успешно');
            // Перенаправление на профиль или другую страницу после успешного входа.
            navigationLogin.navigate('Профиль', {username});
          } else {
            alert('Неверное имя пользователя или пароль');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };

  return (
    <View style={s`flex-1 justify-center items-center`}>
      <TextInput
        style={s`flex-1`,[{paddingLeft: 10,paddingHorizontal: 5,width:320, height: 40, backgroundColor: 'white',borderRadius: 10,shadowColor: 'gray', elevation: 4,fontSize: 16}]}
        placeholder="Логин"
        color="black"
        placeholderTextColor="gray"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={[s`flex-row`,{paddingTop: 25,paddingBottom:25, width:320}]}>
        <View style={s`flex-1 flex-row items-center`}>
          <TextInput
            style={[s`flex-1`, {paddingLeft: 10,paddingHorizontal: 5,height: 40,backgroundColor: 'white',borderRadius: 10,shadowColor: 'gray', elevation: 4,fontSize: 16}]}
            placeholder="Пароль"
            color="black"
            placeholderTextColor="gray"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="black"
            style={{
              right: 10,
              position: 'absolute',
              elevation: 4,
              zIndex: 1,}}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 320,
          height: 40,
          borderRadius: 26.5,
          backgroundColor: '#703dd4',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: 'white',fontSize: 20,fontWeight:'bold'}}>Войти</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 16, color: 'black',paddingTop: 20}}>
        Нет учетной записи?{' '}
        <Text style={{textDecorationLine: 'underline', color: 'purple'}} onPress={() => navigation.navigate('Регистрация')}>
          Создайте её!
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;