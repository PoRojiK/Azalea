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
} from 'react-native';
import React, {useState} from 'react';
import {s} from 'react-native-wind';
import Categories from '../components/CategoriesMain';
import Banners from '../components/Banner';
import FlowerShop from '../components/FlowerShop';
import { MaterialIcons } from "@expo/vector-icons";


export default function HomeScreen() {
  const [isAddressMenuVisible, setAddressMenuVisible] = useState(false);
  const [address, setAddress] = useState(''); // Состояние для адреса
  const [deliveryDate, setDeliveryDate] = useState(new Date()); // Set initial date to the current date
  const [deliveryTime, setDeliveryTime] = useState(new Date()); // Set initial time to the current time
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [isAsSoonAsPossibleChecked, setAsSoonAsPossibleChecked] = useState(false);
  const [showDateTimePickerModal, setShowDateTimePickerModal] = useState(false);


  const handleSaveAddress = () => {
    console.log('Address:', address);
    console.log('Delivery Date:', isAsSoonAsPossibleChecked ? 'As soon as possible' : deliveryDate);
    console.log('Delivery Time:', deliveryTime);
    setAddressMenuVisible(false);
  };

  return (
    <ScrollView style={s`flex-1 bg-white`}>
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
            transparent={true}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, marginBottom: 10 }}>Адрес доставки</Text>
                <TextInput
                  style={{ borderBottomWidth: 1, color: 'black', borderBottomColor: 'gray', marginBottom: 10 }}
                  placeholder="Новый адрес"
                  value={address}
                  onChangeText={text => setAddress(text)}
                />
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, marginBottom: 10 }}>Время доставки</Text>
                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                  {/* Первый чекбокс и выбор даты */}
                  
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8 }} onPress={() => setAsSoonAsPossibleChecked(!isAsSoonAsPossibleChecked)}>
                    <MaterialIcons
                      name={isAsSoonAsPossibleChecked ? "check-box" : "check-box-outline-blank"}
                      size={24}
                      color="black"
                    />
                    <Text style={{ marginLeft: 8, color: 'black' }}>Как можно скорее</Text>
                  </TouchableOpacity>
                  

                  {/* Второй чекбокс */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8 }} onPress={() => setShowDateTimePickerModal(true)}>
                      <MaterialIcons
                        name={showDateTimePickerModal ? "check-box" : "check-box-outline-blank"}
                        size={24}
                        color="black"
                      />
                    
                    <Text style={{ marginLeft: 8, color: 'black' }}>Выбрать дату и время</Text>
                    </TouchableOpacity>


                  {/* Второй Modal для выбора даты и времени */}
                  <Modal
                    visible={showDateTimePickerModal}
                    animationType="slide"
                    transparent={true}
                  >
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                      <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%' }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, marginBottom: 10 }}>Выберите дату и время доставки</Text>
                        
                        {/* Добавьте здесь ваш компонент выбора даты и времени (например, кастомный компонент или встроенные компоненты React Native) */}
                        
                        <Button title="Сохранить" onPress={() => setShowDateTimePickerModal(false)} />
                      </View>
                    </View>
                  </Modal>
                </View>

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
            s`w-10 h-10 justify-center items-center`,
            {backgroundColor: '#f6f6f6', borderRadius: 13},
          ]}
          onPress={() => setFiltersVisible(true)}>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* categories */}
      <View>
        <Categories />
        <Banners />
      </View>
        <ScrollView>
        <FlowerShop />
        </ScrollView>
      
    </ScrollView>
  );
}
