import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  //   LogBox,
  Text,
} from "react-native";
import { Layout, Button } from "../components";
import { signOut } from "../firebase";

// hide warning "Setting a timer for a long period of time, i.e. multiple minutes"
// https://stackoverflow.com/a/64832663
// LogBox.ignoreLogs(["Setting a timer"]);

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <Text>Profile Screen</Text>
        <Button title="Sign out" onPress={signOut} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efeeee",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ProfileScreen;
export { ProfileScreen };
