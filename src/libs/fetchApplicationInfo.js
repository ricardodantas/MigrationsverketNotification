import AppSettings from "../settings";
import localStorage from "../libs/localStorage";
import * as pushNotifications from "../libs/pushNotifications";
import { getApplication } from "../libs/request";

const fetchApplicationInfo = async ({ forceFetch = false, formInput = null }) => {
  const fcmToken = await pushNotifications.getStoredFcmToken();
  let applicationInfo = await localStorage.getItem(AppSettings.DB_APPLICATION_INFO);
  if (formInput || (forceFetch && applicationInfo)) {
    const input = formInput ? { ...formInput } : { ...applicationInfo };
    applicationInfo = await getApplication({
      number: input.number,
      type: input.type,
      fcmToken
    });
    if (applicationInfo) {
      if (applicationInfo.type && applicationInfo.number) {
        await localStorage.setItem(AppSettings.DB_APPLICATION_INFO, applicationInfo);
      } else if (applicationInfo.message) {
        throw new Error(applicationInfo.message);
      }
    }
  }
  return applicationInfo;
};

export default fetchApplicationInfo;
