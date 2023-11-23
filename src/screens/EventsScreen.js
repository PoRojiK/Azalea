import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity,ScrollView,TextInput } from 'react-native';
import { CartContext } from '../databases/CartContext';
import {s} from 'react-native-wind';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems, totalItems, updateCartItemQuantity } = useContext(CartContext);

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


  return (
    <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
      {cartItems.length > 0 ? (
        <View>
          <Text style={{ color: 'black', fontSize: 16, margin: 10 }}>
            Всего товаров в корзине: {totalItems}
          </Text>
          {cartItems.map((cartItem) => (
            <TouchableOpacity key={cartItem.id} onPress={() => navigationMain.navigate('ProductCard', { item: cartItem })} style={{backgroundColor:'white',borderRadius:10, flexDirection: 'row', margin: 10 }}>
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
              {/* Код для отображения товаров в корзине */}
            </TouchableOpacity>
          ))}
          {/* Блок с вводом промокода и кнопкой применить */}
          <View style={{ margin: 10,backgroundColor:'white',borderRadius:10,padding:10 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Введите промокод</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{ flex: 1, height: 40,color:'black', borderColor: 'gray', borderWidth: 1, padding: 5,borderRadius:10 }}
                onChangeText={handlePromoCodeChange}
                value={promoCodeInput}
                placeholder="Промокод"
                placeholderTextColor='gray'
              />
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Итоговая сумма заказа:</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
              {getTotalPrice().toLocaleString()} ₽
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ paddingTop:320, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{ color: 'black', fontSize: 16 }}>Корзина пуста, самое время исправить это!</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;