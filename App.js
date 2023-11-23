import React from 'react'
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import { FavoriteProvider } from './src/databases/FavoriteContext';
import { CartProvider } from './src/databases/CartContext';



export default function App() {
  return (
    <CartProvider>
    <FavoriteProvider>

    <AppNavigation />

    </FavoriteProvider>
    </CartProvider>
  );
}