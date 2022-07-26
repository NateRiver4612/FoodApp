import MapView, { Marker, Callout } from "react-native-maps";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurants/restaurant.context";
import { MapSearchBar } from "../components/search.component";
import styled from "styled-components/native";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const mapRegion = () => {
  return {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
};

export const MapScreen = ({ navigation }) => {
  const { locationCoordinate } = useContext(LocationContext);
  const { lat, lng } = locationCoordinate;
  const [mapRegion, setMapRegion] = useState({});
  const { restaurants } = useContext(RestaurantContext);

  useEffect(() => {
    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [locationCoordinate]);

  return (
    <>
      <MapSearchBar />
      <Map region={mapRegion}>
        {restaurants.map((restaurant, index) => (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <Callout
              onPress={() => {
                navigation.navigate("RestaurantDetail", {
                  restaurant,
                });
              }}
            >
              <MapCallout restaurant={restaurant}></MapCallout>
            </Callout>
          </Marker>
        ))}
      </Map>
    </>
  );
};
