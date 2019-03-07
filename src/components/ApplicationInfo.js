import React from "react";
import { StyleSheet, View, Text } from "react-native";

import AppSettings from "../settings";

export default class ApplicationInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>{this.props.number}</Text>
        <Text style={styles.status}>{this.props.status}</Text>
        <Text style={styles.description}>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: AppSettings.mainColorInverted,
    color: AppSettings.mainFontColorInverted
  },
  number: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: AppSettings.mainFontColorInverted
  },
  status: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
    color: AppSettings.mainFontColorInverted
  },
  description: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: "justify"
  }
});
