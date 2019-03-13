import React from "react";
import {
  RefreshControl,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  View,
  ScrollView,
  Keyboard
} from "react-native";

import ApplicationForm from "./components/ApplicationForm";
import ApplicationInfo from "./components/ApplicationInfo";
// import BuiltInBrowser from "./components/BuiltInBrowser";

import { getApplication } from "./libs/request";
import localStorage from "./libs/localStorage";
import alert from "./libs/alert";
import AppSettings from "./settings";

import firebase from "react-native-firebase";

export default class App extends React.Component {
  onTokenRefreshListener = null;
  notificationListener = null;
  notificationOpenedListener = null;

  constructor() {
    super();

    this.shouldShowApplicationInfo = this.shouldShowApplicationInfo.bind(this);

    this.state = {
      isKeyboardOpened: false,
      BuiltInBrowser: {
        show: false,
        url: null
      },
      showLoading: false,
      fcmToken: null,
      applicationInfo: null
    };
  }

  async loadApplicationInfo() {
    const fcmToken = await this.getStoredFcmToken();
    let applicationInfo = await localStorage.getItem("application");
    if (applicationInfo) {
      this.setState({ applicationInfo, showLoading: true });
      applicationInfo = await getApplication({
        number: applicationInfo.number,
        type: applicationInfo.type,
        fcmToken
      });
      // await firebase.analytics().logEvent("load_applicationInfo", {
      //   applicationInfo
      // });
      this.setState({ applicationInfo, showLoading: false });
    }
  }

  async storeFcmToken(fcmToken) {
    // await firebase.analytics().logEvent("set_fcmToken", {
    //   fcmToken,
    // });
    await localStorage.setItem("fcmToken", fcmToken, false);
    this.setState({ fcmToken });
  }

  async getStoredFcmToken() {
    return await localStorage.getItem("fcmToken", false);
  }

  async getFcmToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await this.storeFcmToken(fcmToken);
      return fcmToken;
    }
    return false;
  }

  async requestNotificationPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // await firebase.analytics().logEvent("user_allowed_notifications", {
      // });
      await this.getFcmToken();
    } else {
      await firebase.messaging().requestPermission();
    }
  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  async componentDidMount() {
    try {
      // await localStorage.clear();
      // const { user } = await firebase.auth().signInAnonymously();
      // const userInfo = user.toJSON();
      // await firebase.analytics().logEvent("app_loaded", {
      // });
      this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => this.setState({ isKeyboardOpened: true })
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => this.setState({ isKeyboardOpened: false })
      );
      await this.requestNotificationPermission();
      await this.createNotificationListeners();
      await this.loadApplicationInfo();
      this.onTokenRefreshListener = firebase
        .messaging()
        .onTokenRefresh(this.storeFcmToken);
    } catch (error) {
      console.error(error);
    }
  }

  openBultInBrowser(url) {
    this.setState({
      BuiltInBrowser: {
        show: true,
        url
      }
    });
  }

  async createNotificationListeners() {
    // this.notificationListener = firebase.messaging().onMessage(message => {
    //   // Process your message as required
    //   console.warn("push notification content: ", message);
    // });

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
        // this.openBultInBrowser(notification.data.url);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
        // console.warn(notificationOpen);
        // this.openBultInBrowser(notificationOpen.data.url);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
      // console.warn(notificationOpen);
      // this.openBultInBrowser(notificationOpen.data.url);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  async shouldShowApplicationInfo(shouldShow) {
    if (shouldShow) {
      await this.loadApplicationInfo();
    }
  }

  showAlert(title, body) {
    alert.openAlert({ title, body });
  }

  _onRefresh = () => {
    this.loadApplicationInfo();
  };

  renderApplicationInfo() {
    if (this.state.applicationInfo !== null) {
      return <ApplicationInfo {...this.state.applicationInfo} />;
    }
    return null;
  }

  renderApplicationForm() {
    if (this.state.applicationInfo !== null) {
      return null;
    }
    return (
      <ApplicationForm
        fcmToken={this.state.fcmToken}
        shouldShowApplicationInfo={this.shouldShowApplicationInfo}
      />
    );
  }

  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          this.state.applicationInfo ? (
            <RefreshControl
              title="Pull to refresh"
              titleColor={AppSettings.mainFontColor}
              tintColor={AppSettings.mainFontColor}
              refreshing={false}
              onRefresh={this._onRefresh}
            />
          ) : (
            false
          )
        }
      >
        <KeyboardAvoidingView
          behavior="position"
          enabled={this.state.isKeyboardOpened}
        >
          <View style={styles.container}>
            {
              <Image
                source={require("../assets/logo.png")}
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
            {this.renderApplicationForm()}
            {this.renderApplicationInfo()}
            {/*this.state.BuiltInBrowser.show ? (
              <BuiltInBrowser url={this.state.BuiltInBrowser.url} />
            ) : null*/}
          </View>
        </KeyboardAvoidingView>
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
});
