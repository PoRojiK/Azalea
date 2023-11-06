import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FlowerData} from '../consts/index.js';
import {s} from 'react-native-wind';
import {MaterialIcons} from '@expo/vector-icons';

const groupData = (data, itemsPerGroup) => {
  const result = [];
  for (let i = 0; i < data.length; i += itemsPerGroup) {
    result.push(data.slice(i, i + itemsPerGroup));
  }
  return result;
};

const renderItem = ({item}) => (
  <TouchableOpacity
    style={{
      margin: 8,
      backgroundColor: 'white',
      borderRadius: 15,
      height: 270,
      width: 180,
      shadowColor: 'gray', // Цвет тени
      elevation: 4, // Поднятие для платформы Android
    }} key={item.id}>
      
    <Image
      style={{width: 180, height: 180, resizeMode: 'cover', borderRadius: 15}}
      source={item.image}
    />
    <Text
      style={{
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 12,
        color: 'black',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>
      {item.name}
    </Text>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <MaterialIcons name="star" size={18} color="orange" />
        <Text style={{color: 'black'}}>{item.rating}</Text>
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
        }}>
        <Text style={{color: 'black'}}>{item.price} ₽</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const renderCategory = ({item}) => (
  <View style={{marginTop: 15, justifyContent: 'space-between'}}>
    <Text
      style={{fontSize: 20, fontWeight: 'bold', margin: 10, color: 'black'}}>
      {item[0].category}
    </Text>
  </View>
);

export default FlowerShop = () => {
  const groupedData = groupData(FlowerData, 6);

  return (
    <FlatList
      data={groupedData}
      keyExtractor={(group, index) => `group_${index}`}
      renderItem={({item, index}) => (
        <View>
          {index % 6 === 0
            ? renderCategory({item: item})
            : renderCategory({item: item})}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {item.map(flower => renderItem({item: flower}))}
          </View>
        </View>
      )}
    />
  );
};

//<ScrollView horizontal={true}>≈
//{FlowerData.map((image, index) => (
//  <Image key={index} style={styles.image} source={image} />
//))}
//</ScrollView>
