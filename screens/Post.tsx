import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Title } from "react-native-paper";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import * as firebase from "firebase";
import "firebase/firestore";
import { Tile } from "react-native-elements/dist/tile/Tile";

// var email = "null";
// var name = "null";

// const getData = async () => {
//   try {
//     email = await AsyncStorage.getItem("userEmail");
//     name = await AsyncStorage.getItem("userName");
//     if (email !== "null") {
//       console.log("##emailworking in tabone", email);
//       //navigation.navigate("Atlantis", { email, name });

//       // navigation.navigate("Atlantis", email);
//     } else {
//       console.log("##email not working in tabone", email);
//     }
//   } catch (e) {
//     //return isLoggedIn;
//     // error reading value
//   }
// };

// getData;

export default function Post({ navigation, route }) {
  const [post, setPost] = useState("");
  // ... Firestore query will come here later

  const handleButtonPress = (post) => {
    const db = firebase.firestore();
    // db.settings({
    //   timestampsInSnapshots: true,
    // });
    db.collection("Posts").add({
      Post: post,
      email: route.params.email,
      name: route.params.name,
      createdAt: new Date().getTime(),
    });
    //alert("Posted");
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
        <Title style={styles.title}>Create a new Post</Title>
        <FormInput
          //labelname="Type your desires"
          value={post}
          onChangeText={(text) => setPost(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Post"
          modevalue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress(post)}
          disabled={post.length < 10 || post.length > 180}
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
