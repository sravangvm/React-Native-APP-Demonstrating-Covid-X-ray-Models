import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./components/Home";
import Lungs from "./components/Lungs";
import Covid from "./components/Covid";
  
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Lungs: Lungs,
    Covid: Covid,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
    },
  }
);
  
const Navigator = createAppContainer(AppNavigator);
  
export default function App() {
  return (
    <Navigator>
        <Home/>
    </Navigator>
  );
}