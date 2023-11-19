import React from 'react'
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import { FavoriteProvider } from './src/databases/FavoriteContext';


export default function App() {
  return (
    <FavoriteProvider>
    <AppNavigation />
    </FavoriteProvider>
  );
}