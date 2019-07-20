import firebase from "react-native-firebase";
import AppSettings from "../settings";
import localStorage from "./localStorage";

export const getStoredFcmToken = () => localStorage.getItem(AppSettings.DB_FCM_TOKEN, false);

const storeFcmToken = (fcmToken) => localStorage.setItem(AppSettings.DB_FCM_TOKEN, fcmToken, false);

export const getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    await storeFcmToken(fcmToken);
    return fcmToken;
  }
  return false;
};

export const requestNotificationPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    await getFcmToken();
  } else {
    await firebase.messaging().requestPermission();
  }
}

export const onTokenRefreshListener = () => firebase.messaging().onTokenRefresh(storeFcmToken);


export const notificationListener = (callback) => firebase
  .notifications()
  .onNotification(callback);

export const notificationOpenedListener = (callback) => firebase
  .notifications()
  .onNotificationOpened(notificationOpen => callback(notificationOpen.notification));
