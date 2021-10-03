import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

export default function Forminput({ labelname, ...rest }) {
  return (
    <TextInput
      label={labelname}
      style={styles.input}
      numberOfLines={1}
      {...rest}
      // selectionColor="black"
      // underlineColor="black"
      // outlineColor="black"
      // //placeholderTextColor="black"
      // underlineColorAndroid="black"
      theme={{ colors: { primary: "black" } }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.3,
    height: height / 14,

    //color: "black",
  },
});
