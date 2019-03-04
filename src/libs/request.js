import AppSettings from "../settings";
import axios from "axios";

const APPLICATION_STATUS_URL = `/application-status`;

export const request = axios.create({
  baseURL: AppSettings.restApiBaseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const getApplication = async ({ number, type, deviceUniqueId }) => {
  const result = await request.get(
    `${APPLICATION_STATUS_URL}?number=${number}&type=${type}&deviceUniqueId=${deviceUniqueId}`
  );
  return result.data;
};
