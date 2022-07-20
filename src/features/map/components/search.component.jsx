import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  z-index: 2;
  position: absolute;
  width: 100%;
`;

export const MapSearchBar = () => {
    const { locationSearch, setLocationSearch } = useContext(LocationContext)
    const [searchKeyword, setKeyword] = useState(locationSearch)

    const onChangehandler = (text) => setKeyword(text)


    const onSubmitHandler = () => setLocationSearch(searchKeyword)


    useEffect(() => {
        setKeyword(locationSearch)
    }, [locationSearch])

    return (
        <SearchContainer>
            <Searchbar
                placeholder="Search for a location"
                value={searchKeyword}
                icon="map"
                onSubmitEditing={onSubmitHandler}
                onChangeText={onChangehandler}
            />
        </SearchContainer>
    );
};