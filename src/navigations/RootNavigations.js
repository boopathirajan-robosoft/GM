import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegisterScreen, OTPScreen } from "../screens";

const RootStack = createStackNavigator();

function RootNavigations() {
  return (
    <RootStack.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="OTPScreen" component={OTPScreen} />
    </RootStack.Navigator>
  );
}

export { RootNavigations };
