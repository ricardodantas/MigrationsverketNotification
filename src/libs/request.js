// import axios from "axios";

import AppSettings from "../settings";

const APPLICATION_STATUS_URL = `application-status`;

export const getApplication = async ({ number, type, fcmToken }) => {
  const response = await fetch(
    `${
      AppSettings.restApiBaseUrl
    }/${APPLICATION_STATUS_URL}?number=${number}&type=${type}&fcmToken=${fcmToken}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  const data = await response.json();
  return data;
};
