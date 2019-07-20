import React from "react";
import { StyleSheet, Alert, View, Text, ScrollView, RefreshControl } from "react-native";

import AppSettings from "../settings";
import fetchApplicationInfo  from '../libs/fetchApplicationInfo';


export default class ApplicationInfo extends React.Component {
  static navigationOptions = {
    title: 'Application',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      applicationInfo: null
    };
  }


  async componentDidMount() {
    const { navigation } = this.props;
    const applicationInfo = navigation.getParam('applicationInfo', null);
    this.setState({ applicationInfo });
    await this.loadApplicationInfo(true);
  }

  async loadApplicationInfo (forceFetch = false){
    try {
      this.setState({isLoading:true});
      const applicationInfo = await fetchApplicationInfo({forceFetch});
      this.setState({applicationInfo});
    } catch (error) {
      this.setState({isLoading:false});
      Alert.alert(
        "Sorry...",
        error.message,
      );
    } finally {
      this.setState({isLoading:false});
    }
  }

  render() {
    const { applicationInfo, isLoading } = this.state;
    const { navigation } = this.props;
    if (applicationInfo === null) {
      return null;
    }
    return (
      <ScrollView
        style={styles.scrollView}
        refreshControl={
        (
            <RefreshControl
            title={isLoading? 'Refreshing...': 'Pull to refresh'}
            titleColor={AppSettings.MAIN_FONT_COLOR}
            tintColor={AppSettings.MAIN_FONT_COLOR}
            refreshing={isLoading}
            onRefresh={()=> this.loadApplicationInfo(true)}
          />
        )
        }>
        <View style={styles.container}>
          <Text style={styles.number}>{applicationInfo.number}</Text>
          <Text style={styles.status}>{applicationInfo.status}</Text>
          <Text style={styles.description}>{applicationInfo.description}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: AppSettings.MAIN_COLOR
  },
  container: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    backgroundColor: AppSettings.MAIN_COLOR_INVERTED,
    color: AppSettings.MAIN_FONT_COLOR_INVERTED
  },
  number: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: AppSettings.MAIN_FONT_COLOR_INVERTED
  },
  status: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
    color: AppSettings.MAIN_FONT_COLOR_INVERTED
  },
  description: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: "justify"
  }
});
