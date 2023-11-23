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
import React, {useState} from 'react';
import {s} from 'react-native-wind';
import Categories from '../components/CategoriesMain';
import Banners from '../components/Banner';
import FlowerShop from '../components/FlowerShop';
import { MaterialIcons,FontAwesome  } from "@expo/vector-icons";

import {Picker} from '@react-native-picker/picker';


export default function HomeScreen() {
  const [isAddressMenuVisible, setAddressMenuVisible] = useState(false);

  const [isAsSoonAsPossibleChecked, setAsSoonAsPossibleChecked] = useState(false);
  const [showDateTimePickerModal, setShowDateTimePickerModal] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  const [addressInput, setAddressInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);


// -----------------------------
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('8:00');
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const getNextSevenDays = () => {
    const date = new Date();
    const nextSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
      nextSevenDays.push(currentDate);
    }

    return nextSevenDays;
  };

  const generateTimeOptions = () => {
    const currentHour = new Date().getHours();
    const timeOptions = [];

    for (let i = currentHour; i <= 23; i++) {
      for (let j = 0; j <= 30; j += 30) {
        const timeStr = `${i}:${j === 0 ? '00' : '30'}`;
        timeOptions.push(timeStr);
      }
    }

    return timeOptions;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useState(() => {
    const nextSevenDays = getNextSevenDays();
    setDates(nextSevenDays);
    const timeOptions = generateTimeOptions();
    setTimes(timeOptions);
  }, []);

  const formattedDateTime = selectedDate && selectedTime
    ? `${selectedDate.toDateString()} ${selectedTime}`
    : 'Выберите дату и время';

// -----------------------------


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
    console.log('Адресс доставки:', selectedCoordinate);
    console.log('Время и дата доставки:', isAsSoonAsPossibleChecked ? 'Как можно скорее' : selectedTime, selectedDate);
    setAddressMenuVisible(false);
  };
  const handleSaveAddress = () => {
    setModalVisible(false);
    Alert.alert('Адрес сохранен:', address);
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
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 8,
                            marginLeft: 8,
                          }}
                          onPress={() => setIsTimeSelected(!isTimeSelected)}
                        >
                          <MaterialIcons
                            name={
                              isTimeSelected
                                ? 'check-box'
                                : 'check-box-outline-blank'
                            }
                            size={24}
                            color="black"
                          />
                          <Text style={{ marginLeft: 8, color: 'black' }}>{formattedDateTime}</Text>
                        </TouchableOpacity>
                  {/* Второй чекбокс */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                      marginLeft: 9,
                    }}
                    onPress={() => setShowDateTimePickerModal(true)}>
                    <MaterialIcons name="add" size={24} color="black" />

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

                        <Text style={{
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: 18,
                          marginBottom: 20,
                          marginTop: 8,
                        }}>Выберите дату доставки</Text>
                        <View style={{ flex: 1,marginBottom:20, alignItems: 'center', justifyContent: 'center' }}>
                        
                          <Picker
                            selectedValue={selectedDate}
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue) => handleDateChange(itemValue)}>
                            {dates.map((date, index) => (
                              <Picker.Item key={index} label={date.toDateString()} value={date} />
                            ))}
                          </Picker>
                        </View>
                        <Text style={{
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: 18,
                          marginBottom: 20,
                          marginTop: 8,
                        }}>Выберите время доставки</Text>
                      <View style={{ flex: 1,marginBottom:30,alignItems: 'center', justifyContent: 'center' }}>
                        <Picker
                          selectedValue={selectedTime}
                          style={{ height: 50, width: 300 }}
                          onValueChange={(itemValue) => handleTimeChange(itemValue)}>
                          {times.map((time, index) => (
                            <Picker.Item key={index} label={time} value={time} />
                          ))}
                        </Picker>
                      </View>

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
                  {selectedCoordinate ? selectedCoordinate : "Узнаем адрес у получателя"}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 18,
  },
  selectedContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

