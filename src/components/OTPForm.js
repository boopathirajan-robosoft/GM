import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { verifyOTP, createUser, getUserDetails } from "../firebase";

const INVALID_OTP = "Please enter 6 digit OTP.";
const INCORRECT_OTP = "Incorrect OTP";

function VerifyButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.button, pressed && { opacity: 0.65 }]}>
          <Text style={styles.btnText}>VERIFY OTP</Text>
        </View>
      )}
    </Pressable>
  );
}

function OTPForm({ verificationId }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const validateOTP = () => {
    return verificationCode.length == 6;
  };
  const handleOTPVerification = async () => {
    const isValidOTP = validateOTP();
    if (!isValidOTP) {
      setErrorMessage(INVALID_OTP);
      return;
    }
    setErrorMessage("");
    try {
      await verifyOTP(verificationId, verificationCode);
      const profileResponse = await getUserDetails();
      // create entry in backend if the user doesn't exists.
      if (
        profileResponse.status === 404 ||
        profileResponse.errorCode === "not-found"
      ) {
        await createUser();
      }
      navigation.navigate("Home");
    } catch (err) {
      if (err.code === "auth/invalid-verification-code") {
        setErrorMessage(INCORRECT_OTP);
      }
      console.log("Error on OTP verification", JSON.stringify(err));
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
      <View>
        <Text style={styles.label}>
          Please enter the 6 digit OTP sent to your mobile
        </Text>
        <View style={styles.container}>
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={6}
            defaultValue={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
          />

          <View style={styles.errorContainer}>
            {!!errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
          </View>
        </View>
        <VerifyButton onPress={handleOTPVerification} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  errorContainer: {
    height: 32,
    paddingVertical: 6,
  },
  errorMessage: {
    color: "#ff0033",
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

export default OTPForm;
export { OTPForm };
