import React, { useState, useEffect } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Button } from "../components/commons";
import { signOut } from "../firebase";
import {
  checkAndCreateUser,
  getSavedCards,
  updateUserName,
  updateNotificationToken,
} from "../models";
import { registerForPushNotificationsAsync } from "../utils";

// hide warning "Setting a timer for a long period of time, i.e. multiple minutes"
// https://stackoverflow.com/a/64832663
LogBox.ignoreLogs(["Setting a timer"]);

// to handle notifications when is open(foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen() {
  const [displayName, setDisplayName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [savedCards, setSavedCards] = useState({});
  const { landscape = false } = useDeviceOrientation();
  const navigation = useNavigation();
  const hasSavedCards = savedCards.cards && savedCards.cards.length;

  useEffect(() => {
    fetchUserDetails();
    submitPushNotificationToken();
  }, []);

  const fetchUserDetails = async () => {
    const profileResponse = await checkAndCreateUser();
    const customerCards = await getSavedCards();
    if (profileResponse.data) {
      setUserInfo(profileResponse.data);
    }
    setSavedCards(customerCards);
  };

  const submitPushNotificationToken = async () => {
    const token = await registerForPushNotificationsAsync();
    await updateNotificationToken(token);
  };

  const validateDisplayName = () => {
    return displayName.length > 3;
  };

  const updateProfile = async () => {
    const isValidDisplayName = validateDisplayName();
    if (isValidDisplayName) {
      await updateUserName(displayName);
      await fetchUserDetails();
    } else {
      // TODO: Handle Validation
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handlePayment = async () => {
    navigation.navigate("Payment");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ height: landscape ? "100%" : "30%" }, styles.card]} />
      {userInfo.userName ? (
        <Text>Hello {userInfo.userName}</Text>
      ) : (
        <View style={{ padding: 16 }}>
          <TextInput
            defaultValue={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
          />
          <Button title="UPDATE" onPress={updateProfile} />
        </View>
      )}
      <Button title="SIGN OUT" onPress={handleSignOut} />
      <Button
        title="Payment"
        onPress={handlePayment}
        style={{ marginTop: 10 }}
      />
      <Text>Saved Cards</Text>
      {hasSavedCards ? (
        <Text>{JSON.stringify(savedCards)}</Text>
      ) : (
        <Text>No saved cards</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  card: {
    backgroundColor: "grey",
    width: "100%",
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    lineHeight: 20,
    borderWidth: 1,
    textTransform: "uppercase",
  },
  btnText: {
    textAlign: "center",
  },
});

export default HomeScreen;
export { HomeScreen };
