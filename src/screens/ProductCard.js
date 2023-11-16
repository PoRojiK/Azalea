import React, { useState, useCallback,useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { s } from 'react-native-wind';

const ProductCard = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1); 
  const thumbnailListRef = useRef(null);
  const renderImage = ({ item: image, index }) => (
    <Image
      source={image}
      style={{ width: 391, height: 391, borderRadius: 20 }}
    />
  );

  const renderThumbnail = ({ item: image, index }) => (
    <TouchableOpacity
      onPress={() => {
        handleScrollThumbnail(index);
      }}
      style={{
        width: 80,
        height: 80,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: index === currentIndex ? 'blue' : 'gray',
      }}
    >
      <Image
        source={image}
        style={{
          flex: 1,
          width: 80,
          height: 80,
          borderRadius: 10,
          resizeMode: 'cover',
          opacity: index === currentIndex ? 1 : 0.5,
          backgroundColor: 'white',
        }}
      />
    </TouchableOpacity>
  );

  const handleScroll = useCallback((event) => {
    const newCurrentIndex = Math.floor(event.nativeEvent.contentOffset.x / 390);
    setCurrentIndex(newCurrentIndex);
  }, []);

  const handleScrollThumbnail = (index) => {
    setCurrentIndex(index);
    thumbnailListRef.current.scrollToIndex({ animated: true, index });
  };


  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          s`absolute top-4 left-4`,
          { zIndex: 1, borderRadius: 20, padding: 10, backgroundColor: 'white' },
        ]}
      >
        <AntDesign name="left" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          s`absolute top-4 right-4`,
          { borderRadius: 20, padding: 10, backgroundColor: 'white', zIndex: 1 },
        ]}
      >
        <AntDesign name={'heart'} size={18} color="red" />
      </TouchableOpacity>

      <FlatList
        ref={thumbnailListRef}
        data={item.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImage}
        onMomentumScrollEnd={handleScroll}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <FlatList
          data={item.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderThumbnail}
        />
      </View>

      <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 10 }}>
          {item.name}
        </Text>

        <Text style={{ fontSize: 16, color: 'black', marginBottom: 10 }}>
          {item.description}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>
          Характеристики:
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5, color: 'black' }}>{`Категория: ${item.category}`}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5, color: 'black' }}>{`Время доставки: ${item.deliveryTime}`}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5, color: 'black' }}>{`Рейтинг: ${item.rating}`}</Text>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>
          Состав:
        </Text>
        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
          {item.structure}
        </Text>
      </View>

      <View>
      <View 
      style={[
        s`absolute bottom-4 left-4 items-center`, // Updated to bottom right
        { borderRadius: 20, padding: 10, backgroundColor: 'white',flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
      ]}>
        {/* Minus sign for decreasing quantity */}
        <TouchableOpacity
          onPress={() => setSelectedQuantity(selectedQuantity > 1 ? selectedQuantity - 1 : 1)}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 20, color: 'black' }}>-</Text>
        </TouchableOpacity>
        {/* Display the selected quantity */}
        <Text style={{ fontSize: 20, color: 'black' }}>{selectedQuantity}</Text>
        {/* Plus sign for increasing quantity */}
        <TouchableOpacity
          onPress={() => setSelectedQuantity(selectedQuantity + 1)}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 20, color: 'black' }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Move the price to the bottom right */}
      <TouchableOpacity
        style={[
          s`absolute bottom-4 right-4`, // Updated to bottom right
          { borderRadius: 20, padding: 10, backgroundColor: 'white'},
        ]}
      >
        <Text style={{ fontSize: 18, color: 'black' }}>Добавить {(Number(item.price.replace(/\s/, ''))  * Number(selectedQuantity)).toLocaleString()} ₽</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductCard;