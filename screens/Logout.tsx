import React, { Component } from "react";
import { Title } from "react-native-paper";
import { View, Text, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import * as firebase from "firebase";
import "firebase/firestore";
//import { AsyncStorage } from "react-native";
import { AsyncStorage } from "react-native";

export default class Logout extends Component {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{
          flex: 1,
          //flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          //marginRight: 10,
        }}
      >
        <Title
          style={{
            fontSize: 30,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {" "}
          Celsius is connecting people anonymously{" "}
        </Title>
        <Title style={{ fontSize: 30 }}> On the Posts page </Title>
        <Title> Swipe left to move to next card </Title>
        <Title> Swipe right to begin chat </Title>
        <Title
          style={{
            fontSize: 30,
            marginTop: 40,
            marginHorizontal: 20,
          }}
        >
          Click Create to create your anonymous post
        </Title>
        <Title style={{ fontSize: 30, marginTop: 40 }}> On Chats page </Title>
        <Title> View your chats with users </Title>
        <Title> Click username to chat </Title>

        <View style={{ marginTop: 120 }}></View>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Log out</Text>}
        >
          <MenuItem
            // StaysOpenOnClick="True"
            onPressIn={async () => {
              {
                try {
                  //await AsyncStorage.clear();
                  const keys = await AsyncStorage.getAllKeys();
                  await AsyncStorage.multiRemove(keys);

                  //alert("Storage successfully cleared!");
                  //console.log("## cleared");
                  navigation.navigate("Login");
                } catch (e) {
                  //console.log("## un cleared");
                  //alert("Failed to clear the async storage.");
                }
              }
            }}
            onPress={this.hideMenu}
          >
            Click here to Log out
          </MenuItem>
        </Menu>
      </View>
    );
  }
}
