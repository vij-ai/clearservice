import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Tile } from "react-native-elements";
import Layout from "../constants/Layout";

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49; // found from https://stackoverflow.com/a/50318831/6141587

export const Card = ({ pic, title, caption, number, servicedate }) => (
  <Tile
    imageSrc={pic}
    imageContainerStyle={styles.imageContainer}
    activeOpacity={0.9}
    title={title + "\n" + number + "\n" + servicedate}
    titleStyle={styles.title}
    caption={title}
    captionStyle={styles.caption}
    containerStyle={styles.container}
    featured
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 50,
    width: Layout.window.width - 30,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 12,
    borderRadius: 27,
    overflow: "hidden", // this does magic
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
  },
  title: {
    position: "absolute",
    color: "#CE0A0A",
    fontFamily: "Roboto",
    fontSize: 23,
    //backgroundColor: "black",

    //left: 10,
    //bottom: 30,
  },
  caption: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
});
