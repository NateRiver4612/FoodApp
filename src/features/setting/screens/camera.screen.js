import React, { useState, useEffect, useRef, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { ProfileCamera, ButtonContainer } from "../components/camera.styles";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const cameraRef = useRef();
  const [tap, setTap] = useState(0);

  const { user, setUser } = useContext(AuthenticationContext);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      await AsyncStorage.setItem(`avatar-${user.uid}`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Pressable
      onPress={() => {
        var temp = tap;
        temp = temp + 1;
        setTap(temp);
        console.log(tap);
        if (tap == 1) {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
          setTap(0);
        } else {
          setTimeout(() => {
            setTap(0);
          }, 1000);
        }
      }}
    >
      <ProfileCamera ref={(ref) => (cameraRef.current = ref)} type={type}>
        <ButtonContainer>
          <TouchableOpacity onPress={takePicture}>
            <Ionicons
              name="radio-button-on"
              style={{ opacity: 0.9 }}
              size={65}
              color="white"
            />
          </TouchableOpacity>
        </ButtonContainer>
      </ProfileCamera>
    </Pressable>
  );
};
