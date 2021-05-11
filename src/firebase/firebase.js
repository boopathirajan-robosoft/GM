import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
export { firebase };
