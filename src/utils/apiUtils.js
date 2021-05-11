import axios from "axios";
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
  console.log("url", url);
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
    console.log("Error while fetching API", endPointName, err);
  }
  return response.data;
  
}
