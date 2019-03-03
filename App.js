import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// import PreInstalledModules from './components/PreInstalledModules';
import ApplicationForm from './components/ApplicationForm';
import ApplicationInfo from './components/ApplicationInfo';
import AppSettings from './settings';

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
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {<Image source={require('./assets/logo.png')} style={[styles.logo]}/>}
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
          <ApplicationForm deviceUniqueId={this.state.deviceUniqueId} />
          {/* <ApplicationInfo status={} description={} number={}/> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: AppSettings.mainColor,
  },
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  logo: {
    height: 120,
    marginBottom: 15,
    marginTop: 35,
    padding: 0,
    width: 135,
    alignSelf: 'center'
  },
  welcome: {
    marginBottom: 50,
    fontSize: 25,
    color: AppSettings.mainFontColor,
    textAlign: 'center',
    margin: 10,
  },
  // instructions: {
  //   color: AppSettings.mainFontColor,
  //   textAlign: 'center',
  //   marginBottom: 5
  // }
});
