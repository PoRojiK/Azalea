import React from 'react';
import { View, Text } from 'react-native';
import { useFavorites, FavoritesContext } from '../screens/MainNav';
import { FlowerData } from '../consts/index';

const FavouriteList = () => {
  const { favouriteStates, toggleFavourite } = useFavorites();

  // Filter the FlowerData based on the favoriteStates
  const favoriteFlowers = FlowerData.filter((flower, id) => favouriteStates[id]);
  const id = item.id
  return (
    <View>
      <Text>All Favorite Flowers</Text>
      {favoriteFlowers.length > 0 ? (
        favoriteFlowers.map((flower) => (
          <Text key={flower.id}>{flower.name}</Text>
        ))
      ) : (
        <Text>No favorite flowers yet!</Text>
      )}
    </View>
  );
};

export default FavouriteList;