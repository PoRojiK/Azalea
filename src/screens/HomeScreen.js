import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Image,
  ScrollView,
  Alert,
  Slider,
  StyleSheet,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {s} from 'react-native-wind';
import Categories from '../components/CategoriesMain';

import FlowerShop from '../components/FlowerShop';
import { MaterialIcons,FontAwesome,AntDesign  } from "@expo/vector-icons";
import { FlowerData } from '../consts/index.js';
import { useFavorite } from '../databases/FavoriteContext';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {

  const navigationMain = useNavigation();
  const { favouriteStates, selectedFavorites, toggleFavorite } = useFavorite();
// -----------------------------


  const [filteredFlowers, setFilteredFlowers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const filterFlowers = (query) => {
    const filtered = FlowerData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFlowers(filtered);
  };

  useEffect(() => {
    filterFlowers(searchQuery);
  }, [searchQuery]);

  
  return (
    <ScrollView style={s`flex-1 bg-white`}>
      {/* statusbar */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View
        style={s`flex-row justify-between items-center px-4 w-full h-16 mt-0`}>
          <View style={s`flex-row items-center`}>
            <View style={s`flex-col mr-10`}>
              <Text style={{fontSize: 10, color: 'gray', fontWeight: 'bold'}}>
                ДОСТАВИТЬ: АНГАРСК
              </Text>
              <View style={s`flex-row items-center`}>
                <Text
                  style={[s`mr-0 text-s font-bold text-black`, {fontSize: 12}]}>
                  Узнаем адрес у получателя
                </Text>
                <View>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={12}
                    color="black"
                  />
                </View>
              </View>
            </View>
          </View>
        <TouchableOpacity
          style={s`ml-auto`}
          onPress={() => navigationMain.navigate('Корзина')}>
          <MaterialIcons name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* searchrow */}
      <View style={s`flex-row px-2`}>
        <View
          style={[
            s`flex-1 flex-row mr-1 items-center`,
            {backgroundColor: '#f6f6f6', borderRadius: 10},
          ]}>
          <MaterialIcons
            name="search"
            size={24}
            color="darkgray"
            style={{marginLeft: 8}}
          />
          <TextInput
            style={[s`flex-1`, {paddingHorizontal: 5, height: 40}]}
            placeholder="Поиск по товарам"
            placeholderTextColor="gray"
            color="gray"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      {/* categories */}
      <View>
      {searchQuery !== '' ? (
          null
        ) : (
        <View>
        <Categories />

        </View>
        )}
      </View>
      <ScrollView>
        {/* Display filtered flowers if search query is present, otherwise display all flowers */}
        {searchQuery !== '' ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {filteredFlowers.map((item, id) => (
            <View key={item.id} style={{ flexDirection: 'row', width: '50%'}}>
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
              >
                <Image style={{ width: 180, height: 180, resizeMode: 'cover', borderRadius: 15 }} source={item.image} />
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginHorizontal: 10, fontSize: 12, color: 'black', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </Text>
                <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 10, marginBottom: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="star" size={18} color="orange" />
                      <Text style={{ marginLeft: 5, color: 'black' }}>{item.rating}</Text>
                    </View>
                    <View
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
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          ))}
        </View>
        ) : (
          <FlowerShop />
        )}
      </ScrollView>
      </ScrollView>
  );
}
