import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AntDesign,FontAwesome} from '@expo/vector-icons';
import {s} from 'react-native-wind';
import { useFavorite } from '../databases/FavoriteContext';


const ProductCard = ({navigation, route}) => {
  const {item} = route.params;
  const { favouriteStates, selectedFavorites, toggleFavorite } = useFavorite();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const thumbnailListRef = useRef(null);

  const renderImage = ({item: image, index}) => (
    <Image source={image} style={{width: 391, height: 391, borderRadius: 20}} />
  );

  const renderThumbnail = ({item: image, index}) => (
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
      }}>
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

  const handleScroll = useCallback(event => {
    const newCurrentIndex = Math.floor(event.nativeEvent.contentOffset.x / 389);
    setCurrentIndex(newCurrentIndex);
  }, []);

  const handleScrollThumbnail = index => {
    setCurrentIndex(index);
    thumbnailListRef.current.scrollToIndex({animated: true, index});
  };
  const id = item.id;

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            s`absolute top-4 left-4`,
            {
              zIndex: 1,
              borderRadius: 20,
              padding: 10,
              backgroundColor: 'white',
            },
          ]}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleFavorite(id)}
          style={[
            s`absolute top-4 right-4`,
            {
              borderRadius: 20,
              padding: 10,
              backgroundColor: favouriteStates[id] ? 'red' : 'rgba(0,0,0,0.4)',
              zIndex: 1,
            },
          ]}>
          <AntDesign name={favouriteStates[id] ? 'heart' : 'hearto'} size={18} color="white" />
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <FlatList
            data={item.images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderThumbnail}
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Text
            style={[{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              marginBottom: 10,
            }]}>
            {item.name}
          </Text>

          <Text style={{fontSize: 16, color: 'black', marginBottom: 10}}>
            {item.description}
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 10,
            }}>
            Характеристики:
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 5,
              color: 'black',
            }}>{`Категория: ${item.category}`}</Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 5,
              color: 'black',
            }}>{`Время доставки: ${item.deliveryTime}`}</Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 5,
              color: 'black',
            }}>{`Рейтинг: ${item.rating}`}</Text>
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 10,
            }}>
            Состав:
          </Text>
          <Text style={{fontSize: 16, color: 'black', marginBottom: 5}}>
            {item.structure}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20, flex: 1 }}>
          {item.sizesx && item.sizesy && (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: 10,
                }}
              >
                Размеры:
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="arrows-h" size={16} color="black" style={{ marginRight: 5, marginBottom: 4 }} />
                <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>{item.sizesx}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft: 5 }}>
                <FontAwesome name="arrows-v" size={16} color="black" style={{ marginRight: 10, marginBottom: 3 }} />
                <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>{item.sizesy}</Text>
              </View>
            </>
          )}
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20, flex: 1 }}>
          {item.weight && (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: 10,
                }}
              >
                Вес:
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>{item.weight}</Text>
              </View>
              </>
          )}
        </View>

      </ScrollView>
      <View style={{backgroundColor: 'white', paddingBottom: 75}}>
        {/* стили счётчика */}
        <View
          style={[
            s`absolute bottom-4 left-4 items-center`,
            {
              borderRadius: 10,
              padding: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              backgroundColor: '#f1f1f1',
            },
          ]}>
          {/* минус */}
          <TouchableOpacity
            onPress={() =>
              setSelectedQuantity(
                selectedQuantity > 1 ? selectedQuantity - 1 : 1,
              )
            }
            style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, color: 'black'}}>-</Text>
          </TouchableOpacity>
          {/* Вывод количества */}
          <Text style={{fontSize: 20, color: 'black'}}>{selectedQuantity}</Text>
          {/* Плюс */}
          <TouchableOpacity
            onPress={() => setSelectedQuantity(selectedQuantity + 1)}
            style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, color: 'black'}}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Вывод цены справа */}
        <TouchableOpacity
          style={[
            s`flex-row  absolute bottom-4 right-4`,
            {
              width: 200,
              borderRadius: 10,
              padding: 10,
              backgroundColor: 'black',
              justifyContent: 'space-between',
            },
          ]}>
          <Text style={{fontSize: 18, color: 'white'}}>Добавить </Text>
          <Text style={[{fontSize: 18, color: 'white'}]}>
            {(
              Number(item.price.replace(/\s/, '')) * Number(selectedQuantity)
            ).toLocaleString()}{' '}
            ₽
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
