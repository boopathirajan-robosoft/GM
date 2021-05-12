import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { auth } from "./src/firebase";
import { RootNavigations, AuthNavigations } from "./src/navigations";
import { useFonts, Montserrat_700Bold, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';


export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [hasSession, setSession] = useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_400Regular
  });

  React.useEffect(() => {
    // handle session - check if the user is already loggedIn
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  const onAuthStateChanged = (user) => {
    setAppReady(true);
    setSession(!!user);
  };

  if (!isAppReady || !fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      {hasSession ? <AuthNavigations /> : <RootNavigations />}
    </NavigationContainer>
  );
}
