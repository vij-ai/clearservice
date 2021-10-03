import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { IconButton, Title, TextInput } from "react-native-paper";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import * as firebase from "firebase";
import "firebase/firestore";

const { width, height } = Dimensions.get("screen");

export default function Post({ navigation, route }) {
  const [Post, setPost] = useState("");
  // ... Firestore query will come here later

  const handleButtonPress = (Post) => {
    const db = firebase.firestore();

    db.collection("Posts").add({
      Post: Post,
      email: route.params.email,
      name: route.params.name,
      createdAt: new Date().getTime(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create your anonymous post</Title>
        <TextInput
          label="Write what u'r looking for.. or any thoughts"
          value={Post}
          onChangeText={(text) => setPost(text)}
          clearButtonMode="while-editing"
          style={styles.input}
          theme={{ colors: { primary: "black" } }}
        />
        <FormButton
          title="Post"
          modevalue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress(Post)}
          disabled={Post.length < 10 || Post.length > 180}
          uppercase={false}
        />
      </View>
      <View>
        <Title style={styles.notes}>
          {" "}
          Min 10 characters, Max 180 characters{" "}
        </Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.1,
    height: height / 8,
    //ontSize: 12,

    //color: "black",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  notes: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});
