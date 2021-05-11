import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, RegisterScreen, OTPScreen } from "../screens";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

function RootNavigations() {
  return (
    <RootStack.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="OTPScreen" component={OTPScreen} />
    </RootStack.Navigator>
  );
}

function AuthNavigations() {
  return (
    <AuthStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Home" component={HomeScreen} />
    </AuthStack.Navigator>
  );
}

export { RootNavigations, AuthNavigations };
