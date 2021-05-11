import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { RegisterForm } from "../components";

function RegisterScreen() {
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {};

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    width: "100%",
    padding: 32,
  },
});

export default RegisterScreen;
export { RegisterScreen };
