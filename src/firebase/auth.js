import * as firebase from "firebase";
import { auth } from "./firebase";

export const loginWithPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phoneNumber,
    recaptchaVerifier
  );
  return verificationId;
};

export const verifyOTP = async (verificationId, verificationCode) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  await auth.signInWithCredential(credential);
};

export const signOut = async () => {
  await auth.signOut();
};
