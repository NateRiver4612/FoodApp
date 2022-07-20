import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";

export const RestaurantContext = createContext();

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { locationCoordinate } = useContext(LocationContext);

  const fetchRestarauntsData = async (location) => {
    setIsLoading(true);
    try {
      const rawData = await restaurantsRequest(location);
      const data = await restaurantsTransform(rawData);

      // await sleep(1000);

      setRestaurants(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log("Error fetching restaurants: ", error);
    }
  };

  useEffect(() => {
    const location = `${locationCoordinate.lat},${locationCoordinate.lng}`;
    fetchRestarauntsData(location);
  }, [locationCoordinate]);

  const value = {
    restaurants,
    isLoading,
    error,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
