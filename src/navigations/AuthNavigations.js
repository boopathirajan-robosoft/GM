import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, PaymentScreen } from "../screens";

const AuthStack = createStackNavigator();

function AuthNavigations() {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Payment" component={PaymentScreen} />
    </AuthStack.Navigator>
  );
}

export { AuthNavigations };
