import { fetchResponseFromAPI } from "../utils";

export const createUser = async () => {
  await fetchResponseFromAPI("createUser");
};

export const getUserDetails = async () => {
  const profileResponse = await fetchResponseFromAPI("getProfile");
  return profileResponse || {};
};

export const checkAndCreateUser = async () => {
  const profileResponse = await getUserDetails();
  // if user is not created in the backend
  if (
    profileResponse.name === "NotFoundError" ||
    profileResponse.status === 404
  ) {
    await createUser();
  }

  return profileResponse;
};

export const updateUserName = async (userName) => {
  const postData = { userName };
  await fetchResponseFromAPI("updateProfile", null, postData);
};

export const updateNotificationToken = async (deviceToken) => {
  const postData = { deviceToken };
  await fetchResponseFromAPI("updateProfile", null, postData);
};

export const getSavedCards = async () => {
  const savedCardsResponse = await fetchResponseFromAPI("getSavedCards");
  return savedCardsResponse || {};
};
