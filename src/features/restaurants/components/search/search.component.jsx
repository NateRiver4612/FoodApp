import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../../services/location/location.context";


const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[0]};
`;

export const SearchBar = () => {
    const { locationSearch, setLocationSearch } = useContext(LocationContext)
    const [searchKeyword, setKeyword] = useState(locationSearch)

    const onChangehandler = (text) => {
        setKeyword(text)
    }

    const onSubmitHandler = () => setLocationSearch(searchKeyword)

    useEffect(() => {
        setKeyword(locationSearch)
    }, [locationSearch])

    return (
        <SearchContainer>
            <Searchbar
                placeholder="Search for a location"
                value={searchKeyword}
                onSubmitEditing={onSubmitHandler}
                onChangeText={onChangehandler}
            />
        </SearchContainer>
    );
};