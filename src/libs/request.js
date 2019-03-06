// import axios from "axios";

import AppSettings from "../settings";

const APPLICATION_STATUS_URL = `application-status`;

// export const request = axios.create({
//   baseURL: AppSettings.restApiBaseUrl,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   }
// });

export const getApplication = async ({
  number,
  type,
  deviceUniqueId,
  fcmToken
}) => {
  const response = await fetch(
    `${
      AppSettings.restApiBaseUrl
    }/${APPLICATION_STATUS_URL}?number=${number}&type=${type}&deviceUniqueId=${deviceUniqueId}&fcmToken=${fcmToken}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  const data = await response.json();
  return data;
  // const result = await request.get(
  //   `${APPLICATION_STATUS_URL}?number=${number}&type=${type}&deviceUniqueId=${deviceUniqueId}&fcmToken=${fcmToken}`
  // );
  // return result.data;
};
