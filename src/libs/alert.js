const openAlert = ({ title, body }) => {
  Alert.alert(
    title,
    body,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

module.exports = { openAlert };
