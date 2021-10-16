import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import Swiper from "react-native-deck-swiper";
import { OverlayLabel } from "../components/OverLayLabel";
import { Card } from "../components/Card";
import { HomeScreenPics } from "../constants/Pics";
import styles from "./Styles";
import FormButton from "../components/FormButton";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("screen");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen({ navigation, route }) {
  //var filPics = HomeScreenPics;

  var email = route.params.route.params.email;
  var name = route.params.route.params.name;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [data, setData] = useState([]);
  const db = firebase.firestore();

  const tokenlist = firebase.firestore().collection("expopushtokennew");
  //console.log("tokenlist", tokenlist);

  useEffect(() => {
    //console.log("inside use effect");
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        Notifications.dismissNotificationAsync(notification.notificationId);

        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    console.log("inside registerforpush");
    let token;
    if (Constants.isDevice) {
      //console.log("inside constants");
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      //token = (await Notifications.getDevicePushTokenAsync()).data;
      token = (await Notifications.getExpoPushTokenAsync()).data;
      firebase.firestore().collection("expopushtokennew").doc(email).set(
        {
          to: token,
          //to: data,
          sound: "default",
          title: "New message received",
          // createdAt: new Date().getTime(),
          // lastActive: new Date().getTime(),
        },
        { merge: true }
      );

      // db.collection("expopushtoken")
      //   .doc(token)
      //   .set(
      //     {
      //       latestMessage: {
      //         text,
      //         createdAt: new Date().getTime(),
      //       },
      //       lastActive: new Date().getTime(),
      //     },
      //     { merge: true }
      //   );
      //console.log("token", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    console.log("token", token);
    return token;
  }

  const ref = firebase
    .firestore()
    .collection("Posts")
    .orderBy("createdAt", "desc");

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const ChatMessages = doc.data();
        //console.log("Chatmessahes", ChatMessages);
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
        animateCardOpacity={true}
        cards={messages}
        renderCard={Card}
        infinite
        //backgroundColor="#fdf8f1"

        backgroundColor="black"
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
        onSwipedLeft={(cardindex) => {
          db.collection("swipeleft").add({
            email: email,
            name: name,
          });
        }}
        onSwipedBottom={(cardindex) => {
          Alert.alert("Report this post as Spam or Abusive");
          db.collection("abusive").add({
            abusivecard: messages[cardindex],
            reportedbyemail: email,
            reportedbyname: name,
          });
        }}
        onSwipedRight={(cardindex) => {
          if (messages[cardindex].email == email) {
            Alert.alert(
              "That's your own post",
              "You cannot chat with yourself, duh",
              [{ text: "OK" }]
            );
          } else {
            db.collection("swiperight").add({
              email: email,
              name: name,
            });

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
        <Button
          mode="outlined"
          uppercase={false}
          labelStyle={styless.navButtonText}
          style={styless.button}
          contentStyle={styless.buttonContainer}
          onPress={() => navigation.navigate("Post", { email, name })}
          theme={{ colors: { primary: "white" } }}
        >
          Post
        </Button>

        {/* <FormButton
          title="Create"
          modevalue="contained"
          labelStyle={styless.buttonLabel}
          onPress={() => navigation.navigate("Post", { email, name })}
          //disabled={post.length === 0}
          uppercase={false}
        /> */}
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

  button: {
    marginTop: 10,
    borderColor: "white",
    color: "#f194ff",
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
  navButtonText: {
    fontSize: 16,
    color: "white",
  },

  // image: {
  //   width: Layout.window.width - 60,
  //   height: Layout.window.height / 2 - 60,
  //   borderRadius: 20,
  // },
});
