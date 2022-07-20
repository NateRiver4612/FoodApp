import React, { useState, useContext } from "react";
import { RestaurantContext } from "../../../services/restaurants/restaurant.context";
import { StatusBar, Text, View, SafeAreaView, FlatList, Pressable } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";
import { SearchBar } from "../components/search/search.component";
import { Spinner } from "../../../components/utility/spinner.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 }
})`

`


export const RestaurantScreen = ({ navigation }) => {
  const { restaurants, isLoading } = useContext(RestaurantContext)

  const listItem = (restaurant) => {
    const { item } = restaurant

    return (
      <Pressable onPress={() => { navigation.navigate("RestaurantDetail", { restaurant: item }) }} >
        <Spacer position="bottom" size='large'>
          <RestaurantInfoCard restaurant={item}></RestaurantInfoCard>
        </Spacer>
      </Pressable>


    )
  }

  console.log(isLoading)


  return (
    <SafeArea >
      {
        isLoading
          ? (
            <Spinner></Spinner>
          )
          :
          <>
            <SearchContainer >
              <SearchBar
              />
            </SearchContainer>
            <RestaurantList

              keyExtractor={(item) => item.name}
              data={restaurants}
              renderItem={listItem}
            />
          </>
      }
    </SafeArea>
  );
}