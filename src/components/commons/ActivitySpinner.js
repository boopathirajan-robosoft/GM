import * as React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const ActivitySpinner = () => {
  return (
    <View style={[styles.spinnerContainer]}>
      <ActivityIndicator size="large" color="#80DDD9" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    backgroundColor: "#efeeee",
    padding: 8,
  },
});

export default ActivitySpinner;
export { ActivitySpinner };