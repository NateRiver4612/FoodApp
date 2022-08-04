import React, { useEffect, useRef } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";
import Lottie from "lottie-react-native";
import { Animated, Easing } from "react-native";

export const AccountScreen = ({ navigation }) => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      delay: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <Lottie
          source={require("../../../../assets/Watermelon.json")}
          loop
          resizeMode="cover"
          progress={animationProgress.current}
        />
      </AnimationWrapper>

      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
