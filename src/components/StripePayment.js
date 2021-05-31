import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Native } from "sentry-expo";
import { Button } from "./commons";
import { createPaymentIntent } from "../models";

function StripePayment() {
  const [card, setCard] = useState(null);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    // TODO: handle input validation
    if (!card) {
      return;
    }
    const { clientSecret = "" } = await createPaymentIntent();
    if (clientSecret) {
      // Submit the payment
      try {
        const { error } = await confirmPayment(clientSecret, {
          type: "Card",
          setupFutureUsage: "OffSession",
        });

        if (error) {
          Native.captureException(
            `STRIPE: payment confirmation error ${JSON.stringify(error)}`
          );
        }
      } catch (err) {
        Native.captureException(
          `STRIPE: payment confirmation error ${JSON.stringify(error)}`
        );
      }
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => setCard(cardDetails)}
      />
      <Button title="Pay" onPress={handlePayPress} enabled={!loading} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default StripePayment;
export { StripePayment };
