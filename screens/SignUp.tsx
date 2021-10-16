import React from "react";
import { TextInput, Button, Title, Checkbox } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import Forminput from "../components/FormInput";
import { useState } from "react";
import Formbutton from "../components/FormButton";
const { width, height } = Dimensions.get("screen");

import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Post, setPost] = useState("");
  const [Password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [checked, setChecked] = useState(false);

  const storeLoginData = async (email, userName) => {
    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userName", userName);
      //console.log("## signup asy username", userName);
      //console.log("## signup  async email", email);
    } catch (e) {
      // saving error
    }
  };

  const signupUser = async (email, password, userName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (user != null) {
        user
          .updateProfile({
            displayName: userName,
          })
          .then(function () {})
          .catch(function (error) {
            alert(error.message, error);
          });

        // const db = firebase.firestore();

        // db.collection("Posts").add({
        //   Post: Post,
        //   email: email,
        //   name: userName,
        //   createdAt: new Date().getTime(),
        // });
      }
      storeLoginData(email, userName);
      navigation.navigate("Root", { email: email, name: userName });
    } catch (error) {
      alert(error.message, error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.titleText}>Celsius</Title>
        <Title style={styles.description}>
          Anonymously post your desires{"\n"}Swipe right to start chat with
          anyone
        </Title>
        {/* <Title style={styles.description}>Swipe right to start chat</Title> */}

        <Forminput
          labelname="Nick name"
          value={userName}
          autoCapitalize="none"
          onChangeText={(userName) => setUserName(userName)}
        />

        <Forminput
          labelname="Email"
          value={Email}
          autoCapitalize="none"
          onChangeText={(useremail) => setEmail(useremail)}
        />
        <Forminput
          labelname="Password"
          value={Password}
          secureTextEntry={true}
          onChangeText={(userPassword) => setPassword(userPassword)}
        />

        {/* <TextInput
          label="Write what your looking for. This will be your first post"
          value={Post}
          onChangeText={(text) => setPost(text)}
          clearButtonMode="while-editing"
          style={styles.input}
          theme={{ colors: { primary: "black" } }}
        /> */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 8,
            marginBottom: 9,
          }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <View style={{ marginTop: 2 }}>
            <Text>Accept the </Text>
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Terms")}
            >
              Terms and privay policy
            </Text>
          </View>
        </View>

        <Formbutton
          title="Sign up"
          modevalue="contained"
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => {
            if (userName.length == 0) {
              alert("Nickname should be atleast 1 character");
            }

            // else if (Post.length < 10 || Post.length > 180) {
            //   alert(
            //     "Letters in your Post should be greater than 10 and less than 180"
            //   );
            // }
            else if (checked == false) {
              alert(
                "Click the check box to accept the Terms and Privacy policy"
              );
            } else {
              {
                signupUser(Email, Password, userName);
              }
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.1,
    height: height / 10,
    fontSize: 12,

    //color: "black",
  },

  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
  smallerText: {
    fontSize: 12,
  },
});
