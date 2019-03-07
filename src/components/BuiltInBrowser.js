import React, { Component } from "react";
import { WebView } from "react-native";

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
