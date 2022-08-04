import React from "react";

import { Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { SettingScreen } from "../../features/setting/screens/setting.screen";
import { CameraScreen } from "../../features/setting/screens/camera.screen";

const SettingStack = createStackNavigator();

export const SettingNavigator = () => {
  return (
    <SettingStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.DefaultTransition,
      }}
    >
      <SettingStack.Screen name="Setting" component={SettingScreen} />
      <SettingStack.Screen
        name="Favourites"
        component={() => {
          return <Text>Hello</Text>;
        }}
      />
      <SettingStack.Screen
        name="Camera"
        component={CameraScreen}
      ></SettingStack.Screen>
    </SettingStack.Navigator>
  );
};
