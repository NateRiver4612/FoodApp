import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AppNavigation } from "./app.navigation";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const { checkUserSession, isAuthenticated } = useContext(
    AuthenticationContext
  );

  const checkLogin = async () => {
    await checkUserSession();
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigation /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
