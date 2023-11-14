import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import {s} from 'react-native-wind';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const ProductCard = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    setModalVisible(false);
    // Дополнительные действия при закрытии модального окна
  };

  const handleGestureEvent = event => {
    if (
      event.nativeEvent.translationY > 50 &&
      event.nativeEvent.state === State.ACTIVE
    ) {
      hideModal();
    }
  };
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      // Получите индекс первого видимого элемента и установите текущий индекс
      setCurrentIndex(viewableItems[0].index);
    }
  };
  const renderImage = ({ item: image,index  }) => (
    <Image source={image} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width, borderRadius: 15 }} />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={hideModal}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[s`absolute top-4 left-4`, { zIndex: 1, borderRadius: 20, padding: 10, backgroundColor: 'white' }]}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[s`absolute top-4 right-4`, { borderRadius: 20, padding: 10, backgroundColor: 'white', zIndex: 1 }]}>
              <AntDesign name={'heart'} size={18} color="red" />
            </TouchableOpacity>

            <FlatList
        data={item.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(data) => renderImage(data, currentIndex, setCurrentIndex)}
        onMomentumScrollEnd={(event) =>
          setCurrentIndex(Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width))
        }
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        {item.images.map((_, index) => (
          <View
            key={index.toString()}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: index === currentIndex ? 'blue' : 'gray',
            }}
          />
        ))}
      </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 10 }}>{item.name}</Text>
              <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>{item.price} ₽</Text>
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                Изображения:
              </Text>
            </View>

            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontSize: 16, marginBottom: 10}}>
                {item.description}
              </Text>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                Характеристики:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                }}>{`Категория: ${item.category}`}</Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                }}>{`Время доставки: ${item.deliveryTime}`}</Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                }}>{`Рейтинг: ${item.rating}`}</Text>
              {/* Add more characteristics as needed */}
            </View>

            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                Состав:
              </Text>
              <Text style={{fontSize: 16, marginBottom: 5}}>
                {item.structure}
              </Text>
              {/* Add more details about the composition */}
            </View>
          </ScrollView>
        </PanGestureHandler>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default ProductCard;
