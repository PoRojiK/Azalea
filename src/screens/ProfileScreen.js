import { View, Text,ScrollView,TouchableOpacity,Linking } from 'react-native'
import React from 'react'
import {s} from 'react-native-wind';
import { Ionicons,Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Banners from '../components/Banner';

export default function ProfileScreen({route}) {
  const username = route?.params?.username || 'Гость';
  const navigationMain = useNavigation();
  const phoneNumber = '89383381095';

  const openPhoneBook = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={{flex:1,backgroundColor:'#9333ea'}}>

      <View style={{margin:20}}>
        <Text style={[s`font-semibold`,{color: 'white',fontSize: 18}]}>{`Привет, ${username}!`}</Text>
        <Text style={{color: 'white',fontSize: 14}}>Желаем хорошего дня!</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 50}}>
          {/* Первая карточка */}
          <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 20, height: 130, width: 180, marginRight: 10, shadowColor: 'gray', elevation: 4 }}>
            <View style={{ padding: 10, borderRadius: 20,justifyContent: 'center' }}>

              

              <Text style={[s`absolute left-3 top-3`, { color: 'black', fontSize: 18,zIndex:1 }]}>Бонусные рубли</Text>
              <Text style={[s`absolute left-3 top-9 font-semibold`, { color: 'black', fontSize: 18,zIndex:1 }]}>38</Text>
              <Text style={{ color: 'black', fontSize: 12,zIndex:2,marginTop:80 }}>{'Нажмите,\nчтобы потратить'}</Text>
              <Octicons style={[s`absolute right-3 bottom-3 font-semibold`,{}]}name="ruby" size={48} color="#f59e0b" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigationMain.navigate('Корзина')}  style={{ backgroundColor: 'white', borderRadius: 20, height: 130, width: 120, marginRight: 10, shadowColor: 'gray', elevation: 4 }}>
            <View style={{ padding: 10, borderRadius: 20,justifyContent: 'center',alignItems: 'center' }}>
              <Ionicons name={'basket-outline'} size={90} color={'black'} />
              <Text style={[s`absolute bottom-0 font-semibold`, { color: 'black', fontSize: 18,zIndex:1 }]}>Корзина</Text>
            </View>
          </TouchableOpacity>

          {/* Вторая карточка */}
          <TouchableOpacity onPress={() => navigationMain.navigate('Избранное')} style={{ backgroundColor: 'white', borderRadius: 20, height: 130, width: 120, shadowColor: 'gray', elevation: 4}}>
            <View style={{ padding: 10, borderRadius: 20,justifyContent: 'center',alignItems: 'center'  }}>
              <Ionicons name={'heart-outline'} size={90} color={'black'} />
              <Text style={[s`absolute bottom-0 font-semibold`, { color: 'black', fontSize: 18,zIndex:1 }]}>Избранное</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
        
      </View>

        <View>
          <View style={{backgroundColor:'white',borderTopLeftRadius:30,borderTopRightRadius:30,zIndex:1,width:'100%',height:552,paddingTop:15}}>
            <Text style={[s`font-semibold`,{color: 'black',fontSize: 18,marginLeft:15}]}>С любовью!</Text>
            <Banners />
            
          </View>

          <TouchableOpacity
            style={[s`absolute`,{
              backgroundColor: '#f59e0b',
              zIndex:3,
              borderRadius: 10,
              padding: 10,
              marginLeft:10,
              width: 372,
              marginTop: 390,
              alignItems: 'center',
            }]}
            onPress={openPhoneBook}
          >
            <Text style={[s`font-semibold`,{ color: 'white', fontSize: 16 }]}>Поддержка</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  )
}