import React from 'react';
import { StyleSheet, ActivityIndicator, View, Button } from 'react-native';

// import firebase from 'react-native-firebase';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const applicationType = t.enums({
  1: 'Case number',
  2: 'Check number'
});

const Application = t.struct({
  type: applicationType,
  number: t.Number
});


export default class ApplicationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  handleSubmit = () => {
    const formValue = this._form.getValue();
    const { deviceUniqueId } = this.props;
    if (formValue) {
      const formData = { ...formValue, deviceUniqueId };
      this.setState(previousState => (
        { isLoading: true }
      ));
      this.setState(previousState => (
        { isLoading: false }
      ));
    }
  }

  render() {
    return (
      <View style={styles.form}>
        {this.state.isLoading ?
          <ActivityIndicator size="large" color="#000" /> :
          <View>
            <Form ref={c => this._form = c} type={Application} />
            <Button
              title="Save"
              onPress={this.handleSubmit}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {

  }
});
