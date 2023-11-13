import React from 'react';
import { View, Text } from 'react-native';
import { useFavorites, FavoritesContext } from '../screens/MainNav';
import { FlowerData } from '../consts/index';

const FavouriteList = () => {
  
  return (
    <View>
      <Text>All Favorite Flowers</Text>
      
        <Text>No favorite flowers yet!</Text>

    </View>
  );
};

export default FavouriteList;