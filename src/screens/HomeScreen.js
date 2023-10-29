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
} from 'react-native';
import React, {useState} from 'react';
import {s} from 'react-native-wind';
import Categories from '../components/CategoriesMain';
import Banners from '../components/Banner';
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isAddressMenuVisible, setAddressMenuVisible] = useState(false);
  const [address, setAddress] = useState(''); // Состояние для адреса
  const [deliveryTime, setDeliveryTime] = useState(''); // Состояние для времени доставки

  const handleSaveAddress = () => {
    // Здесь вы можете выполнить логику сохранения адреса и времени доставки
    // Например, отправить на сервер или обновить состояние вашего приложения
    setAddressMenuVisible(false); // Закрываем меню после сохранения
  };
  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      {/* statusbar */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View
        style={s`flex-row justify-between items-center px-4 w-full h-16 mt-0`}>
        <TouchableOpacity
          style={s`flex-row items-center`}
          onPress={() => setAddressMenuVisible(true)}>
          {/* Окно доставки */}
          <Modal
            visible={isAddressMenuVisible}
            animationType="slide"
            transparent={true}>
            <View style={[s`flex-1 justify-end items-center`,{backgroundColor: "rgba(0, 0, 0, 0.5)",TextColor:"black"}]}>
              <View style={s`bg-white p-20 rounded-tl-2xl rounded-tr-2xl shadow-lg w-full`}>
                <Text>Введите адрес доставки:</Text>
                <TextInput
                  style={s`border-b-1 border-gray-300 mb-10`}
                  placeholder="Адрес"
                  value={address}
                  onChangeText={text => setAddress(text)}
                />
                <Text>Выберите время доставки:</Text>
                <TextInput
                  style={s`border-b-1 border-gray-300 mb-10`}
                  placeholder="Время доставки"
                  placeholderTextColor="gray"
                  color="black"
                  value={deliveryTime}
                  onChangeText={text => setDeliveryTime(text)}
                />
                <Button title="Сохранить" onPress={handleSaveAddress} />
              </View>
            </View>
          </Modal>

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
        </TouchableOpacity>
        <TouchableOpacity
          style={s`ml-auto`}
          onPress={() => setCartVisible(true)}>
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
          <MaterialIcons name="search" size={24} color="darkgray" style={{ marginLeft: 8 }} />
          <TextInput
            style={[s`flex-1`, {paddingHorizontal: 5, height: 40}]}
            placeholder="Поиск по товарам, магазинам"
            placeholderTextColor="gray"
            color="gray"
            // Добавьте здесь обработчик изменения текста поиска, если необходимо
          />
        </View>
        <TouchableOpacity
          style={[
            s`w-10 h=10 justify-center items-center`,
            {backgroundColor: '#f6f6f6', borderRadius: 13},
          ]}
          onPress={() => setFiltersVisible(true)}>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* categories */}
      <View>
        <Categories />
      </View>
      <View>
        <Banners />
      </View>
    </SafeAreaView>
  );
}
