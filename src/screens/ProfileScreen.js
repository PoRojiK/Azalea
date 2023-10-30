import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Button,
  Image,
} from 'react-native';
import React, { useState } from 'react'
import {s} from 'react-native-wind';


export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <View>
      <Text>Введите адрес доставки:</Text>
      <TextInput
        style={s`border-b-1 border-gray-300 mb-10`}
        placeholder="Адрес"
        value={email}
        onChangeText={text => setEmail(email)}
      />
      <Text>Выберите время доставки:</Text>
      <TextInput
        style={s`border-b-1 border-gray-300 mb-10`}
        placeholder="Время доставки"
        placeholderTextColor="gray"
        color="black"
        value={password}
        onChangeText={text => setPassword(password)}
      />
      <Button title="Сохранить" onPress={onLoginPressed} />
      </View>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'white',
  },
  link: {
    fontWeight: 'bold',
    color: 'white',
  },
})
