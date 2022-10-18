import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";
import { IconButton, Title, TextInput } from "react-native-paper";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import * as firebase from "firebase";
import "firebase/firestore";
//import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("screen");

export default function Privatechat({ navigation, route, name, no }) {
  const [Post, setPost] = useState(route.params.name);
  const [No, setNo] = useState(route.params.no);
  const [mode, setMode] = useState(new Date());
  const [show, setShow] = useState(false);
  // ... Firestore query will come here later
  console.log(route.params.route.params.route.params.email);
  const [date, setDate] = useState(new Date());

  const handleButtonPress = (Post, No, date, dateStamp) => {
    const db = firebase.firestore();
    console.log(Post, No);

    db.collection("Posts").doc(No).set({
      Post: Post,
      Number: No,
      email: route.params.route.params.route.params.email,
      name: route.params.route.params.route.params.name,
      servicedate: date,
      servicedatestamp: dateStamp,
      createdAt: new Date().getTime(),
    });
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  var selectedDateTime = date;

  var stringSelectedDate = selectedDateTime.toDateString();
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
        <Title style={styles.title}>Update Service date</Title>
        <TextInput
          label="Enter Customer name"
          value={Post}
          onChangeText={(text) => setPost(text)}
          clearButtonMode="while-editing"
          style={styles.input}
          theme={{ colors: { primary: "black" } }}
        />
        {/* <Title style={styles.title}>Customer number</Title> */}
        <TextInput
          label="Enter Customer Mobile no"
          value={No}
          keyboardType="numeric"
          onChangeText={(text) => setNo(text)}
          clearButtonMode="while-editing"
          style={styles.input}
          theme={{ colors: { primary: "black" } }}
        />
        <View>
          <View style={{ marginTop: 10 }}>
            <Button
              onPress={showDatepicker}
              title={
                stringSelectedDate +
                " " +
                //stringSelectedTime +
                " - Select service date"
              }
            />
          </View>
          {/* <Divider style={styles.divider} />

          <View style={{ marginTop: 10 }}>
            <Button
              onPress={showTimepicker}
              title={stringSelectedTime + " - Select new time!"}
            />
          </View> */}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              //mode={mode}
              //is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <FormButton
          title="Save"
          modevalue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress(Post, No, date.toDateString(), date)}
          disabled={
            Post.length < 1 ||
            Post.length > 180 ||
            No.length < 10 ||
            No.length > 12
          }
          uppercase={false}
        />
      </View>
      {/* <View>
        <Title style={styles.notes}>
          {" "}
          Min 1 characters for Name{"\n"} Phone number should be 10 to 12
          characters
        </Title>
      </View> */}
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
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.1,
    height: height / 8,
    //ontSize: 12,

    //color: "black",
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
