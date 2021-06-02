import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function RadioButton({
  radioKey = "",
  label = "",
  isSelected = false,
  handleClick,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleClick(radioKey)}
    >
      <View style={styles.radioButton}>
        {isSelected && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#80DDD9",
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: "#80DDD9",
  },
  label: {
    marginLeft: 8,
  },
});

export default RadioButton;
export { RadioButton };
