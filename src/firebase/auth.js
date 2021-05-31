import * as firebase from "firebase";
import { Native } from "sentry-expo";
import { auth } from "./firebase";

export const loginWithPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
  let verificationId = "";
  try {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier
    );
  } catch (err) {
    Native.captureException(
      `FIREBASE AUTH: Error on phone number verification ${JSON.stringify(err)}`
    );
  }
  return verificationId;
};

export const verifyOTP = async (verificationId, verificationCode) => {
  let verifyOTPResponse = {};
  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    verifyOTPResponse = await auth.signInWithCredential(credential);
  } catch (err) {
    verifyOTPResponse = err;
  }

  return verifyOTPResponse;
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    Native.captureException(
      `FIREBASE AUTH: Error on sign out ${JSON.stringify(err)}`
    );
  }
};
