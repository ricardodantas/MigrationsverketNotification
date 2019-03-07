import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default class CustomDialog extends Component {
  state = {
    dialogVisible: false
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  componentDidMount() {
    this.setState({dialogVisible: this.props.show || false });
  };

  render() {
    return (
      <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>{this.props.title}</Dialog.Title>
          <Dialog.Description>
            {this.props.description}
          </Dialog.Description>
          <Dialog.Button label="Ok" onPress={this.handleOk} />
        </Dialog.Container>
      </View>
    );
  }
}
