import React from "react";
import { StyleSheet, ActivityIndicator, View, Button } from "react-native";

import Dialog from "./Dialog";
import AppSettings from "../settings";
import { getApplication } from "../libs/request";
import localStorage from "../libs/localStorage";

import t from "tcomb-form-native";

const Form = t.form.Form;

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
  constructor() {
    super();
    this.state = {
      isLoading: false,
      applicationInfo: null,
      dialogInfo: {
        title: "",
        description: "",
        show: false
      },
      formValues: {
        number: "",
        type: ""
      }
    };
  }

  onChange = formValues => {
    this.setState({ formValues });
  };

  loadApplicationInfo = async ({ type, number, deviceUniqueId }) => {
    try {
      return await getApplication({ type, number, deviceUniqueId });
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmit = async () => {
    const formValue = this._form.getValue();
    const { deviceUniqueId } = this.props;
    if (formValue) {
      const formData = { ...formValue, deviceUniqueId };
      this.setState({ isLoading: true });
      const applicationInfo = await this.loadApplicationInfo(formData);
      if (applicationInfo.type && applicationInfo.number) {
        await localStorage.setItem("application", applicationInfo);
        this.setState({ applicationInfo });
        await this.props.shouldShowApplicationInfo(true);
      } else {
        this.setState({
          dialogInfo: {
            title: "Sorry",
            description: result.message,
            show: true
          }
        });
      }
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <View>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color={AppSettings.mainFontColor} />
        ) : (
          <View style={styles.form}>
            <Form
              options={formOptions}
              ref={c => (this._form = c)}
              type={Application}
              value={this.state.formValues}
              onChange={this.onChange}
            />
            <Button
              title="Save"
              color={AppSettings.mainFontColorInverted}
              onPress={this.handleSubmit}
              disabled={
                this.state.formValues.number === "" ||
                this.state.formValues.type === ""
              }
            />
            <Dialog {...this.state.dialogInfo} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: AppSettings.mainColorInverted
  }
});