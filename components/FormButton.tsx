import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";

const { width, height } = Dimensions.get("screen");

export default function Formbutton({ title, modevalue, ...rest }) {
  return (
    <Button
      mode={modevalue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "black",

    //color: "#f194ff",
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
});
