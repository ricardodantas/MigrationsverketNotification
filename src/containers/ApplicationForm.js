import React from "react";
import {
  StyleSheet, ActivityIndicator, View, Button, Alert, ScrollView, KeyboardAvoidingView
} from "react-native";

import AppSettings from "../settings";
import * as pushNotifications from "../libs/pushNotifications";
import WelcomeHeader from '../components/WelcomeHeader';
import fetchApplicationInfo from '../libs/fetchApplicationInfo';

import t from "tcomb-form-native";

const Form = t.form.Form;
Form.stylesheet.helpBlock.normal.fontSize = 12;

const formOptions = {
  fields: {
    number: {
      maxLength: 9,
      minLength: 7,
      error: "Insert a valid number.",
      help: "7-9 numbers without a dash (-)!"
    },
    type: {
      error: "Choose a type.",
      nullOption: { value: "", text: "Choose the type of the number" },
      order: "asc",
      help:
        "The case number is in the top right corner of the letters you get from the Migration Agency. The check number is in the e-mail you received from the Migration Agency if you applied online."
    }
  }
};

const applicationType = t.enums({
  1: "Case number",
  2: "Check number"
});

const Application = t.struct({
  type: applicationType,
  number: t.Number
});

export default class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      applicationInfo: null,
      formValues: {
        number: "",
        type: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  async componentDidMount() {
    try {
      await pushNotifications.requestNotificationPermission();
      this.onTokenRefreshListener = pushNotifications.onTokenRefreshListener();
      await this.loadApplicationInfo();
    } catch (error) {
      Alert.alert(
        "Error",
        error.message,
      );
    }
  }

  onChange = formValues => {
    this.setState({ formValues });
  };

  async loadApplicationInfo (formInput = null){
    try {
      this.setState({isLoading:true});
      const applicationInfo = await fetchApplicationInfo({ formInput });
      this.setState({isLoading:false});
      if (applicationInfo) {
        if (applicationInfo) {
          this.props.navigation.navigate('ApplicationInfo', { applicationInfo });
        }
      }
    } catch (error) {
      this.setState({isLoading:false});
      Alert.alert(
        "Sorry...",
        error.message,
      );
    }
  }

  async handleSubmit() {
    try {
      this.setState({ isLoading: true });
      const formValue = this._form.getValue();
      if (formValue) {
        await this.loadApplicationInfo(formValue);
      }
    } catch (error) {
      Alert.alert(
        "Sorry",
        error.message,
      );
    } finally {
      this.setState({ isLoading: false });
    }
  }

  renderForm() {
    const { formValues } = this.state;
    return (
      <View style={styles.form}>
        <Form
          options={formOptions}
          ref={c => (this._form = c)}
          type={Application}
          value={formValues}
          onChange={this.onChange}
        />
        <Button
          title="Save"
          color={AppSettings.MAIN_FONT_COLOR_INVERTED}
          onPress={this.handleSubmit}
          disabled={
            formValues.number === "" ||
            formValues.type === ""
          }
        />
      </View>
    );
  }

  render() {
    const { isLoading } = this.state;

    return (
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior="position"
          enabled
        >
          <WelcomeHeader></WelcomeHeader>
          {isLoading ?
            <ActivityIndicator size="large" color={AppSettings.MAIN_FONT_COLOR} /> :
            this.renderForm()
          }
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: AppSettings.MAIN_COLOR
  },
  form: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    backgroundColor: AppSettings.MAIN_COLOR_INVERTED
  }
});
