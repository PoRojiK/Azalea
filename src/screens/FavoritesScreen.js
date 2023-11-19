import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,ScrollView } from 'react-native';
import { useFavorite } from '../databases/FavoriteContext';
import { FlowerData } from '../consts/index';
import {AntDesign,MaterialIcons} from '@expo/vector-icons';

const FavouriteList = ({ navigation }) => {
  const { favouriteStates, selectedFavorites, toggleFavorite } = useFavorite();

  const renderItem = ({ item }) => {
  const id = item.id;
  return (
      <View key={item.id}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductCard', { item })}
          style={{
            margin: 8,
            backgroundColor: 'white',
            borderRadius: 15,
            height: 270,
            width: 180,
            shadowColor: 'gray',
            elevation: 4,
          }}
        >
        <Image style={{ width: 180, height: 180, resizeMode: 'cover', borderRadius: 15 }} source={item.image} />

        <TouchableOpacity
          onPress={() => toggleFavorite(id)}
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            borderRadius: 20,
            padding: 10,
            backgroundColor: favouriteStates[id] ? 'red' : 'rgba(0,0,0,0.4)',
          }}
        >
          {/* Assuming you have the AntDesign component imported */}
          <AntDesign name={favouriteStates[id] ? 'heart' : 'hearto'} size={18} color="white" />
        </TouchableOpacity>

        <Text style={{ fontWeight: 'bold', marginTop: 10, marginHorizontal: 10, fontSize: 12, color: 'black', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </Text>

        <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 10, marginBottom: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Assuming you have the MaterialIcons component imported */}
              <MaterialIcons name="star" size={18} color="orange" />
              <Text style={{ marginLeft: 5, color: 'black' }}>{item.rating}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#f2f2f2',
                padding: 4,
                borderRadius: 5,
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
                color: 'black',
              }}
            >
              <Text style={{ color: 'black' }}>{item.price} ₽</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      </View>
    );
  };

  const renderTwoItemsInRow = (firstItem, secondItem) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {renderItem({ item: firstItem })}
        {renderItem({ item: secondItem })}
      </View>
    );
  };

  const renderItems = () => {
    const renderedItems = [];
    for (let i = 0; i < selectedFavorites.length; i += 2) {
      const firstItem = FlowerData.find((item) => item.id === selectedFavorites[i]);
      const secondItem = FlowerData.find((item) => item.id === selectedFavorites[i + 1]);
  
      if (secondItem) {
        renderedItems.push(
          <View key={`${firstItem.id}-${secondItem.id}`}>
            {renderTwoItemsInRow(firstItem, secondItem)}
          </View>
        );
      } else {
        renderedItems.push(
          <View key={firstItem.id}>
            {renderItem({ item: firstItem })}
          </View>
        );
      }
    }
    return renderedItems;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
      {selectedFavorites.length > 0 ? (
        <View style={{ width: '100%' }}>
          {renderItems()}
        </View>
      ) : (
        <Text>No favorite items yet!</Text>
      )}
    </ScrollView>
  );
};

export default FavouriteList;
