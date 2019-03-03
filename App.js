import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import PreInstalledModules from './components/PreInstalledModules';
import ApplicationForm from './components/ApplicationForm';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    const deviceUniqueId = DeviceInfo.getUniqueID();
    this.state = {
      deviceUniqueId
    };
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    try {

      const { user } = await firebase.auth().signInAnonymously();
      const userInfo = user.toJSON();
      await firebase.analytics().logEvent('app_loaded', {
        user: userInfo,
        deviceUniqueId: this.state.deviceUniqueId
      });

    } catch (error) {
      console.error(error);
    }

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {<Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>}
          <Text style={styles.welcome}>
            Welcome to {'\n'} Migrationsverket Notification
          </Text>
          {/*
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          {Platform.OS === 'ios' ? (
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
          ) : (
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Cmd+M or shake for dev menu
            </Text>
          )}
          */}
          { /* <PreInstalledModules /> */}
          <ApplicationForm deviceUniqueId={this.state.deviceUniqueId}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
