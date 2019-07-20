import AppSettings from "../settings";

const APPLICATION_STATUS_URL_PATH = 'application-status';

export const getApplication = ({ number, type, fcmToken }) => fetch(
    `${
      AppSettings.REST_API_BASE_URL
    }/${APPLICATION_STATUS_URL_PATH}?number=${number}&type=${type}&fcmToken=${fcmToken}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": AppSettings.RES_API_TOKEN
      }
    }
  ).then(response => response.json());
