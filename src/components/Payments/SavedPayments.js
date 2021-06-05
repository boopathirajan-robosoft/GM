import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { Native } from "sentry-expo";
import { getSavedCards, createPaymentIntent } from "../../models";
import { RadioButton, Button } from "../commons";

function SavedPayments() {
  const [savedCards, setSavedCards] = useState({});
  const [selectedCardId, setSelectedCardId] = useState("");
  const [cvc, setCvc] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const cards = savedCards.cards || [];

  useEffect(() => {
    fetchSavedCards();
  });

  const fetchSavedCards = async () => {
    const cardsResponse = await getSavedCards();
    setSavedCards(cardsResponse);
  };

  const handleRadioClick = (id) => {
    if (selectedCardId !== id) {
      setSelectedCardId(id);
    } else {
      // if same radio button is clicked again, uncheck
      setSelectedCardId("");
    }
    // reset CVC
    setCvc("");
  };

  const handlePayment = async () => {
    const { clientSecret = "" } = await createPaymentIntent();
    if (clientSecret) {
      try {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          cvc,
          paymentMethodId: selectedCardId,
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

  const renderSavedPayments = (card) => {
    const { id, brand = "", last4 = "" } = card;
    const capitalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    const label = `${capitalizedBrand} card ending in ${last4}`;
    const isSelected = selectedCardId === id;

    return (
      <View key={id}>
        <RadioButton
          radioKey={id}
          label={label}
          isSelected={isSelected}
          handleClick={handleRadioClick}
        />

        {isSelected && (
          <View style={styles.cvcContainer}>
            <TextInput
              keyboardType="numeric"
              returnKeyType="done"
              maxLength={3}
              defaultValue={cvc}
              onChangeText={setCvc}
              placeholder={"CVC"}
              placeholderTextColor={"#969595"}
              style={styles.input}
            />
            <Button
              title="Pay 100"
              onPress={handlePayment}
              enabled={!loading}
            />
          </View>
        )}
      </View>
    );
  };

  if (!cards.length) {
    return null;
  }

  return (
    <View>
      <Text>Saved Payments</Text>
      <View>{cards.map(renderSavedPayments)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cvcContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 35,
    width: 100,
    borderWidth: 1,
  },
});

export default SavedPayments;
export { SavedPayments };
