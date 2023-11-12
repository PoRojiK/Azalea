import React, { useState, createContext, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlowerShop from '../components/FlowerShop';
import CategoryPageMain from '../screens/CategoryPage';
import { FlowerData } from '../consts/index';

const FavoritesContext = createContext();
const Stack = createStackNavigator();
const MainNavPage = () => {
  const [favouriteStates, setFavouriteStates] = useState(Array(FlowerData.length).fill(false));

  const toggleFavourite = (id) => {
    const updatedStates = [...favouriteStates];
    updatedStates[id] = !updatedStates[id];
    setFavouriteStates(updatedStates);
  };
  
  return (
    <FavoritesContext.Provider value={{ favouriteStates, toggleFavourite }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="FlowerShop">
          <Stack.Screen name="FlowerShop" component={FlowerShop} options={{ headerShown: false }} />
          <Stack.Screen name="Категория" options={{ headerShown: false }}> 
            {({ route, navigation }) => (
              <CategoryPageMain route={route} navigation={navigation} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
};
// Create a custom hook to easily access the context in child components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default MainNavPage;
