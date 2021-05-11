import React from "react";
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { OTPForm } from "../components/OTPForm";

function OTPScreen({ route }) {
  const { verificationId } = route.params;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <OTPForm verificationId={verificationId} />
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

export default OTPScreen;
export { OTPScreen };
