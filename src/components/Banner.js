import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {s} from 'react-native-wind';
import {Banner_data} from '../consts/index';


export default function Banners() {
    return (
      <View style={{width: 900}}>
        <ScrollView horizontal={true} contentContainerStyle={{paddingHorizontal: 8, marginTop: 8, justifyContent: "space-between", flexDirection: "row", flex: 1,}}>
          {Banner_data.map((cat, index, name) => (  
            <TouchableOpacity key={index} style={{marginRight: 4, flex: 1, backgroundColor: '#f2f2f2', borderRadius: 15, height:150}}>
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
                  width: 130,
                  height: 130,
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: 30
                }} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
  