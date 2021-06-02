import React, { useState, useEffect } from "react";
import { SafeAreaView, Platform, StatusBar, StyleSheet } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PaymentForm, SavedPayments } from "../components";
import { getStripeConfig } from "../models";

function PaymentScreen() {
  const [publishableKey, setPublishableKey] = useState("");

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  const fetchPublishableKey = async () => {
    const { publishableKey: key = "" } = await getStripeConfig();
    setPublishableKey(key);
  };
  return (
    <StripeProvider publishableKey={publishableKey}>
      <SafeAreaView style={styles.container}>
        <SavedPayments />
        <PaymentForm />
      </SafeAreaView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default PaymentScreen;
export { PaymentScreen };
