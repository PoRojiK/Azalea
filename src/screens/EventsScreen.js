import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity,ScrollView,TextInput ,StyleSheet,Modal,Alert} from 'react-native';
import { MaterialIcons,FontAwesome,AntDesign  } from "@expo/vector-icons";
import { CartContext } from '../databases/CartContext';
import {s} from 'react-native-wind';
import { useNavigation } from '@react-navigation/native';

import {Picker} from '@react-native-picker/picker';


const CartScreen = () => {
  const { cartItems, totalItems, updateCartItemQuantity,clearCart } = useContext(CartContext);
  const navigationMain = useNavigation();
  const decreaseQuantity = (cartItem) => {
    const newQuantity = Math.max(cartItem.quantity - 1, 1);
    updateCartItemQuantity(cartItem.id, newQuantity);
  };
  const increaseQuantity = (cartItem) => {
    const newQuantity = cartItem.quantity + 1;
    updateCartItemQuantity(cartItem.id, newQuantity);
  };
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const handlePromoCodeChange = (text) => {
    if (text.trim().toLowerCase() === 'newyear') {
      alert('Промокод "newyear" введен! Вы получаете скидку -10%');
    }
    setPromoCodeInput(text);
  };


  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      totalPrice += Number(cartItem.price.replace(/\s/, '')) * cartItem.quantity;
    });
    return promoCodeInput.trim().toLowerCase() === 'newyear' ? totalPrice * 0.9 : totalPrice;
  };

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
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  const [addressInput, setAddressInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [isAddressMenuVisible, setAddressMenuVisible] = useState(false);

  const [isAsSoonAsPossibleChecked, setAsSoonAsPossibleChecked] = useState(false);
  const [showDateTimePickerModal, setShowDateTimePickerModal] = useState(false);

  const handleOrder = () => {
    if (selectedCoordinate) {
      // Очистить корзину
      clearCart();
      
      // Вывести alert оформленного заказа с временем и адресом
      const orderMessage = `Заказ оформлен!\nВремя доставки: ${
        isAsSoonAsPossibleChecked ? 'Как можно скорее' : '${selectedTime}, ${selectedDate}'
      }\nАдрес доставки: ${selectedCoordinate}`;
      Alert.alert('Успешно', orderMessage);
    } else {
      // Вывести alert о неуказанном адресе доставки
      Alert.alert('Ошибка', 'Не указан адрес доставки. Выберите место доставки.');
    }
  };
  

  return (
    <View style={{flex:1}}>
      

    <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
      
      {cartItems.length > 0 ? (
          <View>
             

             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
              <Text style={{ color: 'black', fontSize: 16 }}>
                Всего товаров в корзине: {totalItems}
              </Text>
              {/* Кнопка для очистки корзины */}
              <TouchableOpacity
                onPress={() => clearCart()}
                style={{
                  borderRadius: 10,
                  backgroundColor: 'red',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 10,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>
                  Очистить корзину
                </Text>
              </TouchableOpacity>
            </View>
          {cartItems.map((cartItem) => (
            <TouchableOpacity key={cartItem.id} onPress={() => navigationMain.navigate('ProductCard', { item: cartItem })} style={{shadowColor: 'gray',elevation: 4,backgroundColor:'white',borderRadius:10, flexDirection: 'row', margin: 10 }}>
              <Image
                source={cartItem.image}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  resizeMode: 'cover',
                  backgroundColor: 'white',
                }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ width: 250, color: 'black', fontSize: 16, margin: 5 }} numberOfLines={1} ellipsizeMode="tail">
                  {cartItem.name}
                </Text>
                <View style={[s`absolute bottom-3`,{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }]}>
                  <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor:'#f1f1f1',borderRadius:15,padding:4}}>
                  <TouchableOpacity onPress={() => decreaseQuantity(cartItem)} style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18, color: 'black', marginHorizontal: 10 }}>{cartItem.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(cartItem)} style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>+</Text>
                  </TouchableOpacity>
                  </View>
                  
                </View>
                <Text style={[s`absolute right-4 bottom-4`,{fontSize: 18, color: 'black',marginRight:10}]}>
                    {(
                      Number(cartItem.price.replace(/\s/, '')) * Number(cartItem.quantity)
                    ).toLocaleString()}{' '}
                    ₽
                  </Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* Блок с вводом промокода  */}
          <View style={{ margin: 10,backgroundColor:'white',borderRadius:10,padding:10,shadowColor: 'gray',elevation: 4 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Введите промокод</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{ flex: 1, height: 40,color:'black', borderColor: 'gray', borderWidth: 1, padding: 5,borderRadius:10 }}
                onChangeText={handlePromoCodeChange}
                value={promoCodeInput}
                placeholder="Введите сюда промокод, например newyear"
                placeholderTextColor='gray'
              />
            </View>
          </View>
          


          <TouchableOpacity
          style={s`flex-row items-center`}
          onPress={() => setAddressMenuVisible(true)}>
            <View style={s`flex-row items-center`}>
            <View style={[s`flex-col mr-10`,{margin: 10,backgroundColor:'white',borderRadius:10,padding:10,width:372,shadowColor: 'gray',elevation: 4}]}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Доставим по адресу</Text>
              <View style={s`flex-row items-center`}>
                <Text
                  style={[s`mr-0 text-s font-bold text-black`, {fontSize: 16}]}>
                  {selectedCoordinate ? selectedCoordinate : "Укажите место доставки"}
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

          <View style={{ margin: 10,backgroundColor:'white',borderRadius:10,padding:10,shadowColor: 'gray',elevation: 4 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Итоговая сумма заказа</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
              {getTotalPrice().toLocaleString()} ₽
            </Text>
          </View>

          <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10, shadowColor: 'gray', elevation: 4,marginBottom:75 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Метод оплаты</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Иконка банковской карты */}
              <AntDesign name="creditcard" size={24} color="black" style={{ width: 30, height: 30, marginRight: 10 }} />
              
              {/* Надпись "Оплатить при получении картой или наличными" */}
              <Text style={{ color: 'black', fontSize: 16 }}>
                Оплатить при получении картой или наличными
              </Text>
          </View>
          </View>
          <TouchableOpacity
          onPress={() => handleOrder()}
          style={[
            s`absolute bottom-2.5 left-2.5 items-center`,
            {
              borderRadius: 10,
              zIndex: 1,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'black',
              paddingBottom: 50,
              width: 372,
            },
          ]}>
          <Text style={[s`absolute bottom-4.75 left-15`,{ color: 'white', fontSize: 16}]}>
            Оформить заказ
          </Text>
          </TouchableOpacity>
          </View>
          
          
      ) : (
        <View style={{ paddingTop:320, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{ color: 'black', fontSize: 16 }}>Корзина пуста, самое время исправить это!</Text>
        </View>
  )}
  </ScrollView>
</View>
  );
};


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



export default CartScreen;