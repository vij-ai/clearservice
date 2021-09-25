import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
var email = "null";
var name = "null";

const getData = async (navigation) => {
  try {
    email = await AsyncStorage.getItem("userEmail");
    name = await AsyncStorage.getItem("userName");
    if (email !== null) {
      console.log("##emailworking in splash", email, name);
      //navigation.navigate("Atlantis", { email, name });
      navigation.navigate(
        "Root",
        { email, name }

        // {
        //   screen: "rooms",
        //   //screen: "Private chats",
        //   params: { email: email },
        // }
      );
      // navigation.navigate("Atlantis", email);
    } else {
      //console.log("##email not working in chats", email);
      navigation.navigate("Login");
    }
  } catch (e) {
    //return isLoggedIn;
    // error reading value
  }
};

export default function Splash({ navigation }) {
  getData(navigation);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646ee" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
