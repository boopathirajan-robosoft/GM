import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import * as Sentry from "sentry-expo";
import { auth } from "./src/firebase";
import { RootNavigations, AuthNavigations } from "./src/navigations";

Sentry.init({
  dsn: "https://19e69cd786d94226a94734996dda6067@o755507.ingest.sentry.io/5791960",
  enableInExpoDevelopment: true,
  debug: true, // Set this to `false` in production.
});

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [hasSession, setSession] = useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
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
