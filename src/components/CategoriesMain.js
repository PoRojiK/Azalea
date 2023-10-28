import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {s} from 'react-native-wind';
import {RowData} from '../consts/index';
const {firstRowCategories} = RowData();
const {secondRowCategories} = RowData();

export default function Categories() {
  return (
    <View >
      {/* Первая строка */}
      <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 8, marginTop: 8, justifyContent: "space-between", flexDirection: "row", flex: 1,}}>
        {firstRowCategories.map((cat, index, name) => (
          
          <TouchableOpacity key={index} style={{marginRight: 4, flex: 1, backgroundColor: '#f2f2f2', borderRadius: 15, height:125}}>
            <View>
              <Text
                style={[
                  s`font-semibold text-gray-800`,
                  {textAlign: 'left',
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 14,
                  }]}>
                {cat.name}
              </Text>
              <Image source={cat.image} style={{
                transform: [{ rotate: index === 1 ? '-30deg' : '0deg' }],
                width: 110,
                height: 110,
                alignSelf: 'flex-end',
                position: 'absolute',
                zIndex: 1,
                marginTop: 30
              }} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Вторая строка */}
      <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 8, marginTop: 4, justifyContent: "space-between", flexDirection: "row", flex: 1,}}>
        {secondRowCategories.map((cat, index, name) => (
          <TouchableOpacity key={index} style={{marginRight: 4, flex: 1, backgroundColor: '#f2f2f2', borderRadius: 15, height:115}}>
          <View>
            <Text
              style={[
                s`font-medium text-gray-800`,
                {textAlign: 'left',
                marginLeft: 10,
                marginTop: 10,
                fontSize: 12,
              }]}>
              {cat.name}
            </Text>
            <Image source={cat.image} style={{
              transform: [{ rotate: index === 0 ? '-10deg' : '0deg' }],
              paddingTop: 30,
              width: 90,
              height: 90,
              borderRadius: 2,
              alignSelf: 'flex-end',
              position: 'absolute',
              zIndex: 1,
              marginTop: 40,
            }} />
          </View>
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
