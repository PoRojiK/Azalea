import React, { useState } from 'react';
import { View, TextInput, Button,TouchableOpacity,Text } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
import {s} from 'react-native-wind';
import { Ionicons } from '@expo/vector-icons'; 

const db = SQLite.openDatabase({
  name: 'users.db',
  location: 'Azalea',
});

const RegistrationScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigationLogin = useNavigation();

  const initializeDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, flower_id_favourite TEXT, Cart_id Text);',
        [],
        () => console.log('Таблица users создана успешно'),
        (error) => console.error('Ошибка при создании таблицы users: ', error)
      );
    });
  };

  useEffect(() => {
    // Проверяем наличие базы данных и создаем ее при необходимости.
    initializeDatabase();
  }, []);

  const handleRegister = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (tx, results) => {
          if (results.rows.length > 0) {
            alert('Имя пользователя уже используется.');
          } else {
            db.transaction((tx) => {
              tx.executeSql(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password.toString()],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log('Пользователь успешно зарегистрирован');
                    navigationLogin.navigate('СтраницаПользователя', {username});
                  } else {
                    alert('Ошибка регистрации');
                  }
                },
                (error) => {
                  console.error(error);
                }
              );
            });
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
        onPress={handleRegister}
      >
        <Text style={{ color: 'white',fontSize: 20,fontWeight:'bold'}}>Регистрация</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 16, color: 'black',paddingTop: 20}}>
        Уже есть аккаунт?{' '}
        <Text style={{textDecorationLine: 'underline', color: 'purple'}} onPress={() => navigation.navigate('Вход в аккаунт')}>
          Войти
        </Text>
      </Text>
    </View>
  );
};

export default RegistrationScreen;