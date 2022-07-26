import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (item) => {
    setFavourites([...favourites, item]);
  };

  const removeFromFavourites = (itemToRemove) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== itemToRemove.placeId
    );

    setFavourites(newFavourites);
  };

  const storeFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
      console.log(value);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    storeFavourites(favourites);
  }, [favourites]);

  const value = { favourites, addToFavourites, removeFromFavourites };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
