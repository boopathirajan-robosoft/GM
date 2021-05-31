import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

function Button({
  title = "",
  enabled = true,
  onPress = null,
  style: propStyles = {},
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.button,
            pressed && { opacity: 0.5 },
            enabled && styles.buttonEnabled,
            propStyles,
          ]}
        >
          <Text style={[styles.btnText, enabled && styles.textEnabled]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "lightgray",
    opacity: 0.4,
    borderRadius: 20,
  },
  buttonEnabled: {
    opacity: 1,
    backgroundColor: "#80DDD9",
  },
  btnText: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
  },
  textEnabled: {
    color: "#efeeee",
  },
});

export default Button;
export { Button };
