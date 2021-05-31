import React, { useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { loginWithPhoneNumber } from "../firebase";
import { ActivitySpinner, Button } from "./commons";
import downArrow from "../../assets/caret-down.png";

function RegisterForm() {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [hasError, setError] = useState(false);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const navigation = useNavigation();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const validatePhoneNumber = async () => {
    await wait(800);
    return phoneNumber.length == 10;
  };
  const handleSignIn = async () => {
    setError(false);
    setLoadingScreen(true);
    Keyboard.dismiss();
    const isValidPhoneNumber = await validatePhoneNumber();
    if (!isValidPhoneNumber) {
      setLoadingScreen(false);
      setError(true);
      return;
    }
    const verificationId = await loginWithPhoneNumber(
      `+91${phoneNumber}`,
      recaptchaVerifier.current
    );
    if (verificationId) {
      setLoadingScreen(false);
      navigation.navigate("OTPScreen", {
        verificationId,
        phoneNumber,
      });
    } else {
      setError(true);
      setLoadingScreen(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={true}
          // appVerificationDisabledForTesting={true}
        />
        <Text style={styles.label}>My number is</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={{ flex: 3, paddingRight: 10 }}>
              <Text style={styles.countryCode}>
                IN +91
                <View style={{ opacity: 0.5, paddingLeft: 10 }}>
                  <Image source={downArrow} style={styles.arrowDown} />
                </View>
              </Text>
            </View>
            <View style={{ flex: 7 }}>
              <TextInput
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
                defaultValue={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder={"Phone Number"}
                placeholderTextColor={"#969595"}
                style={styles.input}
                selectionColor={"#80DDD9"}
              />
            </View>
          </View>
        </View>
        <View style={styles.errorContainer}>
          {hasError && (
            <Text style={styles.errorMessage}>
              Please enter a valid phone number.
            </Text>
          )}
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.description}>
            When you tap Continue. We will send a text with verification code.
            Message and data rates may apply. The verified can be used to login.
          </Text>
        </View>
        {loadingScreen ? (
          <ActivitySpinner />
        ) : (
          <Button
            title="CONTINUE"
            enabled={phoneNumber.length > 0 ? true : false}
            onPress={handleSignIn}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  label: {
    marginBottom: 45,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 32,
    color: "#232222",
  },
  arrowDown: {
    width: 10,
    height: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  countryCode: {
    fontSize: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: "#2b2b2b",
    paddingHorizontal: 10,
    fontFamily: "Montserrat_500Medium",
    height: 28,
  },
  input: {
    fontSize: 18,
    borderBottomColor: "#80DDD9",
    borderBottomWidth: 2,
    paddingBottom: 8,
    fontFamily: "Montserrat_500Medium",
    height: 28,
  },
  errorContainer: {
    height: 32,
    marginTop: 20,
  },
  description: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    color: "#4a4a4a",
    marginBottom: 20,
  },
  errorMessage: {
    color: "#ff0033",
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    marginBottom: 40,
  },
});

export default RegisterForm;
export { RegisterForm };
