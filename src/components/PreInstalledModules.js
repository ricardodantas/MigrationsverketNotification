import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'react-native-firebase';

export default class PreInstalledModules extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <View style={styles.modules}>
          <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
          {firebase.admob.nativeModuleExists && <Text style={styles.module}>admob()</Text>}
          {firebase.analytics.nativeModuleExists && <Text style={styles.module}>analytics()</Text>}
          {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
          {firebase.config.nativeModuleExists && <Text style={styles.module}>config()</Text>}
          {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>crashlytics()</Text>}
          {firebase.database.nativeModuleExists && <Text style={styles.module}>database()</Text>}
          {firebase.firestore.nativeModuleExists && <Text style={styles.module}>firestore()</Text>}
          {firebase.functions.nativeModuleExists && <Text style={styles.module}>functions()</Text>}
          {firebase.iid.nativeModuleExists && <Text style={styles.module}>iid()</Text>}
          {firebase.invites.nativeModuleExists && <Text style={styles.module}>invites()</Text>}
          {firebase.links.nativeModuleExists && <Text style={styles.module}>links()</Text>}
          {firebase.messaging.nativeModuleExists && <Text style={styles.module}>messaging()</Text>}
          {firebase.notifications.nativeModuleExists && <Text style={styles.module}>notifications()</Text>}
          {firebase.perf.nativeModuleExists && <Text style={styles.module}>perf()</Text>}
          {firebase.storage.nativeModuleExists && <Text style={styles.module}>storage()</Text>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  modules: {
    margin: 20,
  }
});
