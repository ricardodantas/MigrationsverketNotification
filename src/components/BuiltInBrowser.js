import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default class BuiltInBrowser extends Component {
  render() {
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ uri: this.props.url }}
        style={styles.browser}
      />
    );
  }
}

const styles = StyleSheet.create({
  browser: {
    marginTop: 20
  }
});
