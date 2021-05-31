import axios from "axios";
import { Native } from "sentry-expo";
import { auth } from "../firebase";
import { API_CONFIG } from "./apiConfig";

export async function fetchResponseFromAPI(
  endPointName = "",
  params = null,
  postData = null,
  headers = {}
) {
  const currentUser = auth.currentUser;
  let idToken = "";
  if (currentUser) {
    idToken = await currentUser.getIdToken(/* forceRefresh */ true);
  }
  const apiHeaders = {
    Authorization: `Bearer ${idToken}`,
    "Content-Type": "application/json",
    ...headers,
  };
  const { url, method } = API_CONFIG[endPointName];
  let response = {};
  try {
    response = await axios({
      method,
      url,
      params,
      data: postData,
      headers: apiHeaders,
    });
  } catch (err) {
    response = err.response;
    Native.captureException(
      `FETCH API ERROR: url: ${url} - endPointName: ${endPointName} ${JSON.stringify(
        err
      )}`
    );
  }
  return response.data;
}
