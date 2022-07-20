import React from "react";
import { Image, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../../components/typography/text.component";


import star from "../../../../../assets/star"
import open from "../../../../../assets/open"
import { Spacer } from "../../../../components/spacer/spacer.component";
import { RestaurantCard, RestaurantCardCover, Address, Title, Info, Rating, Section, SectionEnd, Icon } from './restaurant-into-card.styles'



export const RestaurantInfoCard = ({ restaurant }) => {
  const {
    name,
    icon,
    photos,
    address,
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
    placeId
  } = restaurant;


  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
              <SvgXml key={`start-${index}-${placeId}`} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="caption" style={{ color: "red" }}>
                CLOSED TEMPORARILY
              </Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>

            <Spacer position="left" size="large" r>
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  )

}




