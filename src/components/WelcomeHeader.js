import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import AppSettings from "../settings";

const WelcomeHeader = () => (
  <View style={styles.container}>
    <Image
      source={require("../../assets/logo.png")}
      style={[styles.logo]}
    />
    <Text style={styles.welcome}>
      Welcome to {"\n"} Migrationsverket Notification
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  logo: {
    height: 100,
    marginBottom: 15,
    marginTop: 0,
    padding: 0,
    width: 135,
    alignSelf: "center"
  },
  welcome: {
    fontSize: 25,
    color: AppSettings.MAIN_FONT_COLOR,
    textAlign: "center",
    margin: 10
  }
});


export default WelcomeHeader;

