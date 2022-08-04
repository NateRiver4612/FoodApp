import styled from "styled-components/native";
import { Camera, CameraType } from "expo-camera";

export const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  bottom: 10px;
`;
