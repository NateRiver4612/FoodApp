import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";
import { RestaurantNavigator } from "./restaurant.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Button } from "react-native";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurant.context";
import { LocationsContextProvider } from "../../services/location/location.context";
import { SettingScreen } from "../../features/setting/screens/setting.screen";
import { SettingNavigator } from "./setting.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = TAB_ICON[route.name];

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
  tabBarStyle: [
    {
      display: "flex",
    },
    null,
  ],
});

export const AppNavigation = () => {
  return (
    <FavouritesContextProvider>
      <LocationsContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingNavigator} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationsContextProvider>
    </FavouritesContextProvider>
  );
};
