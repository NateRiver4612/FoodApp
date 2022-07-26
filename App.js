import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { RestaurantProvider } from "./src/services/restaurants/restaurant.context";
import { LocationProvider } from "./src/services/location/location.context";
import { AppNavigation } from "./src/infrastructure/navigation/app.navigation";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

export default function App() {
  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  let [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocationProvider>
          <RestaurantProvider>
            <FavouritesContextProvider>
              <AppNavigation></AppNavigation>
            </FavouritesContextProvider>
          </RestaurantProvider>
        </LocationProvider>
      </ThemeProvider>
      <ExpoStatusBar style="dark" />
    </>
  );
}
