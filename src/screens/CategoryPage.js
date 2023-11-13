import React, {useEffect} from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { FlowerData } from '../consts/index';
import { s } from 'react-native-wind';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const CategoryPageMain = ({ route }) => {
  const navigation = useNavigation();
  const { category,item } = route.params;

  const filteredData = FlowerData.filter((item) => item.category === category);

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[s`left-8`,{ fontSize: 18, fontWeight: 'bold', color: 'black' }]}>{category}</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {filteredData.map((item, id) => (
          
          <TouchableOpacity
            style={{
              margin: 8,
              backgroundColor: 'white',
              borderRadius: 15,
              height: 270,
              width: 180,
              shadowColor: 'gray',
              elevation: 4,
            }}
            key={item.id}
          >
            <Image style={{ width: '100%', height: 180, resizeMode: 'cover', borderRadius: 15 }} source={item.image} />

            <TouchableOpacity
              style={[
                s`absolute top-2 right-2`,
                {
                  borderRadius: 20,
                  padding: 10,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                },
              ]}
            >
            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', marginTop: 10, marginHorizontal: 10, fontSize: 12, color: 'black', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.name}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="star" size={18} color="orange" />
                <Text style={{ color: 'black' }}>{item.rating}</Text>
              </View>
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryPageMain;