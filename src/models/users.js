import { fetchResponseFromAPI } from "../utils";

export const createUser = async () => {
  try {
    await fetchResponseFromAPI("createUser");
  } catch (err) {
    console.log("Error creating user", err);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await fetchResponseFromAPI("getProfile");
    return response;
  } catch (err) {
    console.log("Error on fetching user details");
  }
};

export const updateUserName = async (userName) => {
  try {
    const postData = { userName };
    await fetchResponseFromAPI("updateProfile", null, postData);
  } catch (err) {
    console.log("Error on updating user profile", err);
  }
};

export const updateNotificationToken = async (deviceToken) => {
  try {
    const postData = { deviceToken };
    await fetchResponseFromAPI("updateProfile", null, postData);
  } catch (err) {
    console.log("Error on updating notification token", err);
  }
};
