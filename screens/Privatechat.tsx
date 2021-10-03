import React, { useState, useEffect } from "react";
import Image, { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import { List } from "react-native-paper";

// var email = "null";
// var name = "null";

// const getData = async () => {
//   try {
//     email = await AsyncStorage.getItem("userEmail");
//     name = await AsyncStorage.getItem("userName");
//     if (email != null) {
//       console.log("##emailworking in privchat", name);
//     } else {
//       email = "error";
//       console.log("##email not working in chats", email);
//     }
//   } catch (e) {
//     //return isLoggedIn;
//     // error reading value
//   }
// };

export default function Privatechat({ route, navigation }) {
  // useEffect(() => {
  //   getData();
  //   //console.log("##useeffect", isLoggedIn);
  // }, []);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const otheruser = route.params.otherUser.email; //otheremail
  const otherusername = route.params.otherUser.name;
  //console.log("!!user", route);
  const email = route.params.email; //useremail
  const name = route.params.name; // user name

  //console.log("!!email", email);

  const db = firebase.firestore();

  const tokenlist = firebase
    .firestore()
    .collection("expopushtokennew")
    .doc(otheruser);
  const [data, setData] = useState([]);

  tokenlist.get().then((doc) => {
    const list = [];
    list.push(doc.data());
    setData(list);
  });
  console.log("otheruserpush", data);
  // useEffect(() => {
  //   return tokenlist.onSnapshot((querySnapshot) => {
  //     const list = [];
  //     //let deviceToken = expoPushToken;
  //     //console.log("@@devicetoken", deviceToken);

  //     querySnapshot.forEach((doc) => {
  //       const expopush = doc.data();
  //       //const dbToken = expopush.to;
  //       // if (dbToken == deviceToken) {
  //       //   console.log("@@if");
  //       // } else {
  //       list.push(expopush);
  //       console.log("@@expopushinprivatechat", expopush);
  //       //}
  //     });

  //     setData(list);
  //     console.log("@@list", list);

  //     /**
  //      * unsubscribe listener
  //      */
  //   });
  // }, []);

  // var user = firebase.auth().currentUser;
  // var name, email;

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  // }

  const otheruserID = otheruser;
  const chateeID = email;
  const chatIDpre = [];
  chatIDpre.push(otheruserID);
  chatIDpre.push(chateeID);
  chatIDpre.sort();
  const chatID = chatIDpre.join("_");

  db.collection("Personal").doc(email).collection(email).doc(otheruser).set({
    _id: otheruser,
    name: otherusername,
    lastActive: new Date().getTime(),
  });
  db.collection("Personal")
    .doc(otheruser)
    .collection(otheruser)
    .doc(email)
    .set({
      _id: email,
      name: name,
      lastActive: new Date().getTime(),
    });

  const ref = firebase

    .firestore()
    .collection("PrivateChat")
    .doc(chatID)
    .collection("Messages")

    .orderBy("createdAt", "desc");

  async function sendPushNotification() {
    console.log("@@inside push noti");
    const message = data;

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  function handleSend(newMessages) {
    const text = newMessages[0].text;

    db.collection("PrivateChat").doc(chatID).collection("Messages").add({
      text,
      createdAt: new Date().getTime(),
      user: email,
      name: name,
      url: "",

      // _id: userid,
    });

    sendPushNotification();
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const ChatMessages = doc.data();
        list.push({
          _id: doc.id,
          text: ChatMessages.text,
          createdAt: ChatMessages.createdAt,
          //_id: ChatMessages.from,
          user: {
            _id: ChatMessages.user,
            name: ChatMessages.name,
          },
          image: ChatMessages.url,
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
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: email, name: name }}
      minComposerHeight={46.7}
      alignTop={true}
      //isTyping={true}
      renderUsernameOnMessage={true}
      //scrollToBottom={true}
      keyboardShouldPersistTaps="never"
      //bottomOffset={240}
      //renderActions={images}
      showAvatarForEveryMessage={true}
      //infiniteScroll={true}
    />
  );
}
