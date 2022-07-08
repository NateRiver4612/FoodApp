import React, { useState } from "react";
import { StatusBar, Text, View, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card/restaurant-info-card.component";

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

export const RestaurantScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const listItem = () => (
    <Spacer position="bottom" size='large'>
      <RestaurantInfoCard></RestaurantInfoCard>
    </Spacer>

  )

  return (
    <SafeArea >
      <SearchContainer >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      <RestaurantList

        keyExtractor={(item) => item.name}
        data={[
          { name: 1 },
          { name: 2 },
          { name: 3 },
          { name: 4 },
          { name: 5 },
          { name: 6 },
        ]}
        renderItem={listItem}
      />
    </SafeArea>
  );
}