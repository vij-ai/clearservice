import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Button,
  StatusBar,
  Alert,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { OverlayLabel } from "../components/OverLayLabel";
import { Card } from "../components/Card";
import { HomeScreenPics } from "../constants/Pics";
import styles from "./Styles";
import FormButton from "../components/FormButton";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// var email = "null";
// var name = "null";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";

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

export default function HomeScreen({ navigation, route }) {
  //getData();

  //var filPics = HomeScreenPics;

  const email = route.params.route.params.email;
  const name = route.params.route.params.name;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref = firebase
    .firestore()
    .collection("Posts")
    .orderBy("createdAt", "desc");

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const ChatMessages = doc.data();
        console.log("Chatmessahes", ChatMessages);
        list.push({
          pic: require("../assets/images/Benares.jpg"),

          createdAt: ChatMessages.createdAt,
          title: ChatMessages.Post,
          email: ChatMessages.email,
          name: ChatMessages.name,
        });
      });
      setMessages(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styless.container}>
      <Swiper
        cards={messages}
        renderCard={Card}
        infinite
        backgroundColor="#fdf8f1"
        //"#F2F2F2"
        onTapCardDeadZone={80}
        // onTapCard={() => console.log("@just tapped ")}
        //onTapCard={(cardIndex) => onTapCard(cardIndex)}
        cardHorizontalMargin={0}
        cardVerticalMargin={20}
        stackSize={5}
        overlayLabels={{
          left: {
            title: "NEXT",
            element: <OverlayLabel label="NEXT" color="#E5566D" />,
            style: {
              wrapper: styles.overlayWrapper,
            },
          },
          right: {
            title: "LIKE",
            element: <OverlayLabel label="CHAT" color="#00CED1" />,
            style: {
              wrapper: {
                ...styles.overlayWrapper,
                alignItems: "flex-start",
                marginLeft: 30,
              },
            },
          },
        }}
        onSwipedRight={(cardindex) => {
          if (messages[cardindex].email == email) {
            Alert.alert(
              "That's your own post",
              "You cannot chat with yourself, duh",
              [{ text: "OK" }]
            );
          } else {
            navigation.navigate("Privatechat", {
              otherUser: messages[cardindex],
              email: email,
              name: name,
            });
          }
        }}

        //console.log("@@swipe right", cardindex)}
      />

      <View
        style={{
          position: "absolute",
          bottom: 30,
          marginRight: 30,
          marginLeft: 30,
          alignSelf: "center",
          alignContent: "center",
        }}
      >
        <FormButton
          title="Create"
          modevalue="contained"
          labelStyle={styless.buttonLabel}
          onPress={() => navigation.navigate("Post", { email, name })}
          //disabled={post.length === 0}
          uppercase={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "red",
  },

  image: {
    //flex: 1,
    position: "absolute",
    // left: 0,
    // top: 0,
    zIndex: 1,
  },
  buttonLabel: {
    fontSize: 22,
    alignSelf: "center",
    alignContent: "center",
  },

  // image: {
  //   width: Layout.window.width - 60,
  //   height: Layout.window.height / 2 - 60,
  //   borderRadius: 20,
  // },
});
