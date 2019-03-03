import React from 'react';
import { StyleSheet, ActivityIndicator, View, Button } from 'react-native';
import AppSettings from '../settings';


export default class ApplicationInfo extends React.Component {
  constructor() {
    super();
    this.state = { show: false };
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

  },
  status: {

  },
  description: {

  }
});
