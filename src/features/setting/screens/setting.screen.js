import { useContext, useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native";
import { List, Avatar } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
  padding: 16px;
`;

export const SettingScreen = ({ navigation }) => {
  const { onLogOut } = useContext(AuthenticationContext);
  const onLogOutHanlder = () => onLogOut();

  const { user } = useContext(AuthenticationContext);

  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async () => {
    const photoUri = await AsyncStorage.getItem(`avatar-${user.uid}`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Run effect");
      getProfilePicture();
    }, [user])
  );

  return (
    <SafeAreaView>
      <AvatarContainer>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          {!photo && (
            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          )}
          {photo && (
            <Avatar.Image
              size={180}
              source={{ uri: photo }}
              backgroundColor="#2182BD"
            />
          )}
        </TouchableOpacity>

        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <TouchableOpacity>
          <SettingsItem
            style={{ padding: 16 }}
            title="Favourites"
            onPress={() => {
              navigation.navigate("Favourites");
            }}
            left={(props) => {
              return <List.Icon {...props} color="black" icon="heart" />;
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SettingsItem
            style={{ padding: 16 }}
            title="Log out"
            left={(props) => {
              return <List.Icon {...props} color="black" icon="door" />;
            }}
            onPress={onLogOutHanlder}
          ></SettingsItem>
        </TouchableOpacity>
      </List.Section>
    </SafeAreaView>
  );
};
