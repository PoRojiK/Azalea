import React, {useState} from 'react';
import MainNav from '../screens/MainNav';
import EventsScreen from '../screens/EventsScreen';
import ProfileNav from '../screens/ProfileNav';
import {FlowerData} from '../consts/index'

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {View,Text} from 'react-native';

const Tab = createBottomTabNavigator();

const homeName = 'Главная';
const eventsName = 'Мои события';
const profilesName = 'Профиль';
const FavouriteName = 'Избранное';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white', // Background color of the tab bar
            height:60,
            paddingTop: 10,
            borderTopWidth:0,
          },
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            paddingBottom: 10, fontSize: 10,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
              color = focused ? 'black' : 'grey';
            } else if (rn === eventsName) {
              iconName = focused ? 'calendar-sharp' : 'calendar-outline';
              color = focused ? 'black' : 'grey';
            } else if (rn === profilesName) {
              iconName = focused ? 'flower' : 'flower-outline';
              color = focused ? 'black' : 'grey';
            } else if (rn === FavouriteName) {
              iconName = focused ? 'heart-outline' : 'heart';
              color = focused ? 'black' : 'grey';
            }
            
            return (
                <Ionicons name={iconName} size={24} color={color}/>
            );
          },
        })}>
        <Tab.Screen name={homeName} component={MainNav} options={{ headerShown: false}} />

        <Tab.Screen name={eventsName} component={EventsScreen} options={{ headerShown: true }}/>
        <Tab.Screen name={profilesName} component={ProfileNav} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
