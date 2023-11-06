import {View, Text, ScrollView, TouchableOpacity, Image, Button} from 'react-native';
import React from 'react';
import {s} from 'react-native-wind';
import {Banner_data} from '../consts/index';


export default function Banners() {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{paddingHorizontal: 8, marginTop: 15, justifyContent: "space-between"}}>
          {Banner_data.map((cat, index, name, bottom_text) => (  
            <TouchableOpacity key={index} style={{marginRight: 8, backgroundColor: index === 0 ? '#ddd9e7' : '#e4ecff', borderRadius: 15, height:135,width:300}}>
              <View>
                <Text
                  style={[
                    s`font-bold text-red-500`,
                    {textAlign: 'left',
                    marginLeft: 10,
                    marginTop: 10,
                    fontSize: 20,
                    }]}>
                  {cat.name}
                </Text>
                <Text
                  style={[
                    s`font-semibold text-red-800`,
                    {textAlign: 'left',
                    marginLeft: 10,
                    marginTop: 5,
                    fontSize: 8,
                    }]}>
                  {cat.bottom_text}
                </Text>
                <Image source={cat.image1} style={{
                  width: 110,
                  height: 25,
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: 100,
                  marginLeft: 10,
                }} />
                <Image source={cat.image} style={{
                  width: 160,
                  height: 160,
                  position: 'absolute',
                  zIndex: -1,
                  marginTop: index === 1 ? -15 : -20,
                  marginLeft: index === 1? 180 : 140,
                  borderRadius: index === 1? 0 : 20,
                }} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
    );
  }
  