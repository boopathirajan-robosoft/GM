import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, PaymentScreen, ProfileScreen, PremiumScreen } from "../screens";

const AuthStack = createStackNavigator();

function AuthNavigations() {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Payment" component={PaymentScreen} />
      <AuthStack.Screen name="Profile" component={ProfileScreen} />
      <AuthStack.Screen name="Premium" component={PremiumScreen} />
    </AuthStack.Navigator>
  );
}

export { AuthNavigations };
