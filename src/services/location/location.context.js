import { createContext, useState, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationSearch, setLocationSearch] = useState("antwerp");
  const [locationCoordinate, setLocationCoordinate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocation = async (locationSearch) => {
    setLoading(true);

    try {
      const rawData = await locationRequest(locationSearch);
      const data = locationTransform(rawData);

      setLocationCoordinate(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("Error fetching location", error);
    }
  };

  useEffect(() => {
    searchLocation(locationSearch.toLowerCase());
  }, [locationSearch]);

  const value = {
    locationCoordinate,
    setLocationSearch,
    isLoading,
    error,
    locationSearch,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
