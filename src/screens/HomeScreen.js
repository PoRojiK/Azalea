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
} from 'react-native';
import React, {useState} from 'react';
import {s} from 'react-native-wind';
import Categories from '../components/CategoriesMain';
import Banners from '../components/Banner';
import FlowerShop from '../components/FlowerShop';
import { MaterialIcons,FontAwesome  } from "@expo/vector-icons";




export default function HomeScreen() {
  const [isAddressMenuVisible, setAddressMenuVisible] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState(new Date()); // Set initial date to the current date
  const [deliveryTime, setDeliveryTime] = useState(new Date()); // Set initial time to the current time

  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [isAsSoonAsPossibleChecked, setAsSoonAsPossibleChecked] = useState(false);
  const [showDateTimePickerModal, setShowDateTimePickerModal] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  const [addressInput, setAddressInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(8);

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  const calculateDate = () => {
    const currentDate = new Date();
    const selectedDate = new Date(currentDate);
    selectedDate.setDate(currentDate.getDate() + Math.round(selectedDate));
    return selectedDate.toDateString();
  };

  const isSelectedAddress = (address) => {
    return selectedCoordinate === address;
  };
  const handleAddressSelection = (address) => {
    if (selectedCoordinate === address) {
      setSelectedCoordinate(null);
    } else {
      setSelectedCoordinate(address);
    }
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
  };

  const handleSaveDeliveryTime = () => {
    console.log('Address:', selectedCoordinate);
    console.log('Delivery Date:', isAsSoonAsPossibleChecked ? 'Как можно скорее' : deliveryDate);
    console.log('Delivery Time:', deliveryTime);
    setAddressMenuVisible(false);
  };
  const handleSaveAddress = () => {
    // Сохраняет введенный адрес и закрывает модальное окно
    setModalVisible(false);
    // Здесь вы можете добавить логику сохранения адреса
    // Например, можно сохранить его в состоянии или передать обратно в родительский компонент.
    Alert.alert('Адрес сохранен:', address);
  };


  const handleSelectAddressOnMap = () => {
    setModalVisible(true);
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
            transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 18,
                    marginBottom: 8,
                  }}>
                  Адрес доставки
                </Text>
                {addresses.length > 0
                  ? addresses.map((address, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAddressSelection(address)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 8,
                          marginLeft: 8,
                        }}
                      >
                        <MaterialIcons
                          name={
                            isSelectedAddress(address)
                              ? 'check-box'
                              : 'check-box-outline-blank'
                          }
                          size={24}
                          color="black"
                        />
                        <Text style={{ marginLeft: 8, color: 'black' }}>{address}</Text>

                        <TouchableOpacity
                          onPress={() => handleDeleteAddress(address.id)}
                          style={{ marginLeft: 10 }}
                        >
                          <FontAwesome name="times-circle" size={20} color="red" />
                        </TouchableOpacity>

                      </View>
                    </TouchableOpacity>
                  ))
                  : null}
                

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                    marginLeft: 8,
                  }}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <MaterialIcons name="add" size={24} color="black" />
                  <Text style={{marginLeft: 8, color: 'black'}}>
                    Добавить адрес
                  </Text>
                </TouchableOpacity>

                <Modal
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                  animationType="slide"
                  transparent={true}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        width: '100%',
                      }}>
                      <TextInput
                        style={{
                          marginBottom: 10,
                          backgroundColor: '#f2f2f2',
                          borderRadius: 10,
                          padding: 15,
                        }}
                        placeholder="Введите ваш адрес"
                        placeholderTextColor="black"
                        color="black"
                        value={addressInput}
                        onChangeText={text => setAddressInput(text)}
                      />
                      
                      <TouchableOpacity
                        style={{
                          marginHorizontal: 20,
                          height: 40,
                          borderRadius: 25,
                          backgroundColor: '#703dd4',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          if (addressInput.trim() !== '') {
                            setAddresses([...addresses, addressInput.trim()]);
                            setAddressInput('');
                            setModalVisible(false);
                          } else {
                            console.log('Адресс не должен быть пустым');
                          }
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          Сохранить
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 18,
                    marginBottom: 8,
                    marginTop: 8,
                  }}>
                  Время доставки
                </Text>
                <View style={{flexDirection: 'column', marginBottom: 10}}>
                  {/* Первый чекбокс и выбор даты */}

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                      marginLeft: 8,
                    }}
                    onPress={() =>
                      setAsSoonAsPossibleChecked(!isAsSoonAsPossibleChecked)
                    }>
                    <MaterialIcons
                      name={
                        isAsSoonAsPossibleChecked
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      size={24}
                      color="black"
                    />
                    <Text style={{marginLeft: 8, color: 'black'}}>
                      Как можно скорее
                    </Text>
                  </TouchableOpacity>

                  {/* Второй чекбокс */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                      marginLeft: 8,
                    }}
                    onPress={() => setShowDateTimePickerModal(true)}>
                    <MaterialIcons
                      name={
                        showDateTimePickerModal
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      size={24}
                      color="black"
                    />

                    <Text style={{marginLeft: 8, color: 'black'}}>
                      Выбрать дату и время
                    </Text>
                  </TouchableOpacity>

                  {/* Второй Modal для выбора даты и времени */}
                  <Modal
                    visible={showDateTimePickerModal}
                    animationType="slide"
                    transparent={true}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          padding: 20,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: 18,
                            marginBottom: 10,
                          }}>
                          Выберите дату и время доставки
                        </Text>
                        <Text style={{color:'black'}}>Выбранная дата: {calculateDate()}</Text>
                        <Slider
                          style={{ width: 200, height: 40 }}
                          minimumValue={0}
                          maximumValue={6} // 6 days in a week
                          step={1}
                          value={selectedDate}
                          onValueChange={handleDateChange}
                        />

                        {/* Slider for selecting time */}
                        <Text style={{color:'black'}}>Выберите время: {selectedTime + 8}:00</Text>
                        <Slider
                          style={{ width: 200, height: 40 }}
                          minimumValue={0}
                          maximumValue={16} // 16 hours from 8 to 24
                          step={1}
                          value={selectedTime}
                          onValueChange={handleTimeChange}
                        />

                        {/* Additional logic to display the selected date and time */}
                        <Text style={{color:'black'}}>Выбранная дата: {calculateDate()}</Text>
                        <Text style={{color:'black'}}>Выбранное время: {selectedTime + 8}:00</Text>

                        {/* Picker for selecting time */}

                        {/* Добавьте здесь ваш компонент выбора даты и времени (например, кастомный компонент или встроенные компоненты React Native) */}
                        <TouchableOpacity
                          style={{
                            marginHorizontal: 20,
                            height: 40,
                            borderRadius: 25,
                            backgroundColor: '#703dd4',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => setShowDateTimePickerModal(false)}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}>
                            Сохранить
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>

                <TouchableOpacity
                  style={{
                    marginHorizontal: 5,
                    height: 40,
                    borderRadius: 25,
                    backgroundColor: '#703dd4',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handleSaveDeliveryTime}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Сохранить
                  </Text>
                </TouchableOpacity>
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
          <MaterialIcons
            name="search"
            size={24}
            color="darkgray"
            style={{marginLeft: 8}}
          />
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
