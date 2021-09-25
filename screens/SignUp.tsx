import React from "react";
import { TextInput, Button, Title } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Forminput from "../components/FormInput";
import { useState } from "react";
import Formbutton from "../components/FormButton";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

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
        <Title style={styles.titleText}>Celsious</Title>
        <Title style={styles.description}>
          Anonymously post your emotions{"\n"}Swipe right to start chat
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
        <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 9 }}>
          <Text>Via sigining up you accept the </Text>
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("Terms")}
          >
            Terms and privay policy
          </Text>
        </View>

        <Formbutton
          title="Sign up"
          modevalue="contained"
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => signupUser(Email, Password, userName)}
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
