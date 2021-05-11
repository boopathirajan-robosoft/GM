import "firebase/firestore";
import { auth, db } from "./firebase";

const usersDB = db.collection("users");

// cloud firestore db actions
export const createUser = async () => {
  try {
    const currentUserUID = auth.currentUser.uid;
    await usersDB.doc(currentUserUID).set({
      userName: "",
      isSubscribed: false,
    });
  } catch (err) {
    console.log("Error on create user in firestore", err);
  }
};

export const getUserDetails = async () => {
  try {
    const currentUserUID = auth.currentUser.uid;
    const response = await usersDB.doc(currentUserUID).get();
    if (!response.exists) {
      console.log("No users found");
    }
    return response;
  } catch (err) {
    console.log("Error on fetching user details");
  }
};

export const updateUserName = async (userName) => {
  try {
    const currentUserUID = auth.currentUser.uid;
    await usersDB.doc(currentUserUID).update({
      userName,
    });
  } catch (err) {
    console.log("Error on updating user profile", err);
  }
};
