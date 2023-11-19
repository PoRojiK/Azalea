import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favouriteStates, setFavouriteStates] = useState({});
  const [selectedFavorites, setSelectedFavorites] = useState([]);

  const toggleFavorite = (flowerId) => {
    const newFavouriteStates = { ...favouriteStates, [flowerId]: !favouriteStates[flowerId] };
    setFavouriteStates(newFavouriteStates);

    if (newFavouriteStates[flowerId]) {
      setSelectedFavorites((prevFavorites) => {
        if (!prevFavorites.includes(flowerId)) {
          return [...prevFavorites, flowerId];
        }
        return prevFavorites;
      });
    } else {
      setSelectedFavorites((prevFavorites) => prevFavorites.filter((id) => id !== flowerId));
    }
  };

  return (
    <FavoriteContext.Provider value={{ favouriteStates, selectedFavorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};