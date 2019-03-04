import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  View,
  ScrollView
} from "react-native";
import DeviceInfo from "react-native-device-info";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationInfo from "./components/ApplicationInfo";
import { getApplication } from "./libs/request";
import localStorage from "./libs/localStorage";
import AppSettings from "./settings";

import firebase from "react-native-firebase";

export default class App extends React.Component {
  constructor() {
    super();

    const deviceUniqueId = DeviceInfo.getUniqueID();

    this.shouldShowApplicationInfo = this.shouldShowApplicationInfo.bind(this);

    this.state = {
      deviceUniqueId,
      showLoading: false,
      applicationInfo: null
    };
  }

  async loadApplicationInfo() {
    let applicationInfo = await localStorage.getItem("application");
    if (applicationInfo) {
      this.setState({ applicationInfo, showLoading: true });
      applicationInfo = await getApplication({
        number: applicationInfo.number,
        type: applicationInfo.type,
        deviceUniqueId: this.state.deviceUniqueId
      });
      this.setState({ applicationInfo, showLoading: false });
    }
  }

  async componentDidMount() {
    try {
      const { user } = await firebase.auth().signInAnonymously();
      const userInfo = user.toJSON();
      await firebase.analytics().logEvent("app_loaded", {
        user: userInfo,
        deviceUniqueId: this.state.deviceUniqueId
      });
      // await AsyncStorage.clear();
      await this.loadApplicationInfo();
    } catch (error) {
      console.error(error);
    }
  }

  async shouldShowApplicationInfo(shouldShow) {
    if (shouldShow) {
      await this.loadApplicationInfo();
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {
            <Image
              source={require("./assets/logo.png")}
              style={[styles.logo]}
            />
          }
          <Text style={styles.welcome}>
            Welcome to {"\n"} Migrationsverket Notification
          </Text>
          {this.state.showLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator
                size="large"
                color={AppSettings.mainFontColor}
              />
            </View>
          ) : null}
          {this.state.applicationInfo === null ? (
            <ApplicationForm
              deviceUniqueId={this.state.deviceUniqueId}
              shouldShowApplicationInfo={this.shouldShowApplicationInfo}
            />
          ) : (
            <ApplicationInfo {...this.state.applicationInfo} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    marginBottom: 30
  },
  scrollView: {
    backgroundColor: AppSettings.mainColor
  },
  container: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  logo: {
    height: 120,
    marginBottom: 15,
    marginTop: 35,
    padding: 0,
    width: 135,
    alignSelf: "center"
  },
  welcome: {
    marginBottom: 50,
    fontSize: 25,
    color: AppSettings.mainFontColor,
    textAlign: "center",
    margin: 10
  }
  // instructions: {
  //   color: AppSettings.mainFontColor,
  //   textAlign: 'center',
  //   marginBottom: 5
  // }
});