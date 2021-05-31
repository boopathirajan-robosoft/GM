import * as React from "react";
import { Pressable } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  Foundation,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

const Header = () => {
  const iconsColor = "#959EA3";
  const HighlightColor = "#80DDD9";
  const navigation = useNavigation();
  const { name = "" } = useRoute();

  const onPress = (route) => {
    if (route !== name) navigation.navigate(route);
  };

  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.shadowContianer]}>
        <View style={[styles.container]}>
          <Pressable style={[styles.icon]} onPress={() => onPress("Home")}>
            <Ionicons
              name="md-home"
              size={28}
              color={name === "Home" ? HighlightColor : iconsColor}
            />
          </Pressable>
          <Pressable style={[styles.icon]} onPress={() => onPress("Premium")}>
            <MaterialCommunityIcons
              name="crown"
              size={35}
              color={name === "Premium" ? HighlightColor : iconsColor}
            />
          </Pressable>
          <Pressable style={[styles.icon]} onPress={() => onPress("Payment")}>
            <Foundation
              name="dollar"
              size={37}
              color={name === "Payment" ? HighlightColor : iconsColor}
            />
          </Pressable>
          <Pressable style={[styles.icon]} onPress={() => onPress("Profile")}>
            <Entypo
              name="user"
              size={25}
              color={name === "Profile" ? HighlightColor : iconsColor}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { overflow: "hidden", paddingBottom: 20 },
  shadowContianer: {
    backgroundColor: "#efeeee",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 7,
  },
  icon: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Header;
export { Header };
