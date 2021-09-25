import React from "react";
import { View, Text } from "react-native";
import { string } from "prop-types";
//import styles from "./OverlayLabel.styles";
import { StyleSheet } from "react-native";

export const OverlayLabel = ({ label, color }) => (
  <View style={[styles.overlayLabel, { backgroundColor: color }]}>
    <Text style={[styles.overlayLabelText, { color: "white" }]}>{label}</Text>
  </View>
);

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
};

const styles = StyleSheet.create({
  overlayLabel: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "white",
    borderRadius: 40,
  },
  overlayLabelText: {
    fontSize: 25,
    //fontFamily: "Avenir",
    textAlign: "center",
  },
});

//export default OverlayLabel;
