import { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FavouritesContext } from "../../services/favourites/favourites.context";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  width: 100px;
  z-index: 999;
  display: flex;
  right: -50;
  top: 25;
`;

export const Favourite = ({ restaurant }) => {
  const { placeId } = restaurant;

  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find(
    (favourite) => favourite.placeId === placeId
  );

  return (
    <FavouriteButton
      onPress={() => {
        isFavourite
          ? removeFromFavourites(restaurant)
          : addToFavourites(restaurant);
      }}
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={26}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
