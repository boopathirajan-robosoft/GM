import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivitySpinner } from "./commons";
import { verifyOTP, createUser, getUserDetails } from "../firebase";

const INVALID_OTP =
  "Please enter the correct six digit code that we sent you just before.";
const INCORRECT_OTP = "The cdoe you entered is invalid - please try again.";

function VerifyButton({ enabled, onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.button,
            pressed && { opacity: 0.5 },
            enabled && styles.buttonEnabled,
          ]}
        >
          <Text style={[styles.btnText, enabled && styles.textenabled]}>
            CONTINUE
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function OTPForm({ verificationId, phoneNumber }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const validateOTP = async () => {
    await wait(800);
    return verificationCode.length == 6;
  };
  const handleOTPVerification = async () => {
    setErrorMessage("");
    setLoadingScreen(true);
    Keyboard.dismiss();
    const isValidOTP = await validateOTP();
    if (!isValidOTP) {
      setLoadingScreen(false);
      setErrorMessage(INVALID_OTP);
      return;
    }
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
      setLoadingScreen(false);
      navigation.navigate("Home");
    } catch (err) {
      if (err.code === "auth/invalid-verification-code") {
        setLoadingScreen(false);
        setErrorMessage(INCORRECT_OTP);
      }
      console.log("Error on OTP verification", JSON.stringify(err));
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
      <Text style={styles.label}>My code is</Text>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{phoneNumber}</Text>
        <Text
          style={styles.resend}
          onPress={() => navigation.navigate("Register")}
        >
          Resend
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={6}
          defaultValue={verificationCode}
          onChangeText={setVerificationCode}
          style={styles.input}
          selectionColor={"#a5a2a2"}
          placeholder={" code "}
          placeholderTextColor={"#969595"}
        />
      </View>
      <View style={styles.errorContainer}>
        {!!errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
      {loadingScreen ? (
        <ActivitySpinner />
      ) : (
        <VerifyButton
          enabled={verificationCode.length > 0 ? true : false}
          onPress={handleOTPVerification}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  label: {
    marginBottom: 30,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 32,
    color: "#232222",
  },
  number: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#a5a2a2",
  },
  resend: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#a5a2a2",
    marginLeft: 25,
  },
  numberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 25,
  },
  input: {
    fontSize: 36,
    borderBottomColor: "#80DDD9",
    borderBottomWidth: 2,
    paddingBottom: 10,
    fontFamily: "Montserrat_700Bold",
    letterSpacing: 35,
    color: "#232222",
  },
  errorContainer: {
    height: 32,
    marginBottom: 40
  },
  errorMessage: {
    color: "#ff0033",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
  },
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
  textenabled: {
    color: "#efeeee",
  },
});

export default OTPForm;
export { OTPForm };
