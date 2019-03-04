import { AsyncStorage } from "react-native";

const setItem = async (key, value, isJSON = true) => {
  if (isJSON) {
    value = JSON.stringify(value);
  }
  return await AsyncStorage.setItem(key, value);
};

const getItem = async (key, isJSON = true) => {
  const value = await AsyncStorage.getItem(key);
  if (isJSON) {
    value = JSON.parse(value);
  }
  return value;
};

const clear = async () => await AsyncStorage.clear();

export default {
  getItem,
  setItem,
  clear
};
