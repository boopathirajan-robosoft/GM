import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Native } from "sentry-expo";
import { Button } from "../commons";
import { createPaymentIntent } from "../../models";

function PaymentForm() {
  const [card, setCard] = useState(null);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayment = async () => {
    // TODO: handle input validation
    if (!card) {
      return;
    }
    const { clientSecret = "" } = await createPaymentIntent();
    if (clientSecret) {
      // Submit the payment
      try {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          setupFutureUsage: "OffSession",
        });

        if (error) {
          Native.captureException(
            `STRIPE: payment confirmation error ${JSON.stringify(error)}`
          );
        } else if (paymentIntent) {
          // TODO: Handle payment success
          Alert.alert("Payment Success. Please click back.");
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
      <Text>Add a new card</Text>
      <CardField
        postalCodeEnabled={false}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => setCard(cardDetails)}
      />
      <Button title="Pay 100" onPress={handlePayment} enabled={!loading} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default PaymentForm;
export { PaymentForm };
