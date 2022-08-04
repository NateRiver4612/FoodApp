import { createContext, useState } from "react";
import {
  firebaseAuthChange,
  firebaseLogOut,
  firebaseSignIn,
  firebaseSignUp,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const { user } = await firebaseSignIn(email, password);
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      console.log("Error with firebase login:", error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const onRegister = async (email, password, repeatedPassword) => {
    setIsLoading(true);
    try {
      if (password !== repeatedPassword) {
        setError("Confirm password failed");
        setIsLoading(false);
        return;
      }
      const { user } = await firebaseSignUp(email, password);
      console.log("Sign up successfully", user);
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const checkUserSession = () => {
    firebaseAuthChange((user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  const onLogOut = async () => {
    setIsLoading(true);
    try {
      await firebaseLogOut();
      setUser(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const isAuthenticated = !!user;

  const value = {
    isAuthenticated,
    user,
    isLoading,
    error,
    onLogin,
    onLogOut,
    checkUserSession,
    onRegister,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
