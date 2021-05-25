import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, RegisterScreen, OTPScreen, PaymentScreen, ProfileScreen, PremiumScreen } from "../screens";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

const screenOptions = { animationEnabled: false };

function RootNavigations() {
  return (
    <RootStack.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen options={screenOptions} name="Register" component={RegisterScreen} />
      <RootStack.Screen options={screenOptions} name="OTPScreen" component={OTPScreen} />
    </RootStack.Navigator>
  );
}

function AuthNavigations() {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen options={screenOptions} name="Home" component={HomeScreen} />
      <AuthStack.Screen options={screenOptions} name="Payment" component={PaymentScreen} />
      <AuthStack.Screen options={screenOptions} name="Profile" component={ProfileScreen} />
      <AuthStack.Screen options={screenOptions} name="Premium" component={PremiumScreen} />
    </AuthStack.Navigator>
  );
}

export { RootNavigations, AuthNavigations };
