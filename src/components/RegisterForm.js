import React, { useState, useRef } from "react";
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
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { loginWithPhoneNumber } from "../firebase";

function RegisterButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.button, pressed && { opacity: 0.65 }]}>
          <Text style={styles.btnText}>LOGIN</Text>
        </View>
      )}
    </Pressable>
  );
}

function RegisterForm() {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasError, setError] = useState(false);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const navigation = useNavigation();

  const validatePhoneNumber = () => {
    return phoneNumber.length == 10;
  };
  const handleSignIn = async () => {
    const isValidPhoneNumber = validatePhoneNumber();
    if (!isValidPhoneNumber) {
      setError(true);
      return;
    }
    setError(false);
    try {
      const verificationId = await loginWithPhoneNumber(
        `+91${phoneNumber}`,
        recaptchaVerifier.current
      );
      navigation.navigate("OTPScreen", {
        verificationId,
      });
    } catch (err) {
      console.log("Error on phone number verification", err);
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
          <Text style={styles.countryCode}>IN +91 </Text>
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={10}
            defaultValue={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />

          <View style={styles.errorContainer}>
            {hasError && (
              <Text style={styles.errorMessage}>
                Please enter a valid phone number.
              </Text>
            )}
          </View>
        </View>
        <RegisterButton onPress={handleSignIn} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  label: {
    marginBottom: 35,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 32,
    color: "#232222", 
  },
  countryCode: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2b2b2b",
    paddingBottom: 5,
    paddingHorizontal: 5,
    fontFamily: "Montserrat_400Regular"
  },
  input: {
    fontSize: 16,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    fontFamily: "Montserrat_400Regular"
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

export default RegisterForm;
export { RegisterForm };
