import { fetchResponseFromAPI } from "../utils";

export const getStripeConfig = async () => {
  const configResponse = await fetchResponseFromAPI("getStripePublishableKey");
  return configResponse || {};
};

export const createPaymentIntent = async () => {
  const paymentIntent = await fetchResponseFromAPI("createPaymentIntent");
  return paymentIntent || {};
};
