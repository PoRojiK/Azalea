import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FlowerData } from '../consts/index.js';
import { s } from 'react-native-wind';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import userId from '../screens/LoginScreen';
import { useFavorite } from '../databases/FavoriteContext';


const db = SQLite.openDatabase({
  name: 'users.db',
  location: 'Azalea',
});

const FlowerShop = (userId) => {
  const { favouriteStates, selectedFavorites, toggleFavorite } = useFavorite();
  const itemsPerGroup = 6;

  const toggleFavoriteInDatabase = (userId, flowerId) => {
    if (userId) {
      // User is logged in, update the database
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE users SET flower_id_favourite = ? WHERE username = ?',
          [flowerId, userId],
          () => console.log(`Избранное для цветка с id ${flowerId} и пользователя с id ${userId} обновлено успешно`),
          (error) => console.error(`Ошибка при обновлении избранного для цветка с id ${flowerId} и пользователя с id ${userId}: `, error)
        );
      });
    } else {
      // User is not logged in, handle favorite status for the current session
      // You can use local state, context, or any other mechanism to manage session-based favorites
      const newFavouriteStates = { ...favouriteStates, [flowerId]: !favouriteStates[flowerId] };
      setFavouriteStates(newFavouriteStates);
      console.log(`Избранное для цветка с id ${flowerId} сохранено в текущей сессии`);
    }
  };

  const groupData = (data, itemsPerGroup) => {
    const groupedItems = [];
    let currentIndex = 0;
  
    while (currentIndex < data.length) {
      const currentCategory = data[currentIndex]?.category;
      const currentGroup = [];
      let itemsInCurrentCategory = 0;
  
      while (currentIndex < data.length && itemsInCurrentCategory < itemsPerGroup) {
        if (data[currentIndex]?.category === currentCategory) {
          currentGroup.push(data[currentIndex]);
          itemsInCurrentCategory++;
        }
        currentIndex++;
      }
  
      if (currentGroup.length > 0) {
        groupedItems.push(currentGroup);
      }
    }
  
    return groupedItems;
  };
  
  

  const renderItem = ({ item }) => {
    const id = item.id
    return (
      <TouchableOpacity
        onPress={() => navigationMain.navigate('ProductCard', { item })}
        style={{
          margin: 8,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 270,
          width: 180,
          shadowColor: 'gray',
          elevation: 4,
        }}
        key={item.id}
      >
        <Image style={{ width: 180, height: 180, resizeMode: 'cover', borderRadius: 15 }} source={item.image} />

        <TouchableOpacity
          onPress={() => toggleFavorite(id)}

          style={[
            s`absolute top-2 right-2`,
            {
              borderRadius: 20,
              padding: 10,
              backgroundColor: favouriteStates[id] ? 'red' : 'rgba(0,0,0,0.4)',
            },
          ]}
        >
          <AntDesign name={favouriteStates[id] ? 'heart' : 'hearto'} size={18} color="white" />
        </TouchableOpacity>

        <Text style={{ fontWeight: 'bold', marginTop: 10, marginHorizontal: 10, fontSize: 12, color: 'black', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </Text>

        <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 10, marginBottom: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    );
  };

  const navigationMain = useNavigation();

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigationMain.navigate('Категория', { category: item[0].category, item })}
      style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10, color: 'black' }}>{item[0].category}</Text>
      <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f6', borderRadius: 13, marginRight: 10 }}>
        <AntDesign name="right" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );

  const groupedData = groupData(FlowerData, itemsPerGroup);

  return (
    <ScrollView>
      {groupedData.map((group, id) => {
        return (
          <View key={`group_${id}`}>
            {renderCategory({ item: group })}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {group.map((flower) => renderItem({ item: flower }))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FlowerShop;