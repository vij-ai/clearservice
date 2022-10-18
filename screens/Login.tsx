import React from "react";
import { TextInput, Button, Title, Checkbox } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import Forminput from "../components/FormInput";
import { useState, useEffect } from "react";
import Formbutton from "../components/FormButton";

import WavyHeader from "../components/WavyHeader";
//import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "firebase";
//import * as Analytics from "expo-firebase-analytics";
import "firebase/firestore";
//import analytics from "@react-native-firebase/analytics";

//firebase.initializeApp(firebaseConfig);

const { width, height } = Dimensions.get("screen");

export default function Login({ navigation }) {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

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
            alert(error.message);
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
      // await analytics().logEvent("sign_up", {
      //   username: userName,
      //   email: email,
      // });
      navigation.navigate("Root", { email: email, name: userName });
    } catch (error) {
      alert(error.message, error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <StatusBar backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <WavyHeader
          customStyles={styles.svgCurve}
          customHeight={160}
          customTop={130}
          customBgColor="#C30909"
          customWavePattern="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />

        <View style={styles.headerContainer}>
          <Image
            source={{
              uri:
                "https://see.fontimg.com/api/renderfont4/qV71/eyJyIjoiZnMiLCJoIjo0NCwidyI6MTAwMCwiZnMiOjQ0LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Q2xlYXIgU2VydmljZQ/speedeasy.png",
            }}
            style={{
              width: 200,
              height: 60,
              //marginHorizontal: 15,
              resizeMode: "stretch",
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Title style={styles.description}>Service reminder app</Title>
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
            //flex: 3,
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
            {/* <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Terms")}
            >
              Terms and privay policy
            </Text> */}
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
        <Button
          mode="text"
          uppercase={false}
          labelStyle={styles.navButtonText}
          style={styles.button}
          contentStyle={styles.buttonContainer}
          onPress={() => navigation.navigate("SignUp")}
          theme={{ colors: { primary: "black" } }}
        >
          Log in
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 2,
    backgroundColor: "#f5f5f5",

    //justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,

    textAlign: "center",
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
    //color: "black",
  },
  headerContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    marginHorizontal: Dimensions.get("window").width * 0.23,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 35,
  },

  button: {
    marginTop: 4,

    //color: "#f194ff",
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
  description: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
});
