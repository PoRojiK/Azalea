import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FlowerShop from '../components/FlowerShop';
import CategoryPageMain from '../screens/CategoryPage';
import EventsScreen from '../screens/EventsScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProductCard from '../screens/ProductCard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainNavPage = () => (
  <Stack.Navigator initialRouteName="FlowerShop">
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductCard" component={ProductCard} options={{ headerShown: false }} />
    <Stack.Screen name="Категория" options={{ headerShown: false }}> 
      {({ route, navigation }) => (
        <CategoryPageMain route={route} navigation={navigation} />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const ProfileNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Вход в аккаунт"
      component={LoginScreen}
      options={{
        cardStyle: { backgroundColor: 'transparent' },
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="Регистрация"
      component={RegistrationScreen}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        headerTransparent: true,
      }}
    />
    <Stack.Screen name="Профиль" component={ProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Главная"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingTop: 10,
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Главная') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Мои события') iconName = focused ? 'calendar-sharp' : 'calendar-outline';
          else if (route.name === 'Профиль') iconName = focused ? 'flower' : 'flower-outline';
          else if (route.name === 'Избранное') iconName = focused ? 'heart-outline' : 'heart';

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Главная" component={MainNavPage} options={{ headerShown: false }} />
      <Tab.Screen name="Избранное" component={FavoritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Мои события" component={EventsScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Профиль" component={ProfileNav} options={{ headerShown: false }} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigation;