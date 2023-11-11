import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Вход в аккаунт" component={LoginScreen} options={{
          cardStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
        }}/>
        <Stack.Screen name="Регистрация" component={RegistrationScreen} options={{ headerShown: false}} options={{
          cardStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
        }} />
        <Stack.Screen name="Профиль" component={ProfileScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileNav;