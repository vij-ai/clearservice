/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Splash from "../screens/Splash";
import Privatechat from "../screens/Privatechat";
import Post from "../screens/Post";
import Logout from "../screens/Logout";
import { Title } from "react-native-paper";
import Terms from "../screens/Terms";
// import {
//   Provider as PaperProvider,
//   IconButton,
//   Title,
// } from "react-native-paper";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    //<PaperProvider>
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: true, headerTitle: "Sign up" }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privatechat"
        component={Privatechat}
        options={({ navigation, route }) => ({
          title: route.params.otherUser.name,
        })}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ title: "Info/Logout" }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ title: "Terms" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
    //</PaperProvider>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

function Logo() {
  return (
    <View>
      <Image
        source={{
          uri:
            "https://see.fontimg.com/api/renderfont4/d0q6/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNDRTBBMEEiLCJiZ2MiOiIjQzMwODA4IiwidCI6MX0/Q2Vsc2l1cw/i-love-what-you-do.png",
        }}
        style={{
          width: 100,
          height: 40,
          //marginLeft: 2,
          resizeMode: "stretch",
          //borderWidth: 0,
        }}
      />
    </View>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(route) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "black",
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        initialParams={route}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Posts",
          // headerTintColor: "yellow",
          // headerBackgroundContainerStyle: { backgroundColor: "black" },
          //headerLeftLabelVisible: false,
          headerTitle: () => <Logo />,
          ///title: "Celsius",
          // headerLeft: () => {
          // <Image
          //   source={{
          //     uri:
          //       "https://see.fontimg.com/api/renderfont4/3zRBM/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/QnVkYQ/attack-graffiti.png",
          //   }}
          //   style={{
          //     width: 100,
          //     height: 40,
          //     marginLeft: 15,
          //     resizeMode: "stretch",
          //   }}
          // />;
          // },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="fire-extinguisher" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Logout")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        initialParams={route}
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
