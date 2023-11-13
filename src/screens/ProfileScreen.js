import { View, Text } from 'react-native'
import React from 'react'


export default function ProfileScreen({route}) {
  const username = route?.params?.username || 'Гость';
  return (
    <View>
      <Text style={{color: 'black'}}>{`Привет, ${username}!`}</Text>
    </View>
  )
}