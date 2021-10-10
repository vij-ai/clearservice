import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
// var email = "null";
// var name = "null";
import * as firebase from "firebase";
import { useEffect, useState } from "react";
import "firebase/firestore";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const getData = async () => {
//   try {
//     email = await AsyncStorage.getItem("userEmail");
//     name = await AsyncStorage.getItem("userName");
//     if (email !== "null") {
//       console.log("##emailworking in tabwo", email);
//       //navigation.navigate("Atlantis", { email, name });

//       // navigation.navigate("Atlantis", email);
//     } else {
//       console.log("##email not working in tabwo", email);
//     }
//   } catch (e) {
//     //return isLoggedIn;
//     // error reading value
//   }
// };

export default function Mychats({ navigation, route }) {
  var email = route.params.route.params.email;
  var name = route.params.route.params.name;

  //getData();

  // const email = route.params.route.params.email;
  // const name = route.params.route.params.name;

  //console.log("@@routeinmychats", userEmail);

  // if (email == "null") {
  //   getData();
  //   return <Loading />;
  // } else {
  const db = firebase.firestore();
  //var ref = db;
  //var uEmail;
  //var unsubscribe;

  // AsyncStorage.getItem("userEmail").then((userEmail) => {
  //   if (userEmail) {
  //     //console.log("email123----" + userEmail);
  //     uEmail = userEmail;
  //     ref = db
  //       .collection("Personal")
  //       .doc(userEmail)
  //       .collection(userEmail)
  //       .orderBy("lastActive", "desc");
  //     getPrivateData();
  //   }
  // });

  var ref = db
    .collection("Personal")
    .doc(email)
    .collection(email)
    .orderBy("lastActive", "desc");

  // var user = firebase.auth().currentUser;
  // var name, email;

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  // } else {
  //   email = "error";
  // }
  // console.log("##name", name);
  // console.log("##email", email);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function Item({ id, navigation, user }) {
    //console.log("@@userinmychats", user);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Privatechat", {
              otherUser: { email: user.id, name: user.name },
              email,
              name,
            })
          }
          style={styles.item}
        >
          <Text style={styles.title}>{user.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // function getPrivateData() {
  //   unsubscribe = ref.onSnapshot((querySnapshot) => {
  //     const list = querySnapshot.docs.map((documentSnapshot) => {
  //       return {
  //         id: documentSnapshot.id,
  //         ...documentSnapshot.data(),
  //       };
  //     });

  //     setListData(list).then(unsubscribe());
  //   });

  //   // db.terminate();
  //   if (loading) {
  //     setLoading(false);
  //     <Loading />;
  //   }
  // }

  // async function setListData(list) {
  //   setData(list);
  // }

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((querySnapshot) => {
      const list = querySnapshot.docs.map((documentSnapshot) => {
        return {
          id: documentSnapshot.id,

          ...documentSnapshot.data(),
        };
      });

      setData(list);

      if (loading) {
        setLoading(false);
      }
    });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  //console.log("data", data);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item id={item.id} navigation={navigation} user={item} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: Dimensions.get("window").height * 0.1,
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              Swipe cards right at Posts page to start chat
            </Text>
            <Image
              source={
                require("../assets/images/Click.png")
                // uri:
                // "https://see.fontimg.com/api/renderfont4/ZVJPZ/eyJyIjoiZnMiLCJoIjoxMTcsInciOjEwMDAsImZzIjoxMTcsImZnYyI6IiMxNjE3MTYiLCJiZ2MiOiIjRkZGOUY5IiwidCI6MX0/bm8gY2hhdHM/attack-graffiti.png",
              }
              style={{
                width: Dimensions.get("window").width * 0.57,
                height: Dimensions.get("window").width * 0.9,
                marginTop: 0,
                resizeMode: "stretch",
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginRight: 2,
    marginLeft: 2,
  },
  item: {
    backgroundColor: "#000000",
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 22,
    color: "#FFFFFF",
  },
});
