import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
//import Alert from "react-native";

import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { List, IconButton, Colors } from "react-native-paper";
import { FloatingAction } from "react-native-floating-action";

export default function Privatechat({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState("");
  const [otherblock, setOtherblock] = useState("");

  var otheruser = route.params.otherUser.email; //otheremail
  var otherusername = route.params.otherUser.name;
  //console.log("!!user", route);
  var email = route.params.email; //useremail
  var name = route.params.name; // user name

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

  const otheruserID = otheruser;
  const chateeID = email;
  const chatIDpre = [];
  chatIDpre.push(otheruserID);
  chatIDpre.push(chateeID);
  chatIDpre.sort();
  const chatID = chatIDpre.join("_");

  const ref = firebase

    .firestore()
    .collection("PrivateChat")
    .doc(chatID)
    .collection("Messages")

    .orderBy("createdAt", "desc");

  var docRef = db
    .collection("PrivateChat")
    .doc(chatID)
    .collection(email)
    .doc(email);
  var otherdocRef = db
    .collection("PrivateChat")
    .doc(chatID)
    .collection(otheruser)
    .doc(otheruser);

  useEffect(() => {
    let mounted = true;
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data().block);
          setBlock(doc.data().block);
          //console.log("doc in db", doc);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })

      .catch((error) => {
        console.log("Error getting document:", error);
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    otherdocRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data().block);
          setOtherblock(doc.data().block);
          //console.log("doc in db", doc);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })

      .catch((error) => {
        console.log("Error getting document:", error);
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  async function sendPushNotification() {
    //console.log("@@inside push noti");
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
    //console.log("block in handlesend", block);
    if (block == "true" || otherblock == "true") {
      alert("The Chat is blocked by the other user or you");
    } else {
      db.collection("Personal")
        .doc(email)
        .collection(email)
        .doc(otheruser)
        .set({
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

  function getblock() {
    return (
      <View>
        <IconButton
          icon="account-cancel"
          color={Colors.red500}
          size={20}
          onPress={() => {
            if (block == "true") {
              Alert.alert("Unblock the other user", "Sure?", [
                {
                  text: "Un block",
                  onPress: () => {
                    db.collection("PrivateChat")
                      .doc(chatID)
                      .collection(email)
                      .doc(email)
                      .set({
                        block: "false",
                      });

                    setBlock("false");
                  },
                },

                {
                  text: "Cancel",
                },
              ]);
            } else {
              Alert.alert(
                "Block the other user?",
                "He/She wont be able to send messages unless you unblock",
                [
                  {
                    text: "Block",
                    onPress: () => {
                      db.collection("PrivateChat")
                        .doc(chatID)
                        .collection(email)
                        .doc(email)
                        .set({
                          block: "true",
                        });
                      setBlock("true");
                    },
                  },

                  {
                    text: "Cancel",
                  },
                ]
              );
            }
          }}
        />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: email, name: name }}
      minComposerHeight={52.7}
      alignTop={true}
      //isTyping={true}
      renderUsernameOnMessage={true}
      //scrollToBottom={true}
      keyboardShouldPersistTaps="never"
      //bottomOffset={240}
      renderActions={getblock}
      showAvatarForEveryMessage={true}
      //infiniteScroll={true}
    />
  );
}
