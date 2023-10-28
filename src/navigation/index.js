import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const homeName = 'Главная';
const eventsName = 'События';
const profilesName = 'Профиль';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === eventsName) {
              iconName = focused ? 'event' : 'event-outline';
            } else if (rn === profilesName) {
              iconName = focused ? 'profile' : 'profile-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          labelStyle: {paddingBottom: 10, fontSize: 10},

        }}>
        <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name={eventsName} component={EventsScreen} options={{ headerShown: true }}/>
        <Tab.Screen name={profilesName} component={ProfileScreen} options={{ headerShown: true }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
